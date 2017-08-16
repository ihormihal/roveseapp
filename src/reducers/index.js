import { combineReducers } from 'redux';
import router from './router';
import sellers from './sellers';

export default combineReducers({
  router, sellers
})
