import { getStore } from '../getStore';
import React from 'react';
import { Provider } from 'react-redux'
import { MainContainer } from '../components'
import { getCurrentUserInfo } from '../actions'
const store = getStore();
export const App = ()=>(
    <div>
        <Provider store={store}>
            <MainContainer/>
        </Provider>
    </div>
);

// get U1000 user
store.dispatch(getCurrentUserInfo(`U10000`));