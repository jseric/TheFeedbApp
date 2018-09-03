// Import modules/components/methods
import { FETCH_SURVEYS } from '../actions/types.js';

// Export reducer
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
    }
}
