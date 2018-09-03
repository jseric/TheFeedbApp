// Import modules/components/methods
import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types.js';

// Fetch current logged user
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({
    type:    FETCH_USER,
    payload: res.data
  });
};

// Post payment data
export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({
    type:    FETCH_USER,
    payload: res.data
  });
};

// Submit survey
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  // Redirect back to /surveys
  history.push('/surveys');

  dispatch({
    type:    FETCH_USER,
    payload: res.data
  });
};

// Fetch surveys by current user
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({
    type:    FETCH_SURVEYS,
    payload: res.data
  });
};
