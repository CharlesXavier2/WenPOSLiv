import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator,} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';
import DayPage from '../Tab/DayPage';
import WeekPage from '../Tab/WeekPage';
import MonthPage from '../Tab/MonthPage';
import DrawerScreen from '../components/DrawerScreen';
import LoginPage from '../components/LoginPage';
import YearPage from '../Tab/YearPage';

const Tabs = createMaterialTopTabNavigator({
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

const DrawerNavigator = createDrawerNavigator({
    DayPage:{
        screen: Tabs
    }
},{
    initialRouteName: 'DayPage',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});

const MenuImage = ({navigation}) => {
    if(!navigation.state.isDrawerOpen){
        return <Image source={require('../images/burgermenu.png')}/>
    }else{
        return <Image source={require('../images/left-arrow.png')}/>
    }
}
const StackNavigator = createStackNavigator({
    
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    LoginPage:{screen: LoginPage},
    DrawerNavigator:{screen: DrawerNavigator},
  },{
    navigationOptions: ({ navigation }) => ({
        title: 'McD',  // Title to appear in status bar
        headerRight:
         <TouchableOpacity  onPress={() => {this.props.navigation.navigate('DayPage')} }>
    <Image source={require('../images/bill.png')}/>
    </TouchableOpacity>,
           
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

    }),
    initialRouteName: 'LoginPage',
});

export default StackNavigator;
