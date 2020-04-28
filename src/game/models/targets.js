
import _ from 'lodash';

import {checkUnitStats} from '../game_math';
import {genUnit} from './unit';
import {genWeapon} from './weapons';
import {genArmor} from './armors';


const targets_bodies = {
    warrior:    {name: "Warrior",   hp: 0, sp: 0, mp: 0, stats: {str: 7, dex: 5, int: 6, wiz: 3, vit: 4}},
    mage:       {name: "Mage",      hp: 0, sp: 0, mp: 0, stats: {str: 4, dex: 7, int: 5, wiz: 6, vit: 3}},
    evangelist: {name: "Evangelist",hp: 0, sp: 0, mp: 0, stats: {str: 5, dex: 3, int: 7, wiz: 4, vit: 6}},
    prophet:    {name: "Prophet",   hp: 0, sp: 0, mp: 0, stats: {str: 3, dex: 6, int: 4, wiz: 7, vit: 5}},
    nomad:      {name: "Nomad",     hp: 0, sp: 0, mp: 0, stats: {str: 6, dex: 4, int: 3, wiz: 5, vit: 7}}
};

const targets_quality = {
    1: {name: "Weak",     hp: 0, sp: 0, mp: 0, stats: {str: 0, dex: 0, wiz: 0, int: 0, vit: 0}},
    2: {name: "Novice",   hp: 2, sp: 1, mp: 1, stats: {str: 0, dex: 0, wiz: 0, int: 0, vit: 0}},
    3: {name: "Typical",  hp: 4, sp: 3, mp: 2, stats: {str: 1, dex: 1, wiz: 1, int: 1, vit: 1}},
    4: {name: "Grete",    hp: 8, sp: 5, mp: 3, stats: {str: 1, dex: 1, wiz: 1, int: 1, vit: 1}},
    5: {name: "Shiny",    hp: 12,sp: 7, mp: 4, stats: {str: 2, dex: 2, wiz: 2, int: 2, vit: 2}},
    6: {name: "Godlike",  hp: 16,sp: 10,mp: 5, stats: {str: 2, dex: 2, wiz: 2, int: 2, vit: 2}},
};

const targets_mods = {
    heavy: {name: "Heavy",         hp: 6, sp: -2, mp: -1, stats: {str: 2, dex: -1, wiz: -1, int: -1, vit: 1}},
    healthy: {name: "Healthy",     hp: 3, sp: 0, mp: -1,  stats: {str: 1, dex: -1, wiz: -1, int: -1, vit: 2}},
    nimble: {name: "Nimble",       hp: -3, sp: 4, mp: -1, stats: {str: -1, dex: 2, wiz: -1, int: 1, vit: -1}},
    wise: {name: "Wise",           hp: 0, sp: -4, mp: 2,  stats: {str: -1, dex: -1, wiz: 2, int: 1, vit: -1}},
    brilliant: {name: "Smart",     hp: -3, sp: -2, mp: 2, stats: {str: -1, dex: -1, wiz: 1, int: 2, vit: -1}},

    athlete: {name: "Athlete",     hp: 3, sp: 2, mp: -2, stats: {str: 1, dex: 2, wiz: -2, int: -2, vit: 1}},
    forceful: {name: "Force",      hp: 3, sp: -4, mp: 1, stats: {str: 2, dex: -2, wiz: 0, int: -2, vit: 2}},
    lifeful: {name: "Lifeful",     hp: 6, sp: 0, mp: -2, stats: {str: 1, dex: 1, wiz: -2, int: -2, vit: 2}},
    sly: {name: "Sly",             hp: -6, sp: 2, mp: 1, stats: {str: -2, dex: 2, wiz: -1, int: 2, vit: -1}},
    spellful: {name: "Spellful",   hp: -3, sp: -2, mp: 2,stats: {str: -2, dex: -1, wiz: 2, int: 2, vit: -1}},
    flat: {name: "Vulgar",         hp: 0, sp: 0, mp: 0,  stats: {str: 0, dex: 0, wiz: 0, int: 0, vit: 0}},
};


export const genTarget = (level = 1) => {
    let body = _.sample(targets_bodies);
    let q = Math.floor(Math.min(_.random(1, 6), _.random(1, Math.sqrt(level))));
    //console.log('quality', q);
    let quality = targets_quality[q];
    let mod = _.sample(targets_mods);

    //console.log('Gen Target: ', level, body, quality, mod);

    let target = genUnit(level);

    target.name = mod.name + ' ' + quality.name + ' ' + body.name;
    target.mod_name = mod.name;
    target.quality_name = quality.name;
    target.body_name = body.name;

    target.right_hand = genWeapon(level);
    //target.weapon = genWeapon(level);
    target.armor = genArmor(level);

    target.stats.str = Math.max(1, quality.stats.str + mod.stats.str + body.stats.str);
    target.stats.dex = Math.max(1, quality.stats.dex + mod.stats.dex + body.stats.dex);
    target.stats.wiz = Math.max(1, quality.stats.wiz + mod.stats.wiz + body.stats.wiz);
    target.stats.int = Math.max(1, quality.stats.int + mod.stats.int + body.stats.int);

    _.times(level - 1, () => { target.stats[_.sample(_.keys(target.stats))]++; } );

    target = checkUnitStats(target);

    //console.log('New Target: ', level, body, quality, mod, target);

    return target;
};


