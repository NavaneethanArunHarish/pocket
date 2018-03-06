import { combineReducers } from 'redux';
import { GET_GROUP } from '../actions';

function groupReducer(state = {}, action) {
  switch(action.type) {
    case GET_GROUP:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  group: groupReducer
});