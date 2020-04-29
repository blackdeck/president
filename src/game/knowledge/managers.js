
import _ from 'lodash';

import {buildings, collectItem} from '../knowledge/buildings';

export const hire = (store, item_key) => {
    store.managers[item_key].hired = true;
    
    
    if (store.buildings[item_key].fullness >= buildings[item_key].cycle) {
        store = collectItem(store, item_key);
    }
    
    return store;
};


export var managers = {
    money1: {name: "Money1", cost: {'balances.money': 100,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    goods1: {name: "Goods1", cost: {'balances.money': 200,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    oil1:   {name: "Oil1",   cost: {'balances.money': 300,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    money2: {name: "Money2", cost: {'balances.money': 1000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    goods2: {name: "Goods2", cost: {'balances.money': 2000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    oil2:   {name: "Oil2",   cost: {'balances.money': 3000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    money3: {name: "Money3", cost: {'balances.money': 10000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    goods3: {name: "Goods3", cost: {'balances.money': 50000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    oil3:   {name: "Oil3",   cost: {'balances.money': 100000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
};