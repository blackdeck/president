
import _ from 'lodash';

import {buildings, collectItem} from './buildings';

export const hire = (store, item_key) => {
    store.managers[item_key].hired = true;
    
    
    if (store.buildings[item_key].fullness >= buildings[item_key].cycle) {
        store = collectItem(store, item_key);
    }
    
    return store;
};


export var managers = {
    money1: {name: "Money1", location: 'earth', cost: {'balances.money': 10,     'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.money1.level == 0 },
    goods1: {name: "Goods1", location: 'earth', cost: {'balances.money': 50,     'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.goods1.level == 0 },
    oil1:   {name: "Oil1",   location: 'earth', cost: {'balances.money': 250,     'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.oil1.level == 0 },
    money2: {name: "Money2", location: 'earth', cost: {'balances.money': 1000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.money2.level == 0 },
    goods2: {name: "Goods2", location: 'earth', cost: {'balances.money': 5000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.goods2.level == 0 },
    oil2:   {name: "Oil2",   location: 'earth', cost: {'balances.money': 25000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.oil2.level == 0 },
    money3: {name: "Money3", location: 'earth', cost: {'balances.money': 100000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.money3.level == 0 },
    goods3: {name: "Goods3", location: 'earth', cost: {'balances.money': 500000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.goods3.level == 0 },
    oil3:   {name: "Oil3",   location: 'earth', cost: {'balances.money': 1000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.oil3.level == 0 },
    
    rocket:   {name: "Filon Musk", location: 'earth', cost: {'balances.money': 1000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.rocket.level == 0 },
    
    
    money1space:     {name: "Money1Space", location: 'space', cost: {'balances.money': 1000,     'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.money1space.level == 0 },
    materials1space: {name: "Goods1Space", location: 'space', cost: {'balances.money': 5000,     'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.materials1space.level == 0 },
    helium1space:    {name: "Oil1Space",   location: 'space', cost: {'balances.money': 25000,     'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.helium1space.level == 0 },
    money2space:     {name: "Money2Space", location: 'space', cost: {'balances.money': 100000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.money2space.level == 0 },
    materials2space: {name: "Goods2Space", location: 'space', cost: {'balances.money': 500000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.materials2space.level == 0 },
    helium2space:    {name: "Oil2Space",   location: 'space', cost: {'balances.money': 2500000,    'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.helium2space.level == 0 },
    money3space:     {name: "Money3Space", location: 'space', cost: {'balances.money': 10000000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.money3space.level == 0 },
    materials3space: {name: "Goods3Space", location: 'space', cost: {'balances.money': 50000000,   'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.materials3space.level == 0 },
    helium3space:    {name: "Oil3Space",   location: 'space', cost: {'balances.money': 100000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.helium3space.level == 0 },
    
    colonizer:       {name: "St. Anislav Lem", location: 'space', cost: {'balances.money': 100000000,  'balances.goods': 0,    'balances.oil': 0},      text: 'text', isHidden: (store) => store.buildings.colonizer.level == 0 },
    
    
    
};