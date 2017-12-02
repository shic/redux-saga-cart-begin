//The saga that consumes the fetchCartSaga fetched data
import { take, all, put, call, select, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    TOGGLE_CHECKING_OUT,
    QUANTITY_VERIFICATION_CHECKOUT_PHASE,
    CREDIT_VALIDATION_CHECKOUT_PHASE,
    ERROR_CHECKOUT_PHASE,
    PURCHASE_FINALIZATION_CHECKOUT_PHASE,
    SUCCESS_CHECKOUT_PHASE,
    setCheckoutPhase
} from './../actions'

import {
    currentUserSelector
} from '../selectors'


function* checkQuantity(user) {
    const response = yield fetch(`http://localhost:8081/cart/validate/${user.get('id')}`);
    const {validated} = yield response.json();
    return validated;
}


function* checkout() {
    const user = yield select(currentUserSelector);

    //checkQuantity
    yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
    const quantityValidated = yield call(checkQuantity,user)
    if(!quantityValidated){
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }
    console.info('Validated cart');
}


export function* checkoutSaga () {
    while (true){
        const isCheckingOut = yield take(TOGGLE_CHECKING_OUT);
        if (isCheckingOut){
            yield call(checkout);
        }
    }

}

