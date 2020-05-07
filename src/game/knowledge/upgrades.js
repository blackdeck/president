
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
    allEarth:    {name: "Earth Reform", location: 'earth', affected: {'buildings.money1.modifier': 1, 'buildings.goods1.modifier': 1, 'buildings.oil1.modifier': 1, 'buildings.money2.modifier': 1, 'buildings.goods2.modifier': 1, 'buildings.oil2.modifier': 1, 'buildings.money3.modifier': 1, 'buildings.goods3.modifier': 1, 'buildings.oil3.modifier': 1},                                                                    base_cost: {'balances.money': 1000},       text: 'text', isHidden: (store) => store.buildings.money1.level == 0},
    allSpace:    {name: "Space Reform", location: 'space', affected: {'buildings.money1space.modifier': 1, 'buildings.materials1space.modifier': 1, 'buildings.helium1space.modifier': 1, 'buildings.money2space.modifier': 1, 'buildings.materials2space.modifier': 1, 'buildings.helium2space.modifier': 1, 'buildings.money3space.modifier': 1, 'buildings.materials3space.modifier': 1, 'buildings.helium3space.modifier': 1},  base_cost: {'balances.money': 100000},     text: 'text', isHidden: (store) => store.buildings.money1space.level == 0},
    
    storageMoneyUp: {name: "Money Storage Optimisation", location: 'earth', affected: {'storage.money1.modifier': 1},  base_cost: {'balances.money': 0,      'balances.goods': 300, 'balances.oil': 100},    text: 'text', isHidden: (store) => store.storage.money1.level == 0 },
    storageGoodsUp: {name: "Goods Storage Optimisation", location: 'earth', affected: {'storage.goods1.modifier': 1},  base_cost: {'balances.money': 1000,   'balances.goods': 0,   'balances.oil': 100},    text: 'text', isHidden: (store) => store.storage.goods1.level == 0 },
    storageOilUp: {name: "Oil Storage Optimisation",     location: 'earth', affected: {'storage.oil1.modifier': 1},    base_cost: {'balances.money': 1000,   'balances.goods': 300, 'balances.oil': 0},      text: 'text', isHidden: (store) => store.storage.oil1.level == 0 },
    
    storageSpaceMoneyUp:     {name: "Space Money Storage Optimisation",     location: 'space', affected: {'storage.money1space.modifier': 1},     base_cost: {'balances.money': 0,      'balances.materials': 300, 'balances.helium': 100},     text: 'text', isHidden: (store) => store.storage.money1space.level == 0 },
    storageSpaceMaterialsUp: {name: "Space Materials Storage Optimisation", location: 'space', affected: {'storage.materials1space.modifier': 1}, base_cost: {'balances.money': 100000,   'balances.materials': 0,   'balances.helium': 100},   text: 'text', isHidden: (store) => store.storage.materials1space.level == 0 },
    storageSpaceHeliumUp:    {name: "Space Helium Storage Optimisation",    location: 'space', affected: {'storage.helium1space.modifier': 1},    base_cost: {'balances.money': 100000,   'balances.materials': 300, 'balances.helium': 0},     text: 'text', isHidden: (store) => store.storage.helium1space.level == 0 },
    
    tier1Up:    {name: "Basic Industries Reform", location: 'earth', affected: {'buildings.money1.modifier': 1, 'buildings.goods1.modifier': 1, 'buildings.oil1.modifier': 1},    base_cost: {'balances.goods': 300,    'balances.oil': 100},        text: 'text', isHidden: (store) => store.buildings.money1.level == 0 || store.buildings.goods1.level == 0 || store.buildings.oil1.level == 0 },
    tier2Up:    {name: "Advanced Industries Reform", location: 'earth', affected: {'buildings.money2.modifier': 1, 'buildings.goods2.modifier': 1, 'buildings.oil2.modifier': 1},    base_cost: {'balances.goods': 3000,   'balances.oil': 1000},       text: 'text', isHidden: (store) => store.buildings.money2.level == 0 || store.buildings.goods2.level == 0 || store.buildings.oil2.level == 0  },
    tier3Up:    {name: "Special Industries Reform", location: 'earth', affected: {'buildings.money3.modifier': 1, 'buildings.goods3.modifier': 1, 'buildings.oil3.modifier': 1},    base_cost: {'balances.goods': 30000,  'balances.oil': 10000},      text: 'text', isHidden: (store) => store.buildings.money3.level == 0 || store.buildings.goods3.level == 0 || store.buildings.oil3.level == 0  },
    
    tier4Up:    {name: "Basic Space Reform", location: 'space', affected: {'buildings.money1space.modifier': 1, 'buildings.materials1space.modifier': 1, 'buildings.helium1space.modifier': 1},    base_cost: {'balances.materials': 300,    'balances.helium': 100},        text: 'text', isHidden: (store) => store.buildings.money1space.level == 0 || store.buildings.materials1space.level == 0 || store.buildings.helium1space.level == 0 },
    tier5Up:    {name: "Advanced Space Reform", location: 'space', affected: {'buildings.money2space.modifier': 1, 'buildings.materials2space.modifier': 1, 'buildings.helium2space.modifier': 1},    base_cost: {'balances.materials': 3000,   'balances.helium': 1000},       text: 'text', isHidden: (store) => store.buildings.money2space.level == 0 || store.buildings.materials2space.level == 0 || store.buildings.helium2space.level == 0  },
    tier6Up:    {name: "Special Space Reform", location: 'space', affected: {'buildings.money3space.modifier': 1, 'buildings.materials3space.modifier': 1, 'buildings.helium3space.modifier': 1},    base_cost: {'balances.materials': 30000,  'balances.helium': 10000},      text: 'text', isHidden: (store) => store.buildings.money3space.level == 0 || store.buildings.materials3space.level == 0 || store.buildings.helium3space.level == 0  },
    
    indMoneyUP: {name: "Money Industry Reform", location: 'earth', affected: {'buildings.money1.modifier': 1, 'buildings.money2.modifier': 1, 'buildings.money3.modifier': 1}, base_cost: {'balances.money': 1000,   'balances.goods': 300,    'balances.oil': 100},      text: 'text', isHidden: (store) => store.buildings.money1.level == 0 || store.buildings.money2.level == 0 || store.buildings.money3.level == 0  },
    indGoodsUP: {name: "Goods Industry Reform", location: 'earth', affected: {'buildings.goods1.modifier': 1, 'buildings.goods2.modifier': 1, 'buildings.goods3.modifier': 1}, base_cost: {'balances.money': 10000,  'balances.goods': 3000,   'balances.oil': 1000},      text: 'text', isHidden: (store) => store.buildings.goods1.level == 0 || store.buildings.goods2.level == 0 || store.buildings.goods3.level == 0  },
    indOilUP:   {name: "Oil Industry Reform",   location: 'earth', affected: {'buildings.oil1.modifier': 1,   'buildings.oil2.modifier': 1,   'buildings.oil3.modifier': 1},   base_cost: {'balances.money': 100000, 'balances.goods': 30000,  'balances.oil': 10000},      text: 'text', isHidden: (store) => store.buildings.oil1.level == 0 || store.buildings.oil2.level == 0 || store.buildings.oil3.level == 0  },
    
    indSpaceMoneyUP:     {name: "Space Money Industry Reform",     location: 'space', affected: {'buildings.money1space.modifier': 1,     'buildings.money2space.modifier': 1,     'buildings.money3space.modifier': 1},     base_cost: {'balances.money': 100000,      'balances.materials': 300,    'balances.helium': 100},      text: 'text', isHidden: (store) => store.buildings.money1space.level == 0 || store.buildings.money2space.level == 0 || store.buildings.money3space.level == 0  },
    indSpaceMaterialsUP: {name: "Materials Industry Reform", location: 'space', affected: {'buildings.materials1space.modifier': 1, 'buildings.materials2space.modifier': 1, 'buildings.materials3space.modifier': 1}, base_cost: {'balances.money': 1000000,     'balances.materials': 3000,   'balances.helium': 1000},     text: 'text', isHidden: (store) => store.buildings.materials1space.level == 0 || store.buildings.materials2space.level == 0 || store.buildings.materials3space.level == 0  },
    indSpaceHeliumUP:    {name: "Helium Industry Reform",    location: 'space', affected: {'buildings.helium1space.modifier': 1,    'buildings.helium2space.modifier': 1,    'buildings.helium3space.modifier': 1},    base_cost: {'balances.money': 10000000,    'balances.materials': 30000,  'balances.helium': 10000},    text: 'text', isHidden: (store) => store.buildings.helium1space.level == 0 || store.buildings.helium2space.level == 0 || store.buildings.helium3space.level == 0  },
    
};