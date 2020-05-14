
import _ from 'lodash';


import {getDefaultState} from '../game/core/default_state';
import {calcAllStorage} from './knowledge/storage';


export const pick = (store, collection) => {
    return _.pickBy(collection, (item) => item.location == store.environment && !item.isHidden(store) )
};


export const calcReputation = (store) => {
    // console.log(_.reduce(_.values(store.buildings), (sum, item) => sum + item.level), 0);
    return _.reduce(_.values(store.buildings), (sum, item) => sum + item.level, 0);
};

export const reset = (store) => {
    
    let permanent = store.permanent;
    permanent.reputation += calcReputation(store);
    
    store = getDefaultState();
    
    store.permanent = permanent;
    
    store = calcAllStorage(store);
    
    return store;
};

export const giveReward = (store, reward) => {
    store.rewards.push(reward);
    return store;
};



// В теории объекты в JS не имеют порядка, но на практике - имеют. Странно, но факт.
// Эта функция рендомизирует порядок элементов в объекте.
// Знайте, за такое попадают в ад.
export const shuffleObject = (object) => {
    let keys = Object.keys(object);
    keys.sort((a, b) =>  Math.random() - 0.5);
    
    let newObject = {};
    keys.forEach((key) => { newObject[key] = object[key]; });
    
    return newObject;
};