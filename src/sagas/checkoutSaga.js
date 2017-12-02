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


export function* checkoutSaga () {
    while (true){
        const isCheckingOut = yield take(TOGGLE_CHECKING_OUT);
        if (isCheckingOut){
            
        }
    }

}

