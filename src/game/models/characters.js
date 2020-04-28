
import {combineWeapon, weapons_bodies, free_hand} from '../models/weapons';
import {combineShield, shields_bodies} from '../models/shields';
import {combineArmor, armors_bodies} from '../models/armors';


export const characters = [
    {
        name: "Klaus",
        class: "warrior",
        character_description: "Klaus strong in fencing skills: he knows how to beat strongly and precisely with any weapon.",
        equipment_description: "Heaviest armor, two big Bastard sword and Crossbow for long-range targets - this guy knows how to hurt.",
        stats: {str: 7, dex: 5, int: 6, wiz: 3, vit: 4},
        belt: ['heal', 'heal', 'stamina'],
        equipment: [combineWeapon(1, weapons_bodies.crossbow)],
        armor: combineArmor(1, armors_bodies.plate),
        right_hand: combineWeapon(1, weapons_bodies.bastard),
        left_hand: combineWeapon(1, weapons_bodies.bastard)
    },
    {
        name: "Cheer",
        class: "mage",
        character_description: "Nimble Cheer seeks to avoid direct contact with an opponent and has excellent magic.",
        equipment_description: "Longbow against quick targets, magic Wand against protected ones and a sharp Dagger in case of a close combat.",
        stats: {str: 4, dex: 7, int: 5, wiz: 6, vit: 3},
        belt: ['stamina', 'manna', 'knife', 'knife', 'knife'],
        equipment: [combineWeapon(1, weapons_bodies.longbow)],
        armor: combineArmor(1, armors_bodies.jacket),
        right_hand: combineWeapon(1, weapons_bodies.wand),
        left_hand: combineWeapon(1, weapons_bodies.dagger)
    },
    {
        name: "Alex",
        class: "evangelist",
        character_description: "Alex combines powerful spells with strength and vulnerability, seeking to unravel the enemy's weak spot.", // Мощные заклинания Алекс сочетает с силой и зищищенностью, стремясь разгадать слабое место противника.
        equipment_description: "Ready for any opponent - a magic Wand for long-range targets and an Axe with a Buckler to quickly deal with closer.",
        stats: {str: 5, dex: 3, int: 7, wiz: 4, vit: 6},
        belt: ['heal', 'manna', 'dart'],
        equipment: [combineWeapon(1, weapons_bodies.wand)],
        armor: combineArmor(1, armors_bodies.chest),
        right_hand: combineWeapon(1, weapons_bodies.axe),
        left_hand: combineShield(1, shields_bodies.buckler)
    },
    {
        name: "Margit",
        class: "prophet",
        character_description: "Full of magical and physical energy, Margit seeks to exhaust the enemy and defeat him at the end.",
        equipment_description: "A whip to fight with opponents at a distance and a rapier with a shield for fencing.",
        stats: {str: 3, dex: 6, int: 4, wiz: 7, vit: 5},
        belt: ['stamina', 'manna', 'wave'],
        equipment: [combineWeapon(1, weapons_bodies.whip)],
        armor: combineArmor(1, armors_bodies.robe),
        right_hand: combineWeapon(1, weapons_bodies.rapier),
        left_hand: combineShield(1, shields_bodies.parma)
    },
    {
        name: "Loki",
        class: "nomad",
        character_description: "Loki went through a lot and survived, which means that it is not easy to kill him.",
        equipment_description: "A shield as a cover, a rod of the fight against distant opponents, and a pair of brass knuckles for a striking attack.",
        stats: {str: 6, dex: 4, int: 3, wiz: 5, vit: 7},
        belt: ['heal', 'manna', 'web'],
        equipment: [combineWeapon(1, weapons_bodies.knuckle), combineWeapon(1, weapons_bodies.knuckle)],
        armor: combineArmor(1, armors_bodies.chain),
        right_hand: combineWeapon(1, weapons_bodies.rod),
        left_hand: combineShield(1, shields_bodies.heater)
    },
    {
        name: "Diefrag",
        class: "warrior",
        character_description: "Master in weapons and well protected, Defrag is strong and striking.",
        equipment_description: "Hammer for capricious and a pair of Whips for the naughty.",
        stats: {str: 7, dex: 5, int: 6, wiz: 3, vit: 4},
        belt: ['heal', 'heal', 'stamina'],
        equipment: [combineWeapon(1, weapons_bodies.whip)],
        armor: combineArmor(1, armors_bodies.full_plate),
        right_hand: combineWeapon(1, weapons_bodies.hammer),
        left_hand: combineWeapon(1, weapons_bodies.whip)
    },
    {
        name: "Hang",
        class: "mage",
        character_description: "He never wins by force - rather, his opponent loses to Hang's wisdom.",
        equipment_description: "Bow to defeat distant opponents and a spear with a shield for close.",
        stats: {str: 4, dex: 7, int: 5, wiz: 6, vit: 3},
        belt: ['stamina', 'manna', 'knife', 'knife', 'knife'],
        equipment: [combineWeapon(1, weapons_bodies.bow)],
        armor: combineArmor(1, armors_bodies.jacket),
        right_hand: combineWeapon(1, weapons_bodies.spear),
        left_hand: combineShield(1, shields_bodies.buckler)
    },
    {
        name: "Ixtrix",
        class: "evangelist",
        character_description: "Ixtrix is always ready to fight and show her opponent the power of her magic.",
        equipment_description: "Valkyrie with a Shield: she is always ready to strike an unexpected blow with a Sword or a magic Wand.",
        stats: {str: 5, dex: 3, int: 7, wiz: 4, vit: 6},
        belt: ['heal', 'manna', 'dart'],
        equipment: [combineWeapon(1, weapons_bodies.wand)],
        armor: combineArmor(1, armors_bodies.lamellar),
        right_hand: combineWeapon(1, weapons_bodies.sword),
        left_hand: combineShield(1, shields_bodies.heater)
    },
    {
        name: "Yama",
        class: "prophet",
        character_description: "Yama is looking for strength in balance and is in no hurry to climb on the rampage.",
        equipment_description: "The blows of the huge Сlaymore are waiting for those who pass through the barrage of fire of the Rod.",
        stats: {str: 3, dex: 6, int: 4, wiz: 7, vit: 5},
        belt: ['stamina', 'manna', 'wave'],
        equipment: [combineWeapon(1, weapons_bodies.rod)],
        armor: combineArmor(1, armors_bodies.jacket),
        right_hand: combineWeapon(1, weapons_bodies.claymore),
        left_hand: free_hand
    },
    {
        name: "Nil",
        class: "nomad",
        character_description: "Hardy and unceremonious Nil quickly shows the enemy his place.",
        equipment_description: "A huge deadly Grandaxe and a powerful Crossbow - Nil does not experiment with weak weapons.",
        stats: {str: 6, dex: 4, int: 3, wiz: 5, vit: 7},
        belt: ['heal', 'manna', 'web'],
        equipment: [combineWeapon(1, weapons_bodies.crossbow)],
        armor: combineArmor(1, armors_bodies.plate),
        right_hand: combineWeapon(1, weapons_bodies.grandaxe),
        left_hand: free_hand
    },
];