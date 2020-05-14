
import _ from 'lodash';
import Lamp from "../../bdcgin/Lamp";


export var builder_store = {name: "Additional Builder", cost: {"permanent.donate": 25}, onClick: (store) => { store.permanent.constructors++; return store; }, text: "Allow to build additional building simultaneously"};

export var stores = {
    fill_storage_50: {name: "Fill Storage 50%", cost: {"permanent.donate": 5}, onClick: (store) => {
        _.each(store.balances, (value, key) => {
            store.balances[key] = Math.max(store.balances[key], store.storage_limit[key] * 0.50);
        });
        return store; }, text: "Fill 50% of all storage"},
    fill_storage_75: {name: "Fill Storage 75%", cost: {"permanent.donate": 10}, onClick: (store) => {
        _.each(store.balances, (value, key) => {
            store.balances[key] = Math.max(store.balances[key], store.storage_limit[key] * 0.75);
        });
        return store; }, text: "Fill 75% of all storage"},
    fill_storage_100: {name: "Fill Storage 100%", cost: {"permanent.donate": 20}, onClick: (store) => {
        _.each(store.balances, (value, key) => {
            store.balances[key] = store.storage_limit[key];
        });
        return store; }, text: "Fill 100% of all storage"},
    instant_1: {name: "Skip 1 min", cost: {"permanent.donate": 1}, onClick: (store) => {
        _.times(1*10*60, Lamp.rub().onInterval);
        return Lamp.rub().store;
    }, text: "Fast forward 1 minute of play"},
    instant_10: {name: "Skip 10 min", cost: {"permanent.donate": 5}, onClick: (store) => {
        _.times(10*10*60, Lamp.rub().onInterval);
        return Lamp.rub().store;
    }, text: "Fast forward 10 minutes of play"},
    instant_30: {name: "Skip 30 min", cost: {"permanent.donate": 10}, onClick: (store) => {
        _.times(30*10*60, Lamp.rub().onInterval);
        return Lamp.rub().store;
    }, text: "Fast forward 30 minutes of play"},
    instant_60: {name: "Skip 1 hour", cost: {"permanent.donate": 15}, onClick: (store) => {
        _.times(60*10*60, Lamp.rub().onInterval);
        return Lamp.rub().store;
    }, text: "Fast forward 1 hour of play"},
    instant_120: {name: "Skip 2 hours", cost: {"permanent.donate": 20}, onClick: (store) => {
        _.times(120*10*60, Lamp.rub().onInterval);
        return Lamp.rub().store;
    }, text: "Fast forward 2 hours of play"}
};

export var crystals = {
    crystal1: {name: "+15 Crystals", cost: {"permanent.usd": 4.99}, onClick: (store) => { store.permanent.donate += 15; return store; }, text: "Small crystal pack"},
    crystal2: {name: "+33 Crystals", cost: {"permanent.usd": 9.99}, onClick: (store) => { store.permanent.donate += 33; return store; }, text: "Small crystal pack"},
    crystal3: {name: "+75 Crystals", cost: {"permanent.usd": 19.99}, onClick: (store) => { store.permanent.donate += 75; return store; }, text: "Small crystal pack"},
    crystal4: {name: "+160 Crystals", cost: {"permanent.usd": 49.99}, onClick: (store) => { store.permanent.donate += 160; return store; }, text: "Small crystal pack"},
    crystal5: {name: "+350 Crystals", cost: {"permanent.usd": 99.99}, onClick: (store) => { store.permanent.donate += 350; return store; }, text: "Small crystal pack"}
};
