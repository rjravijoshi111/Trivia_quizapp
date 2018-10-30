import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {store, persistor} from "./redux/store";
import MainRoot from "./AppRoot";
import { PersistGate } from 'redux-persist/integration/react'
export default class App extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <MainRoot />
                </PersistGate >
            </Provider>
        );
    }
}
