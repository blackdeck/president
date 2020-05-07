
import _ from 'lodash';

import {buildings, collectItem} from './buildings';
import {genName} from './names';


export const generateManager = (store) => {
    let manager = {auto_collect: [], auto_build: [], affected_buildings: [], bonus: 1};
    let available_buildings = _.pickBy(store.buildings, (building) => building.level > 0);
    let affected_buildings = _.sampleSize(_.keys(available_buildings), _.random(1, Math.min(3, _.keys(available_buildings).length)));
    
    _.each(affected_buildings, (building) => { _.random(1, 3) === 1 ? manager.auto_build.push(building) : manager.auto_collect.push(building) });
    manager.bonus = {1: 2, 2: 1, 3: 0.5}[affected_buildings.length];
    manager.affected_buildings = affected_buildings;
    manager.name = genName(_.random(1, 3) === 1 ? "female" : "male");
    
    // console.log(manager, available_buildings, affected_buildings);
    
    return manager;
};


export const hire = (store, item_key) => {
    let manager = _.first(store.offered_managers.splice(item_key, 1));
    store.managers.push(manager);
    _.each(manager.affected_buildings, (key) => { store.buildings[key].speed_modifier *= manager.bonus });
    return store;
};

export const fire = (store, item_key) => {
    let manager = _.first(store.managers.splice(item_key, 1));
    _.each(manager.affected_buildings, (key) => { store.buildings[key].speed_modifier /= manager.bonus });
    return store;
};


export var managers = {
    money1: {name: "Money1", location: 'earth', cost: {'balances.money': 10,      'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['money1'],  text: 'text', isHidden: (store) => store.buildings.money1.level == 0 },
    goods1: {name: "Goods1", location: 'earth', cost: {'balances.money': 50,      'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['goods1'],  text: 'text', isHidden: (store) => store.buildings.goods1.level == 0 },
    oil1:   {name: "Oil1",   location: 'earth', cost: {'balances.money': 250,     'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['oil1'],    text: 'text', isHidden: (store) => store.buildings.oil1.level == 0 },
    money2: {name: "Money2", location: 'earth', cost: {'balances.money': 1000,    'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['money2'],  text: 'text', isHidden: (store) => store.buildings.money2.level == 0 },
    goods2: {name: "Goods2", location: 'earth', cost: {'balances.money': 5000,    'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['goods2'],  text: 'text', isHidden: (store) => store.buildings.goods2.level == 0 },
    oil2:   {name: "Oil2",   location: 'earth', cost: {'balances.money': 25000,   'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['oil2'],    text: 'text', isHidden: (store) => store.buildings.oil2.level == 0 },
    money3: {name: "Money3", location: 'earth', cost: {'balances.money': 100000,  'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['money3'],  text: 'text', isHidden: (store) => store.buildings.money3.level == 0 },
    goods3: {name: "Goods3", location: 'earth', cost: {'balances.money': 500000,  'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['goods3'],  text: 'text', isHidden: (store) => store.buildings.goods3.level == 0 },
    oil3:   {name: "Oil3",   location: 'earth', cost: {'balances.money': 1000000, 'balances.goods': 0,    'balances.oil': 0},      auto_collect: ['oil3'],    text: 'text', isHidden: (store) => store.buildings.oil3.level == 0 },
    
    rocket:   {name: "Filon Musk", location: 'earth', cost: {'balances.money': 1000000,  'balances.goods': 0,    'balances.oil': 0},       auto_collect: ['rocket'],  text: 'text', isHidden: (store) => store.buildings.rocket.level == 0 },
    
    
    money1space:     {name: "Money1Space", location: 'space', cost: {'balances.money': 1000,      'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['money1space'],     text: 'text', isHidden: (store) => store.buildings.money1space.level == 0 },
    materials1space: {name: "Goods1Space", location: 'space', cost: {'balances.money': 5000,      'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['materials1space'], text: 'text', isHidden: (store) => store.buildings.materials1space.level == 0 },
    helium1space:    {name: "Oil1Space",   location: 'space', cost: {'balances.money': 25000,     'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['helium1space'],    text: 'text', isHidden: (store) => store.buildings.helium1space.level == 0 },
    money2space:     {name: "Money2Space", location: 'space', cost: {'balances.money': 100000,    'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['money2space'],     text: 'text', isHidden: (store) => store.buildings.money2space.level == 0 },
    materials2space: {name: "Goods2Space", location: 'space', cost: {'balances.money': 500000,    'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['materials2space'], text: 'text', isHidden: (store) => store.buildings.materials2space.level == 0 },
    helium2space:    {name: "Oil2Space",   location: 'space', cost: {'balances.money': 2500000,   'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['helium2space'],    text: 'text', isHidden: (store) => store.buildings.helium2space.level == 0 },
    money3space:     {name: "Money3Space", location: 'space', cost: {'balances.money': 10000000,  'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['money3space'],     text: 'text', isHidden: (store) => store.buildings.money3space.level == 0 },
    materials3space: {name: "Goods3Space", location: 'space', cost: {'balances.money': 50000000,  'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['materials3space'], text: 'text', isHidden: (store) => store.buildings.materials3space.level == 0 },
    helium3space:    {name: "Oil3Space",   location: 'space', cost: {'balances.money': 100000000, 'balances.goods': 0,    'balances.oil': 0},     auto_collect: ['helium3space'],    text: 'text', isHidden: (store) => store.buildings.helium3space.level == 0 },
    
    colonizer:       {name: "St. Anislav Lem", location: 'space', cost: {'balances.money': 100000000,  'balances.goods': 0,    'balances.oil': 0}, auto_collect: ['colonizer'],  text: 'text', isHidden: (store) => store.buildings.colonizer.level == 0 },
    
    
    
};