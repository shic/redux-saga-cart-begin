import { take, takeLatest, put, call, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    SET_CURRENT_USER,
    setCartItems
} from './../actions'

//Generator funcion
export function* fetchCartSaga () {
    //get current use id
    const { user }  = yield take(SET_CURRENT_USER);
    const { id } = user;
    const response = yield call(fetch,`http://localhost:8081/cart/${id}`);
    console.info('Cart response', response);

    //get current use info
    const { items } = yield response.json();

    //PUT the setCartItems action that passes the items as the payload of that action
    yield put(setCartItems(items));
    console.info('Cart data', items);

}

