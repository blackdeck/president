import React, { Component } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import Fullscreen from "react-full-screen";
import _ from 'lodash';

import './css/header.css';
import './css/footer.css';
import './css/event.css';
import './css/App.css';


import {Gin, isEnough, drawCost} from './bdcgin/Gin';
import GinGameMenu from './bdcgin/GinGameMenu';
import GinButton, {StorageGinButton, CollectGinButton, BuildingGinButton, HireGinButton, UpGinButton } from "./bdcgin/GinButton";

import {rules} from './game/core/rules';
import {pick, calcPrestige, reset} from './game/helpers';

import {game_name} from './game/core/app_config';
import {getDefaultState} from './game/core/default_state';

import {storage, calcStorageCost, buyStorage} from './game/knowledge/storage';
import {buildings, calcBuildCost, buildItem, collectItem} from './game/knowledge/buildings';
import {managers, hire} from './game/knowledge/managers';
import {upgrades, calcUpgradeCost, upgrade} from './game/knowledge/upgrades';
import {checkDisabled, confirmEvent, passEvent} from './game/knowledge/events';



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
    
        
        const header_subcomponent =
            <div className="header flex-container-row col">
                <div className="col-xs  flex-element filament">
                    <div className="row-xs filament">{state.balances.money} Money</div>
                    <div className="row-xs filament">filed: {(state.balances.money/state.storage_limit.money*100).toFixed(0)}%</div>
                </div>
                {state.buildings.goods1.level > 0 && state.environment == 'earth' ?
                    <div className="col-xs flex-element filament">
                        <div className="row-xs filament">{state.balances.goods} Goods</div>
                        <div className="row-xs filament">filed: {(state.balances.goods/state.storage_limit.goods*100).toFixed(0)}%</div>
                    </div> : ''}
                {state.buildings.oil1.level > 0 && state.environment == 'earth' ?
                    <div className="col-xs flex-element filament">
                        <div className="row-xs filament">{state.balances.oil}   Oil</div>
                        <div className="row-xs filament">filed: {(state.balances.oil/state.storage_limit.oil*100).toFixed(0)}%</div>
                    </div> : ''}
                {state.buildings.money1space.level > 0 && state.environment == 'space' ?
                    <div className="col-xs flex-element filament">
                        <div className="row-xs filament">{state.balances.materials} Materials</div>
                        <div className="row-xs filament">filed: {(state.balances.materials/state.storage_limit.materials*100).toFixed(0)}%</div>
                    </div> : ''}
                {state.buildings.materials1space.level > 0 && state.environment == 'space' ?
                    <div className="col-xs flex-element filament">
                        <div className="row-xs filament">{state.balances.helium}   Helium</div>
                        <div className="row-xs filament">filed: {(state.balances.helium/state.storage_limit.helium*100).toFixed(0)}%</div>
                    </div> : ''}
    
                {state.buildings.rocket.level > 0 ?
                    <div className="col-xs flex-element filament">
                        <div className="row-xs filament"><GinButton item={{
                            name: state.environment == 'earth' ? 'Space' : 'Earth',
                            onClick: (state) => { state.environment = state.environment == 'earth' ? 'space' : 'earth'; return state; }
                        }} state={this.state} gin={this.gin} /></div>
                        <div className="row-xs filament">Rockets: {state.special.rockets.toFixed(0)}</div>
                    </div> : ''}
            </div>;
        
        
        const intro_subcomponent =
            <div className="filament">
                <div className="panel">
                    <h3>Welcome, new president!</h3>
                    <h4>The party in honor of your inauguration went gloriously.</h4>
                    <h4>It's time to get down to duty.</h4>
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
        
    
        const event_trigger_subcomponent =
            <div className="event_trigger filament" onClick={() => this.gin.onClick({onClick: (store) => { store.event.opened = true; return store; }})}>
                <h2>Event!</h2>
            </div>;
    
        const event_popup_subcomponent =
            <div className="event_popup filament">
                <div className="panel">
                    <h3>{this.state.event.name}</h3>
                    <h4>{this.state.event.text}</h4>
                    <GinButton item={{
                        name: 'Confirm',
                        isDisabled: checkDisabled,
                        onClick: confirmEvent,
                    }} state={this.state} gin={this.gin} />
                    <GinButton item={{
                        name: 'Decline',
                        onClick: passEvent,
                    }} state={this.state} gin={this.gin} />
                </div>
            </div>;
    
        const shop_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Shop</h4>
                    <div className="col-xs flex-element filament">
                        <div className="row-xs filament"><h3>Cheats!</h3></div>
                        <div className="row-xs filament"><GinButton item={{
                            name: 'Add Million Dollars',
                            onClick: (store) => { store.balances.money += 1000000; return store; }
                        }} state={this.state} gin={this.gin} /></div>
                        <div className="row-xs filament"><GinButton item={{
                            name: 'Fill Storage',
                            onClick: (store) => {
                                _.each(store.balances, (value, key) => {
                                    store.balances[key] = store.storage_limit[key];
                                });
                                return store; }
                        }} state={this.state} gin={this.gin} /></div>
                        <div className="row-xs filament">
                            <GinButton item={{
                                name: 'Additional Builder',
                                onClick: (store) => { store.constructors++; return store; }
                                }} state={this.state} gin={this.gin} />
                            Current builders: {this.state.constructors}
                        </div>
        
                        { 1 == 0 ?
                            <div className="row-xs filament"><GinButton item={{
                                name: 'Broke The Game',
                                onClick: (store) => { store.balances.money += 100000000; store.balances.goods += 10000000; store.balances.oil += 1000000; return store; }
                            }} state={this.state} gin={this.gin} /></div>
                            : '' }
    
                    </div>
                </div>
            </div>;
        
        const upgrade_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Upgrades</h4>
                    {_.map(pick(state, upgrades), (item, key) =>
                        <div className="flex-element flex-container-row panel filament" key={key}>
                            <div className="flex-element flex-container-row slim">
                                <div className="flex-element slim"><h3 className="slim">{state.upgrades[key].level}</h3></div>
                                <div className="flex-element slim"><h5>{item.name}</h5></div>
                            </div>
                            <div className="flex-element">
                                <div className="flex-element">Affected:</div>
                                <div className="flex-element">{drawCost(item.affected, true)}</div>
                            </div>
                            <div className="flex-element">
                                <div className="flex-element"><UpGinButton item={item} item_key={key} key={key} state={this.state} gin={this.gin} /></div>
                                <div className="flex-element">Cost: {drawCost(calcUpgradeCost(state, key))}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>;
        
        const building_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Building</h4>
                    <h5 className="slim">Storage</h5>
                    <div className="flex-container-row slim">
                        {_.map(pick(state, storage), (item, key) =>
                            <div className="flex-element flex-container-row panel filament" key={key}>
                                <div className="flex-element flex-container-col slim">
                                    <div className="flex-element slim"><h3 className="slim">{state.storage[key].level}</h3></div>
                                    <div className="flex-element">Fullness {state.balances[item.resource]}/{state.storage_limit[item.resource]} ({(state.balances[item.resource]/state.storage_limit[item.resource]*100).toFixed(2)}%)</div>
                                </div>
                                <div className="flex-element">
                                    <div className="flex-element"><StorageGinButton item={item} item_key={key} key={key} state={this.state} gin={this.gin} /></div>
                                    <div className="flex-element">Cost: {drawCost(calcStorageCost(state, key))}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <h5 className="slim">Industries</h5>
                    {_.map(pick(state, buildings), (item, key) =>
                        <div className="flex-element flex-container-row panel filament" key={key}>
                            <div className="flex-element flex-container-row slim">
                                <div className="flex-element slim"><h3 className="slim">{state.buildings[key].level}</h3></div>
                                <div className="flex-element slim"><h5>{item.name}</h5></div>
                            </div>
                            <div className="flex-element flex-container-col slim">
                                <div className="flex-element flex-container-row slim">
                                    <div className="flex-element"><CollectGinButton item={item} item_key={key} key={key} state={this.state} gin={this.gin} /></div>
                                    <div className="flex-element">Cycle: {state.buildings[key].fullness}/{item.cycle}</div>
                                </div>
                                <div className="flex-element">Profit: {_.values(item.profit)[0]} x {state.buildings[key].level} x {state.buildings[key].modifier} = {_.values(item.profit)[0] * state.buildings[key].level * state.buildings[key].modifier} {item.type} or {(_.values(item.profit)[0] * state.buildings[key].level * state.buildings[key].modifier / item.cycle * 10).toFixed(0)}/sec </div>
                            </div>
                            <div className="flex-element">
                                <div className="flex-element"><BuildingGinButton item={item} item_key={key} key={key} state={this.state} gin={this.gin} /></div>
                                <div className="flex-element">Cost: {drawCost(calcBuildCost(state, key))}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>;
        
        const managers_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Managers</h4>
                    {_.map(pick(state, managers), (item, key) =>
                        <div className="flex-element flex-container-row panel filament" key={key}>
                            <div className="flex-element flex-container-col slim">
                                <div className="flex-element">{item.name}</div>
                            </div>
                            {state.managers[key].hired ?
                                <div className="flex-element">
                                    <h4>Hired</h4>
                                </div>
                                :
                                <div className="flex-element">
                                    <div className="flex-element"><HireGinButton item={item} item_key={key} key={key} state={this.state} gin={this.gin} /></div>
                                    <div className="flex-element">Cost: {drawCost(item.cost)}</div>
                                </div>
                            }
        
                        </div>
                    )}
                </div>
            </div>;
        
        const reputation_subcomponent =
            <div className="filament">
                <div className="flex-container-col panel">
                    <h4 className="slim">Reputation</h4>
                    <div className="col-xs flex-element filament">
                        <div className="row-xs filament"><h4>Reset</h4></div>
                        
                        <div className="row-xs filament">When reset, the game will start again and you will get a discount to the base cost of all buildings.</div>
                        <div className="row-xs filament">The size of the discount depends on the current number of buildings.</div>
                        <div className="row-xs filament">
                            <h4>Current discount {state.prestige}%</h4>
                        </div>
                        <div className="row-xs filament"><GinButton item={{
                            name: 'Reset +' + calcPrestige(state) + '%',
                            onClick: reset
                        }} state={this.state} gin={this.gin} /></div>
                        
                    </div>
                </div>
            </div>;
        
        const footer_subcomponent =
            <div className="footer col">
                <span className="col-xs filament"><a onClick={() => { this.changeTab('shop'); }}     title='Shop'>      Shop</a></span>
                <span className="col-xs filament"><a onClick={() => { this.changeTab('upgrade'); }}  title='Upgrade'>   Upgrade</a></span>
                <span className="col-xs filament"><a onClick={() => { this.changeTab('building'); }} title='Building'>  Building</a></span>
                <span className="col-xs filament"><a onClick={() => { this.changeTab('managers'); }} title='Managers'>  Managers</a></span>
                <span className="col-xs filament"><a onClick={() => { this.changeTab('reputation'); }} title='Reputation'>   Reputation</a></span>
            </div>;
        
        
        return (
            <Fullscreen
                enabled={this.state.isFull}
                onChange={isFull => this.gin.setState({isFull})}
            >
                <div className="App" style={{backgroundImage: 'url(/bg-' + state.environment + '.png)'}}>
                    <div className="filament content_container" role="main">
                        {this.state.tab !== 'intro' ?
                            header_subcomponent
                            : ''}
                        
                        {this.state.tab === 'intro' ?
                            intro_subcomponent
                            : ''}
                            
                        {this.state.event !== false && this.state.event.opened === false ?
                            event_trigger_subcomponent
                            : ''}
                        {this.state.event !== false && this.state.event.opened === true ?
                            event_popup_subcomponent
                            : ''}
    
                        <div style={{width: '100%', height: '70px'}}></div>
                        
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
                        {this.state.tab === 'reputation' ? 
                            reputation_subcomponent
                            : ''}

                        <div style={{width: '100%', height: '40px'}}></div>
    
                        {this.state.tab !== 'intro' ?
                            footer_subcomponent
                            : ''}
                    </div>
                </div>
            </Fullscreen>
        );
    }
}

export default App;
