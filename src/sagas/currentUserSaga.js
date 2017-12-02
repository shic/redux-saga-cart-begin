import { take, put, call, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    GET_CURRENT_USER_INFO,
    setCurrentUser
} from './../actions'
//Generator funcion
//Get current user (get it once only)
export function* currentUserSaga () {
    //get current use id
    const { id }  = yield take(GET_CURRENT_USER_INFO);
    const response = yield call(fetch,`http://localhost:8081/user/${id}`);
    console.info('response', response);

    //get current use info
    const data = yield apply(response, response.json);
    console.info('data', data);

    //Invoke the setCurrentUser action
    yield put(setCurrentUser(data));
}