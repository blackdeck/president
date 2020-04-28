

import _ from 'lodash';

import {calc_averages} from '../helpers';


export var shields_bodies = {
    buckler:  {name: "Buckler",      type: 'shield', hands: 1, load: 3, delay: 4, absorption: 1, resistance: 1, stability: 6},
    parma:  {name: "Parma",          type: 'shield', hands: 1, load: 5, delay: 8, absorption: 3, resistance: 1, stability: 12},
    heater:  {name: "Heater",        type: 'shield', hands: 1, load: 8, delay: 16, absorption: 6, resistance: 2, stability: 18},
    kite:  {name: "Kite",            type: 'shield', hands: 1, load: 12, delay: 20, absorption: 8, resistance: 3, stability: 26},
    tower:  {name: "Tower",          type: 'shield', hands: 1, load: 16, delay: 26, absorption: 10, resistance: 4, stability: 36},
};


 /*
_.each(shields_bodies, (shield, key) => {
    let delay = Math.round((shield.absorption * 2 + shield.resistance * 3 + shield.stability * 0.5) + Math.sqrt(Math.sqrt(shield.absorption * shield.resistance * shield.stability)) - ((Math.min(shield.absorption, shield.resistance, shield.stability) + shield.load) * 1.5));
    console.log(shields_bodies[key].delay === delay, shield.name, 'delay', shields_bodies[key].delay, delay);
} );
 */

console.log('Average Shield', calc_averages(shields_bodies, ['load', 'delay', 'absorption', 'resistance', 'stability']));
 
 
export const shields_quality = {
    1: {name: "Old",      load: 0, delay: 1,  absorption: 0, resistance: 0, stability: 0},
    2: {name: "Rusty",    load: 0, delay: 0,  absorption: 1, resistance: 0, stability: 1},
    3: {name: "Standard", load: 0, delay: -0, absorption: 2, resistance: 1, stability: 2},
    4: {name: "Grete",    load: 0, delay: -0, absorption: 3, resistance: 1, stability: 3},
    5: {name: "Shiny",    load: 0, delay: -1, absorption: 4, resistance: 2, stability: 4},
    6: {name: "Godlike",  load: 0, delay: -1, absorption: 5, resistance: 3, stability: 5},
};

export const shields_mods = {
    flat: {name: "Typical",       load: 0, delay: 0, absorption: 0, resistance: 0, stability: 0},
    delay: {name: "Light",       load: 0, delay: -3, absorption: -1, resistance: -1, stability: -1},
    absorption: {name: "Soft",    load: 0, delay: 1, absorption: 3, resistance: -1, stability: -1},
    resistance: {name: "Resist",  load: 0, delay: 1, absorption: -1, resistance: 3, stability: -1},
    stability: {name: "Stable",   load: 0, delay: 1, absorption: -1, resistance: -1, stability: 3},
    //val1:    {name: "qwe",        load: 0, delay: 0, absorption: 0, resistance: 1, stability: 0},
    //val2:    {name: "asd",        load: 0, delay: 0, absorption: 0, resistance: 1, stability: 0},
    fast: {name: "Fast",          load: 0, delay: -4, absorption: -2, resistance: -2, stability: 0},
    forty: {name: "Forty",        load: 0, delay: 4, absorption: 2, resistance: 2, stability: 0},
    deft: {name: "Deft",          load: 0, delay: -2, absorption: -2, resistance: -2, stability: 2},
    laden: {name: "Laden",        load: 0, delay: 2, absorption: 2, resistance: 2, stability: -2},
};


export const genShield = (level = 1) => {
    let body = _.sample(shields_bodies);
    let quality = shields_quality[Math.floor(_.random(1, Math.sqrt(level)))];
    let mod = (level === 1) ? shields_mods.flat : _.sample(shields_mods);

    return combineShield(level, body, quality, mod);
};

export const combineShield = (level, body, quality = shields_quality[1], mod = shields_mods.flat) => {
    let new_shield = {
        name: _.trim(mod.name + ' ' + quality.name + ' ' + body.name),
        unsold: body.unsold ? body.unsold : false,
        mod_name: mod.name,
        quality_name: quality.name,
        body_name: body.name,
        type: body.type,
        hands: body.hands,
        load: quality.load + mod.load + body.load,
        delay: quality.delay + mod.delay + body.delay,// + level,
        absorption: quality.absorption + mod.absorption + body.absorption,// + level,
        resistance: quality.resistance + mod.resistance + body.resistance,// + level,
        stability: quality.stability + mod.stability + body.stability,// + level,
        level: level,
        cost: 0
    };

    /*
    _.each(new_shield, (value, key) => {
        if (new_shield[key] < 1) {
            if (key === 'delay') {
                new_shield.level -= 1 - new_shield[key];
            }
            else {
                new_shield.level += 1 - new_shield[key];
            }
            new_shield[key] = 1;
        }
    });
    */

    new_shield.cost = Math.floor(Math.sqrt(((new_shield.delay) * level * (new_shield.absorption + new_shield.resistance + new_shield.stability) * 100) / (new_shield.delay)));

    //console.log('New Shield: ', level, body, quality, mod, new_shield);

    return new_shield;
};