
import _ from 'lodash';

import {rules} from '../game/core/rules';

export const frame = (state) => {
    //console.log(state);

    _.each(rules, (item) => {
        if (item.onFrame) state = item.onFrame(state);
    });

    return state;
};