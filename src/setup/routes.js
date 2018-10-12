import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
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
    }
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
