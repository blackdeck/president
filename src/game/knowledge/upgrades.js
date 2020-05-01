
import _ from 'lodash';

import {gainCost} from '../../bdcgin/Gin';

import {storage, calcAllStorage} from '../knowledge/storage';


export const calcUpgradeCost = (store, item_key) => {
    // console.log(item_key, store.buildings, store.buildings[item_key]);
    
    return _.mapValues(upgrades[item_key].base_cost, (item_cost, key) => {
        
        //console.log(item_cost, buildings[item_key].cost_grows, store.buildings[item_key].level);
        // console.log(Math.pow(item_cost, buildings[item_key].cost_grows * store.buildings[item_key].level));
        if (store.upgrades[item_key].level > 0 && item_cost > 0) {
            return (item_cost * Math.pow(2, store.upgrades[item_key].level)).toFixed(0);
        }
        else {
            return item_cost;
        }
    });
};


export const upgrade = (store, item_key) => {
    store.upgrades[item_key].level++;
    // _.each(upgrades[item_key].affected, (building) => { store.buildings[building].modifier++; });
    
    store = gainCost(store, upgrades[item_key].affected);
    store = calcAllStorage(store);
    
    return store;
};


export var upgrades = {
    storageMoneyUp: {name: "storageMoneyUp", location: 'earth', affected: {'storage.money1.modifier': 1},  base_cost: {'balances.money': 0,      'balances.goods': 100, 'balances.oil': 10},     text: 'text' },
    storageGoodsUp: {name: "storageGoodsUp", location: 'earth', affected: {'storage.goods1.modifier': 1},  base_cost: {'balances.money': 1000,   'balances.goods': 0,   'balances.oil': 10},     text: 'text' },
    storageOilUp: {name: "storageOilUp",     location: 'earth', affected: {'storage.oil1.modifier': 1},    base_cost: {'balances.money': 1000,   'balances.goods': 100, 'balances.oil': 0},      text: 'text' },
    
    storageSpaceMoneyUp:     {name: "storageSpaceMoneyUp",     location: 'space', affected: {'storage.money1space.modifier': 1},     base_cost: {'balances.money': 0,      'balances.materials': 100, 'balances.helium': 10},     text: 'text' },
    storageSpaceMaterialsUp: {name: "storageSpaceMaterialsUp", location: 'space', affected: {'storage.materials1space.modifier': 1}, base_cost: {'balances.money': 100000,   'balances.materials': 0,   'balances.helium': 10},     text: 'text' },
    storageSpaceHeliumUp:    {name: "storageSpaceHeliumUp",    location: 'space', affected: {'storage.helium1space.modifier': 1},    base_cost: {'balances.money': 100000,   'balances.materials': 100, 'balances.helium': 0},      text: 'text' },
    
    tier1Up:    {name: "Tier1Up", location: 'earth', affected: {'buildings.money1.modifier': 1, 'buildings.goods1.modifier': 1, 'buildings.oil1.modifier': 1},    base_cost: {'balances.money': 1000,      'balances.goods': 100,    'balances.oil': 10},      text: 'text' },
    tier2Up:    {name: "Tier2Up", location: 'earth', affected: {'buildings.money2.modifier': 1, 'buildings.goods2.modifier': 1, 'buildings.oil2.modifier': 1},    base_cost: {'balances.money': 10000,     'balances.goods': 1000,   'balances.oil': 100},      text: 'text' },
    tier3Up:    {name: "Tier3Up", location: 'earth', affected: {'buildings.money3.modifier': 1, 'buildings.goods3.modifier': 1, 'buildings.oil3.modifier': 1},    base_cost: {'balances.money': 100000,    'balances.goods': 10000,  'balances.oil': 1000},      text: 'text' },
    
    indMoneyUP: {name: "IndMoneyUP", location: 'earth', affected: {'buildings.money1.modifier': 1, 'buildings.money2.modifier': 1, 'buildings.money3.modifier': 1}, base_cost: {'balances.money': 1000,      'balances.goods': 100,    'balances.oil': 10},      text: 'text' },
    indGoodsUP: {name: "IndGoodsUP", location: 'earth', affected: {'buildings.goods1.modifier': 1, 'buildings.goods2.modifier': 1, 'buildings.goods3.modifier': 1}, base_cost: {'balances.money': 10000,     'balances.goods': 1000,   'balances.oil': 100},      text: 'text' },
    indOilUP:   {name: "IndOilUP",   location: 'earth', affected: {'buildings.oil1.modifier': 1,   'buildings.oil2.modifier': 1,   'buildings.oil3.modifier': 1},       base_cost: {'balances.money': 100000,    'balances.goods': 10000,  'balances.oil': 1000},      text: 'text' },
    
    indSpaceMoneyUP:     {name: "IndSpaceMoneyUP",     location: 'space', affected: {'buildings.money1space.modifier': 1,     'buildings.money2space.modifier': 1,     'buildings.money3space.modifier': 1},     base_cost: {'balances.money': 100000,      'balances.materials': 100,    'balances.helium': 10},      text: 'text' },
    indSpaceMaterialsUP: {name: "IndSpaceMaterialsUP", location: 'space', affected: {'buildings.materials1space.modifier': 1, 'buildings.materials2space.modifier': 1, 'buildings.materials3space.modifier': 1}, base_cost: {'balances.money': 1000000,     'balances.materials': 1000,   'balances.helium': 100},      text: 'text' },
    indSpaceHeliumUP:    {name: "IndSpaceHeliumUP",    location: 'space', affected: {'buildings.helium1space.modifier': 1,    'buildings.helium2space.modifier': 1,    'buildings.helium3space.modifier': 1},    base_cost: {'balances.money': 10000000,    'balances.materials': 10000,  'balances.helium': 1000},      text: 'text' },
    
};