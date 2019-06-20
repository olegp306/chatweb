export const CHANGE_NEW_MESSAGE = "CHANGE_NEW_MESSAGE";
export const CLEAN_NEW_MESSAGE = "CLEAN_NEW_MESSAGE";

export function changeNewMessage(message) {
  return {
    type: CHANGE_NEW_MESSAGE,
    payload: message
  };
}

export function cleanNewMessage(chatId) {
  return {
    type: CLEAN_NEW_MESSAGE,
    payload: { chatId }
  };
}
