 import api from '../../api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 export const CHATS_FETCH='CHATS_FETCH';
 export const CHATS_FETCH_SUCCESS='CHATS_FETCH_SUCCESS';
 export const CHATS_FETCH_FAIL='CHATS_FETCH_FAIL';



 export function fetchChats(chatId) {
    return async(dispatch, getState) => {
      try {
        dispatch({ type: CHATS_FETCH, chatId });
         api.getUserChats(chatId)
         .then(data=>dispatch(fetchChatsSuccess(data.data)))

      } catch (error) {
        dispatch({ type: CHATS_FETCH_FAIL, error });        
      }
    };
  }

  export function fetchChatsSuccess(items) {
    return {
      type: CHATS_FETCH_SUCCESS,
      payload:keyBy(items, 'id')
    }   
  }

  export function fetchChatsFail(error) {
    return {
      type: CHATS_FETCH_FAIL,
      payload: error
    } 
  }
