import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        Raven.captureException(err, {
            extra: { action, state: store.getState() }
        })
        throw err
    }
}

class ReduxExampleApp extends React.Component {
    store = createStore(AppReducer, applyMiddleware(logger, crashReporter))
    render() {
        return (
            <Provider store={this.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('nav2', () => ReduxExampleApp);

export default ReduxExampleApp;
