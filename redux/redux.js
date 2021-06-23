import logger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers'
import {createWrapper} from 'next-redux-wrapper';

const makeConfiguredStore = (reducer, initialState) =>
    createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
    );

export const makeStore = (initialState) => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
        initialState = initialState ;
        return makeConfiguredStore(reducer, initialState);
    } else {
        // we need it only on client side
        const {persistStore, persistReducer} = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;

        const persistConfig = {
            key: 'nextjs',
            whitelist: ['auth'], // make sure it does not clash with server keys
            storage
        };

        const persistedReducer = persistReducer(persistConfig, reducer);
        const store = makeConfiguredStore(persistedReducer, initialState);

        store.__persistor = persistStore(store); // Nasty hack
        window.store = store;
        return store;
    }
};

export const wrapper = createWrapper(makeStore, {debug: true});