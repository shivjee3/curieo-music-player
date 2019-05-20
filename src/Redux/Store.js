import { combineReducers, createStore } from 'redux';
import {reducer} from './Reducer';

const AppReducers = combineReducers({
    music : reducer,
});
const store = createStore(AppReducers);
export {store};