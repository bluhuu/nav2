import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import TabsInDrawer from '../components/TabsInDrawer';

export const AppNavigator = StackNavigator({
    TabsInDrawer: { screen: TabsInDrawer },
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen, path: 'profile/:user', },
}, {
    headerMode:'none'
});

const prefix = Platform.OS == 'android' ? 'nav2://nav2/' : 'nav2://';
const AppWithNavigationState = ({ dispatch, nav }) => (
    // <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    <AppNavigator />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
