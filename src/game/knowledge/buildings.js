
import _ from 'lodash';

import {isEnough, gainCost} from '../../bdcgin/Gin';

export const calcBuildCost = (store, item_key) => {
    // console.log(item_key, store.buildings, store.buildings[item_key]);
    
    return _.mapValues(buildings[item_key].base_cost, (item_cost, key) => {
        
        //console.log(item_cost, buildings[item_key].cost_grows, store.buildings[item_key].level);
        // console.log(Math.pow(item_cost, buildings[item_key].cost_grows * store.buildings[item_key].level));
        if (store.buildings[item_key].level > 0 && item_cost > 0) {
            return (item_cost * Math.pow(buildings[item_key].cost_grows, store.buildings[item_key].level)).toFixed(0);
        }
        else {
            return item_cost;
        }
    });
};


export const collectItem = (store, item_key) => {
    // console.log(item_key, buildings[item_key].profit, store.buildings[item_key].level);
    store.buildings[item_key].fullness = 0;
    
    let cost = _.mapValues(buildings[item_key].profit, (base_profit) => base_profit * store.buildings[item_key].level * store.buildings[item_key].modifier);
    
    console.log(cost);
    
    store = gainCost(store, _.mapValues(cost, (resource, key) => (buildings[item_key].type in store.storage_limit) ? Math.min(resource, store.storage_limit[buildings[item_key].type] - store.balances[buildings[item_key].type]) : resource));
    
    return store;
};

export const buyItem = (store, item_key) => {
    store.buildings[item_key].level++;
    return store;
};




export var buildings = {
    money1: {name: "Money1", location: 'earth', tier: 1, type: 'money', base_cost: {'balances.money': 1,   'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.4,  profit: {'balances.money': 1},     cycle: 10,   text: 'text', isHidden: (store) => false },
    goods1: {name: "Goods1", location: 'earth', tier: 1, type: 'goods', base_cost: {'balances.money': 5,   'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.41, profit: {'balances.goods': 1},     cycle: 20,   text: 'text', isHidden: (store) => store.buildings.money1.level == 0 },
    oil1:   {name: "Oil1",   location: 'earth', tier: 1, type: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 10,   'balances.oil': 0},     cost_grows: 1.42, profit: {'balances.oil': 1},       cycle: 30,   text: 'text', isHidden: (store) => store.buildings.goods1.level == 0 },
    money2: {name: "Money2", location: 'earth', tier: 2, type: 'money', base_cost: {'balances.money': 0,   'balances.goods': 30,   'balances.oil': 0},     cost_grows: 1.43, profit: {'balances.money': 40},   cycle: 50,   text: 'text', isHidden: (store) => store.buildings.oil1.level == 0 },
    goods2: {name: "Goods2", location: 'earth', tier: 2, type: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 100},   cost_grows: 1.44, profit: {'balances.goods': 50},   cycle: 100,  text: 'text', isHidden: (store) => store.buildings.money2.level == 0 },
    oil2:   {name: "Oil2",   location: 'earth', tier: 2, type: 'oil',   base_cost: {'balances.money': 2500,'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.45, profit: {'balances.oil': 70},     cycle: 200,  text: 'text', isHidden: (store) => store.buildings.goods2.level == 0 },
    money3: {name: "Money3", location: 'earth', tier: 3, type: 'money', base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 1500},  cost_grows: 1.46, profit: {'balances.money': 2000}, cycle: 300,  text: 'text', isHidden: (store) => store.buildings.oil2.level == 0 },
    goods3: {name: "Goods3", location: 'earth', tier: 3, type: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 20000,'balances.oil': 0},     cost_grows: 1.47, profit: {'balances.goods': 2500}, cycle: 600,  text: 'text', isHidden: (store) => store.buildings.money3.level == 0 },
    oil3:   {name: "Oil3",   location: 'earth', tier: 3, type: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 30000}, cost_grows: 1.48, profit: {'balances.oil': 3000},   cycle: 900, text: 'text', isHidden: (store) => store.buildings.goods3.level == 0 },
    
    rocket: {name: "Spaceport", location: 'earth', tier: 4, type: 'rockets',base_cost: {'balances.money': 1000000,   'balances.goods': 100000,    'balances.oil': 10000}, cost_grows: 1.49,  profit: {'special.rockets': 1},   cycle: 1200, text: 'text', isHidden: (store) => false },
    
    
    money1space:     {name: "Money1",     location: 'space', tier: 1, type: 'materials', base_cost: {'special.rockets': 1, 'balances.money': 100000,     'balances.materials': 0,    'balances.helium': 0},     cost_grows: 1.5,  profit: {'balances.materials': 1},    cycle: 60,   text: 'text', isHidden: (store) => false },
    materials1space: {name: "Materials1", location: 'space', tier: 1, type: 'helium',    base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 5,    'balances.helium': 0},     cost_grows: 1.51, profit: {'balances.helium': 1},       cycle: 30,   text: 'text', isHidden: (store) => store.buildings.money1space.level == 0 },
    helium1space:    {name: "Helium1",    location: 'space', tier: 1, type: 'money',     base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 0,    'balances.helium': 10},    cost_grows: 1.52, profit: {'balances.money': 1},        cycle: 10,   text: 'text', isHidden: (store) => store.buildings.materials1space.level == 0 },
    money2space:     {name: "Money2",     location: 'space', tier: 2, type: 'money',     base_cost: {'special.rockets': 1, 'balances.money': 12500000,   'balances.materials': 0,    'balances.helium': 0},     cost_grows: 1.53, profit: {'balances.money': 40},       cycle: 100,  text: 'text', isHidden: (store) => store.buildings.helium1space.level == 0 },
    materials2space: {name: "Materials2", location: 'space', tier: 2, type: 'materials', base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 200,  'balances.helium': 0},     cost_grows: 1.54, profit: {'balances.materials': 50},   cycle: 200,  text: 'text', isHidden: (store) => store.buildings.money2space.level == 0 },
    helium2space:    {name: "Helium2",    location: 'space', tier: 2, type: 'helium',    base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 0,    'balances.helium': 300},   cost_grows: 1.55, profit: {'balances.helium': 70},      cycle: 400,  text: 'text', isHidden: (store) => store.buildings.materials2space.level == 0 },
    money3space:     {name: "Money3",     location: 'space', tier: 3, type: 'helium',    base_cost: {'special.rockets': 1, 'balances.money': 1500000000, 'balances.materials': 0,    'balances.helium': 0},     cost_grows: 1.56, profit: {'balances.helium': 200},     cycle: 600,  text: 'text', isHidden: (store) => store.buildings.helium2space.level == 0 },
    materials3space: {name: "Materials3", location: 'space', tier: 3, type: 'money',     base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 5000, 'balances.helium': 0},     cost_grows: 1.57, profit: {'balances.money': 7500},     cycle: 1200, text: 'text', isHidden: (store) => store.buildings.money3space.level == 0 },
    helium3space:    {name: "Helium3",    location: 'space', tier: 3, type: 'materials', base_cost: {'special.rockets': 1, 'balances.money': 0,          'balances.materials': 0,    'balances.helium': 10000}, cost_grows: 1.58, profit: {'balances.materials': 7500}, cycle: 1800, text: 'text', isHidden: (store) => store.buildings.materials3space.level == 0 },
    
    colonizer:       {name: "Colonizer",  location: 'space', tier: 4, type: 'colonizer', base_cost: {'special.rockets': 1, 'balances.money': 1000000,   'balances.materials': 100000,    'balances.helium': 10000}, cost_grows: 1.59,  profit: {'special.colonizer': 1},   cycle: 1200, text: 'text', isHidden: (store) => false },
    
    
};