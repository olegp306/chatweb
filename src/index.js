import React from 'react';
import ReactDOM from 'react-dom';
import './ReactotronConfig'
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


window.GermesChat=App;

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

export const  chatparams={
  'chatType':'',
  'chatId':'2768825872000',
  'userId':'2767267939000'
};

ReactDOM.render(
    React.createElement(App, {chatparams:chatparams}, null),
    document.getElementById('germes-chat')
  );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

