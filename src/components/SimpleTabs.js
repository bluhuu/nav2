import React,{Component} from 'react';
import { Button, Text, Dimensions, View, StatusBar, Image, Platform, ScrollView, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import screen from '../common/screen'
const { width } = Dimensions.get('window')

const MyNavScreen = ({ navigation, banner }) => (
    <ScrollView style={styles.container}>
        <SampleText>{banner}</SampleText>
        <Button onPress={() => navigation.navigate('Home')} title="Go to home tab" />
        <Button onPress={() => navigation.navigate('Settings')} title="Go to settings tab" />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </ScrollView>
);

class MyHomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperShow:false,
        };
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                swiperShow:true
            });
        },0)
    }
    render() {
        if(this.state.swiperShow){
            return(
                <View scrollEnabled={true}>
                    <StatusBar translucent backgroundColor={"rgba(100,100,100,0.2)"} />
                    <Swiper style={styles.wrapper} height={180} loop autoPlay={true}>
                        <View style={styles.imgView}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/1.jpg')} />
                        </View>
                        <View style={styles.imgView}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/2.jpg')} />
                        </View>
                        <View style={styles.imgView}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/3.jpg')} />
                        </View>
                        <View style={styles.imgView}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/4.jpg')} />
                        </View>
                    </Swiper>
                    <MyNavScreen banner="Home Tab" navigation={this.props.navigation}/>
                </View>
            )
        }else {
            return (
                <View style={{height:200}}>
                        <Image source={ require('./img/1.jpg')} style={styles.image} />
                </View>
            );
        }
    }
}
MyHomeScreen.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
          />
  ),
};

const MyPeopleScreen = ({ navigation }) => (
  <MyNavScreen banner="People Tab" navigation={navigation} />
);

MyPeopleScreen.navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
            name={focused ? 'ios-people' : 'ios-people-outline'}
            size={26}
            style={{ color: tintColor }}
            />
    ),
};

const MyChatScreen = ({ navigation }) => (
  <MyNavScreen banner="Chat Tab" navigation={navigation} />
);

MyChatScreen.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Tab" navigation={navigation} />
);

MySettingsScreen.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-settings' : 'ios-settings-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const SimpleTabs = TabNavigator(
  {
    Home: { screen: MyHomeScreen, path: '', },
    People: { screen: MyPeopleScreen, path: 'cart', },
    Chat: { screen: MyChatScreen, path: 'chat', },
    Settings: { screen: MySettingsScreen, path: 'settings', },
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    },
    tabBarPosition:'bottom'
  }
);
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  image: {
    width,
    height: 180,
    flex: 1
},
imgView: {
        flex: 1,
        height: 200,
    },
});

export default SimpleTabs;
