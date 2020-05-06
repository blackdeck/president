
import _ from 'lodash';


import {isEnough, gainCost} from '../../bdcgin/Gin';

import {storage, calcStorageCapacity} from '../knowledge/storage';
import {buildings, finishItem, collectItem} from '../knowledge/buildings';
import {events, genEvent} from '../knowledge/events';
import {managers} from '../knowledge/managers';


export const rules = {
    matrix_show: { onFrame: (store, params = {}) => { store.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return store; }},
    
    income: {
        onFrame: (store, params = {}) => {
            let automated_buildings = [];
            _.each(store.managers, (manager, key) => {
                if (manager.hired === true) {
                    _.each(managers[key].automation, (automated_building) => {
                        automated_buildings.push(automated_building);
                    })
                }
            });
            
            
            _.each(store.buildings, (building, key) => {
                if (building.level > 0 && store.buildings[key].fullness < buildings[key].cycle) {
                    store.buildings[key].fullness++;
                }
    
                // /* AUTOMATION
                if (store.buildings[key].fullness >= buildings[key].cycle && automated_buildings.includes(key)) { // store.managers[key].hired
                    store = collectItem(store, key);
                }
            });
            return store;
        },
        
        onTick: (store, params = {}) => {
            
            return store;
        }
    },
    
    
    constructing: {
        onFrame: (store, params = {}) => {
            _.each(store.constructing, (task, key) => {
                if (task.start_frame + task.duration <= store.frame) {
                    if (task.item_type == 'buildings') {
                        store = finishItem(store, task.item_key);
                    }
                }
            });
    
            _.remove(store.constructing, (task) => task.start_frame + task.duration <= store.frame);
            
            return store;
        },
        
        onTick: (store, params = {}) => {
            
            return store;
        }
    },
    
    
    events: {
        onFrame: (store, params = {}) => {
            return store;
        },
        
        onTick: (store, params = {}) => {
            if (store.event === false && store.last_event_tick + 30 < store.tick) {
                if (_.random(10000) + (store.tick - store.last_event_tick) >= 10000) {
                    store.event = genEvent(store);
                }
            }
            
            if (store.event !== false && store.event.opened !== true && store.event.start_tick + 7 < store.tick) {
                store.event = false;
                store.last_event_tick = store.tick;
            }
            
            return store;
        }
    },
    
    
    
};