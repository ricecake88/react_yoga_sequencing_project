import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './categories';
import poseReducer from './poses';
import sequenceReducer from './sequences';

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    poses: poseReducer,
    sequences: sequenceReducer
})

export default rootReducer;