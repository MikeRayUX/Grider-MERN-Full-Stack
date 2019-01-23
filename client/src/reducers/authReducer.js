// records whether or not the user is logged in
import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      // empty string is a falsy value in javascript
      return action.payload || false;
    default:
      return state;
  }
}
