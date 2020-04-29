import React, { Component } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import Fullscreen from "react-full-screen";
import _ from 'lodash';

import './css/weapon_selector.css';
import './css/header.css';
import './css/footer.css';
import './css/App.css';


import {Gin, isEnough, drawCost} from './bdcgin/Gin';
import GinGameMenu from './bdcgin/GinGameMenu';

import {rules} from './game/core/rules';

import {game_name} from './game/core/app_config';
import {getDefaultState} from './game/core/default_state';

import {buildings, calcFullCost, buyItem, collectItem} from './game/knowledge/buildings';
import {managers, hire} from './game/knowledge/managers';
import {upgrades, upgrade} from './game/knowledge/upgrades';



class App extends Component {
    constructor(props) {
        super(props);

        this.gin = new Gin(game_name, getDefaultState);
        //this.gin.addViewHandler(state => { console.log(state, this, this.setState); this.setState(state); });
        this.gin.connectReact(this);
        this.gin.registerRules(rules);
        this.state = getDefaultState();

    }

    componentDidMount() {
        this.gin.loadGame('FirstSave');
        this.gin.playGame();
    }

    componentDidCatch(error, info) {
        console.log('componentDidCatch', error, info);
        if (!localStorage.getItem(game_name+"_retry_flag")) { // production one-try-reloader
            localStorage.setItem(game_name+"_retry_flag", true);
            localStorage.setItem(game_name+"_app_state", null);
            window.location.reload(true);
            return true;
        }
        localStorage.setItem(game_name+"_retry_flag", false);
    }

    changeTab(tab_name) {
        this.gin.setState({tab: tab_name});
    }


    render() {
        let state = this.state;

        //console.log(state.target);

        const GinButton = (props) => {
            let item = props.item;
            //console.log(item);
            return (item.isLocked && item.isLocked(this.state))
                ? ''
                :
                <button style={{padding: '4px 4px'}}
                    className={(item.isDisabled && item.isDisabled(this.state)) ? 'disabled' : (item.cost ? isEnough(this.state, item.cost) ? '' : 'disabled' : '')}
                    onClick={() => { this.gin.onClick(item); }}>
                    {item.name}
                </button>
        };


        const ConsumableGinButton = (props) => <GinButton item={{
            name: props.item.name,
            isDisabled: (state) => !props.item.consumableIf(state, {attacker: 'player',  defender: 'target'}),
            onClick: (state) => { state.player.belt.splice(props.index, 1); return props.item.onConsume(state, {attacker: 'player',  defender: 'target'}); } }} />;

        const ShopGinButton = (props) => <GinButton item={{
            name: props.item.name,
            isDisabled: (state) => props.item.isDisabled(state, {attacker: 'player',  defender: 'target'}),
            onClick: (state) => props.item.onClick(state, {attacker: 'player',  defender: 'target'}) }} />;

        const ActionGinButton = (props) => <GinButton item={{
            name: props.item.name,
            cost: props.item.cost,
            isLocked: (state) => props.item.isHidden ? props.item.isHidden(state, {attacker: 'player',  defender: 'target'}) : false,
            isDisabled: (state) => props.item.isNotAllowed(state, {attacker: 'player',  defender: 'target'}),
            onClick: (state) => props.item.onAction(state, {attacker: 'player',  defender: 'target'}) }} />;
            // onClick: (state) => { return props.item.onAction(state, {attacker: 'player',  defender: 'target'}); } }} />;
    
    
    
    
    
        const CollectGinButton = (props) => <GinButton item={{
            name: 'Collect',
            isDisabled: (state) => state.buildings[props.item_key].fullness < props.item.cycle,
            cost: false,
            onClick: (state) => collectItem(state, props.item_key) }} />;
    
        const BuildingGinButton = (props) => <GinButton item={{
            name: 'Build',
            cost: calcFullCost(state, props.item_key),
            onClick: (state) => buyItem(state, props.item_key) }} />;
        
        const HireGinButton = (props) => <GinButton item={{
            name: 'Hire',
            cost: props.item.cost,
            onClick: (state) => hire(state, props.item_key) }} />;
        
        const UpGinButton = (props) => <GinButton item={{
            name: 'Upgrade',
            cost: props.item.cost,
            onClick: (state) => upgrade(state, props.item_key) }} />;
    
        
    
    
    
        const intro_subcomponent =
            <div className="filament">
                <div className="panel">
                    <h5>Welcome, new president! The party in honor of your inauguration went gloriously. It's time to get down to duty.</h5>
                </div>
                <div className="panel">
                    <button className="btn btn-lg" onClick={() => {
                        //this.setState({isFull: true});
                        this.changeTab('building');
                    }} title='Arena'>Start Build Your Country</button>
                </div>
                <h4 className="panel">
                    Disclaimer: the game on the early stages of development, bugs are possible! Developers will be grateful if in case of any problem you write to the Support.
                </h4>
            </div>;
    
    
        const shop_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Shop</h4>
                </div>
            </div>;
        
        const upgrade_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Upgrades</h4>
                    {_.map(upgrades, (item, key) =>
                        <div className="flex-element flex-container-row panel slim" key={key}>
                            <div className="flex-element flex-container-col slim">
                                <div className="flex-element">{item.name}</div>
                                <div className="flex-element">level: {state.upgrades[key].level}</div>
                            </div>
                            <div className="flex-element">
                                <div className="flex-element"><UpGinButton item={item} item_key={key} key={key} /></div>
                                <div className="flex-element">Cost: <div className="flex-element">{drawCost(item.cost)}</div></div>
                            </div>
        
                        </div>
                    )}
                </div>
            </div>;
        
        const building_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Building</h4>
                    {_.map(buildings, (item, key) =>
                        <div className="flex-element flex-container-row panel slim" key={key}>
                            <div className="flex-element flex-container-col slim">
                                <div className="flex-element"><h5>{item.name}</h5></div>
                                <div className="flex-element">level: {state.buildings[key].level}</div>
                            </div>
                            <div className="flex-element flex-container-col slim">
                                <div className="flex-element"><CollectGinButton item={item} item_key={key} key={key} /></div>
                                <div className="flex-element">Cycle: {state.buildings[key].fullness}/{item.cycle}</div>
                                <div className="flex-element">Profit: ({drawCost(item.profit)} X {state.buildings[key].level} X {state.buildings[key].modifier}) = {_.values(item.profit)[0] * state.buildings[key].level * state.buildings[key].modifier}</div>
                            </div>
                            <div className="flex-element">
                                <div className="flex-element"><BuildingGinButton item={item} item_key={key} key={key} /></div>
                                <div className="flex-element">Cost: <div className="flex-element">{drawCost(calcFullCost(state, key))}</div></div>
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>;
        
        const managers_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Managers</h4>
                    {_.map(managers, (item, key) =>
                        <div className="flex-element flex-container-row panel slim" key={key}>
                            <div className="flex-element flex-container-col slim">
                                <div className="flex-element">{item.name}</div>
                            </div>
                            {state.managers[key].hired ?
                                <div className="flex-element">
                                    <h4>Hired</h4>
                                </div>
                                :
                                <div className="flex-element">
                                    <div className="flex-element"><HireGinButton item={item} item_key={key} key={key}/></div>
                                    <div className="flex-element">Cost:
                                        <div className="flex-element">{drawCost(item.cost)}</div>
                                    </div>
                                </div>
                            }
        
                        </div>
                    )}
                </div>
            </div>;
        
        const settings_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Setting</h4>
                </div>
            </div>;
        
        
        return (
            <Fullscreen
                enabled={this.state.isFull}
                onChange={isFull => this.gin.setState({isFull})}
            >
                <div className="App">
                    <div className="filament content_container" role="main">
                        <div className="header row">
                            <span className="col-xs filament">{state.balances.money} Money</span>
                            {state.balances.goods > 0 ? <span className="col-xs filament">{state.balances.goods} Goods</span> : ''}
                            {state.balances.oil > 0 ? <span className="col-xs filament">{state.balances.oil}   Oil</span> : ''}
                        </div>
                        
                        {this.state.tab === 'intro' ?
                            intro_subcomponent
                            : ''}
                        
    
                        {this.state.tab === 'shop' ?
                            shop_subcomponent
                            : ''}
                        {this.state.tab === 'upgrade' ?
                            upgrade_subcomponent
                            : ''}
                        {this.state.tab === 'building' ?
                            building_subcomponent
                            : ''}
                        {this.state.tab === 'managers' ?
                            managers_subcomponent
                            : ''}
                        {this.state.tab === 'settings' ?
                            settings_subcomponent
                            : ''}

                        <div style={{width: '100%', height: '10px'}}></div>
                        
                        <div className="footer row">
                            <span className="col-xs filament"><a onClick={() => { this.changeTab('shop'); }}     title='Shop'>      Shop</a></span>
                            <span className="col-xs filament"><a onClick={() => { this.changeTab('upgrade'); }}  title='Upgrade'>   Upgrade</a></span>
                            <span className="col-xs filament"><a onClick={() => { this.changeTab('building'); }} title='Building'>  Building</a></span>
                            <span className="col-xs filament"><a onClick={() => { this.changeTab('managers'); }} title='Managers'>  Managers</a></span>
                            <span className="col-xs filament"><a onClick={() => { this.changeTab('settings'); }} title='Settings'>   Setting</a></span>
                        </div>
                    </div>
                </div>
            </Fullscreen>
        );
    }
}

export default App;
