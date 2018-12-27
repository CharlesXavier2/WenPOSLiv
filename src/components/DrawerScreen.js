import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';
import styles from '../styles/index';
import LogoutScreen from '../components/LogoutScreen';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  renderItem = ({ item }) => {
    return (
      <View >
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 10, marginRight: 10, }} >

            <View style={styles.CircleShapeView} >
            {item.key == 'SALES' && 
              <TouchableOpacity
                onPress={this.navigateToScreen('DayPage')} >
                <Image style={{
                  justifyContent: 'center',
                  padding: 10,
                  width: 18,
                  height: 18
                }} onPress={this.navigateToScreen('DayPage')}
                  source={item.image}></Image>
              </TouchableOpacity>
              }
            {item.key == 'LOGOUT' && 
              <TouchableOpacity
                onPress={this.navigateToScreen('LogoutScreen')} >
                <Image style={{
                  justifyContent: 'center',
                  padding: 10,
                  width: 18,
                  height: 18
                }} onPress={this.navigateToScreen('LogoutScreen')}
                  source={item.image}></Image>
              </TouchableOpacity>
              }
              
              
               {
                    !(item.key == 'LOGOUT' || item.key == 'SALES') && 
                <Image style={{
                  justifyContent: 'center',
                  padding: 10,
                  width: 18,
                  height: 18
                }} 
                // onPress={this.navigateToScreen('LogoutScreen')}
                  source={item.image}></Image>
              
              }
              
              
            </View>
            <Text style={{
              justifyContent: 'center',
              alignItems: 'center', fontSize: 10, color: '#FFFFFF'
            }}

            >
              {item.key}
            </Text>
          </View>


        </View >
      </View >





    )

  }

  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center',
        alignItems: 'center'
      }}>
        <FlatList
          data={[

            { key: "SALES", image: require("../images/ic_sales.png") },
            { key: 'INVENTORY', image: require("../images/ic_inventory.png") },
            { key: 'LABOUR', image: require("../images/ic_labour.png") },
            { key: 'SYNC HISTORY', image: require("../images/ic_sync.png") },
            { key: 'SETTINGS', image: require("../images/ic_setting.png") },
            { key: 'LOGOUT', image: require("../images/ic_logout.png") },


          ]}
          renderItem={
            this.renderItem
          }
          numColumns={2}
        />
        {/* <ScrollView >
          <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{ flexDirection: 'row', }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.CircleShapeView}>
                  <Image style={{ marginLeft: 10, }} source={require('../images/sales.png')}></Image>

                </View>
                <Text style={{ marginLeft: 10, fontSize: 16, color: '#FFFFFF' }} onPress={this.navigateToScreen('DayPage')}>
                  Sales
              </Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>

                <View style={styles.CircleShapeView}>
                  <Image style={{ marginLeft: 10, }} source={require('../images/labour.png')}></Image>
                  <Text style={{ marginLeft: 10, fontSize: 16, color: '#FFFFFF' }} >
                    Labour
              </Text>
                </View>
                <Text style={{ marginLeft: 10, fontSize: 16, color: '#FFFFFF' }} >
                  Labour
              </Text>
              </View>

            </View >



            <View style={{ flexDirection: 'row', }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.CircleShapeView}>
                  <Image style={{ marginLeft: 10, }} source={require('../images/inventory.png')}></Image>

                </View>
                <Text style={{ marginLeft: 10, fontSize: 16, color: '#FFFFFF' }} >
                  Inventory
              </Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.CircleShapeView}>
                  <Image style={{ marginLeft: 10, }} source={require('../images/logout.png')}></Image>

                </View>
                <Text style={{ marginLeft: 10, fontSize: 16, color: '#FFFFFF' }} >
                  Logout
              </Text>
              </View>
            </View>
          </View>
        </ScrollView> */}
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;