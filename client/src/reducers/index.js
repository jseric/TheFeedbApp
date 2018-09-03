// Import modules/components/methods
import { combineReducers }      from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer.js'
import surveysReducer from './surveysReducer.js';

// Export reducers
export default combineReducers({
  auth:    authReducer,
  form:    reduxForm,
  surveys: surveysReducer
});
