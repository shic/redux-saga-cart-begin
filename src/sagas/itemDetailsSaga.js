//The saga that consumes the fetchCartSaga fetched data
import { take, takeLatest, put, call, apply, fork } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    setItemDetails
} from './../actions'

//Generator funcion
export function* loadItemDetails (item) {
    console.info('Item data', item);
    const { id } = item;
    const response = yield fetch(`http://localhost:8081/items/${id}`);
    //get current use info
    const data = yield response.json();
    console.info('Data array', data);

    //In this example info is the first element of array
    const info = data[0];

    yield put(setItemDetails(info));
}

export function* itemDetailsSaga () {
    //Wait until get cart item ids
    const { items }  = yield take(SET_CART_ITEMS);

    //For each item fork a thread
    yield items.map(item=>fork(loadItemDetails, item))

}

