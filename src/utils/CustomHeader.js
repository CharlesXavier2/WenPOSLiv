/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=month&date=2018-10-13&is_delivery=0 
 * http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=year&date=2018-10-13&is_delivery=0
 * @flow
 */

import React, { Component } from 'react';
import { EventRegister } from 'react-native-event-listeners'
import {
    Text,
    View,
    AsyncStorage,
    Platform,


} from 'react-native';


var dateFormat = require('dateformat');
export default class CustomHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "McD",
            date: '',
            time:''
        }
    }
  

   
    
   
    componentWillReceiveProps(newProps) {
        
            console.log(" componentWillReceiveProps day : ")
        
    }


    getDate = () => {
        AsyncStorage.getItem("time_key").then((value) => {
            console.log(" Getter date" + value);
            if (value == null || value == '') {
                var date = new Date().toDateString();
                date = dateFormat(date, "yyyy-mm-dd");
                this.setState({ date });
                AsyncStorage.setItem("time_key", date);
            } else {
                this.setState({ date: value });
            }
        })
    };
  
    componentWillMount() {

        this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
            console.log(" EventRegister.addEventListener('myCustomEvent' in CustomHeader :  "+data),
            this.getDate()
        }),

        this.listener = EventRegister.addEventListener('onTitleChange', (data) => {
           
            this.setState({ title: data });
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

  
    componentDidMount() {
    }

    render() {
        return ( <View >
        <Text style={{ fontSize: 16, color: '#FAC209',alignSelf: (Platform.OS === 'ios') ? 'center' : 'flex-start',}}>{this.state.title}</Text>
        <Text style={{ fontSize: 10, color: '#FAC209',alignSelf: (Platform.OS === 'ios') ? 'center' : 'flex-start',}}>{this.state.date}</Text>
      </View>
        )
    }


    GetTime() {
 
        // Creating variables to hold time.
        var date, TimeType, hour, minutes, seconds, fullTime;
     
        // Creating Date() function object.
        date = new Date();
     
        // Getting current hour from Date object.
        hour = date.getHours(); 
     
        // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
        if(hour <= 11)
        {
     
          TimeType = 'AM';
     
        }
        else{
     
          // If the Hour is Not less than equals to 11 then Set the Time format as PM.
          TimeType = 'PM';
     
        }
     
     
        // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
        if( hour > 12 )
        {
          hour = hour - 12;
        }
     
        // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
        if( hour == 0 )
        {
            hour = 12;
        } 
     
     
        // Getting the current minutes from date object.
        minutes = date.getMinutes();
     
        // Checking if the minutes value is less then 10 then add 0 before minutes.
        if(minutes < 10)
        {
          minutes = '0' + minutes.toString();
        }
     
     
        //Getting current seconds from date object.
        seconds = date.getSeconds();
     
        // If seconds value is less than 10 then add 0 before seconds.
        if(seconds < 10)
        {
          seconds = '0' + seconds.toString();
        }
     
     
        // Adding all the variables in fullTime variable.
        fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();
     
     
        // Setting up fullTime variable in State.
        this.setState({
     
          time: fullTime
     
        });
      }
     
}
