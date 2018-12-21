import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Image,FlatList } from 'react-native';
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

  renderItem = ({ item }) => {
    return (
    <View >
      <View style={{ flexDirection: 'row', }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={styles.CircleShapeView}>
            <Image style={{ marginLeft: 10, }} source={require('../images/sales.png')}></Image>

          </View>
          <Text style={{ marginLeft: 10, fontSize: 12, color: '#FFFFFF' }}>
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
                          { key: 'SALES' },
                          { key: 'INVENTORY' },
                          { key: 'LABOUR' },
                          { key: 'SYNC HISTORY' },
                          { key: 'SETTINGS' },
                          { key: 'LOGOUT' },
                         

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