import { combineReducers } from 'redux';
import authReducer from './auth';
import yogaCategoryReducer from './yogaCategories';

const rootReducer = combineReducers({
    auth: authReducer,
    yogaCategories: yogaCategoryReducer
})

export default rootReducer;