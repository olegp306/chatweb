import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchNews() {
  const json = yield fetch('https://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=c1ca6e4350ac4e21bf6c2e2cb1efbf19')
        .then(response => response.json(), );    
  yield put({ type: "NEWS_RECEIVED", json: json.articles, });
}

function* actionWatcher() {
     yield takeLatest('GET_NEWS', fetchNews)
}


export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}