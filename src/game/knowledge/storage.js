
import _ from 'lodash';

import {gainCost} from '../../bdcgin/Gin';

export const calcStorageCost = (store, item_key) => {
    // console.log(item_key, store.buildings, store.buildings[item_key]);
    
    return _.mapValues(storage[item_key].base_cost, (item_cost, key) => {
        
        //console.log(item_cost, buildings[item_key].cost_grows, store.buildings[item_key].level);
        // console.log(Math.pow(item_cost, buildings[item_key].cost_grows * store.buildings[item_key].level));
        if (store.storage[item_key].level > 0 && item_cost > 0) {
            return (item_cost * Math.pow(2, store.storage[item_key].level)).toFixed(0);
        }
        else {
            return item_cost;
        }
    });
};


export const calcStorageCapacity = (store, item_key) => {
    // console.log(item_key, buildings[item_key].profit, store.buildings[item_key].level);
    return _.mapValues(storage[item_key].capacity, (base_capacity) => base_capacity * store.storage[item_key].level * store.storage[item_key].modifier);
};


export const calcAllStorage = (store) => {
    let limits = {money: 10000, goods: 1000, oil: 100, materials: 1000, helium: 100};
    
    _.each(storage, (storage_item, key) => {
        _.each(calcStorageCapacity(store, key), (capacity, resource) => {
            limits[resource] += capacity;
        });
    });
    
    store.storage_limit = limits;
    
    return store;
    
};


export const buyStorage = (store, item_key) => {
    store.storage[item_key].level++;
    store = calcAllStorage(store);
    // store = gainCost(store, storage[item_key].capacity);
    return store;
};


export var storage = {
    money1: {name: "Bank",      location: 'earth', resource: 'money', base_cost: {'balances.money': 100, 'balances.goods': 0,  'balances.oil': 0},  capacity: {'money': 10000}, text: 'text', isHidden: (store) => store.buildings.money1.level == 0  },
    goods1: {name: "Warehouse", location: 'earth', resource: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 30, 'balances.oil': 0},  capacity: {'goods': 2000},  text: 'text', isHidden: (store) => store.buildings.goods1.level == 0  },
    oil1:   {name: "Tanker",    location: 'earth', resource: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 0,  'balances.oil': 10}, capacity: {'oil': 500},     text: 'text', isHidden: (store) => store.buildings.oil1.level == 0  },
    
    money1space:      {name: "Cluster", location: 'space', resource: 'money',     base_cost: {'special.rockets': 1, 'balances.money': 10000, 'balances.materials': 0,  'balances.helium': 0},  capacity: {'money': 10000},    text: 'text', isHidden: (store) => store.buildings.money1space.level == 0  },
    materials1space:  {name: "Dock",    location: 'space', resource: 'materials', base_cost: {'special.rockets': 1, 'balances.money': 0,     'balances.materials': 30, 'balances.helium': 0},  capacity: {'materials': 2000}, text: 'text', isHidden: (store) => store.buildings.materials1space.level == 0  },
    helium1space:     {name: "Chamber", location: 'space', resource: 'helium',    base_cost: {'special.rockets': 1, 'balances.money': 0,     'balances.materials': 0,  'balances.helium': 10}, capacity: {'helium': 500},     text: 'text', isHidden: (store) => store.buildings.helium1space.level == 0  },
    
};