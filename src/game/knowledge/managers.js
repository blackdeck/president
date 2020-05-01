
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
    money1: {name: "Money1", location: 'earth', cost: {'balances.money': 10,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    goods1: {name: "Goods1", location: 'earth', cost: {'balances.money': 50,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    oil1:   {name: "Oil1",   location: 'earth', cost: {'balances.money': 250,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    money2: {name: "Money2", location: 'earth', cost: {'balances.money': 1000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    goods2: {name: "Goods2", location: 'earth', cost: {'balances.money': 5000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    oil2:   {name: "Oil2",   location: 'earth', cost: {'balances.money': 25000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    money3: {name: "Money3", location: 'earth', cost: {'balances.money': 100000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    goods3: {name: "Goods3", location: 'earth', cost: {'balances.money': 500000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    oil3:   {name: "Oil3",   location: 'earth', cost: {'balances.money': 1000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    
    rocket:   {name: "Filon Musk", location: 'earth', cost: {'balances.money': 1000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    
    
    money1space:     {name: "Money1Space", location: 'space', cost: {'balances.money': 100,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    materials1space: {name: "Goods1Space", location: 'space', cost: {'balances.money': 500,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    helium1space:    {name: "Oil1Space",   location: 'space', cost: {'balances.money': 2500,     'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    money2space:     {name: "Money2Space", location: 'space', cost: {'balances.money': 10000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    materials2space: {name: "Goods2Space", location: 'space', cost: {'balances.money': 50000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    helium2space:    {name: "Oil2Space",   location: 'space', cost: {'balances.money': 250000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    money3space:     {name: "Money3Space", location: 'space', cost: {'balances.money': 1000000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    materials3space: {name: "Goods3Space", location: 'space', cost: {'balances.money': 5000000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    helium3space:    {name: "Oil3Space",   location: 'space', cost: {'balances.money': 10000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    
    colonizer:       {name: "St. Anislav Lem", location: 'space', cost: {'balances.money': 10000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text' },
    
    
    
};