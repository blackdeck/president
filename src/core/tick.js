
import _ from 'lodash';

import {rules} from '../game/core/rules';

export const tick = (state) => {
    //console.log(state);

    _.each(rules, (item) => {
        if (item.onTick) state = item.onTick(state);
    });

    return state;
};