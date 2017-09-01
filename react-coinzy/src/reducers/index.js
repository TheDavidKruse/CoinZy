import coins from './coins';
import chat from './chat';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
     chat,
   coins

});
export default rootReducer;
