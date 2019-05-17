import {
  MESSAGES_FETCH,
  MESSAGES_FETCH_SUCCESS,
  MESSAGES_FETCH_FAIL
} from "./actions.js.js";

import { Map } from "immutable";

const initialState = new Map({
  items: {},
  isFetching: false,
  fetched: false,
  error: null,

  refreshing: false
});

// export default (messagesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case MESSAGES_FETCH:
//       return state.merge({ isFetching: true, fetched: false, error: null });

//     case MESSAGES_FETCH_SUCCESS:
//       return state.merge({
//         isFetching: false,
//         fetched: true,
//         items: action.payload
//       });

//     case MESSAGES_FETCH_FAIL:
//       return state.merge({ isFetching: false, error: action.payload });

//     default:
//       return state;
//   }
// });
