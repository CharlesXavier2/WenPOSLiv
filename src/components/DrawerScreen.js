import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, Image} from 'react-native';
import { DrawerActions } from 'react-navigation';
import styles from '../styles/index';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render () {
    return (
      <View>
        <ScrollView >
          <View >
          <View style={styles.menuItem}>
            <Image style={{marginLeft:10,}} source={require('../images/sales.png')}></Image>
            <Text style={{marginLeft:10,fontSize: 16,color:'#FFFFFF'}}  onPress={this.navigateToScreen('DayPage')}>
               Sales
              </Text>
            </View>
            <View style={styles.menuItem}>
            <Image style={{marginLeft:10,}} source={require('../images/labour.png')}></Image>
             <Text style={{marginLeft:10,fontSize: 16,color:'#FFFFFF'}} >
               Labour
              </Text>
            </View>
            <View style={styles.menuItem}>
            <Image style={{marginLeft:10,}} source={require('../images/inventory.png')}></Image>
            <Text style={{marginLeft:10,fontSize: 16,color:'#FFFFFF'}} >
               Inventory
              </Text>
            </View>
            <View style={styles.menuItem}>
            <Image style={{marginLeft:10,}} source={require('../images/logout.png')}></Image>
            <Text style={{marginLeft:10,fontSize: 16,color:'#FFFFFF'}} >
               Logout
              </Text>
            </View>
           
          </View>
        </ScrollView>
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;