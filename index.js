/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persist from './src/config/configureStore';

const persistor = persist();


const AppContainer = () =>
    <Provider store={persistor.store}  >
        <PersistGate loading={null} persistor={persistor.persistor}>
            <App />
        </PersistGate>
    </Provider>


AppRegistry.registerComponent(appName, () => AppContainer);
