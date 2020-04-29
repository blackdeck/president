
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
    store = gainCost(store, _.mapValues(buildings[item_key].profit, (base_profit) => base_profit * store.buildings[item_key].level * store.buildings[item_key].modifier));
    
    return store;
};

export const buyItem = (store, item_key) => {
    store.buildings[item_key].level++;
    return store;
};




export var buildings = {
    money1: {name: "Money1", tier: 1, type: 'money', base_cost: {'balances.money': 1,   'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.3,  profit: {'balances.money': 1},     cycle: 10,   text: 'text' },
    goods1: {name: "Goods1", tier: 1, type: 'goods', base_cost: {'balances.money': 5,   'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.3,  profit: {'balances.goods': 1},     cycle: 20,   text: 'text' },
    oil1:   {name: "Oil1",   tier: 1, type: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 10,   'balances.oil': 0},     cost_grows: 1.3,  profit: {'balances.oil': 1},       cycle: 30,   text: 'text' },
    money2: {name: "Money2", tier: 2, type: 'money', base_cost: {'balances.money': 0,   'balances.goods': 30,   'balances.oil': 0},     cost_grows: 1.3,  profit: {'balances.money': 40},   cycle: 50,   text: 'text' },
    goods2: {name: "Goods2", tier: 2, type: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 60},    cost_grows: 1.3,  profit: {'balances.goods': 50},   cycle: 100,  text: 'text' },
    oil2:   {name: "Oil2",   tier: 2, type: 'oil',   base_cost: {'balances.money': 2500,'balances.goods': 0,    'balances.oil': 0},     cost_grows: 1.3,  profit: {'balances.oil': 70},     cycle: 200,  text: 'text' },
    money3: {name: "Money3", tier: 3, type: 'money', base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 1000},  cost_grows: 1.3,  profit: {'balances.money': 2000}, cycle: 300,  text: 'text' },
    goods3: {name: "Goods3", tier: 3, type: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 2000, 'balances.oil': 0},     cost_grows: 1.3,  profit: {'balances.goods': 2500}, cycle: 600,  text: 'text' },
    oil3:   {name: "Oil3",   tier: 3, type: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 0,    'balances.oil': 25000}, cost_grows: 1.3,  profit: {'balances.oil': 3500},   cycle: 1200, text: 'text' },
};