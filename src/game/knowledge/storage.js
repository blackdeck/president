
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
    let limits = {money: 1000, goods: 100, oil: 10};
    
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
    money1: {name: "Bank",      resource: 'money', base_cost: {'balances.money': 100, 'balances.goods': 0,  'balances.oil': 0}, capacity: {'money': 1000}, text: 'text' },
    goods1: {name: "Warehouse", resource: 'goods', base_cost: {'balances.money': 0,   'balances.goods': 30, 'balances.oil': 0}, capacity: {'goods': 100}, text: 'text' },
    oil1:   {name: "Tanker",    resource: 'oil',   base_cost: {'balances.money': 0,   'balances.goods': 0,  'balances.oil': 5}, capacity: {'oil': 10},   text: 'text' },
    
};