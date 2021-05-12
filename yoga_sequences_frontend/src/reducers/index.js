import { combineReducers } from 'redux';
import authReducer from '../reducers/auth';
import categoryReducer from '../reducers/categories';
import poseReducer from '../reducers/poses';
import sequenceReducer from '../reducers/sequences';
import poseInSeqReducer from '../reducers/poseInSeq';
import errorReducer from '../reducers/errors';

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    poses: poseReducer,
    sequences: sequenceReducer,
    poseInSequences: poseInSeqReducer,
    error: errorReducer
})

export default rootReducer;