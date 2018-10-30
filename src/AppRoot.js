import React, {Component} from 'react';
import { connect } from 'react-redux';
import {store, persistor} from "./redux/store";
import {LoginRoot, HomeRoot } from "./containers/navigator/RootNavigator";
import { PersistGate } from 'redux-persist/integration/react'
class AppRoot extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <LoginRoot />
        );
    }
}
const mapStateToProps = (state) => ({
    userLogin : state.userLogin,
})

const mapDispatchToProps = dispatch =>({
})

export default connect(mapStateToProps,mapDispatchToProps)(AppRoot)

