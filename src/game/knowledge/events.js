
import _ from 'lodash';


export const genEvent = (store) => {
    let event = _.sample(events);
    
    event.start_tick = store.tick;
    event.opened = false;
    
    return event;
};

export const confirmEvent = (store) => {
    store = events[store.event.key].onConfirm(store);
    store = passEvent(store);
    
    return store;
};

export const passEvent = (store) => {
    store.event = false;
    store.last_event_tick = store.tick;
    
    return store;
};


export var events = {
    first_event: {key: 'first_event', name: 'First Event', text: 'First Text', onConfirm: (state) => { console.log('First Event'); return state; }},
};