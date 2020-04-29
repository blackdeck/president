
import _ from 'lodash';



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
    _.each(upgrades[item_key].affected, (building) => { store.buildings[building].modifier++; });
    return store;
};


export var upgrades = {
    tier1Up:    {name: "Tier1Up", affected: ['money1', 'goods1', 'oil1'],    base_cost: {'balances.money': 1000,      'balances.goods': 100,    'balances.oil': 10},      text: 'text' },
    tier2Up:    {name: "Tier2Up", affected: ['money2', 'goods2', 'oil2'],    base_cost: {'balances.money': 10000,     'balances.goods': 1000,   'balances.oil': 100},      text: 'text' },
    tier3Up:    {name: "Tier3Up", affected: ['money3', 'goods3', 'oil3'],    base_cost: {'balances.money': 100000,    'balances.goods': 10000,  'balances.oil': 1000},      text: 'text' },
    
    indMoneyUP: {name: "IndMoneyUP", affected: ['money1', 'money2', 'money3'], base_cost: {'balances.money': 1000,      'balances.goods': 100,    'balances.oil': 10},      text: 'text' },
    indGoodsUP: {name: "IndGoodsUP", affected: ['goods1', 'goods2', 'goods3'], base_cost: {'balances.money': 10000,     'balances.goods': 1000,   'balances.oil': 100},      text: 'text' },
    indOilUP:   {name: "IndOilUP"  , affected: ['oil1', 'oil2', 'oil3'],       base_cost: {'balances.money': 100000,    'balances.goods': 10000,  'balances.oil': 1000},      text: 'text' },
    
};