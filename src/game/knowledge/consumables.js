
import _ from 'lodash';

import {isTargetInRange, getRangeBetween, blink, attack, hit, getActionDelay, getLoad, getMaxLoad} from '../game_math';


const buy = (store, item_key) => {
    store.player.belt.push(item_key);
    //if (store.player.belt.length >= 6) store.tab = 'inventory';
    return store;
};

export const consume = (store, params, action, time) => {
    store[params.attacker].action.name = action;
    store[params.attacker].action.type = 'consumables';
    store[params.attacker].action.params = params;
    store[params.attacker].action.timer += time;
    return store;
};

export const consumables = {
    heal: { name: 'HP Pot', cost: {'player.money': 10}, text: 'Restore HP and cure poison', load: 3,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.heal.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'heal'),
        consumableIf: (store, params = {}) => store[params.attacker].hp < store[params.attacker].max_hp && !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'heal', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store[params.attacker].effects.poison = Math.max(0, store[params.attacker].effects.poison - 20);
            store[params.attacker].hp = Math.min(store[params.attacker].hp + 20, store[params.attacker].max_hp);
            store.chat.unshift({text: "Consume " + consumables.heal.name});
            return store;
    }},
    stamina: { name: 'SP Pot', cost: {'player.money': 10}, text: 'Restore SP and warm ice', load: 3,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.stamina.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'stamina'),
        consumableIf: (store, params = {}) => store[params.attacker].sp < store[params.attacker].max_sp && !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'stamina', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store[params.attacker].effects.freeze = Math.max(0, store[params.attacker].effects.freeze - 10);
            store[params.attacker].sp = Math.min(store[params.attacker].sp + 10, store[params.attacker].max_sp);
            store.chat.unshift({text: "Consume " + consumables.stamina.name});
            return store;
    }},
    manna: { name: 'MP Pot', cost: {'player.money': 10}, text: 'Restore MP and extinguish fire', load: 3,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.manna.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'manna'),
        consumableIf: (store, params = {}) => store[params.attacker].mp < store[params.attacker].max_mp && !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'manna', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store[params.attacker].effects.fire = Math.max(0, store[params.attacker].effects.fire - 5);
            store[params.attacker].mp = Math.min(store[params.attacker].mp + 5, store[params.attacker].max_mp);
            store.chat.unshift({text: "Consume " + consumables.manna.name});
            return store;
    }},

    fire_resin: { name: 'Fire Resin', cost: {'player.money': 10}, text: 'Adds fire damage to weapons attacks, but lowers accuracy.', load: 5,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.blink.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'fire_resin'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'fire_resin', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store.chat.unshift({text: "Consume " + consumables.fire_resin.name});
            store[params.attacker].effects.fire_resin = 1;
            return store;
        }},
    ice_resin: { name: 'Ice Resin', cost: {'player.money': 10}, text: 'Adds ice damage to weapons attacks, but lowers attack speed.', load: 5,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.blink.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'ice_resin'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'ice_resin', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store.chat.unshift({text: "Consume " + consumables.ice_resin.name});
            store[params.attacker].effects.ice_resin = 1;
            return store;
        }},
    dark_resin: { name: 'Dark Resin', cost: {'player.money': 10}, text: 'Adds dark damage to weapons attacks, but lowers range.', load: 5,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.blink.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'dark_resin'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'dark_resin', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store.chat.unshift({text: "Consume " + consumables.dark_resin.name});
            store[params.attacker].effects.dark_resin = 1;
            return store;
        }},
    light_resin: { name: 'Light Resin', cost: {'player.money': 10}, text: 'Adds dark damage to weapons attacks, but lowers stunning.', load: 5,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.blink.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'light_resin'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'light_resin', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store.chat.unshift({text: "Consume " + consumables.light_resin.name});
            store[params.attacker].effects.light_resin = 1;
            return store;
        }},

    blink: { name: 'Blink Scroll', cost: {'player.money': 10}, text: 'Scroll of Random Teleportation', load: 1,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.blink.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'blink'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight,
        onConsume: (store, params = {}) => consume(store, params, 'blink', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store.chat.unshift({text: "Consume " + consumables.blink.name});
            return blink(store, 42);
        }},
    wave: { name: 'Wave Scroll', cost: {'player.money': 10}, text: 'Pushes, stuns and freezes the target', load: 1,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.wave.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'wave'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight && isTargetInRange(store, 42),
        onConsume: (store, params = {}) => consume(store, params, 'wave', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store.battleground.target = Math.min(100, store.battleground.target + 10);
            store[params.defender].action.timer += 40; // WHERE IS RESISTANCE?
            store[params.defender].effects.freeze += 10;
            store.chat.unshift({text: "Consume " + consumables.wave.name});
            return store;
        }},
    fire: { name: 'Fire Scroll', cost: {'player.money': 10}, text: 'Damage and ignite target', load: 1,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.fire.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'fire'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight && isTargetInRange(store, 13),
        onConsume: (store, params = {}) => consume(store, params, 'fire', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            let atk = _.random((store[params.attacker].stats.wiz + store[params.attacker].stats.int), 4 * (store[params.attacker].stats.wiz + store[params.attacker].stats.int));
            let fire = hit(store, 'player', 'target', atk, 'fire');
            store[params.defender].hp -= fire;
            store[params.defender].effects.fire += 5;
            store.chat.unshift({text: "Consume " + consumables.fire.name});
            return store;
        }},

    knife: { name: 'Knife', cost: {'player.money': 3}, text: 'A light throwing weapon that distracts rather than damages the target', load: 1,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.knife.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'knife'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight && isTargetInRange(store, 30),
        onConsume: (store, params = {}) => consume(store, params, 'knife', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            let soul_weapon = {name: "Knife",    min_dmg: 1, max_dmg: 3, dmg_type: 'cutting', bonus_stat: 'str', stunning: 25, accuracy: 3, range: 30, speed: 10};
            let tpm_weapon = store[params.attacker].weapon;
            store[params.attacker].weapon = soul_weapon;
            store = attack(store, {
                attacker: 'player',
                defender: 'target',
                onHit: (store, dmg) => {  store.chat.unshift({text: "player " + soul_weapon.name + " Hit! Damage: " + dmg}); return store; },
                onMiss: (store, Prob) => { store.chat.unshift({text: "player  Miss! Prob: " + Prob.toFixed(0) + '%'}); return store; },
            });
            store[params.attacker].weapon = tpm_weapon;
            store.chat.unshift({text: "Consume " + consumables.knife.name});
            return store;
        }},
    dart: { name: 'Dart Spear', cost: {'player.money': 10}, text: 'Heavy throwing spear', load: 3,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.dart.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'dart'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight && isTargetInRange(store, 15),
        onConsume: (store, params = {}) => consume(store, params, 'dart', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            let soul_weapon = {name: "Dart Spear",    min_dmg: 6, max_dmg: 12, dmg_type: 'pierce', bonus_stat: 'str', stunning: 15, accuracy: 9, range: 15, speed: 33};
            let tpm_weapon = store[params.attacker].weapon;
            store[params.attacker].weapon = soul_weapon;
            store = attack(store, {
                attacker: 'player',
                defender: 'target',
                onHit: (store, dmg) => {  store.chat.unshift({text: "player " + soul_weapon.name + " Hit! Damage: " + dmg}); return store; },
                onMiss: (store, Prob) => { store.chat.unshift({text: "player  Miss! Prob: " + Prob.toFixed(0) + '%'}); return store; },
            });
            store[params.attacker].weapon = tpm_weapon;
            store.chat.unshift({text: "Consume " + consumables.dart.name});
            return store;
        }},
    bomb: { name: 'Poison Bomb', cost: {'player.money': 10}, text: 'Poisons the target and those standing nearby', load: 3,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.bomb.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'bomb'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight && isTargetInRange(store, 20),
        onConsume: (store, params = {}) => consume(store, params, 'bomb', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store[params.defender].effects.poison += 25;// -= _.random(1, 10) + _.random(1, getRangeBetween(store));
            store[params.attacker].effects.poison += 20 - getRangeBetween(store);//_.random(1, 19 - getRangeBetween(store));
            store.chat.unshift({text: "Consume " + consumables.bomb.name});
            return store;
        }},
    web: { name: 'Web Net', cost: {'player.money': 10}, text: 'Entangles the target and makes it inactive for a long time', load: 3,
        isDisabled: (store, params = {}) => store[params.attacker].belt.length >= 6 || getLoad(store[params.attacker]) + consumables.web.load > getMaxLoad(store[params.attacker]),
        onClick: (store, params = {}) => buy(store, 'web'),
        consumableIf: (store, params = {}) => !store[params.attacker].action.timer && store.in_fight && isTargetInRange(store, 25),
        onConsume: (store, params = {}) => consume(store, params, 'web', getActionDelay(store, params.attacker, 10)),
        onResolve: (store, params = {}) => {
            store[params.defender].action.timer += 100;
            store.chat.unshift({text: "Consume " + consumables.web.name});
            return store;
        }},
};
