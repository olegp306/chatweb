// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d
// This reducer pattern defines the changes possible in its search state when the search API is called.
FETCH_SEARCH_DATA, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE, RESET_SEARCH_DATA


// Search Reducer
const initialState = {
    payload: [],
    isLoading: false,
    error: {}
  }
  export function searchReducer(state=initialState, action) {
    switch(action.type) {
      case FETCH_SEARCH_DATA:
        return {
          ...state,
          isLoading: true
      };
      
      case FETCH_SEARCH_SUCCESS:
        return {
          ...state,
          payload: action.payload,
          isLoading: false
        };
      
      case FETCH_SEARCH_FAILURE:
        return {
          ...state,
          error: action.error,
          isLoading: false      
        };
      case RESET_SEARCH_DATA:
        return { ...state, ...initialState }    
      default:
        return state;
    }
  }