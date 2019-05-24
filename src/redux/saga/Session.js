import { call, put } from "redux-saga/effects";

import { login, isLogging, logged, loginFailed } from "../actions/Session";


import api from "../../api"

function* loginSaga(action) {
  //console.log("loginSaga")
  const { user, password } = action.payload;
  yield put(isLogging());

  try {
    let loginResponse = null;
    if (action.type == "LOGIN_BY_USERID") {
      loginResponse = yield call(api.authenticateByUserId, action.payload);
    } else {
      loginResponse = yield call(api.login, user, password);
    }

    let { accessToken } = loginResponse.data;
    
    const test=loginResponse.data;
    

    let {
      id,
      contractorId,
      employee      
    } = loginResponse.data;

    const session = {
      token: accessToken,
      userId: employee.id,
      contractorId: contractorId,
      avatarUrl: employee.avatar.url,
      userName: employee.name,
      roles: employee.extInfo
    };

    //yield put(isLogging(false))
    yield put(logged(session));
  } catch (error) {
    //yield put(isLogging(false))
    yield put(loginFailed(error.message));
  }
}

export default loginSaga;
