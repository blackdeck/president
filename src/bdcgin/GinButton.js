
import React, { Component } from 'react';

import _ from 'lodash';

import {isEnough} from "./Gin";

import {storage, calcStorageCost, buyStorage} from '../game/knowledge/storage';
import {buildings, buildItem, calcBuildCost, calcBuildDuration, calcProfit, calcBuildPercent, collectItem} from "../game/knowledge/buildings";
import {hire} from "../game/knowledge/managers";
import {calcUpgradeCost, upgrade} from "../game/knowledge/upgrades";

export default class GinButton extends Component {
    render() {
        let item = this.props.item;
        let state = this.props.state;
        return (
            <button style={{padding: '4px 4px'}}
                    className={(item.isDisabled && item.isDisabled(state)) ? 'disabled' : (item.cost ? isEnough(state, item.cost) ? '' : 'disabled' : '')}
                    onClick={() => { this.props.gin.onClick(item); }}>
                {item.name}
            </button>
        );
    }
}

export class ConsumableGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name: this.props.item.name,
                    isDisabled: (state) => !this.props.item.consumableIf(state, {attacker: 'player',  defender: 'target'}),
                    onClick: (state) => { state.player.belt.splice(this.props.index, 1); return this.props.item.onConsume(state, {attacker: 'player',  defender: 'target'}); }
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}

export class ShopGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name: this.props.item.name,
                    isDisabled: (state) => this.props.item.isDisabled(state, {attacker: 'player',  defender: 'target'}),
                    onClick: (state) => this.props.item.onClick(state, {attacker: 'player',  defender: 'target'})
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}

export class ActionGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name: this.props.item.name,
                    cost: this.props.item.cost,
                    isLocked: (state) => this.props.item.isHidden ? this.props.item.isHidden(state, {attacker: 'player',  defender: 'target'}) : false,
                    isDisabled: (state) => this.props.item.isNotAllowed(state, {attacker: 'player',  defender: 'target'}),
                    onClick: (state) => this.props.item.onAction(state, {attacker: 'player',  defender: 'target'})
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}

export class CollectGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name: 'Collect ' + _.values(calcProfit(this.props.state, this.props.item_key))[0] + ' ' + buildings[this.props.item_key].type,
                    isDisabled: (state) => state.buildings[this.props.item_key].fullness < this.props.item.cycle,
                    cost: false,
                    onClick: (state) => collectItem(state, this.props.item_key)
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}

export class StorageGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name:    'Expand',
                    cost:    calcStorageCost(this.props.state, this.props.item_key),
                    onClick: (state) => buyStorage(state, this.props.item_key)
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}
export class BuildingGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name:    this.props.state.buildings[this.props.item_key].busy
                                 ? 'Build ' + calcBuildPercent(this.props.state, this.props.item_key) + '%'
                                 : 'Build ' + (calcBuildDuration(this.props.state, this.props.item_key)/10).toFixed(0) + ' sec',
                    cost:    calcBuildCost(this.props.state, this.props.item_key),
                    isDisabled: (state) => this.props.state.buildings[this.props.item_key].busy || this.props.state.constructing.length >= this.props.state.constructors,
                    onClick: (state) => buildItem(state, this.props.item_key)
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}

export class HireGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name: 'Hire',
                    cost: this.props.item.cost,
                    onClick: (state) => hire(state, this.props.item_key)
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}

export class UpGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name: 'Upgrade',
                    cost:    calcUpgradeCost(this.props.state, this.props.item_key),
                    onClick: (state) => upgrade(state, this.props.item_key)
                }}
                state={this.props.state}
                gin={this.props.gin}
            />
        );
    }
}