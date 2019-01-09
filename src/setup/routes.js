import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator, StackNavigator, HeaderBackButton } from 'react-navigation';
import { DrawerActions, StackActions, NavigationActions } from 'react-navigation';
import {
    View, Text, StyleSheet, Platform, TouchableOpacity, Image,
    AsyncStorage, Alert,
    StatusBar
} from 'react-native';

import { EventRegister } from 'react-native-event-listeners'
import DayPage from '../Tab/DayPage';
import WeekPage from '../Tab/WeekPage';
import MonthPage from '../Tab/MonthPage';
import DrawerScreen from '../components/DrawerScreen';
import LoginPage from '../components/LoginPage';
import YearPage from '../Tab/YearPage';
import DatePicker from '../utils/datepicker.js';
import SaleDetails from '../components/SaleDetail';
import DetailPage from '../components/DetailPage';
const GLOBAL = require('../constant/Globals.js');
import OrderMode from '../Tab/OrderMode';
import Hour from '../Tab/Hour';
import DayPart from '../Tab/DayPart';
import Pmix from '../Tab/Pmix';
import LogoutScreen from '../components/LogoutScreen';
import CustomHeader from '../utils/CustomHeader';
var dateFormat = require('dateformat');



export const Tabs = createMaterialTopTabNavigator({
    Day: DayPage,
    Week: WeekPage,
    Month: MonthPage,
    Year: YearPage
}, {
        tabBarOptions: {
            upperCaseLabel: false,
            backgroundColor: '#CE000A',
            activeTintColor: '#fff',
            inactiveTintColor: 'yellow',
            style: {
                backgroundColor: '#CE000A',
            },
            indicatorStyle: {
                backgroundColor: '#fff',
            },

            tabBarOnPress: (scene, jumpToIndex) => {
                console.log('onPress:', scene.route);
                jumpToIndex(scene.index);
            },
            swipeEnabled: false,

        }, 
       
     
    });
    export const TabOrderDetail = createMaterialTopTabNavigator({
        
        Hour: Hour,
        DayPart: DayPart,
        Pmix: Pmix,
        OrderMode: OrderMode,
       
    }, {
        
            tabBarOptions: {
                upperCaseLabel: false,
                backgroundColor: '#CE000A',
                activeTintColor: '#fff',
                inactiveTintColor: 'yellow',
                labelStyle: {
                    fontSize: 12,
                    margin: 0,
                    padding: 0,
                },
                style: {
                   
                    backgroundColor: '#CE000A',
                },
                indicatorStyle: {
                    backgroundColor: '#fff',
                },
    
                tabBarOnPress: (scene, jumpToIndex) => {
                    console.log('onPress:', scene.route);
                    jumpToIndex(scene.index);
                },
                swipeEnabled: false,
            }, 
            
        });

export const DrawerNavigator = createDrawerNavigator({
    DayPage: {
        screen: Tabs
    },

    WeekPage: {
        screen: WeekPage,
    },

    MonthPage: {
        screen: WeekPage,
    },
    LogoutScreen: {
        screen: LogoutScreen,
    },


},
    {
        drawerPosition: (Platform.OS === 'ios') ? 'right' : 'left',
        initialRouteName: 'DayPage',
        contentComponent: DrawerScreen,
        drawerWidth: 250,
        drawerBackgroundColor: '#CE000A',
    },
);

export const MenuImage = ({ navigation }) => {
    if (!navigation.state.isDrawerOpen) {
        return <Image source={require('../images/drawer.png')}
            style={{

               marginRight:10,
               padding:10


            }}
        />
    }
    else {
        return <Image source={require('../images/navback.png')}

            style={{
                width: 30,
                height: 30,
                padding: 10,
                margin: 5,
                // backgroundColor: '#313131',
                //marginLeft:15,
                resizeMode: 'stretch',

            }}
        />
    }
}

export const CalenderMenu = ({ navigation }) => {
    return <Image source={require('../images/calendar.png')}
        style={{
            marginRight: 15,
        }}
    />
}

//   export const SaleDetails = StackNavigator({
//     SaleDetails: {
//       screen: SaleDetails,
//       navigationOptions: {
//         title: "Details"
//       }
//     },
//   });

//   export const RootNavigator = (signedIn = false) => {
//     return StackNavigator(
//       {
//         SignedIn: {
//           screen: SignedIn,
//           navigationOptions: {
//             gesturesEnabled: false
//           }
//         },
//         SignedOut: {
//           screen: SignedOut,
//           navigationOptions: {
//             gesturesEnabled: false
//           }
//         }
//       }, {
//         headerMode: "none",
//         mode: "modal",
//         initialRouteName: signedIn ? "SignedIn" : "SignedOut"
//       }
//     );
//   };

const RootNavigator = createStackNavigator({

    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    LoginPage: { screen: LoginPage },
    DrawerNavigator: { screen: DrawerNavigator },
    DatePicker: { screen: DatePicker },
    LogoutScreen:{ screen: LogoutScreen },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: ({ navigation }) => ({ //don't forget parentheses around the object notation
            //title: 'National',
            headerLeft: <HeaderBackButton style={{ overlayColor: '#000000' }} onPress={() => navigation.goBack(null)} />,
            headerStyle: {
                backgroundColor: '#CE000A',
                position: 'absolute',
            },
            headerTintColor: '#FAC209',
            headerTitleStyle: {
                fontStyle: 'normal',
                width: '100%',
                upperCaseLabel: false,
            },
        })
    },
    Hour: {
        screen: TabOrderDetail,
        navigationOptions: ({ navigation }) => ({ //don't forget parentheses around the object notation
            //title: 'National',
            headerLeft: <HeaderBackButton style={{ overlayColor: '#000000' }} onPress={() => navigation.goBack(null)} />,
            headerStyle: {
                backgroundColor: '#CE000A',
                position: 'absolute',
            },
            headerTintColor: '#FAC209',
            headerTitleStyle: {
                fontStyle: 'normal',
               
                width: '100%',
                upperCaseLabel: false,
            },
        })
    },
    SaleDetails:
    {
        screen: SaleDetails,
        navigationOptions: ({ navigation }) => ({ //don't forget parentheses around the object notation
            //title: 'National',
            headerLeft: <HeaderBackButton style={{ overlayColor: '#000000' }} onPress={() => navigation.goBack(null)} />,
            headerStyle: {
                backgroundColor: '#CE000A',
                position: 'absolute',
            },
            headerTintColor: '#FAC209',
            headerTitleStyle: {
                fontStyle: 'normal',
                width: '100%',
                upperCaseLabel: false,
            },
        })
    },

},
    {
        navigationOptions: ({ navigation, title, subtitle }) => {
            const { navigate } = navigation
            return {
                headerTitle: <CustomHeader/>,
                // title: 'McDLiv',
              
                //    headerLeft: (
                //         <TouchableOpacity  >

                //                 <Image source={require('../images/left-arrow.png')} style={{ height: 30, resizeMode: 'contain'}}  />
                //             </TouchableOpacity>
                //     //     <DatePicker

                //     //    // date={this.state.date}
                //     //      mode="date"
                //     //     placeholder=""
                //     //     format="YYYY-MM-DD"
                //     //     minDate="2016-05-01"
                //     //     maxDate="2016-06-01"
                //     //     confirmBtnText="Confirm"
                //     //     cancelBtnText="Cancel"
                //     //     iconSource={require('../images/date_icon.png')}
                //     //    // selected={1} 
                //     //    // onDateChange={() => params.Tracking()}
                //     //    // onDateChange={(date) => {this.setState({date: date});}}
                //     //   />
                //       )      
                // headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />

                // ,
               
                headerLeft: (Platform.OS === 'android') ?

                    //     <TouchableOpacity>
                    //     <MyButton label="Press me!" />
                    //   </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer())
                        // this.props.navigation.navigate('DayPage')
                        // DayPage._myHomeFunction()
                        // DayPage.this._myHomeFunction
                    }

                    }>
                        <MenuImage style="styles.bar" navigation={navigation} />
                    </TouchableOpacity>
                    : null
                // :  AsyncStorage.getItem(GLOBAL.PARENT_KEY).then((parent) => {
                //       if(parent==0) 
                //       null
                //       else
                //       ''

                //        } 

                ,
                headerRight: (Platform.OS === 'android') ?
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity>
                            <DatePicker
                                // date={this.state.date}
                                placeholder="placeholder"

                                mode="date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2021-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconSource={require('../images/calendar.png')}
                                style={{
                                    width: 14,
                                    height: 14,
                                    padding: 10,
                                    marginRight: 10,
                                   
                                    alignItems: 'center', justifyContent: 'center',
                                    resizeMode: 'stretch',
    
                                }}
                                onDateChange={(date) => {
                                    console.log('Date ->  ' + date);
                                    // var date = new Date().toDateString();
                                    // date = dateFormat(date, "yyyy-mm-dd");
                                    // date = moment(date).format("YYYY-MM-DD HH:mm:ss");
                                    AsyncStorage.setItem(GLOBAL.DATE_KEY, date),
                                    AsyncStorage.setItem(GLOBAL.TIME_KEY, date),
                                    // this.setState({ date: date });
                                    EventRegister.emit('myCustomEvent', 'it works!!!')
                                }}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => 
                                /* 1. home icon click */
                                navigation.navigate('DayPage')


                            } >
                            {/* onPress={() => navigation.goBack(null)} */}
                            <Image
                                source={require('../images/home.png')}
                            style={{
                                width: 14,
                                height: 14,
                                padding: 10,
                                marginRight: 15,
                               
                                alignItems: 'center', justifyContent: 'center',
                                resizeMode: 'stretch',

                            }}
                            />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', }}>


                        <TouchableOpacity>
                            <DatePicker
                                // date={this.state.date}
                                placeholder="placeholder"

                                mode="date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2021-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconSource={require('../images/calendar.png')}
                                style={{
                                    width: 14,
                                    height: 14,
                                    padding: 10,
                                    marginTop:5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    resizeMode: 'stretch',
    
                                }}
                                onDateChange={(date) => {
                                    
                                    console.log('Date ->  ' + date);
                                    // var date = new Date().toDateString();
                                    // date = dateFormat(date, "yyyy-mm-dd");
                                    // date = moment(date).format("YYYY-MM-DD HH:mm:ss");

                                    AsyncStorage.setItem(GLOBAL.DATE_KEY, date);
                                    AsyncStorage.setItem(GLOBAL.TIME_KEY, date),
                                    EventRegister.emit('myCustomEvent', 'it works!!!')
                                    
                                }}

                            />

                        </TouchableOpacity>
                        <View >
                            <TouchableOpacity onPress={() => {
                                navigation.dispatch(DrawerActions.toggleDrawer())
                                // this.props.navigation.navigate('DayPage')
                                // DayPage._myHomeFunction()
                                // DayPage.this._myHomeFunction
                            }

                            }>
                                <MenuImage style="styles.bar" navigation={navigation} />
                            </TouchableOpacity>
                        </View>
                    </View>,

                headerStyle: {
                    backgroundColor: '#CE000A',
                    position: 'absolute',
                },
                headerTintColor: '#FAC209',
                headerTitleStyle: {
                    fontStyle: 'normal',
                    width: '100%',
                },





            };

        },
        initialRouteName: 'LoginPage',

    });


export default RootNavigator;


