import { take, put, call, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    GET_CURRENT_USER_INFO,
    setCurrentUser
} from './../actions'
//Generator funcion
//Get current user (get it once only)
export function* currentUserSaga () {
    const { id }  = yield take(GET_CURRENT_USER_INFO);

    console.info('ID', id);
}