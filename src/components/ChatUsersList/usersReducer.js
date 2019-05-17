import {
  USERS_FETCH,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAIL
} from "./actions.js.js";

import { Map } from "immutable";

const initialState = new Map({
  items: {},
  isFetching: false,
  fetched: false,
  error: null
});

// export default  usersReducer = (state = initialState, action) => {
//     return state;  
// }

// export default  usersReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USERS_FETCH:
//       return state.merge({ isFetching: true, fetched: false, error: null });

//     case USERS_FETCH_SUCCESS:
//       return state.merge({
//         isFetching: false,
//         fetched: true,
//         items: action.payload
//       });

//     case USERS_FETCH_FAIL:
//       return state.merge({ isFetching: false, error: action.payload });

//     default:
//       return state;
//   }
// };
