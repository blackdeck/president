
import _ from 'lodash';

import {calc_averages} from '../helpers';

/***
 *
 *
 *  accuracy 5 - medium
 *
 * *
 * Damage types:
 *     crushing
 *     cutting
 *     pierce
 *
 *     poison
 *
 *     fire
 *     cold
 *     light
 *     dark
 *
 *
 *
 *
 */



const unsort_weapons_bodies = {
    dagger:  {name: "Dagger",    type: 'weapon', hands: 1, load: 2, min_dmg: 1, max_dmg: 4, dmg_type: 'cutting',   bonus_stat: 'str', stunning: 6, accuracy: 6, range: 2, speed: 21},
    falchion: {name: "Falchion", type: 'weapon', hands: 1, load: 4, min_dmg: 2, max_dmg: 5, dmg_type: 'cutting',   bonus_stat: 'dex', stunning: 16, accuracy: 5, range: 4, speed: 33},
    sword:  {name: "Sword",      type: 'weapon', hands: 1, load: 5, min_dmg: 3, max_dmg: 6, dmg_type: 'cutting',   bonus_stat: 'str', stunning: 14, accuracy: 6, range: 6, speed: 42},
    bastard: {name:"Bastard",    type: 'weapon', hands: 1, load: 8, min_dmg: 4, max_dmg: 8, dmg_type: 'cutting',   bonus_stat: 'str', stunning: 24, accuracy: 5, range: 8, speed: 54},
    claymore:{name:"Claymore",   type: 'weapon', hands: 2, load: 9, min_dmg:5, max_dmg: 10, dmg_type: 'cutting',  bonus_stat: 'str', stunning: 48, accuracy: 4, range: 10, speed: 65},
    zweihander:{name:"Zweihänder",type: 'weapon', hands: 2, load: 12, min_dmg:6, max_dmg:11, dmg_type: 'cutting',  bonus_stat: 'str', stunning: 64, accuracy: 3, range: 12, speed: 72},

    axe:    {name: "Axe",      type: 'weapon', hands: 1, load: 5, min_dmg: 2, max_dmg: 7, dmg_type: 'cutting',   bonus_stat: 'str', stunning: 14, accuracy: 4, range: 3, speed: 36},
    grandaxe:{name: "Grandaxe",type: 'weapon', hands: 2, load: 10, min_dmg: 4, max_dmg: 13,dmg_type: 'cutting',  bonus_stat: 'str', stunning: 40, accuracy: 2, range: 10, speed: 63},

    rapier: {name: "Rapier",   type: 'weapon', hands: 1, load: 3, min_dmg: 2, max_dmg: 6, dmg_type: 'pierce',    bonus_stat: 'dex', stunning: 6, accuracy: 7, range: 6, speed: 35},
    estoc:  {name: "Estoc",    type: 'weapon', hands: 2, load: 5, min_dmg: 3, max_dmg: 8, dmg_type: 'pierce',    bonus_stat: 'dex', stunning: 25, accuracy: 5, range: 8, speed: 49},

    spear:  {name: "Spear",    type: 'weapon', hands: 1, load: 3, min_dmg: 2, max_dmg: 5, dmg_type: 'pierce',    bonus_stat: 'dex', stunning: 10, accuracy: 7, range: 9, speed: 35},
    scythe: {name: "Scythe",   type: 'weapon', hands: 2, load: 5, min_dmg: 1, max_dmg: 13, dmg_type: 'cutting',  bonus_stat: 'dex', stunning: 13, accuracy: 2, range: 13, speed: 36},
    trident:{name: "Trident",  type: 'weapon', hands: 2, load: 7, min_dmg: 4, max_dmg: 6, dmg_type: 'pierce',    bonus_stat: 'str', stunning: 20, accuracy: 4, range: 15, speed: 47},
    halberd:{name: "Halberd",  type: 'weapon', hands: 2, load: 8, min_dmg: 4, max_dmg: 9, dmg_type: 'cutting',   bonus_stat: 'str', stunning: 30, accuracy: 3, range: 12, speed: 55},

    knuckle: {name: "Knuckle", type: 'weapon', hands: 1, load: 3, min_dmg: 2, max_dmg: 3, dmg_type: 'crushing',   bonus_stat: 'str', stunning: 22, accuracy: 7, range: 1, speed: 27},
    whip:   {name: "Whip",     type: 'weapon', hands: 1, load: 4, min_dmg: 1, max_dmg: 3, dmg_type: 'crushing',   bonus_stat: 'dex', stunning: 22, accuracy: 4, range: 24, speed: 26},
    hammer: {name: "Hammer",   type: 'weapon', hands: 1, load: 10, min_dmg: 3, max_dmg: 7, dmg_type: 'crushing', bonus_stat: 'str', stunning: 40, accuracy: 2, range: 4, speed: 42},
    //flail:  {name: "Flail",    type: 'weapon', hands: 2, load: 9, min_dmg: 4, max_dmg: 8, dmg_type: 'crushing', bonus_stat: 'str', stunning: 30, accuracy: 1, range: 8, speed: 49},
    staff:  {name: "Staff",    type: 'weapon', hands: 2, load: 3, min_dmg: 1, max_dmg: 5, dmg_type: 'crushing',  bonus_stat: 'dex', stunning: 20, accuracy: 5, range: 6, speed: 27},
    //mace:   {name: "Mace",     type: 'weapon', hands: 1, load: 7, min_dmg: 2, max_dmg: 6, dmg_type: 'crushing', bonus_stat: 'str', stunning: 30, accuracy: 2, range: 2, speed: 34},
    club:   {name: "Сlub",     type: 'weapon', hands: 2, load: 15, min_dmg: 7, max_dmg: 12,dmg_type: 'crushing', bonus_stat: 'str', stunning: 60, accuracy: 1, range: 7, speed: 73},
    //crasher:{name: "Crasher",  type: 'weapon', hands: 2, load: 16, min_dmg: 8, max_dmg: 12,dmg_type: 'crushing', bonus_stat: 'str', stunning: 60, accuracy: 3, range: 5, speed: 78},

    bow:    {name: "Bow",      type: 'weapon', hands: 2, load: 3, min_dmg: 1, max_dmg: 4, dmg_type: 'pierce',    bonus_stat: 'dex', stunning: 8,  accuracy: 7, range: 48, speed: 30},
    longbow:{name: "Longbow",  type: 'weapon', hands: 2, load: 7, min_dmg: 2, max_dmg: 6, dmg_type: 'pierce',    bonus_stat: 'dex', stunning: 16, accuracy: 5, range: 72, speed: 41},
    crossbow:{name: "Crossbow",type: 'weapon', hands: 2, load: 10,min_dmg: 4, max_dmg: 8, dmg_type: 'pierce',    bonus_stat: 'dex', stunning: 32, accuracy: 4, range: 60, speed: 57},

    wand:  {name: "Wand",      type: 'weapon', hands: 1, load: 3, min_dmg: 1, max_dmg: 5, dmg_type: 'magic',      bonus_stat: 'int', stunning: 1,  accuracy: 10, range: 48, speed: 29},
    rod:   {name: "Rod",       type: 'weapon', hands: 1, load: 5, min_dmg: 1, max_dmg: 3, dmg_type: 'magic',      bonus_stat: 'wiz', stunning: 32, accuracy: 12, range: 65, speed: 38},

};

  /*
_.each(unsort_weapons_bodies, (weapon, key) => {
    let acc_factor = (1 + 0.1 * weapon.accuracy);

    let load_bonus = weapon.hands === 2 ? 0 : 1;

    let load = Math.round(((weapon.min_dmg * 21 + weapon.max_dmg * 3 + weapon.stunning + weapon.range) / acc_factor) / (weapon.hands === 2 ? 15 : 10) - load_bonus);
    console.log(unsort_weapons_bodies[key].load === load, 'load', weapon.name,  unsort_weapons_bodies[key].load, load);

    let speed =
        Math.round((
            Math.sqrt(weapon.min_dmg * 11 * weapon.max_dmg * 7)
            + Math.sqrt(weapon.range)
            + Math.sqrt(weapon.stunning)
            + Math.sqrt(Math.sqrt(weapon.stunning * weapon.range))
                * acc_factor)
            - ((weapon.load + load_bonus) * (weapon.hands === 2 ? 1.5 : 1)));
     console.log(unsort_weapons_bodies[key].speed === speed, 'speed', weapon.name, unsort_weapons_bodies[key].speed, speed);
} );

  */

export const weapons_bodies_keys = _.sortBy(_.keys(unsort_weapons_bodies),
    (key) => (unsort_weapons_bodies[key].min_dmg + unsort_weapons_bodies[key].max_dmg) / unsort_weapons_bodies[key].speed); // .map(key => unsort_weapons_bodies[key]); //  _.sortBy(unsort_weapons_bodies, (weapon) => (weapon.min_dmg + weapon.max_dmg) / weapon.speed );

export const weapons_bodies = {};

_.each(weapons_bodies_keys, (key) => { weapons_bodies[key] = unsort_weapons_bodies[key]; });


  //   */

// export const weapons_bodies = unsort_weapons_bodies;

console.log('Average Weapon', calc_averages(weapons_bodies, ['load', 'speed', 'min_dmg', 'max_dmg', 'stunning', 'accuracy', 'range', 'hands']));
console.log('Average 1 Hand', calc_averages(_.filter(weapons_bodies, {'hands': 1}), ['load', 'speed', 'min_dmg', 'max_dmg', 'stunning', 'accuracy', 'range']));
console.log('Average 2 Hand', calc_averages(_.filter(weapons_bodies, {'hands': 2}), ['load', 'speed', 'min_dmg', 'max_dmg', 'stunning', 'accuracy', 'range']));

// weapons_bodies = _.sortBy(weapons_bodies, (weapon) => (weapon.min_dmg + weapon.max_dmg) / weapon.speed );

export const weapons_quality = {
    1: {name: "Old",      load: 0, min_dmg: 0, max_dmg: 1, stunning: 1, accuracy: 1, range: 0, speed: 1},
    2: {name: "Rusty",    load: 0, min_dmg: 0, max_dmg: 2, stunning: 1, accuracy: 2, range: 0, speed: 2},
    3: {name: "Standard", load: 0, min_dmg: 1, max_dmg: 3, stunning: 1, accuracy: 3, range: 0, speed: 3},
    4: {name: "Grete",    load: 0, min_dmg: 1, max_dmg: 4, stunning: 1, accuracy: 4, range: 0, speed: 4},
    5: {name: "Shiny",    load: 0, min_dmg: 2, max_dmg: 5, stunning: 1, accuracy: 5, range: 0, speed: 5},
    6: {name: "Godlike",  load: 0, min_dmg: 2, max_dmg: 6, stunning: 1, accuracy: 6, range: 0, speed: 6},
};

export const weapons_mods = {
    flat: {name: "Typical",       load: 0, min_dmg: 0, max_dmg: 0, stunning: 1, accuracy: 0, range: 0, speed: 0},
    min_dmg: {name: "Tuned",      load: 0, min_dmg: 3, max_dmg: 0, stunning: 1, accuracy: 0, range: 0, speed: 0},
    max_dmg: {name: "Sharped",    load: 0, min_dmg: 0, max_dmg: 3, stunning: 1, accuracy: 0, range: 0, speed: 0},
    all_dmg: {name: "Powerful",   load: 0, min_dmg: 1, max_dmg: 2, stunning: 1, accuracy: 0, range: 0, speed: 0},
    accuracy: {name: "Accurate",  load: 0, min_dmg: 0, max_dmg: 0, stunning: 1, accuracy: 3, range: 0, speed: 0},
    range:    {name: "Longed",    load: 0, min_dmg: 0, max_dmg: 0, stunning: 1, accuracy: 0, range: 3, speed: 0},
    speed:    {name: "Lighted",   load: 0, min_dmg: 0, max_dmg: 0, stunning: 1, accuracy: 0, range: 0, speed: -3},
    application: {name: "Handle", load: 0, min_dmg: 0, max_dmg: 0, stunning: 1, accuracy: 1, range: 1, speed: -1},
};


export const genWeapon = (level = 1) => {
    let body = _.cloneDeep(_.sample(weapons_bodies));
    let quality = weapons_quality[Math.floor(_.random(1, Math.sqrt(level)))];
    let mod = (level === 1) ? weapons_mods.flat : _.sample(weapons_mods);

    return combineWeapon(level, body, quality, mod);
};

export const combineWeapon = (level, body, quality = weapons_quality[1], mod = weapons_mods.flat) => {
    //console.log('Gen Weapon: ', level, body, quality, mod);
    let new_weapon = {
        name: _.trim(mod.name + ' ' + quality.name + ' ' + body.name),
        unsold: body.unsold ? body.unsold : false,
        mod_name: mod.name,
        quality_name: quality.name,
        body_name: body.name,
        type: body.type,
        hands: body.hands,
        load: quality.load + mod.load + body.load,
        min_dmg: quality.min_dmg + mod.min_dmg + body.min_dmg,// + level,
        max_dmg: quality.max_dmg + mod.max_dmg + body.max_dmg,// + level,
        dmg_type:  body.dmg_type,
        bonus_stat:  body.bonus_stat,
        stunning: quality.stunning + mod.stunning + body.stunning,// + level,
        accuracy: quality.accuracy + mod.accuracy + body.accuracy,// + level,
        range: quality.range + mod.range + body.range,
        speed: quality.speed + mod.speed + body.speed,
        level: level,
        interior: body.interior ? body.interior : false,
        cost: 0
    };

    /*
    _.each(new_weapon, (value, key) => {
        if (new_weapon[key] < 1) {
            if (key === 'speed') {
                new_weapon.level -= 1 - new_weapon[key];
            }
            else {
                new_weapon.level += 1 - new_weapon[key];
            }
            new_weapon[key] = 1;
        }
    });
    */

    new_weapon.cost = Math.floor(Math.sqrt(((new_weapon.min_dmg + new_weapon.max_dmg) * level * (new_weapon.accuracy + new_weapon.range) * 100) / (1 + new_weapon.load)));

    //console.log('New Weapon: ', level, body, quality, mod, new_weapon);

    return new_weapon;
};

export const free_hand = combineWeapon(0,
    {name: "Fist", interior: true, unsold: true, type: 'weapon', hands: 1, load: 0, min_dmg: 1, max_dmg: 2, dmg_type: 'crushing',   bonus_stat: 'str', stunning: 16, accuracy: 5, range: 1, speed: 20},
    {name: "",       load: 0, min_dmg: 0, max_dmg: 0, stunning: 0, accuracy: 0, range: 0, speed: 0},
    {name: "",       load: 0, min_dmg: 0, max_dmg: 0, stunning: 0, accuracy: 0, range: 0, speed: 0},
);

export const zero_weapon = combineWeapon(0,
    {name: "", interior: true, unsold: true, type: 'weapon', hands: 1, load: 0, min_dmg: 0, max_dmg: 0, dmg_type: 'crushing',   bonus_stat: 'str', stunning: 0, accuracy: 0, range: 0, speed: 0},
    {name: "",       load: 0, min_dmg: 0, max_dmg: 0, stunning: 0, accuracy: 0, range: 0, speed: 0},
    {name: "",       load: 0, min_dmg: 0, max_dmg: 0, stunning: 0, accuracy: 0, range: 0, speed: 0},
);
