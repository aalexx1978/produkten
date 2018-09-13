import initialState from "./initialState";
import { FETCH_DATA, RECEIVE_DATA,DELETE, ADD} from "../actions/allActions";

export default function appRed(state = initialState, action) {
  switch (action.type) {
      case FETCH_DATA:
      return {...state};
      case RECEIVE_DATA:
      return {...state,data:action.data};
      case DELETE:
          return {...state,data:action.data, remove:action.remove};
      case ADD:
          return {...state, data:action.data, remove:action.remove};
default:
      return state;
  }
}
