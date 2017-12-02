//The saga that consumes the fetchCartSaga fetched data
import { take, all, put, call, select, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    FETCHING,
    FETCHED,
    setShippingFetchStatus,
    setShippingCost
} from './../actions'

import {
    cartItemsSelector
} from '../selectors'


function* shipping() {
    yield put(setShippingFetchStatus(FETCHING));
    const items = yield select(cartItemsSelector);

    // Turn all the item IDs into an API compatible string, and trim the last comma
    const itemRequestString = items.reduce((string,item)=>{
        for (let i = 0; i < item.get(`quantity`); i++) {
            string += item.get(`id`) + ",";
        }
        return string;
    },"").replace(/,\s*$/, '');

    const response = yield fetch(`http://localhost:8081/shipping/${itemRequestString}`);
    const { total } = yield response.json();
    yield put(setShippingCost(total));
    yield put(setShippingFetchStatus(FETCHED));


}

export function* shippingSaga () {

    //Any of these events happens, it will shipping sub process
    yield takeLatest([SET_CART_ITEMS,INCREASE_ITEM_QUANTITY,DECREASE_ITEM_QUANTITY], shipping)

}

