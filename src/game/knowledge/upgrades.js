
import _ from 'lodash';


export const upgrade = (store, item_key) => {
    store.upgrades[item_key].level++;
    _.each(upgrades[item_key].affected, (building) => { store.buildings[building].modifier++; });
    return store;
};


export var upgrades = {
    tier1Up:    {name: "Tier1Up", affected: ['money1', 'goods1', 'oil1'],    cost: {'balances.money': 1000,      'balances.goods': 100,    'balances.oil': 10},      text: 'text' },
    tier2Up:    {name: "Tier2Up", affected: ['money2', 'goods2', 'oil2'],    cost: {'balances.money': 10000,     'balances.goods': 1000,   'balances.oil': 100},      text: 'text' },
    tier3Up:    {name: "Tier3Up", affected: ['money3', 'goods3', 'oil3'],    cost: {'balances.money': 100000,    'balances.goods': 10000,  'balances.oil': 1000},      text: 'text' },
    
    indMoneyUP: {name: "IndMoneyUP", affected: ['money1', 'money2', 'money3'], cost: {'balances.money': 1000,      'balances.goods': 100,    'balances.oil': 10},      text: 'text' },
    indGoodsUP: {name: "IndGoodsUP", affected: ['goods1', 'goods2', 'goods3'], cost: {'balances.money': 10000,     'balances.goods': 1000,   'balances.oil': 100},      text: 'text' },
    indOilUP:   {name: "IndOilUP"  , affected: ['oil1', 'oil2', 'oil3'],       cost: {'balances.money': 100000,    'balances.goods': 10000,  'balances.oil': 1000},      text: 'text' },
    
};