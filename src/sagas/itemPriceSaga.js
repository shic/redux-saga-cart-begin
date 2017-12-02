//The saga that consumes the fetchCartSaga fetched data
import { take, all, put, call, fork } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    SET_CURRENT_USER,
    SET_ITEM_DETAILS,
    setItemPrice
} from './../actions'


function* fetchItemPrice(id, currency) {
    const response = yield fetch(`http://localhost:8081/prices/${currency}/${id}`);
    const json = yield response.json();
    console.info('Data array', json);
    const price = json[0].price;
    yield put(setItemPrice(id,price));


}

export function* itemPriceSaga () {
    // Save the returned value in an array in order
    const [{user}, {items}] = yield all([
        take(SET_CURRENT_USER),
        take(SET_CART_ITEMS)
    ]);

    yield items.map(item=>call(fetchItemPrice,item.id,user.country))

}

