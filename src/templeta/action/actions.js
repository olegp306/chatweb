// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d
// Every action that has API calls usually goes through three stages in an app.

// Loading state -> FETCH_SEARCH_DATA
// Success -> FETCH_SEARCH_SUCCESS
// Failure -> FETCH_SEARCH_FAILURE

export function fetchSearchData(args) {
    return async (dispatch) => {
      // Initiate loading state
      dispatch({
        type: FETCH_SEARCH_DATA
      });
      try {
        // Call the API
        const result = await fetchSearchData(args.pageCount, args.itemsPerPage);
        
       // Update payload in reducer on success
       dispatch({
          type: FETCH_SEARCH_SUCCESS,
          payload: result,
          currentPage: args.pageCount
        });
      } catch (err) {
       // Update error in reducer on failure      
       dispatch({
          type: FETCH_SEARCH_FAILURE,
          error: err
        });
      }
    };
  }