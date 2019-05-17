import api from '../../api'
import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
export const CHAT_APP_DATA_USERS_FETCH='CHAT_APP_DATA_USERS_FETCH';
export const CHAT_APP_DATA_USERS_FETCH_SUCCESS='USERS_FETCH_SUCCESS';
export const CHAT_APP_DATA_USERS_FETCH_FAIL='USERS_FETCH_FAIL';

// axios.all([api.getMessagesByChatId(this.state.currentChatId), api.getUsersByChatId(this.state.currentChatId), api.getUserChats(this.state.currentUserId),api.getUsersAvailableToAdd(this.state.currentChatId),api.getUnreadMessage(this.state.currentUserId)])
//         .then(axios.spread((respMessages, respUsers, respChats,respUsersAvailableToAdd,respunreadMessages) => {
//             let hasNewMessage=(Object.keys(this.state.messages).length != respMessages.data.length);
//             let hasNewchatUsers=(Object.keys(this.state.chatUsers).length != respUsers.data.length);
//             let hasNewChats=(Object.keys(this.state.chats).length != respChats.data.length);
//             let hasNewUsersAvailableToAdd=(Object.keys(this.state.availableToAddUsers).length != respUsersAvailableToAdd.data.length);
//             let hasNewUnreadMessages=(Object.keys(this.state.unreadMessages).length <respunreadMessages.data.length);
//             if (hasNewMessage || hasNewchatUsers || hasNewChats || hasNewUnreadMessages || hasNewUsersAvailableToAdd ) {
//             //  console.log('hasNewMessage',hasNewMessage);

export function fetchChatAppInitialData(chatId) {
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

  export function fetchChatAppInitialDataSuccess(items) {
    return {
      type: CHAT_APP_DATA_USERS_FETCH_SUCCESS,
      //payload:keyBy(items, 'id')
    }   
  }

  export function fetchChatAppInitialDataFail(error) {
    return {
      type: CHAT_APP_DATA_USERS_FETCH_FAIL,
      payload: error
    } 
  }



