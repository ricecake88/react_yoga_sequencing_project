import { combineReducers } from 'redux';
import authReducer from './auth';
import yogaCategoryReducer from './yogaCategories';
import yogaPoseReducer from './yogaPoses';

const rootReducer = combineReducers({
    auth: authReducer,
    yogaCategories: yogaCategoryReducer,
    poses: yogaPoseReducer
})

export default rootReducer;