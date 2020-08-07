import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import loginReducer from '../reducers/loginReducer';
import rootReducer from '../reducers';
import  Saga from '../sagas';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['navigation', 'userOrderAndDeliveryReducer']
};


const logger = createLogger({
    predicate: () => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    diff: true,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export default () => {
    let store = createStore(persistedReducer,
        compose(
            applyMiddleware(
                sagaMiddleware,
                logger
            )
        ));
    sagaMiddleware.run(Saga);
    let persistor = persistStore(store);
    return { store, persistor };
}