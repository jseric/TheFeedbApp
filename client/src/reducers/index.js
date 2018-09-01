// Import modules/components/methods
import { combineReducers } from 'redux';

import authReducer from './authReducer.js'

// Export reducers
export default combineReducers({
  auth: authReducer
});
