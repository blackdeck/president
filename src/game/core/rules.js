
import _ from 'lodash';


import {isEnough, gainCost} from '../../bdcgin/Gin';

import {buildings, collectItem} from '../knowledge/buildings';


export const rules = {
    matrix_show: { onFrame: (store, params = {}) => { store.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return store; }},
    
    
    income: {
        onFrame: (store, params = {}) => {
            _.each(store.buildings, (building, key) => {
                if (building.level > 0 && store.buildings[key].fullness < buildings[key].cycle) {
                    store.buildings[key].fullness++;
                    
                    // /* AUTOMATION
                    if (store.buildings[key].fullness >= buildings[key].cycle && store.managers[key].hired) {
                        store = collectItem(store, key);
                    }
                    // */
                }
            });
            return store;
        },
        
        onTick: (store, params = {}) => {
            
            return store;
        }
    },
    
};