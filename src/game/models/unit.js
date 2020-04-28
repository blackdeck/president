

import _ from 'lodash';

import {checkUnitStats} from '../game_math';

import {free_armor} from './armors';
import {free_hand} from './weapons';


export const effects_0 = {curse: 0, shield: 0, nightmare: 0, poison: 0, regen: 0, rage: 0, fire: 0, freeze: 0, fright: 0, firestorm: 0};

export const default_unit = {
    name: '',
    money: 0,
    level: 1,
    expr: 0,
    bonus_points: 0,
    bonus_levels: 0,

    hp: 1,
    max_hp: 1,
    sp: 1,
    max_sp: 1,
    mp: 1,
    max_mp: 1,
    poise: 1,
    max_poise: 1,

    classes: {
        warrior: 0,
        mage: 0,
        evangelist: 0,
        prophet: 0,
        nomad: 0
    },
    stats: {
        str: 5,
        dex: 5,
        wiz: 5,
        int: 5,
        vit: 5
    },
    belt: [],
    equipment: [],
    right_hand: free_hand,
    left_hand: free_hand,
    //weapon: null,
    armor: free_armor,

    action: {
        name: null,
        type: null,
        params: {},
        timer: 0
    },

    effects: effects_0
};


export const genUnit = (level) => {
    let unit = _.cloneDeep(default_unit);
    unit.level = level;
    return checkUnitStats(unit);
};