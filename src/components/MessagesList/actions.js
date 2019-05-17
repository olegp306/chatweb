 import api from '../../api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 export const MESSAGES_FETCH='MESSAGES_FETCH';
 export const MESSAGES_FETCH_SUCCESS='MESSAGES_FETCH_SUCCESS';
 export const MESSAGES_FETCH_FAIL='MESSAGES_FETCH_FAIL';

 export const MESSAGES_ADD_NEW='MESSAGES_ADD_NEW';
 export const MESSAGES_REMOVE='MESSAGES_REMOVE';


 export function fetchMessages(chatId) {
    return async(dispatch, getState) => {
      try {
        dispatch({ type: MESSAGES_FETCH, chatId });

         api.getMessagesByChatId(chatId)
         .then(data=>dispatch(fetchMessagesSuccess(data.data)))

      } catch (error) {
        dispatch({ type: MESSAGES_FETCH_FAIL, error });        
      }
    };
  }

  export function fetchMessagesSuccess(items) {
    return {
      type: MESSAGES_FETCH_SUCCESS,
      payload:keyBy(items, 'id')
    }   
  }

  export function fetchMessagesFail(error) {
    return {
      type: MESSAGES_FETCH_FAIL,
      payload: error
    } 
  }
  
  export function addNewMessage(item) {
    return {
      type: MESSAGES_ADD_NEW,
      payload: item
    } 
  }

  export function removeMessages() {
    return {
      type: MESSAGES_REMOVE,
      //payload: item
    } 
  }
  