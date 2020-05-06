
import _ from 'lodash';

import {isEnough, gainCost} from '../../bdcgin/Gin';
import {checkStorageVolume} from './storage';

export const calcBuildCost = (store, item_key) => {
    // console.log(item_key, store.buildings, store.buildings[item_key]);
    
    return _.mapValues(buildings[item_key].base_cost, (item_cost, key) => {
        
        let cost = item_cost * Math.pow(0.99, store.prestige);
        
        //console.log(item_cost, buildings[item_key].cost_grows, store.buildings[item_key].level);
        // console.log(Math.pow(item_cost, buildings[item_key].cost_grows * store.buildings[item_key].level));
        if (store.buildings[item_key].level > 0 && item_cost > 0) {
            return Math.ceil(cost * Math.pow(buildings[item_key].cost_grows, store.buildings[item_key].level));
        }
        else {
            return Math.ceil(cost);
        }
    });
};

export const calcBuildDuration = (store, item_key) => {
    return buildings[item_key].base_duration * (store.buildings[item_key].level + 1);
};

export const calcBuildPercent = (store, item_key) => {
    let task = _.find(store.constructing, {item_key: item_key});
    
    return ((store.frame - task.start_frame) * 100 / task.duration ).toFixed(0);
    
};


export const calcProfit = (store, item_key) => {
    return _.mapValues(buildings[item_key].profit, (base_profit) => base_profit * store.buildings[item_key].level * store.buildings[item_key].modifier);
};

export const collectItem = (store, item_key) => {
    // console.log(item_key, buildings[item_key].profit, store.buildings[item_key].level);
    store.buildings[item_key].fullness = 0;
    
    let cost = calcProfit(store, item_key);
    
    store = gainCost(store, checkStorageVolume(store, cost));
    
    return store;
};

export const buildItem = (store, item_key) => {
    
    store.buildings[item_key].busy = true;
    store.constructing.push({item_type: 'buildings', item_key: item_key, start_frame: store.frame, duration: calcBuildDuration(store, item_key)});
    
    // store.buildings[item_key].level++;
    return store;
};

export const finishItem = (store, item_key) => {
    store.buildings[item_key].level++;
    store.buildings[item_key].busy = false;
    return store;
};




export var buildings = {
    money1: {name: "Bank",          location: 'earth', tier: 1, type: 'money', base_cost: {'balances.money': 1,   'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.4,  profit: {'balances.money': 1},    base_duration: 10, cycle: 10,  text: 'text', isHidden: (store) => false },
    goods1: {name: "Farm",          location: 'earth', tier: 1, type: 'goods', base_cost: {'balances.money': 5,   'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.41, profit: {'balances.goods': 1},    base_duration: 20, cycle: 20,  text: 'text', isHidden: (store) => store.buildings.money1.level == 0 },
    oil1:   {name: "Pumpjack",      location: 'earth', tier: 1, type: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 10,   'balances.oil': 0},     cost_grows: 1.42, profit: {'balances.oil': 1},      base_duration: 30, cycle: 30,  text: 'text', isHidden: (store) => store.buildings.goods1.level == 0 },
    money2: {name: "Stock",         location: 'earth', tier: 2, type: 'money', base_cost: {'balances.money': 0,   'balances.goods': 30,   'balances.oil': 0},     cost_grows: 1.43, profit: {'balances.money': 40},   base_duration: 40, cycle: 50,  text: 'text', isHidden: (store) => store.buildings.oil1.level == 0 },
    goods2: {name: "Factory",       location: 'earth', tier: 2, type: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 100},   cost_grows: 1.44, profit: {'balances.goods': 50},   base_duration: 50, cycle: 100, text: 'text', isHidden: (store) => store.buildings.money2.level == 0 },
    oil2:   {name: "Oil Platform",  location: 'earth', tier: 2, type: 'oil',   base_cost: {'balances.money': 2500,'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.45, profit: {'balances.oil': 70},     base_duration: 60, cycle: 200, text: 'text', isHidden: (store) => store.buildings.goods2.level == 0 },
    money3: {name: "Invest Pound",  location: 'earth', tier: 3, type: 'money', base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 1500},  cost_grows: 1.46, profit: {'balances.money': 2000}, base_duration: 70, cycle: 300, text: 'text', isHidden: (store) => store.buildings.oil2.level == 0 },
    goods3: {name: "Plant",         location: 'earth', tier: 3, type: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 20000,'balances.oil': 0},     cost_grows: 1.47, profit: {'balances.goods': 2500}, base_duration: 80, cycle: 600, text: 'text', isHidden: (store) => store.buildings.money3.level == 0 },
    oil3:   {name: "Oil Refinery",  location: 'earth', tier: 3, type: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 30000}, cost_grows: 1.48, profit: {'balances.oil': 3000},   base_duration: 90, cycle: 900, text: 'text', isHidden: (store) => store.buildings.goods3.level == 0 },
    
    rocket: {name: "Spaceport",     location: 'earth', tier: 10, type: 'rockets',base_cost: {'balances.money': 300000,   'balances.goods': 100000,    'balances.oil': 30000}, cost_grows: 1.49,  profit: {'special.rockets': 1},   base_duration: 1000, cycle: 1200, text: 'text', isHidden: (store) => false },
    
    
    money1space:     {name: "Space Elevator",   location: 'space', tier: 4, type: 'materials', base_cost: {'special.rockets': 1, 'balances.money': 100000,     'balances.materials': 0,    'balances.helium': 0},     cost_grows: 1.5,  profit: {'balances.materials': 1},    base_duration: 110, cycle: 60,   text: 'text', isHidden: (store) => false },
    materials1space: {name: "Helium Mine",      location: 'space', tier: 4, type: 'helium',    base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 5,    'balances.helium': 0},     cost_grows: 1.51, profit: {'balances.helium': 1},       base_duration: 120, cycle: 30,   text: 'text', isHidden: (store) => store.buildings.money1space.level == 0 },
    helium1space:    {name: "Fusion Reactor",   location: 'space', tier: 4, type: 'money',     base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 0,    'balances.helium': 10},    cost_grows: 1.52, profit: {'balances.money': 1},        base_duration: 130, cycle: 10,   text: 'text', isHidden: (store) => store.buildings.materials1space.level == 0 },
    money2space:     {name: "Data Node",        location: 'space', tier: 5, type: 'money',     base_cost: {'special.rockets': 1, 'balances.money': 1250000,    'balances.materials': 0,    'balances.helium': 0},     cost_grows: 1.53, profit: {'balances.money': 40},       base_duration: 140, cycle: 100,  text: 'text', isHidden: (store) => store.buildings.helium1space.level == 0 },
    materials2space: {name: "Robotic Factory",  location: 'space', tier: 5, type: 'materials', base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 200,  'balances.helium': 0},     cost_grows: 1.54, profit: {'balances.materials': 50},   base_duration: 150, cycle: 200,  text: 'text', isHidden: (store) => store.buildings.money2space.level == 0 },
    helium2space:    {name: "Accelerator",      location: 'space', tier: 5, type: 'helium',    base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 0,    'balances.helium': 300},   cost_grows: 1.55, profit: {'balances.helium': 70},      base_duration: 160, cycle: 400,  text: 'text', isHidden: (store) => store.buildings.materials2space.level == 0 },
    money3space:     {name: "Helium Condenser", location: 'space', tier: 6, type: 'helium',    base_cost: {'special.rockets': 1, 'balances.money': 15000000,   'balances.materials': 0,    'balances.helium': 0},     cost_grows: 1.56, profit: {'balances.helium': 200},     base_duration: 170, cycle: 600,  text: 'text', isHidden: (store) => store.buildings.helium2space.level == 0 },
    materials3space: {name: "Space Hotel",      location: 'space', tier: 6, type: 'money',     base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 5000, 'balances.helium': 0},     cost_grows: 1.57, profit: {'balances.money': 7500},     base_duration: 180, cycle: 1200, text: 'text', isHidden: (store) => store.buildings.money3space.level == 0 },
    helium3space:    {name: "Synthesizer",      location: 'space', tier: 6, type: 'materials', base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 0,    'balances.helium': 10000}, cost_grows: 1.58, profit: {'balances.materials': 7500}, base_duration: 190, cycle: 1800, text: 'text', isHidden: (store) => store.buildings.materials3space.level == 0 },
    
    colonizer:       {name: "Colonizer",  location: 'space', tier: 10, type: 'colonizer', base_cost: {'special.rockets': 1, 'balances.money': 3000000,   'balances.materials': 1000000,    'balances.helium': 300000}, cost_grows: 1.59,  profit: {'special.colonizer': 1},   base_duration: 2000, cycle: 1200, text: 'text', isHidden: (store) => false },
    
    
};