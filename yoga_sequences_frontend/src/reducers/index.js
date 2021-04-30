import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './categories';
import poseReducer from './poses';
import sequenceReducer from './sequences';
import poseInSeqReducer from './poseInSeq';

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    poses: poseReducer,
    sequences: sequenceReducer,
    poseInSequences: poseInSeqReducer
})

export default rootReducer;