

import _ from 'lodash';

import {storage, calcAllStorage} from '../knowledge/storage';
import {buildings} from '../knowledge/buildings';
import {managers} from '../knowledge/managers';
import {upgrades} from '../knowledge/upgrades';


export const default_state = {
    isFull: false,
    
    tab: 'intro',
    
    balances:       {money: 0, goods: 0, oil: 0, materials: 0, helium: 0},
    storage_limit:  {money: 0, goods: 0, oil: 0, materials: 0, helium: 0},
    special: {rockets: 0, colonizer: 0},
    donated: false,
    donate: 0,
    prestige: 0,
    
    
    storage:   _.mapValues(storage,   () => { return {level: 0, modifier: 1}; }),
    buildings: _.mapValues(buildings, () => { return {level: 0, busy: false, fullness: 0, modifier: 1}; }),
    managers:  _.mapValues(managers,  () => { return {hired: false}; }),
    upgrades:  _.mapValues(upgrades,  () => { return {level: 0}; }),
    
    constructors: 1,
    constructing: [],
    
    environment: 'earth',
    space_era: false,
    
    event: false,
    last_event_tick: 0,
    
    
    
    game_speed: 1000, // 1000
    frame_rate: 10,
    game_speed_multiplier: 1,
    frame: 0,
    tick: 0,
    game_paused: true,
    game_end: false,
    game_end_score: 0,
    
    debug: {
        performance: false
    },
};



export const getDefaultState = () => {
    let state = _.cloneDeep(default_state);

    state.balances.money = 1;
   // state.balances.money = 900000;
    
    // state.storage.money1.level = 1;
    state = calcAllStorage(state);
    
    // state.balances.buildings = _.mapValues(buildings, () => { return {level: 1}; });

    return state;
};
