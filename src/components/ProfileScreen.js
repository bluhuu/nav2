//import liraries
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

// create a component
class ProfileScreen extends Component {
    static propTypes = {
        nav: PropTypes.object.isRequired,
        dispatch: PropTypes.func
    }
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    const {nav, dispatch} = this.props;
    if (nav && nav.routes && nav.routes.length > 1) {
      dispatch(NavigationActions.back());
      return true;
    }
    return false;
  }

  render() {
    let {dispatch, nav} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile Screen
        </Text>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

//make this component available to the app
// export default ProfileScreen;
export default connect(state =>({nav: state.nav}))(ProfileScreen)
