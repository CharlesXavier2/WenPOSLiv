import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator,StackNavigator,HeaderBackButton} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,
        AsyncStorage,
    StatusBar} from 'react-native';
import DayPage from '../Tab/DayPage';
import WeekPage from '../Tab/WeekPage';
import MonthPage from '../Tab/MonthPage';
import DrawerScreen from '../components/DrawerScreen';
import LoginPage from '../components/LoginPage';
import YearPage from '../Tab/YearPage';
import DatePicker from '../utils/datepicker.js';
import SaleDetails from '../components/SaleDetail';

//import DatePicker from '../components/DateSelector';

export const Tabs = createMaterialTopTabNavigator({
    Day: DayPage,
     Week: WeekPage,
     Month: MonthPage,
     Year: YearPage
},{
    tabBarOptions: {

        backgroundColor: '#C11929',
        activeTintColor: '#fff',
        inactiveTintColor: '#FAC209',
        style: {
            backgroundColor: '#C11929',
        },
        indicatorStyle: {
            backgroundColor: '#fff',
        },
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
    DayPage:{
        screen: Tabs
    }
},{
    initialRouteName: 'DayPage',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});

export const MenuImage = ({navigation}) => {
    if(!navigation.state.isDrawerOpen){
        return <Image source={require('../images/burgermenu.png')}/>
    }else{
        return <Image source={require('../images/left-arrow.png')}
        style={{
            width:30,
            height: 30,
           padding: 10,
           margin: 5,
           backgroundColor:'#313131',
          //marginLeft:15,
           resizeMode: 'stretch',
       
       }}
        />
    }
}

export const CustomHeader = ({ title, subtitle }) => (
    <View >
      <Text style={{fontSize:16,color: '#000'}}>{title}</Text>
      <Text style={{fontSize:16,color: '#000'}}>{subtitle}</Text>
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
  const RootNavigator = createStackNavigator({

    
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    LoginPage:{screen: LoginPage},
    DrawerNavigator:{screen: DrawerNavigator},
    DatePicker: {screen: DatePicker},
    // DayPage: {screen: DayPage},
    SaleDetails:
    { 
        screen: SaleDetails, 
        navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
          //title: 'National',
          headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
        })
      },
  },
  {
    navigationOptions: ({ navigation ,title,subtitle}) => {
        const { navigate } = navigation
        return {
            
        title: 'McD',  // Title to appear in status bar
       // headerTitle: <CustomHeader title='McDa' 
       // subtitle={}/>,
    // headerRight: (
    //     <TouchableOpacity onPress={()=>navigate('DatePicker')} >
       
    //             <Image source={require('../images/date_icon.png')} style={{ height: 30, resizeMode: 'contain'}}  />
    //         </TouchableOpacity>
    // //     <DatePicker
         
    // //    // date={this.state.date}
    // //     mode="date"
    // //     placeholder=""
    // //     format="YYYY-MM-DD"
    // //     minDate="2016-05-01"
    // //     maxDate="2016-06-01"
    // //     confirmBtnText="Confirm"
    // //     cancelBtnText="Cancel"
    // //     iconSource={require('../images/date_icon.png')}
    // //    // selected={1} 
    // //    // onDateChange={() => params.Tracking()}
    // //    // onDateChange={(date) => {this.setState({date: date});}}
    // //   />
    //   ),
           
        headerLeft: 
        <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
            <MenuImage style="styles.bar" navigation={navigation}/>
        </TouchableOpacity>,
        headerStyle: {
            backgroundColor: '#C11929',
        },
        headerTintColor: '#FAC209',
        headerTitleStyle: {
         
          fontStyle: 'normal',


          
          
        },
    };

    },
    initialRouteName: 'LoginPage',

});


 
export default RootNavigator;


