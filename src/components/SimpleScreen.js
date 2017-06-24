import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, TouchableHighlight, } from 'react-native';
import ViewPager from 'react-native-viewpager';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var IMGS = [
    'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
    'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

var count = 0;

class SimpleScreen extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this._renderPage = this._renderPage.bind(this);
        this.state = {
            swiperShow: true,
            dataSource: dataSource.cloneWithPages(IMGS),
            page: 0
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }
    render() {
        console.log(this.state);
        if (this.state.swiperShow) {
            return (
                <View style={styles.container}>
                    <ViewPager
                      ref={(viewpager) => {this.viewpager = viewpager}}
                      style={this.props.style}
                      dataSource={this.state.dataSource}
                      renderPage={this._renderPage}
                      isLoop={true}
                      autoPlay={true}/>

                    <TouchableHighlight style={styles.button} onPress={() => {
                        this.viewpager.goToPage(count + 1);
                        count = count + 1;
                      }}>
                        <Text>Click</Text>
                    </TouchableHighlight>
                </View>

            );
        } else {
            return (
                <View style={{height:200}}>
                <Image source={ require('./img/1.jpg')} style={styles.image} />
        </View>
            );
        }
    }

    _renderPage(
        data: Object,
        pageID: number | string, ) {
        return (
            <Image source={{uri: data}} style={styles.page} />
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1, height: 200 },
    page: { width: deviceWidth, },
    button: { padding: 10, },
});

module.exports = SimpleScreen;
