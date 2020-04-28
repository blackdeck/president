
import _ from 'lodash';

export class Gin {
    constructor(game_name, stateGenerator = () => {} ) {
        this.game_name = game_name;

        this.store = _.assign({
            game_speed: 60000,
            frame_rate: 60,
            game_speed_multiplier: 1,
            frame: 0,
            tick: 0,
            game_paused: true
        }, stateGenerator());

        this.stateGenerator = stateGenerator;

        this.views = [];
        this.rules = [];

        this.timerID = 0;
        this.publish_timerID = 0;
        this.recently_updated = false;

        /*
        this.game_speed = 60000;
        this.frame_rate = 60;
        this.game_speed_multiplier = 1;
        this.frame = 0;
        this.tick = 0;
        this.game_paused = true;
        */

        //this.playGame = this.playGame.bind(this);
        //this.pauseGame = this.pauseGame.bind(this);
        //this.setGameSpeed = this.setGameSpeed.bind(this);
        //this.frame = this.frame.bind(this);
        //this.tick = this.tick.bind(this);

    }
    
    addDefaultStateGenerator = (stateGenerator) => {
        this.stateGenerator = stateGenerator;
    };

    addViewHandler = (stateUpdater) => {
        this.views.push({setState: (new_state) => { return stateUpdater(new_state); }});
    };

    addViewApp = (ViewApp) => {
        this.views.push(ViewApp);
    };

    connectReact = (App) => {
        this.addViewApp(App);
    };

    loadGame = (save_name = '') => {
        localStorage.setItem(this.game_name + "_current_save_name", save_name);
        var app_state = JSON.parse(localStorage.getItem(this.game_name + "_save_" + save_name));
        this.setState(app_state ? app_state : this.stateGenerator());
    };

    saveGame = (state) => {
        let save_name = localStorage.getItem(this.game_name + "_current_save_name");
        localStorage.setItem(this.game_name + "_save_" + save_name, JSON.stringify(state));
    };

    newGame() {
        // if (!window.confirm('Are you ready to start a new game? Your progress will be lost.')) return false;

        let save_name = localStorage.getItem(this.game_name + "_current_save_name");
        localStorage.setItem(this.game_name + "_save_" + save_name, null);
        this.setState(this.stateGenerator());
        this.playGame();
    }

    setState = (next_state, timeout = 0) => {
        // console.log('setState', next_state, timeout, this.recently_updated);

        this.store = _.assign(this.store, next_state);

        if (timeout === 0 || !this.recently_updated) {

            clearInterval(this.publish_timerID);
            this.publish_timerID = setTimeout(
                () => { this.recently_updated = false; }, timeout);
            this.recently_updated = true;
            this.saveGame(this.store);
            _.each(this.views, view => view.setState(_.cloneDeep(this.store)) );
        }
    };

    onClick = (item) => {
        //console.log(item);
        let state = this.store;
        if (item.isDisabled && item.isDisabled(state)) {
            return false;
        }
        if (item.cost) {
            if (isEnough(state, item.cost)) {
                if (item.onClick) this.setState(item.onClick(chargeCost(state, item.cost), {gin: this}), 25);
            }
            else {
                return false;
            }
        }
        else {
            if (item.onClick) this.setState(item.onClick(state, {gin: this}), 25);
        }
    };
    
    playGame = (speed_multiplier = false) => {
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => this.onInterval(),
            Math.floor(this.store.game_speed
                / this.store.frame_rate
                / (speed_multiplier ? speed_multiplier : this.store.game_speed_multiplier))
        );
        this.setState({game_paused: false});
    };

    pauseGame = () => {
        clearInterval(this.timerID);
        this.setState({game_paused: true});
    };

    setGameSpeed = (speed) => {
        this.setState({game_speed_multiplier: speed});
        if (!this.store.game_paused) this.playGame(speed);
    };
    
    registerRule = (rule) => {
        this.rules.push(rule);
    };
    
    registerRules = (rules) => {
        _.each(rules, rule => this.registerRule(rule));
    };
    
    onInterval = () => {
        let state = this.store;
        // console.log('onInterval', state, this.rules, this.views);

        // console.log(state);

        if (state.frame % state.frame_rate === 0) {
            state = this.onTick(state);
            state.tick++;
        }

        state = this.onFrame(state);
        state.frame++;

        //    localStorage.setItem(game_name+"_app_state", JSON.stringify(state));
        this.setState(state, 250);
    };

    onFrame = (state) => {
        // console.log('onFrame', state);
        _.each(this.rules, (item) => {
            if (item.onFrame) state = item.onFrame(state, {gin: this});
        });

        return state;
    };
    
    onTick = (state) => {
        // console.log('onTick', state);
        _.each(this.rules, (item) => {
            if (item.onTick) state = item.onTick(state, {gin: this});
        });

        return state;
    };
}


export function isEnough(state, cost) {
    let enough = true;
    _.each(cost, (value, resource_key) => {
        if (_.get(state, resource_key) < value) enough = false;
       // console.log(_.get(state, resource_key), resource_key);
    });

    //console.log(state, cost, enough);

    return enough;
}

export function chargeCost(state, cost) {
    if (!isEnough(state, cost)) return false;
    _.each(cost, (value, resource_key) => {
        let result = _.get(state, resource_key) - value;
        _.set(state, resource_key, result);
    });
    return state;
}

export function gainCost(state, cost) {
    _.each(cost, (value, resource_key) => {
        let result = _.get(state, resource_key) + value;
        _.set(state, resource_key, result);
    });
    return state;
}

export function drawCost(cost) {
    let text = '';
    _.each(cost, (value, resource) => {
        if (value > 0) {
            text += resource + ': ' + value + ' ';
        }
    });
    return text;
}


export function obtain(state, key) {
    console.log(state, key, state.tech[key]);
    state.tech[key] = true;
    console.log(state, key, state.tech[key]);
    return state;
}
