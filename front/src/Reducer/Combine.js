import { combineReducers } from 'redux'
import itemsReducer from './ItemsReducer';
import subItemsReducer from './SubItemsReducer';

export default combineReducers({
  itemsReducer : itemsReducer,
  subItemsReducer : subItemsReducer,
})