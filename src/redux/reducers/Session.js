import { Map } from "immutable";
import {
  LOGIN_REQUEST,
  LOGIN_BY_USERID,
  IS_LOGGING,
  LOGGED,
  LOGIN_FAILED
} from "../actions/Session";

const initialState = Map({
  token: null,
  userId: null,
  user: null,
  companyId: null,
  accountId: null,
  account: null,
  roles: [],
  isLogging: false,
  logged: false,
  error: null
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return initialState;

    case LOGIN_BY_USERID:
      return state.merge({ isLogging: true });

    case IS_LOGGING:
      return state.merge({ isLogging: true });

    case LOGGED:
      const {
        token,
        userId,
        user,
        companyId,
        accountId,
        account,
        roles
      } = action.payload;
      return state.merge({
        token,
        userId,
        user,
        companyId,
        accountId,
        account,
        roles,
        isLogging: false,
        logged: true
      });

    case LOGIN_FAILED:
      return state.merge({
        isLogging: false,
        error: action.payload
      });

    default:
      return state;
  }
};

export default reducer;
