//The saga that consumes the fetchCartSaga fetched data
import { take, takeLatest, put, call, apply, fork, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    FETCHING,
    FETCHED
} from './../actions'

import {
    currentUserSelector
} from '../selectors'


//Generator funcion
export function* handleIncreaseItemQuantity ({id}) {
    //this prevent user click it again when fetching data
    yield put(setItemQuantityFetchStatus(FETCHING));

    // select user
    const user = yield select(currentUserSelector);

    // calling add to cart for the item and the user with API
    const response = yield fetch(`http://localhost:8081/cart/add/${user.get('id')}/${id}`);
    console.info('response: ', response);

    // error handling
    if (response.status !== 200){
        yield put(decreaseItemQuantity(id,true));
        alert('Sorry, no enough items!');
    }

    //get current use info
    const data = yield response.json();
    console.info('Data array', data);

    yield put(setItemQuantityFetchStatus(FETCHED));

}
export function* handleDecreaseItemQuantity ({id, local}) {
    // If it is local
    if(local){
        return;
    }
    //this prevent user click it again when fetching data
    yield put(setItemQuantityFetchStatus(FETCHING));

    // select user
    const user = yield select(currentUserSelector);

    // calling add to cart for the item and the user with API
    const response = yield fetch(`http://localhost:8081/cart/add/${user.get('id')}/${id}`);
    console.info('response: ', response);

    // error handling
    if (response.status !== 200){
        console.warn('Sorry, non-200 status: ', response);
    }

    //get current use info
    const data = yield response.json();
    console.info('Data array', data);


    yield put(setItemQuantityFetchStatus(FETCHED));

}

export function* itemQuantitySaga () {

    // yield an array of effects, they are all interpreted
    yield [
        takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
        takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
    ]

}

