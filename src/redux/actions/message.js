export const ADD_MESSAGE = 'ADD_MESSAGE'
export const IS_ADDING_MESSAGE = 'IS_ADDING_MESSAGE'
export const ADDED_MESSAGE = 'ADDED_MESSAGE'
export const ADD_MESSAGE_FAIL = 'ADD_MESSAGE_FAIL'

//export const CLEAR_FLAGS = 'clearAddedFlag'

export const add = (message) => {
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}

export const isAdding = () => {
    return {
        type: IS_ADDING_MESSAGE,
        payload: isAdding
    }
}

export const addSuccess = () => {
    return {
        type: ADDED_MESSAGE
    }
}

export const addFail = (error) => {
    return {
        type: ADD_MESSAGE_FAIL,
        payload: error
    }
}

// export const dismiss = () => {
//     return {
//         type: ADD_MESSAGE_FAIL
//     }
// }







// import api from "../../middleware/api";
// import { keyBy } from "lodash";
// import {
//   addNewMessage,
//   getMessages as getChatMessagesByChatId, 
// } from "../messages/actions";


// export const MESSAGE_POST = "MESSAGE_POST";
// export const MESSAGE_POST_SUCCESS = "MESSAGE_POST_SUCCESS";
// export const MESSAGE_POST_FAIL = "MESSAGE_POST_FAIL";

// export function postMessage(message) {
//   return async (dispatch, getState) => {
//     dispatch({ type: MESSAGE_POST });
//     try {
//       api.postMessage(message).then(data => {
//         dispatch(postMessageSuccess(data.data));
//         //todo add new message in MESSAGES
//         //dispatch(addNewMessage(data.data))
//       });
//     } catch (error) {
//       dispatch({ type: MESSAGE_POST_FAIL, error });
//     }
//   };
// }

// export function postFileMessage(fileMessage) {
//   return async (dispatch, getState) => {
//     dispatch({ type: MESSAGE_POST });
//     try {
//       //отправляем новый файл на сервер
//       api.postFile(fileMessage.file).then(response => {       

//         imageId = response.data[0].id;
//         fileMessage.fileId = response.data[0].id;
//         //fileMessage.type = 2768654243000; //картинка
//         //fileMessage.text = "сообщение типа картинка";

//         api.postMessage(fileMessage).then(data => {
//           dispatch(postMessageSuccess(data.data));
//         });
//         //dispatch(postMessageSuccess(data.data));

//         //todo add new message in MESSAGES
//         //dispatch(addNewMessage(data.data))
//       });
//     } catch (error) {
//       dispatch({ type: MESSAGE_POST_FAIL, error });
//     }
//   };
// }

// export function postMessageSuccess(item) {
//   return {
//     type: MESSAGE_POST_SUCCESS,
//     payload: item
//   };
// }

// export function postMessageFail(error) {
//   return {
//     type: MESSAGE_POST_FAIL,
//     payload: error
//   };
// }
