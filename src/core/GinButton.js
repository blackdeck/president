
import React, { Component } from 'react';
import {isEnough} from "../bdcgin/Gin";
import {buyItem, calcBuildCost, collectItem} from "../game/knowledge/buildings";
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
                    name: 'Collect',
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

export class BuildingGinButton extends Component {
    render() {
        return (
            <GinButton
                item={{
                    name:    'Build',
                    cost:    calcBuildCost(this.props.state, this.props.item_key),
                    onClick: (state) => buyItem(state, this.props.item_key)
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
