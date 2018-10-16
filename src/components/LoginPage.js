import React, {Component} from 'react';
import {
Platform,
StyleSheet,
Text,
Button,
View,
Image,
TextInput,
TouchableOpacity,
ImageBackground

} from 'react-native'

export default class LoginPage extends Component{

    static navigationOptions = {
        header: null
    };
    

    constructor(props){
       super(props);
       this.state = {
        username:'',
        password:'',
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
                      
                    placeholder='User Id'
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={(username)=> this.setState({username})}>
                    </TextInput>
                    </View> 
                    <View > 
                   
                    <TextInput style={styles.inputbar}
                           secureTextEntry={true}
                           placeholder='Password'
                           autoCapitalize='none'

                           returnKeyType='search'
                           onChangeText={(password)=> this.setState({password})}>
                           
                           </TextInput>
                                               </View> 
                
                   
                      <TouchableOpacity style={styles.buttonContainer}>
                      <Text style={styles.buttontext}
                      //onPress={this.login}
                      onPress= {this.props.navigation.navigate('DayPage')}
                    >Login</Text>

                      </TouchableOpacity>
                      
                </View>
               
            </View>
             </ImageBackground>
           
        );
    }
    login = () => {
       fetch('http://bkliveapp.bklive.in:4500/v2/login',{
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
           
            email:this.state.username,
            password:this.state.password,
            
           })
       })
       .then((response) => response.json())
       .then((responseJson) => {
           if(responseJson.status==true)
           {
            this.props.navigation.navigate('DayPage')
               //console.warn(responseJson);
               
            
            }else{
                alert(responseJson.message);
            }
        
           })
           .catch((error) => {
             console.error(error);
           });
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