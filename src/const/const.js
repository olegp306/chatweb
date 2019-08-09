export const CLIENT_ID = "kdwcc83defm8o7bkdwcc83defm8o7b";
// https://apitest.allwingroup.ru/germes/v1
// https://service.allwingroup.ru/germes/v1
// http://192.168.1.67/ApiService/germes/v1

// export const PRODUCTION_API_URL = "https://service.allwingroup.ru/germes/v1";
export const PRODUCTION_API_URL = "https://apitest.allwingroup.ru/germes/v1";
export const DEVELOPMENT_API_URL = "http://192.168.1.67/ApiService/germes/v1";

// http://pushtest.allwingroup.ru:3652/  тест
// http://pushservice.allwingroup.ru:3652/" бой
// export const PRODUCTION_SIGNALR_URL = "http://pushservice.allwingroup.ru:3652";
export const PRODUCTION_SIGNALR_URL = "http://pushtest.allwingroup.ru:3652/";
export const DEVELOPMENT_SIGNALR_URL = "http://pushtest.allwingroup.ru:3652/";

export const germesContractorId = "1034116973000";

export const chatTypes = {
  "2768027584000": {
    id: "2768027584000",
    name: "общий",
    color: "green"
  },

  "2768027585000": {
    id: "2768027585000",
    name: "внутренний",
    color: "green"
  },

  "2768031944000": {
    id: "2768031944000",
    name: "чат",
    color: "green"
  },

  "2768909697000": {
    id: "2768909697000",
    name: "замечание",
    color: "red"
  }
};

export const messageType = {
  "2768909676000": {
    id: "2768909676000",
    name: "картинка"
  },

  "2768777882000": {
    id: "2768777882000",
    name: "текст"
  },

  "2768777884000": {
    id: "2768777884000",
    name: "чат"
  },

  "2768842251000": {
    id: "2768842251000",
    name: "файл"
  }
};

export const INITIAL_UPDATE_TIME = 10000;
export const INITIAL_TIME_TO_READ_UNREAD_CHAT_MESSSAGE = 3000;
