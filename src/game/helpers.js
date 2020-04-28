
import _ from 'lodash';


export const calc_averages = (probe, match) => _.mapValues(_.zipObject(match, match), key => (_.reduce(probe, (sum, weapon) => sum + weapon[key], 0) / _.keys(probe).length).toFixed(2) );
