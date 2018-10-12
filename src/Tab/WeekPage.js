/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CardView from 'react-native-cardview' ;

import styles from '../styles/index';

export default class WeekPage extends Component{
  render() {
 
    return (
 
      <View style={styless.MainContainer}>
 
        <CardView
          cardElevation={5}
          cardMaxElevation={5}
          cornerRadius={5}
          style={styless.cardViewStyle}>
 
                <Text style={styless.cardView_InsideText}> Week page </Text>
 
        </CardView>
        
      </View>
 
    );

  }
}


const styless = StyleSheet.create({
 
  MainContainer: {
 
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
 
  },
 
  cardViewStyle:{
 
    width: 350, 
    height: 350,
 
  },
 
  cardView_InsideText:{
 
    fontSize: 20, 
    color: '#000', 
    textAlign: 'center', 
    marginTop: 50    
 
  }
 
});

