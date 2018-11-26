import React, { Component } from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,
    AsyncStorage,
StatusBar} from 'react-native';

class HomeButton extends Component {
    render() {
    console.log(this.props)
    return (
    <TouchableHighlight
      onPress={() => this.props.navigate('LogoutScreen')}
    >
      <View>
        <Image
           source={require('../images/drawer.png')}
        />
     </View>
    </TouchableHighlight>
    )}
}