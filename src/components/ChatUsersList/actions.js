
 import api from '../../api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 export const USERS_FETCH='USERS_FETCH';
 export const USERS_FETCH_SUCCESS='USERS_FETCH_SUCCESS';
 export const USERS_FETCH_FAIL='USERS_FETCH_FAIL';

 export function fetchUsers(chatId) {
    return async(dispatch, getState) => {
      
        try {
          dispatch({ type: USERS_FETCH, chatId });

         api.getUsersByChatId(chatId)
         .then(data=>dispatch(fetchUsersSuccess(data.data)))

      } catch (error) {
        dispatch({ type: USERS_FETCH_FAIL, error });        
      }
    };
  }

  export function fetchUsersSuccess(items) {
    return {
      type: USERS_FETCH_SUCCESS,
      payload:keyBy(items, 'id')
    }   
  }

  export function fetchUsersFail(error) {
    return {
      type: USERS_FETCH_FAIL,
      payload: error
    } 
  }