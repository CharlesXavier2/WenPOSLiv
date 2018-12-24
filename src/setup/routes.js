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
import LogoutScreen from '../components/LogoutScreen.js'
const GLOBAL = require('../constant/Globals.js');
//import DatePicker from '../components/DateSelector';

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

        }, // navigationOptions: ({ navigation }) => ({
        //     // tabBarOnPress: (scene, jumpToIndex) => {
        //     //     console.log('onPress:', scene.route);
        //     //     jumpToIndex(scene.index);
        //     // },
        //     tabBarOnPress: (scene, jumpToIndex) => {

        //          console.log('test tab bar press overview');
        //          console.log('onPress:', scene.route);
        //             jumpToIndex(scene.index); },
        // }),
        // navigationOptions:({screenProps}) =>({
        //     tabBarOnPress: (scene, jumpToIndex) => {
        //         // You can use sceneProps.previousScreen here
        //         console.log('onPress:', scene.route);
        //         console.log('test tab bar press overview');
        //         // jumpToIndex(scene.index);
        //     }
        // }),
        //}
        // tabBarComponent: ({ jumpToIndex, ...props}) => (
        //     <TabBarTop
        //        {...props}
        //        jumpToIndex={(index) => {
        //          if(props.navigation.state.index === index) {
        //             console.log(index);
        //         // props.navigation.clickButton(); //----> pass props params (code processes)
        //        }
        //        else {
        //          jumpToIndex(index);
        //        }
        //      }
        //    }
        //  />
        // )


        // navigationOptions: ({ navigation }) => {
        //     return {
        //         // tabBarOnPress: (tab) => {
        //         //     // onTabPress stuff here..
        //         //     console.log('tabBarOnPress test tab bar press overview'+(tab));
        //         // },

        //         tabBarOnPress: ({ scene, jumpToIndex }) => {
        //             // navigation.state.params.setCurrentScreen(scene);
        //             console.log('tabBarOnPress test tab bar press overview');
        //             // if (!scene.focused) {
        //             //   jumpToIndex(scene.index);
        //             // }
        //           },
        //         }
        //     }

        //   tabBarOnPress({ navigation, defaultHandler }) {
        //     console.log('test tab bar press overview'+navigation);
        //     if (navigation.isFocused()) {
        //       // same tab was tapped twice
        //       // reset inner state
        //       return;
        //     }
        //     // tab was not previously focused
        //     defaultHandler();
        //   }

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

                marginLeft: 15,


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

const CustomHeader = ({ title, subtitle }) => (
    <View >
      <Text style={{ fontSize: 16, color: '#FAC209' }}>{title}</Text>
      <Text style={{ fontSize: 10, color: '#FAC209' }}>{subtitle}</Text>
    </View>
  );



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



// export default class MyButton extends Component {
//     constructor(props) {

//         super(props)
//         this.state = {
           
           
//             date: '',
//             check:'done'
           
           
           
//         }
//         // this.onBackPress = this.onBackPress.bind(this);
       
//     }
//     componentDidMount() {
        
       
     
//             this.setState({
              
//               check: 'hello'
//             })
       
        
//       }
    
    
//     render() {
//         return <RootNavigator check={this.state.check} {...this.props}  />;
//     }


// getDate = () => {
//     AsyncStorage.getItem("date_key").then((value) => {
//         console.log(" Getter date" + value);
//         if (value == null || value == '') {
//             var date = new Date().toDateString();
//             date = dateFormat(date, "yyyy-mm-dd");
//             this.setState({ date });
//             AsyncStorage.setItem("date_key", date);
//         } else {
//             this.setState({ date: value });
//         }
//     })
// };
// }



const RootNavigator = createStackNavigator({


    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    LoginPage: { screen: LoginPage },
    DrawerNavigator: { screen: DrawerNavigator },
    DatePicker: { screen: DatePicker },
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
                headerTitle: <CustomHeader title={'McDLiv'} subtitle={'2016-05-01'}/>,
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
                                onDateChange={(date) => {
                                    console.log('Date ->  ' + date);
                                    AsyncStorage.setItem(GLOBAL.DATE_KEY, date);
                                    this.setState({ date: date });
                                    EventRegister.emit('myCustomEvent', 'it works!!!')
                                }}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                /* 1. home icon click */

                            }} >
                            <Image
                                source={require('../images/home.png')}
                            style={{
                                width: 14,
                                height: 14,
                                padding: 10,
                                marginRight: 10,
                               
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
                                onDateChange={(date) => {
                                    console.log('Date ->  ' + date);
                                    AsyncStorage.setItem(GLOBAL.DATE_KEY, date);
                                    this.setState({ date: date });
                                    EventRegister.emit('myCustomEvent', 'it works!!!')
                                }}

                            />

                        </TouchableOpacity>
                        <View style={{ marginRight: 10 }}>
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


