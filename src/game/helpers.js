
import _ from 'lodash';


export const pick = (store, collection) => {
    return _.pickBy(collection, (item) => item.location == store.environment && !item.isHidden(store) )
};