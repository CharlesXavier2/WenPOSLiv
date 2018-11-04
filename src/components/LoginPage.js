import React, {Component} from 'react';
import {
Platform,
StyleSheet,
Text,
Button,
View,
AsyncStorage,
Image,
TextInput,
TouchableOpacity,
ImageBackground

} from 'react-native'
const GLOBAL = require('../constant/Globals.js');
export default class LoginPage extends Component{

    static navigationOptions = {
        header: null
    };
    

    constructor(props){
       super(props);
       this.state = {
        username:'admin@mcdliv.in',
        password:'mcdliv',
        } 
    }
    render(){
        return(
            <ImageBackground
            source={require('../images/backgroundimage.png')}
            style={styles.container}>
            

           
            <View style={styles.maincontainer}> 
            
               
                <View style={styles.logincontainer}>
                <View style={styles.logoIcon}>
                <Image 
            
                source={require('../images/mcdo_logo.png')} 
              />
              </View>
                    <View >
                      
                    <TextInput style={styles.inputbar}
                      Text='admin@mcdliv.in'
                    placeholder='User Id'
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={this.state.username}
                    onChangeText={(username)=> this.setState({username})}>
                    </TextInput>
                    </View> 
                    <View > 
                   
                    <TextInput style={styles.inputbar}
                           secureTextEntry={true}
                           placeholder='Password'
                           autoCapitalize='none'
                            Text='mcdliv'
                           returnKeyType='search'
                           onChangeText={(password)=> this.setState({password})}>
                           value={this.state.password}
                           </TextInput>
                                               </View> 
                
                   
                      <TouchableOpacity style={styles.buttonContainer}>
                      <Text style={styles.buttontext}
                      onPress={this.login}
                      //onPress= {this.props.navigation.navigate('DayPage')}
                    >Login</Text>

                      </TouchableOpacity>
                      
                </View>
               
            </View>
             </ImageBackground>
           
        );
    }
    login = () => {

        if(this.state.username=='admin@mcdliv.in'&&this.state.password=='mcdliv' )
        {
            AsyncStorage.setItem(GLOBAL.PARENT_KEY,"0")
            AsyncStorage.setItem(GLOBAL.REGION_ID_KEY,"")
            AsyncStorage.setItem(GLOBAL.CITY_ID_KEY,"")
            AsyncStorage.setItem(GLOBAL.IS_GEO_KEY,"true")
            this.props.navigation.navigate('DayPage')
        }else {
            alert('Please check Email or Password');
        }
    //    fetch('http://bkliveapp.bklive.in:4500/v2/login',{
    //        method: 'POST',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({
           
    //         email:this.state.username,
    //         password:this.state.password,
            
    //        })
    //    })
    //    .then((response) => response.json())
    //    .then((responseJson) => {
    //        if(responseJson.status==true)
    //        {
    //         this.props.navigation.navigate('DayPage')
    //            //console.warn(responseJson);
               
            
    //         }else{
    //             alert(responseJson.message);
    //         }
        
    //        })
    //        .catch((error) => {
    //          console.error(error);
    //        });
    }

}
const styles = StyleSheet.create({
    container:{
       
        flex: 1,
        width: '100%',
        height: '100%'
    },
    maincontainer:{
        flex: 1,
       
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    logincontainer: { 
        padding: 5,
        width:370,
        justifyContent: 'center',
        height: 380,
        backgroundColor: 'rgba(255,255,255, .3)'
       
    },
    textfields: { 
        padding: 5,
        height: 70,
       
    },logoIcon: { 
        padding: 1,
        alignItems: 'center',
        marginBottom: 10
       
    },
    inputbar: { 
        paddingLeft:20,
        borderRadius: 50,
        height: 40,
        marginLeft:40,
        marginRight: 40,
        fontSize: 16,
        color: '#fff',
        borderColor:'#fff',
        backgroundColor: 'rgba(255,255,255, .1)',
        borderWidth: 1,
        marginBottom: 20,
    },
    buttonContainer: { 
        height: 40,
        borderRadius: 50,
        marginLeft:40,
        marginRight: 40,
        backgroundColor: '#FF0000',
        justifyContent: 'center'
    },
    buttontext: { 
        textAlign: 'center',
        color: '#ecf0f1',
        fontSize: 18
    }
});