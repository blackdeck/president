

import _ from 'lodash';


import {free_hand, zero_weapon} from './models/weapons';


export const getWeapon = (store, unit_key) => {
    let weapons = _.filter([store[unit_key].left_hand, store[unit_key].right_hand], (item) => item.type !== 'shield' && !item.interior);

    //console.log(store[unit_key].left_hand, store[unit_key].right_hand);

    if (weapons.length === 0) return free_hand; //zero_weapon;
    if (weapons.length === 1) return weapons[0];

    let total_weapon = _.clone(zero_weapon);

    total_weapon.name = weapons[0].name + ' and ' + weapons[1].name;
    total_weapon.hands = 2;
    total_weapon.accuracy = Math.min(weapons[0].accuracy, weapons[1].accuracy);
    total_weapon.range = Math.min(weapons[0].range, weapons[1].range);

    //console.log('getWeapon', unit_key, weapons, total_weapon);

    _.each(weapons, (weapon) => {
        _.each(['load', 'min_dmg', 'max_dmg', 'stunning', 'speed', 'cost'], (stat) => { total_weapon[stat] += weapon[stat]; });
    });

    //console.log('total_weapon', unit_key, weapons, total_weapon);

    return total_weapon;
};

export const getArmor = (store, unit_key) => {
    let shields = _.filter([store[unit_key].left_hand, store[unit_key].right_hand], (item) => item.type === 'shield');

    //console.log(store[unit_key].left_hand, store[unit_key].right_hand);

    if (shields.length === 0) return store[unit_key].armor;

    let total_armor = _.clone(store[unit_key].armor);

    //console.log('getArmor', unit_key, shields, total_armor);

    _.each(shields, (shield) => {
        _.each(['load', 'delay', 'absorption', 'resistance', 'stability'], (stat) => { total_armor[stat] += shield[stat]; });
    });

    //console.log('total_armor', unit_key, shields, total_armor);

    return total_armor;
};

export const getBeltForRightHand = (store, unit_key) => {
    let fit = store[unit_key].right_hand.interior
                ? store[unit_key].equipment
                : _.concat(free_hand, _.filter(store[unit_key].equipment, (item) => item.hands === 1));
    //console.log(store, unit_key, store[unit_key].equipment);
    return _.concat([store[unit_key].right_hand], fit);
};
export const getBeltForLeftHand = (store, unit_key) => {
    //console.log(unit_key, store[unit_key]);
    let fit = store[unit_key].left_hand.interior
        ? store[unit_key].equipment
        : _.concat(free_hand, _.filter(store[unit_key].equipment, (item) => item.hands === 1));
    //console.log(unit_key, store[unit_key].equipment, store[unit_key].left_hand, _.concat([store[unit_key].left_hand], store[unit_key].equipment));
    return _.concat([store[unit_key].left_hand], fit);
};
