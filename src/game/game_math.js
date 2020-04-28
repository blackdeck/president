
import _ from 'lodash';

import {consumables} from './knowledge/consumables';
import {getWeapon, getArmor} from './equipment';


export const checkUnitStats = (unit) => {
    let level = unit.level;

    let hp = ((level + unit.stats.vit) * 5) - 5;
    unit.max_hp = hp;
    unit.hp = Math.min(hp, unit.max_hp);

    let sp = ((level + unit.stats.str) * 3) - 3;
    unit.max_sp = sp;
    unit.sp = Math.min(sp, unit.max_sp);

    let mp = ((level + unit.stats.wiz) * 2) - 2;
    unit.max_mp = mp;
    unit.mp = Math.min(mp, unit.max_mp);

    let poise = level + unit.stats.vit + unit.armor.stability + _.get(unit, 'left_hand.stability', 0) + (unit, 'right_hand.stability', 0);
    unit.max_poise = poise;
    unit.poise = Math.min(poise, unit.max_poise);

    return unit;
};

export const getAttackProb = (store, params) => {
    let attack = 10 + getWeapon(store, params.attacker).accuracy + store[params.attacker].stats.int;
    let def = 10 + store[params.defender].stats.dex;
    let ratio = (attack / def);
    //console.log(attack, def, ratio, 50 * ratio);
    return 50 * ratio;
};


export const hit = (store, attacker, defender, dmg, dmg_type) => {

    const raw = (dmg) => {
        return dmg;
    };

    const physical = (dmg) => {
        let def = _.random(0, store[defender].armor.absorption);
        return Math.max(1, dmg - def);
    };

    const magical = (dmg) => {
        let def = _.random(0, store[defender].armor.resistance + store[defender].stats.wiz);
        return Math.max(1, dmg - def);
    };

    switch (dmg_type) {
        case 'crushing':
            dmg = physical(dmg);
            break;
        case 'cutting':
            dmg = physical(dmg);
            break;
        case 'pierce':
            dmg = physical(dmg);
            break;
        case 'poison':
            dmg = raw(dmg);
            break;
        case 'magic':
            dmg = magical(dmg);
            break;
        case 'fire':
            dmg = magical(dmg);
            break;
        case 'cold':
            dmg = magical(dmg);
            break;
        case 'dark':
            dmg = magical(dmg);
            break;
        case 'light':
            dmg = magical(dmg);
            break;
        default:
            console.log('Unknown damage type: ' + dmg_type);
            console.log(attacker, defender, dmg, dmg_type);
    }

    return dmg;
};


export const getAttackDelay = (store, params) => {
    return getActionDelay(store, params.attacker, getWeapon(store, params.attacker).speed);
};

export const attack = (store, params) => {
    let attacker_weapon = getWeapon(store, params.attacker);
    
    //store[params.attacker].action.timer += getActionDelay(store, params.attacker, attacker_weapon.speed);

    if (store[params.defender].action.name === 'roll' || store[params.defender].action.name === 'flip') {
        store.chat.unshift({text: params.defender + " Roll against attack"});
        return store;
    }
    if (store[params.defender].action.name === 'block') {
        store.chat.unshift({text: params.defender + " Block against attack"});
        return store;
    }
    if (store[params.defender].action.name === 'parry') {
        store.chat.unshift({text: params.defender + " Parry against attack"});
        store[params.defender].action.timer = 0;
        store[params.defender].action.name = null;
        store[params.attacker].action.timer += 20;
        return store;
    }
    if (store.target.effects.shield > 0) {
        store.chat.unshift({text: params.defender + " Block by Ice"});
        store.target.effects.shield--;
        return store;
    }

    let Prob = getAttackProb(store, params);
    if (_.random(0, 100) < Prob) {
        console.log();
        let bonus_stat = store[params.attacker].stats[attacker_weapon.bonus_stat];
        let atk = _.random(attacker_weapon.min_dmg, attacker_weapon.max_dmg + bonus_stat);
        let dmg = hit(store, params.attacker, params.defender, atk, attacker_weapon.dmg_type);

        store[params.defender].hp -= dmg;
        store[params.defender].poise -= dmg;

        store = stun(store, params);

        store = params.onHit(store, dmg);
    }
    else {
        store = params.onMiss(store, Prob);
    }
    return store;
};

export const stun = (store, params) => {
    store[params.defender].action.timer += Math.max(0, getWeapon(store, params.attacker).stunning - (_.random(0, getArmor(store, params.defender).stability + store[params.defender].stats.vit)));

    return store;
};

export const getLoad = (unit) => {
    let load = unit.left_hand.load + unit.right_hand.load + unit.armor.load;

    _.each(unit.belt, (item) => { load += consumables[item].load; });
    _.each(unit.equipment, (item) => { load += item.load; });

    return load;
};

export const getMaxLoad = (unit) => {
    return 10 * unit.stats.str;
//    return 50 + (10 * unit.stats.str);
};

export const getActionDelay = (store, unit_key, base) => {
    return Math.max(1, base + getArmor(store, unit_key).delay - store[unit_key].stats.dex + store[unit_key].effects.freeze);
};

export const getRangeBetween = (store) => {
    return store.battleground.target - store.battleground.player;
};

export const isTargetInRange = (store, range) => {
    //console.log('isTargetInRange', range, getRangeBetween(store), range >= getRangeBetween(store));
    return range >= getRangeBetween(store);
};

export const blink = (store, long) => {
    //console.log('blink attempt ', long);

    let old_point = store.battleground.player;
    let new_point = null;
    let target_point = store.battleground.target;

    let min = Math.max(0, old_point - long);
    let max = Math.min(100, old_point + long);

    do {
        new_point = _.random(min, max);
        //console.log('point generation attempt', new_point);
    }
    while(new_point === old_point || new_point === target_point);

    store.battleground.player = new_point;

    //console.log(old_point, min, max, new_point);

    return store;
};

