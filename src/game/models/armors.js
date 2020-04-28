
import _ from 'lodash';

import {calc_averages} from '../helpers';


export var armors_bodies = {
    robe:  {name: "Robe",                 load: 3, delay: 3, absorption: 2, resistance: 2, stability: 3},
    //skin:  {name: "Skin",                 load: 6, delay: 8, absorption: 2, resistance: 4, stability: 4},
    //skin:  {name: "Skin",                 load: 8, delay: 5, absorption: 2, resistance: 4, stability: 6},
    jacket:  {name: "Jacket",             load: 5, delay: 6, absorption: 4, resistance: 3, stability: 4},
    leather:  {name: "Leather",           load: 8, delay: 5, absorption: 5, resistance: 3, stability: 9},
    lamellar: {name: "Lamellar",          load: 10, delay: 11, absorption: 8, resistance: 2, stability: 18},
    chest:  {name: "Chest",               load: 14, delay: 16, absorption: 10, resistance: 4, stability: 28},
    chain:  {name: "Chain",               load: 15, delay: 12, absorption: 15, resistance: 1, stability: 15},
    //brigand:  {name: "Brigand",           load: 18, delay: 13, absorption: 8, resistance: 4, stability: 16},
    plate:  {name: "Plate",               load: 22, delay: 21, absorption: 18, resistance: 4, stability: 36},
    //plate:  {name: "Plate",     load: 30, delay: 24, absorption: 12, resistance: 4, stability: 36},
    full_plate:  {name: "Full Plate",     load: 26, delay: 35, absorption: 26, resistance: 5, stability: 42},
    //turtle_plate: {name: "Turtle Plate",  load: 35, delay: 35, absorption: 15, resistance: 5, stability: 40},
};

   /*
_.each(armors_bodies, (armor, key) => {
    let delay = Math.round((armor.absorption * 2 + armor.resistance * 3 + armor.stability * 0.5) + Math.sqrt(Math.sqrt(armor.absorption * armor.resistance * armor.stability)) - ((Math.min(armor.absorption, armor.resistance, armor.stability) + armor.load) * 2));
    console.log(armors_bodies[key].delay === delay, armor.name, 'delay', armors_bodies[key].delay, delay);
} );

//armors_bodies = _.sortBy(armors_bodies, (armor) => (armor.absorption + armor.resistance + armor.stability) / armor.delay );
   */

console.log('Average Armour', calc_averages(armors_bodies, ['load', 'delay', 'absorption', 'resistance', 'stability']));

export const armors_quality = {
    1: {name: "Old",      load: 0, delay: 1,  absorption: 0, resistance: 0, stability: 0},
    2: {name: "Rusty",    load: 0, delay: 0,  absorption: 1, resistance: 0, stability: 1},
    3: {name: "Standard", load: 0, delay: -0, absorption: 2, resistance: 1, stability: 2},
    4: {name: "Grete",    load: 0, delay: -0, absorption: 3, resistance: 1, stability: 3},
    5: {name: "Shiny",    load: 0, delay: -1, absorption: 4, resistance: 2, stability: 4},
    6: {name: "Godlike",  load: 0, delay: -1, absorption: 5, resistance: 3, stability: 5},
};

export const armors_mods = {
    flat: {name: "Typical",       load: 0, delay: 0, absorption: 0, resistance: 0, stability: 0},
    delay: {name: "Light",       load: 0, delay: -3, absorption: -1, resistance: -1, stability: -1},
    absorption: {name: "Soft",    load: 0, delay: 1, absorption: 3, resistance: -1, stability: -1},
    resistance: {name: "Resist",  load: 0, delay: 1, absorption: -1, resistance: 3, stability: -1},
    stability: {name: "Stable",   load: 0, delay: 1, absorption: -1, resistance: -1, stability: 3},
    //val1:    {name: "qwe",        load: 0, delay: 0, absorption: 0, resistance: 1, stability: 0, val1: 3, val2: 0},
    //val2:    {name: "asd",        load: 0, delay: 0, absorption: 0, resistance: 1, stability: 0, val1: 0, val2: 3},
    fast: {name: "Fast",          load: 0, delay: -4, absorption: -2, resistance: -2, stability: 0},
    forty: {name: "Forty",        load: 0, delay: 4, absorption: 2, resistance: 2, stability: 0},
    deft: {name: "Deft",          load: 0, delay: -2, absorption: -2, resistance: -2, stability: 2},
    laden: {name: "Laden",        load: 0, delay: 2, absorption: 2, resistance: 2, stability: -2},
};


export const genArmor = (level = 1) => {
    let body = (level === 1) ? armors_bodies.lamellar : _.sample(armors_bodies);
    let quality = armors_quality[Math.floor(_.random(1, Math.sqrt(level)))];
    let mod = (level === 1) ? armors_mods.flat : _.sample(armors_mods);

    return combineArmor(level, body, quality, mod);
};

export const combineArmor = (level, body, quality = armors_quality[1], mod = armors_mods.flat) => {

    //console.log('Gen Armor: ', level, body, quality, mod);

    let new_armor = {
        name: _.trim(mod.name + ' ' + quality.name + ' ' + body.name),
        unsold: body.unsold ? body.unsold : false,
        mod_name: mod.name,
        quality_name: quality.name,
        body_name: body.name,
        load: quality.load + mod.load + body.load,
        delay: quality.delay + mod.delay + body.delay,// + level,
        absorption: quality.absorption + mod.absorption + body.absorption,// + level,
        resistance: quality.resistance + mod.resistance + body.resistance,// + level,
        stability: quality.stability + mod.stability + body.stability,// + level,
        level: level,
        cost: 0
    };

    /*
    _.each(new_armor, (value, key) => {
        if (new_armor[key] < 1) {
            if (key === 'delay') {
                new_armor.level -= 1 - new_armor[key];
            }
            else {
                new_armor.level += 1 - new_armor[key];
            }
            new_armor[key] = 1;
        }
    });
    */

    new_armor.cost = Math.floor(Math.sqrt((level * (new_armor.absorption + new_armor.resistance + new_armor.stability) * 100) / (1 + new_armor.delay)));

    //console.log('New Armor: ', level, body, quality, mod, new_armor);

    return new_armor;
};

export const free_armor = combineArmor(0,
    {name: "Naked", unsold: true, load: 0, delay: 0, absorption: 0, resistance: 0, stability: 0},
    {name: "",      load: 0, delay: 0,  absorption: 0, resistance: 0, stability: 0},
    {name: "",      load: 0, delay: 0,  absorption: 0, resistance: 0, stability: 0});
