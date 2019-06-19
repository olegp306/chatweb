import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.GermesChat = App;
window.ReactDOM = ReactDOM;

//2768031944000 2768027877000 Это тип чата по Заявке
console.log("Запуск GermesChat index.js");
//import registerServiceWorker from './registerServiceWorker';

// Перед тем как Build для Клариса нужно закоментировать строчку ниже а в Кларисе ReactDOM.render(React.createElement(window.GermesChat), document.getElementById('germes-chat'))
//Иначе компонент попытаеться разу где-то отрисоваться

// 2375300449000 Веребейчик Вадим Алексеевич chatId 2768027587000
//	2767852694000 ПСН API chatId 2768027587000
// 39098772000  Быконя chatId 2768027587000
// 2690192400000 абармова chatId  2768089107000
// 2767267939000 Медведева
//2767798896000 Лушин

export const chatparams = {
  userId: "39098772000"
};

function startfn  () {
  if (process.env.NODE_ENV === "production") {
  } else {
    ReactDOM.render(
      React.createElement(App, { chatparams: chatparams }, null),
      document.getElementById("germes-chat")
    );
  }
};

startfn();
