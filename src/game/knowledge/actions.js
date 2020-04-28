import _ from 'lodash';

import {getActionDelay, getAttackDelay, isTargetInRange, blink, attack, hit} from '../game_math';
import {effects_0} from '../models/unit';
import {getWeapon} from '../equipment';


export const act = (store, params, action, time) => {
    store[params.attacker].action.name = action;
    store[params.attacker].action.type = 'actions';
    store[params.attacker].action.params = params;
    store[params.attacker].action.timer += time;
    return store;
};


export const actions = {
    move_left:  {
        name:         "Step Left", cost: {},
        text:         "Take a step from the enemy",
        isHidden:     false,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store.battleground[params.attacker] === 0,
        onAction:     (store, params = {}) => act(store, params, 'move_left', getActionDelay(store, params.attacker, 20)),
        onResolve: (store, params = {}) => {
            store.battleground[params.attacker] = Math.max(0, store.battleground[params.attacker] - 1);
            store.chat.unshift({text: params.attacker + "  Go < "});
            return store;
        }
    },
    move_right: {
        name:         "Step Right", cost: {},
        text:         "Take a step towards the enemy",
        isHidden:     false,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store.battleground[params.attacker] === store.battleground[params.defender] - 1,
        onAction:     (store, params = {}) => act(store, params, 'move_right', getActionDelay(store, params.attacker, 20)),
        onResolve: (store, params = {}) => {
            store.battleground[params.attacker] = Math.min(100, store.battleground[params.attacker] + 1);
            //store.battleground[params.attacker] = Math.min(store.battleground[params.defender] - 1, store.battleground[params.attacker] + 1);
            store.chat.unshift({text: params.attacker + "  Go > "});
            return store;
        }
    },
    run_left:   {
        name:         "Run Left", cost: {'player.sp': 1},
        text:         "Run from the enemy",
        isHidden:     false,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store.battleground[params.attacker] === 0,
        onAction:     (store, params = {}) => act(store, params, 'run_left', getActionDelay(store, params.attacker, 20)),
        onResolve: (store, params = {}) => {
            console.log(params);
            store.battleground[params.attacker] = Math.max(0, store.battleground[params.attacker] - store[params.attacker].stats.dex);
            store.chat.unshift({text: params.attacker + "  Run < "});
            return store;
        }
    },
    run_right:  {
        name:         "Run Right", cost: {'player.sp': 1},
        text:         "Run towards enemy",
        isHidden:     false,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store.battleground[params.attacker] >= (store.battleground[params.defender] - store[params.attacker].stats.dex),
        onAction:     (store, params = {}) => act(store, params, 'run_right', getActionDelay(store, params.attacker, 20)),
        onResolve: (store, params = {}) => {
            store.battleground[params.attacker] = Math.min(100, store.battleground[params.attacker] + store[params.attacker].stats.dex);
            //store.battleground[params.attacker] = Math.min(store.battleground[params.defender] - 1, store.battleground[params.attacker] + 4 + store[params.attacker].stats.dex);
            store.chat.unshift({text: params.attacker + "  Run > "});
            return store;
        }
    },

    block:  {
        name:         "Block", cost: {'player.sp': 1},
        text:         "Stance which blocks next attack of the defender",
        isHidden:     (store, params = {}) => store[params.attacker].classes.warrior < 1,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, getWeapon(store, params.defender).range),
        onAction:     (store, params = {}) => act(store, params, 'parry', getActionDelay(store, params.attacker, 30)),
        onResolve: (store, params = {}) => {
            return store;
        }
    },
    hit:    {
        name:         "Hit!", cost: {'player.sp': 1},
        text:         "Hit the defender by weapon if the defender did not parry or dodge",
        isHidden:     false,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, getWeapon(store, params.attacker).range),
        onAction:     (store, params = {}) => act(store, params, 'hit', getAttackDelay(store, {attacker: params.attacker, defender: params.defender})),
        onResolve: (store, params = {}) => {
            store = attack(store,
                {
                    attacker: params.attacker,
                    defender: params.defender,
                    onHit:    (store, dmg) => {
                        store.chat.unshift({text: params.attacker + "  Hit! Damage: " + dmg});
                        return store;
                    },
                    onMiss:   (store, Prob) => {
                        store.chat.unshift({text: params.attacker + "  Miss! Prob: " + Prob.toFixed(0) + '%'});
                        return store;
                    },
                });
            return store;
        }
    },
    stun:    {
        name:         "Stun", cost: {},
        text:         "Inactive store after lost poise",
        isHidden:     false,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, getWeapon(store, params.attacker).range),
        onAction:     (store, params = {}) => act(store, params, 'stun', 1),
        onResolve: (store, params = {}) => {
            return store;
        }
    },


    parry:  {
        name:         "Parry", cost: {'player.mp': 1},
        text:         "Stance which blocks next attack of the defender and stuns the attacker",
        isHidden:     (store, params = {}) => store[params.attacker].classes.warrior < 1,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, getWeapon(store, params.defender).range),
        onAction:     (store, params = {}) => act(store, params, 'parry', getActionDelay(store, params.attacker, 30)),
        onResolve: (store, params = {}) => {
            return store;
        }
    },
    sprint: {
        name:         "Sprint", cost: {'player.mp': 2},
        text:         "Fast and long sprint which pushed the params.defender back if the params.attacker gets to them",
        isHidden:     (store, params = {}) => store[params.attacker].classes.warrior < 2,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store.battleground[params.attacker] >= (store.battleground[params.defender] - 9 + store[params.attacker].stats.dex + store[params.attacker].stats.str),
        onAction:     (store, params = {}) => act(store, params, 'sprint', getActionDelay(store, params.attacker, 40)),
        onResolve: (store, params = {}) => {
            let long = 9 + store[params.attacker].stats.dex + store[params.attacker].stats.str;
            let new_point = Math.min(99, store.battleground[params.attacker] + long);
            store.battleground[params.attacker] = new_point;
            if (store.battleground[params.defender] < new_point) store.battleground[params.defender]++;
            //store.battleground[params.attacker] = Math.min(store.battleground[params.defender] - 1, store.battleground[params.attacker] + 9 + store[params.attacker].stats.dex + store[params.attacker].stats.str);
            store.chat.unshift({text: params.attacker + "  Sprint"});
            return store;
        }
    },
    double:    {
        name:         "Double", cost: {'player.mp': 3},
        text:         "Two Hit during one in a row",
        isHidden:     (store, params = {}) => store[params.attacker].classes.warrior < 3,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, getWeapon(store, params.attacker).range),
        onAction:     (store, params = {}) => act(store, params, 'hit', getAttackDelay(store, {attacker: params.attacker, defender: params.defender})),
        onResolve: (store, params = {}) => {
            store = attack(store,
                {
                    attacker: params.attacker,
                    defender: params.defender,
                    onHit:    (store, dmg) => {
                        store.chat.unshift({text: params.attacker + "  Hit! Damage: " + dmg});
                        return store;
                    },
                    onMiss:   (store, Prob) => {
                        store.chat.unshift({text: params.attacker + "  Miss! Prob: " + Prob.toFixed(0) + '%'});
                        return store;
                    },
                });
            store = attack(store,
                {
                    attacker: params.attacker,
                    defender: params.defender,
                    onHit:    (store, dmg) => {
                        store.chat.unshift({text: params.attacker + "  Hit! Damage: " + dmg});
                        return store;
                    },
                    onMiss:   (store, Prob) => {
                        store.chat.unshift({text: params.attacker + "  Miss! Prob: " + Prob.toFixed(0) + '%'});
                        return store;
                    },
                });
            return store;
        }
    },


    blast: {
        name:         "Blast", cost: {'player.mp': 1},
        text:         "A clot of dark energy that overtakes the target at a great distance",
        isHidden:     (store, params = {}) => store[params.attacker].classes.mage < 1,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, 50),
        onAction:     (store, params = {}) => act(store, params, 'blast', getActionDelay(store, params.attacker, 30)),
        onResolve: (store, params = {}) => {
            let atk = _.random(store[params.attacker].stats.int, store[params.attacker].level + store[params.attacker].stats.int);
            let fire = hit(store, params.attacker, params.defender, atk, 'dark');
            store[params.defender].hp -= fire;
            store.chat.unshift({text: params.attacker + "  Blast " + fire});
            return store;
        }
    },
    shield: {
        name:         "Shield", cost: {'player.mp': 3},
        text:         "Clears all effects and creates an ice shield that blocks the next hit",
        isHidden:     (store, params = {}) => store[params.attacker].classes.mage < 2,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer),
        onAction:     (store, params = {}) => act(store, params, 'shield', getActionDelay(store, params.attacker, 40)),
        onResolve: (store, params = {}) => {
            const shields = store[params.attacker].effects.shield;
            store[params.attacker].effects = effects_0;
            store[params.attacker].effects.shield = shields + 1;
            store.chat.unshift({text: params.attacker + " cowered by Shield"});
            return store;
        }
    },
    fire:  {
        name:         "Fire", cost: {'player.mp': 3},
        text:         "The stream of fire damages and sets the target on fire, inflicting damage on the entire fight",
        isHidden:     (store, params = {}) => store[params.attacker].classes.mage < 3,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, 25),
        onAction:     (store, params = {}) => act(store, params, 'fire', getActionDelay(store, params.attacker, 50)),
        onResolve: (store, params = {}) => {
            store[params.attacker].effects.freeze = Math.max(0, store[params.attacker].effects.freeze - 1);
            let atk = _.random(store[params.attacker].stats.int, store[params.attacker].level * store[params.attacker].stats.int);
            let fire = hit(store, params.attacker, params.defender, atk, 'fire');
            store[params.defender].hp -= fire;
            store[params.defender].effects.fire++;
            store.chat.unshift({text: params.attacker + "  Fire " + fire});
            return store;
        }
    },



    curse: {name: "Curse", cost: {'player.mp': 1},
        text: "A terrible curse will pursue the target and cause damage to bearer for the entire fight",
        isHidden:     (store, params = {}) => store[params.attacker].classes.evangelist < 1,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action_timer) || !isTargetInRange(store, 25),
        onAction:     (store, params = {}) => act(store, params, 'curse', getActionDelay(store, params.attacker, 30)),
        onResolve: (store, params = {}) => {
            store[params.defender].effects.curse += store[params.attacker].stats.int;
            store.chat.unshift({text: params.defender + " Cursed "});
            return store;
        }},
    heal:   {
        name:         "Heal", cost: {'player.mp': 2},
        text:         "Light heal",
        isHidden:     (store, params = {}) => store[params.attacker].classes.evangelist < 2,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store[params.attacker].hp >= store[params.attacker].max_hp,
        onAction:     (store, params = {}) => act(store, params, 'heal', getActionDelay(store, params.attacker, 40)),
        onResolve: (store, params = {}) => {
            let hp = Math.min(store[params.attacker].max_hp - store[params.attacker].hp, _.random(store[params.attacker].stats.int, 1 + store[params.attacker].level + store[params.attacker].stats.int));
            store[params.attacker].hp += hp;
            store[params.attacker].effects.poison = Math.max(0, store[params.attacker].effects.poison - hp);
            store.chat.unshift({text: params.attacker + "  Heal " + hp});
            return store;
        }
    },
    sword:  {
        name:         "Sword", cost: {'player.mp': 3},
        text:         "Conjure Soul Sword 5ft long that cuts the target",
        isHidden:     (store, params = {}) => store[params.attacker].classes.evangelist < 3,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, 12),
        onAction:     (store, params = {}) => act(store, params, 'sword', getActionDelay(store, params.attacker, 50)),
        onResolve: (store, params = {}) => {

            let soul_weapon = {
                name:       "Soul Sword",
                min_dmg:    6,
                max_dmg:    11,
                dmg_type:   'cutting',
                bonus_stat: 'int',
                stunning:   48,
                accuracy:   5,
                range:      12,
                speed:      50
            };

            let tpm_weapon = store[params.attacker].weapon;
            store[params.attacker].weapon = soul_weapon;
            store = attack(store, {
                attacker: params.attacker,
                defender: params.defender,
                onHit:    (store, dmg) => {
                    store.chat.unshift({text: params.attacker + "  " + soul_weapon.name + " Hit! Damage: " + dmg});
                    return store;
                },
                onMiss:   (store, Prob) => {
                    store.chat.unshift({text: params.attacker + "  Miss! Prob: " + Prob.toFixed(0) + '%'});
                    return store;
                },
            });
            store[params.attacker].weapon = tpm_weapon;

            return store;
        }
    },








    blink: {
        name:         "Blink", cost: {'player.mp': 1},
        text:         "Instant teleportation within 25 steps in random direction is the best way to change the position in combat",
        isHidden:     (store, params = {}) => store[params.attacker].classes.prophet < 1,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer),
        onAction:     (store, params = {}) => act(store, params, 'blink', getActionDelay(store, params.attacker, 30)),
        onResolve: (store, params = {}) => blink(store, 20 + store[params.attacker].stats.int)
    },
    wave:    {
        name:         "Wave", cost: {'player.mp': 2},
        text:         "Fast jump back that gives invulnerability during action time",
        isHidden:     (store, params = {}) => store[params.attacker].classes.prophet < 2,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store.battleground[params.attacker] === 0,
        onAction:     (store, params = {}) => act(store, params, 'roll', getActionDelay(store, params.attacker, 40)),
        onResolve: (store, params = {}) => {
            store.battleground.target = Math.min(100, store.battleground.target + store[params.attacker].stats.int);
            store[params.defender].action.timer += 40 + store[params.attacker].stats.int; // WHERE IS RESISTANCE?
            store.chat.unshift({text: params.attacker + " Wave"});
            return store;
        }
    },
    nightmare: {name: "Nightmare", cost: {'player.mp': 3},
        text: "Mental disorder that periodically deprives the will of its bearer for the entire fight",
        isHidden:     (store, params = {}) => store[params.attacker].classes.prophet < 3,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action_timer) || !isTargetInRange(store, 25),
        onAction:     (store, params = {}) => act(store, params, 'curse', getActionDelay(store, params.attacker, 50)),
        onResolve: (store, params = {}) => {
            store[params.defender].effects.nightmare += store[params.attacker].stats.int;
            store.chat.unshift({text: params.defender + " Nightmared "});
            return store;
        }
    },

    roll:    {
        name:         "Roll", cost: {'player.mp': 1},
        text:         "Fast jump back that gives invulnerability during action time",
        isHidden:     (store, params = {}) => store[params.attacker].classes.nomad < 1,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || store.battleground[params.attacker] === 0,
        onAction:     (store, params = {}) => act(store, params, 'roll', getActionDelay(store, params.attacker, 30)),
        onResolve: (store, params = {}) => {
            store.battleground[params.attacker] = Math.max(0, store.battleground[params.attacker] - store[params.attacker].stats.dex);
            store.chat.unshift({text: params.attacker + "  Roll"});
            return store;
        }
    },
    push:   {
        name:         "Push", cost: {'player.mp': 2},
        text:         "Hit that stuns the params.defender and throws them back",
        isHidden:     (store, params = {}) => store[params.attacker].classes.nomad < 2,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, 2),
        onAction:     (store, params = {}) => act(store, params, 'push', getAttackDelay(store, {attacker: params.attacker, defender: params.defender})),
        onResolve: (store, params = {}) => {
            store = attack(store,
                {
                    attacker: params.attacker,
                    defender: params.defender,
                    onHit:    (store, dmg) => {
                        store.chat.unshift({text: params.attacker + " Push! Damage: " + dmg});
                        store.battleground[params.defender] = Math.min(100, store.battleground[params.defender] + store[params.attacker].stats.str);
                        store[params.defender].action.timer += _.random(store[params.attacker].stats.str, 10 + store[params.attacker].stats.str);
                        return store;
                    },
                    onMiss:   (store, Prob) => {
                        store.chat.unshift({text: params.attacker + " Push Miss! Prob: " + Prob.toFixed(0) + '%'});
                        return store;
                    },
                });
            return store;
        }
    },
    exhaust: {
        name:         "Exhaust", cost: {'player.mp': 3},
        text:         "Attack that decreases SP of the defender",
        isHidden:     (store, params = {}) => store[params.attacker].classes.nomad < 3,
        isNotAllowed: (store, params = {}) => (store[params.attacker].action.timer) || !isTargetInRange(store, getWeapon(store, params.attacker).range),
        onAction:     (store, params = {}) => act(store, params, 'exhaust', getAttackDelay(store, {attacker: params.attacker, defender: params.defender})),
        onResolve: (store, params = {}) => {
            store = attack(store,
                {
                    attacker: params.attacker,
                    defender: params.defender,
                    onHit:    (store, dmg) => {
                        let ex_sp = Math.min(store[params.defender].sp, _.random(1, store[params.attacker].stats.dex));
                        store[params.defender].sp -= ex_sp;
                        store.chat.unshift({text: params.attacker + " Exhaust " + ex_sp + " sp! Damage: " + dmg});
                        return store;
                    },
                    onMiss:   (store, Prob) => {
                        store.chat.unshift({text: params.attacker + " Exhaust Miss! Prob: " + Prob.toFixed(0) + '%'});
                        return store;
                    },
                });
            return store;
        }
    },


};