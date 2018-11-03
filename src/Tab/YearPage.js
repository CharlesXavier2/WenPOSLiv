/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Button,
    AsyncStorage,
    BackHandler,
    TouchableOpacity,


} from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';
import {StackNavigator} from 'react-navigation';
import DrawerScreen from '../components/DrawerScreen';
import * as Progress from 'react-native-progress';
import DatePicker from '../utils/datepicker.js';
import Moment from 'moment';
import SaleDetails from '../components/SaleDetail';


var dateFormat = require('dateformat');
var parentVal =0;
var tabPositionVal=0;
//var dateValue='';
export default class YearPage extends Component {
    constructor(props) {
        super(props)
        props.navigation.setParams({
            onTabFocus: this.callCurrentApi
          });
        this.state = {
            dataSource: [],
            progress: 0,
            indeterminate: true,
            date: '',
            parent :0,
            tabPosition:0,
            clickId:0,
            regionId:0,
            cityId:0,
            storeId:0, 
        }
        this.onBackPress = this.onBackPress.bind(this);



    }

    static navigationOptions = ({ navigation }) => ({
        // tabBarOnPress: e => {
        // //   Alert.alert("Test", "Tab selected"); // Here
        // //   e.jumpToIndex(e.scene.index);
        // console.log('Month -> tabBarOnPress ') 
        // this.callCurrentApi()
        // }

        tabBarOnPress: ({ navigation, defaultHandler }) => {
            // perform your logic here
            // this is mandatory to perform the actual switch
            // don't call this if you want to prevent focus
           
            navigation.state.params.onTabFocus();
            defaultHandler();
          }
      });



    componentWillFocus() {
        // Screen will entered
        console.log('Year -> componentWillReceiveProps entered') 
   }

   componentWillBlur() {
        // Screen will leave
        console.log('Year -> componentWillReceiveProps Leave') 
   }
   componentWillReceiveProps(nextProps) {
    console.log('Year -> componentWillReceiveProps ') 
   }

   getDate = () => {
    AsyncStorage.getItem("date_key").then((value) => {
        console.log(" Getter date" + value);
        if(value==null ||value==''){
            var date = new Date().toDateString();
            date = dateFormat(date, "yyyy-mm-dd");
            this.setState({ date });
            AsyncStorage.setItem("date_key", date);
        }else{
            this.setState({ date:value });
        }
    })
};

    setCurrentScreen = (id) => {
        //0 for region 1 for city 2 for store
        console.log('setCurrentScreen before parent : '+this.state.parent) 
        if(this.state.parent>=2)
        { 
            console.log('Already in store ') 
            return;
         }
        var parent = this.state.parent + 1;
         
       var clickId=id;
    //    var pageFlow = this.state.pageFlow + clickId;
        // this.setState({ parent });
        this.setState({
            parent
        });
        this.setState({
            clickId
        });

        console.log('setCurrentScreen after parent local : '+parent)
        // this.setState({ clickId });
        console.log('setCurrentScreen after parent local clickid : '+clickId)
        AsyncStorage.setItem("parent_key", parent);
        
        console.log('setCurrentScreen after parent : '+this.state.parent)
        console.log('setCurrentScreen after parent click ID : '+this.state.clickId)
        this.pageStackComponentDidMount(clickId,parent);
        
    };
    setBackStackScreen = () => {
        var bodyData="",url="";
        //0 for region 1 for city 2 for store
        console.log('before parent : '+this.state.parent)
        var parent = this.state.parent -1;
        console.log('before parent : '+parent)

        var id=0;

      // var clickId=id;
        this.setState({ parent });
        switch(this.state.parent) {
            case 0:
            // Region level
            bodyData=JSON.stringify({
                date:this.state.date,
                filter_type:'year',
            }),
            url='getRegionSales'

            

            break;
            case 1:
           
            // Cities level
            id=this.state.regionId;
            bodyData=JSON.stringify({
                date:this.state.date,
                filter_type:'year',
                region_id:id,
            }),
            url='getCitySales'
            console.log('setBackStackScreenswitchCities'+id)

            
            break;
            case 2:
            // Store level
            id=this.state.cityId;
            bodyData=JSON.stringify({
                date:this.state.date,
                filter_type:'year',
                city_id:id,
            }),
            url='getStoreSales'
            break;
       }
       console.log('Action ID : '+id)
       console.log('URL : '+url)
       AsyncStorage.getItem("parent_key").then((value) => {
        console.log(" Getter date : " + value);
        screenPosition = value;
        this.callApi(url,bodyData)
    }).done();
    //   this.pageStackComponentDidMount(id);
        
    };
animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
        this.setState({ indeterminate: false });
        setInterval(() => {
            progress += Math.random() / 5;
            if (progress > 1) {
                progress = 1;
            }
            this.setState({ progress });
        }, 50);
    }, 9100);
}

dateFind() {

    dateValue: { this.state.date };
}


totalSaleFormat = (val) => {
   // try {
    if (val > 999999) {
        val = val / 1000000;
        op = val.toFixed(2);
        return (op + " mn");
    } else {
        val = val / 1000;
        op = val.toFixed(2);
       // op = getTwoDecimalFormat(val);
        return (op + " K");
    }
// } catch (Exception e) {
//     return (0 + " K");
// } 
}

renderItem = ({ item }) => {
    var val =item.current_sale;
   
   
    
    var rounfFranchise = '0.00';
    if (item != null) {
        this.setState({ indeterminate: false });
    }

    if (item.current_sale > item.last_sale){
      return (


        <View style={styless.MainContainer}>


            <CardView
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={1}
                style={styless.cardViewStyle}
            >
                {
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

                        <View style={styless.cardViewRow}>


                            <Text style={{
                                fontSize: 22,

                                color: '#ffffff',


                                justifyContent: 'center',
                                // textAlignVertical: "center",
                                alignItems: 'center',

                            }}
                        //    onPress={this.navigateToScreen('SaleDetails')}
                        // onPress= {()=> this.props.navigation.navigate('SaleDetails',  {}, {
                        //     type: "Navigate",
                        //     routeName: "Main",
                        //     params: {param: 'param'},
                        // })}
                      
                        onPress={() => { 
                            this.setCurrentScreen(item.id); 
                    
                        }}
                            /* 1. Navigate to the Details route with params */
                            // this.props.navigation.navigate('SaleDetails', {
                            //   itemId: 86,
                            //   otherParam: 'anything you want here',
                            // });

                            
                         
                            >
                                {
                                    item.name
                                }
                            </Text>


                             
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>



                                <Image
                                    source={require('../images/saleup.png')}
                                    style={styless.ImageIconStyle} />
                                <Text style={{
                                    fontSize: 16,
                                    //width: 150,
                                    color: '#ffffff',


                                    justifyContent: 'center',
                                    //textAlignVertical: "center",
                                    alignItems: 'center',

                                }}>Total Sale :
                            {
                                        //item.current_sale.toFixed(2)
                                        this.totalSaleFormat(val)
                                    }
                                </Text>


                            </View>
                            

                              
                        </View>
                       

                        <TouchableOpacity onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                this.props.navigation.navigate('SaleDetails', {
                                  itemId: item.name,
                                  otherParam: this.totalSaleFormat(val),
                                });
                              }} >
                              <Image
                              source={require('../images/nextButton.png')}
                              style={{
                                  width: 30,
                                  height: 30,
                                  padding: 10,
                                  margin: 5,
                                  marginLeft: 15,
                                  resizeMode: 'stretch',

                              }}/> 
                              </TouchableOpacity>
                              
                            


                    </View>


                }


                {/* {item.sale_data.map((data) =>


                    <View style={styless.cardViewRow}>
                        <Text style={styless.cardViewText}>
                            {
                                data[0].name
                            }
                        </Text>
                        <Text style={styless.dataRow}>

                            {

                                data.total.toFixed(2)
                            }
                        </Text>
                        <Text style={styless.dataRow}>
                            {
                                data.self.toFixed(2)
                            }
                        </Text>

                        <Text style={styless.dataRow}>
                            {data.franchise && data.franchise != null ? ` ${data.franchise.toFixed(2)}` : '0'}
                        </Text>

                    </View>

                )} */}
                <View style={styless.hairline} />
            </CardView>
        </View>
    ) }
    else
    {
        return (


          <View style={styless.MainContainer}>

{/* <View style={{ flex: 1,  }}>
    
    
  </View> */}
              <CardView
                  cardElevation={2}
                  cardMaxElevation={2}
                  cornerRadius={1}
                  style={styless.cardViewStyle}
              >
                  {
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

                          <View style={styless.cardViewRow}>


                              <Text style={{
                                  fontSize: 22,

                                  color: '#ffffff',


                                  justifyContent: 'center',
                                  // textAlignVertical: "center",
                                  alignItems: 'center',

                              }}
                            //   onPress={this.login}
                            // onPress={this.navigateToScreen('SaleDetails')}
                            // onPress= {()=> this.props.navigation.navigate('SaleDetails')}
                            // onPress= {()=> this.props.navigation.navigate('SaleDetails')}
                            onPress={() => {
                                if(item.id==0||item.name=='National'){ 
                                    return;
                                }else{ 
                                    this.setCurrentScreen(item.id); 
                                }
                                
                                /* 1. Navigate to the Details route with params */
                            //     this.props.navigation.navigate('SaleDetails', {
                            //       itemId: item.name,
                            //       otherParam:  
                            //         this.totalSaleFormat(val)
                            //    ,
                            //     });




                            // this.props.navigation.navigate('SaleDetail', {
                            //     parent: 1+parentVal,
                            //     tabPosition: tabPositionVal,
                            //   });


                              }}

                              >
                                  {
                                      item.name
                                  }
                              </Text>





                               
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>



                                  <Image
                                      source={require('../images/saledown.png')}
                                      style={styless.ImageIconStyle} />
                                  <Text style={{
                                      fontSize: 16,
                                      //width: 150,
                                      color: '#ffffff',


                                      justifyContent: 'center',
                                      //textAlignVertical: "center",
                                      alignItems: 'center',

                                  }}>Total Sale :
                              {
                                           this.totalSaleFormat(val)
                                      }
                                  </Text>


                              </View>
                                
                          </View>
                          <TouchableOpacity onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                this.props.navigation.navigate('SaleDetails', {
                                  itemId: item.name,
                                  otherParam: this.totalSaleFormat(val),
                                });
                              }} >
                             <Image
                              source={require('../images/nextButton.png')}
                              style={{
                                  width: 30,
                                  height: 30,
                                  padding: 10,
                                  margin: 5,
                                  marginLeft: 15,
                                  resizeMode: 'stretch',

                              }}/> 
                              </TouchableOpacity>


                   
                      </View>


                  }


                  {/* {item.sale_data.map((data) =>


                      <View style={styless.cardViewRow}>
                          <Text style={styless.cardViewText}>
                              {
                                  data[0].name
                              }
                          </Text>
                          <Text style={styless.dataRow}>

                              {

                                  data.total.toFixed(2)
                              }
                          </Text>
                          <Text style={styless.dataRow}>
                              {
                                  data.self.toFixed(2)
                              }
                          </Text>

                          <Text style={styless.dataRow}>
                              {data.franchise && data.franchise != null ? ` ${data.franchise.toFixed(2)}` : '0'}
                          </Text>

                      </View>

                  )} */}
                  <View style={styless.hairline} />
              </CardView>
          </View>
      ) }

    

}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

  }
componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // const { navigation } = this.props;
    // const parent = navigation.getParam('parent', '0');
    // const tabPosition = navigation.getParam('tabPosition', '0');
    //  parentVal =parent,
    //  tabPositionVal=tabPosition,

    //  this.setState({ parent: parentVal, });
    //  this.setState({ tabPosition: tabPositionVal, });

    // console.log('Parent : '+parent)
    // console.log('tabPosition : '+tabPosition)
    this.callCurrentApi()
}

callCurrentApi= () =>  {

    var urlPanDate = ''
    this.getDate();
    AsyncStorage.getItem("date_key").then((value) => {
        console.log(" Getter date" + value);
        urlPanDate = value;
        const urlPan = 'http://115.112.181.53:3000/api/getRegionSales'
        console.log("  url " + urlPan)
        fetch(urlPan,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            
                date:this.state.date,
                filter_type:'year',
             
            })
        })
            .then((response) => response.json())

            .then((responseJson) => {
                // this.setState.dataSource.push( responseJson.sale_info );
                this.setState({
                    dataSource: responseJson.data
                })

                if (responseJson != null) {

                }

            })
            .catch((error) => {
                console.log(error)
            })


            .catch((error) => {
                console.log(error)
            })
    }).done();
}

//for date
customComponentDidMount() {
    var urlPanDate = ''
    // this.getDate();
    AsyncStorage.getItem("date_key").then((value) => {
        console.log(" Getter date" + value);
        urlPanDate = value;
        const urlPan = 'http://115.112.181.53:3000/api/getRegionSales'
        console.log("  url " + urlPan)
        fetch(urlPan,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            
                date:this.state.date,
                filter_type:'year',
             
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // this.setState.dataSource.push( responseJson.sale_info );
                this.setState({
                    dataSource: responseJson.data
                })

                if (responseJson != null) {

                }

            })
            .catch((error) => {
                console.log(error)
            })


            .catch((error) => {
                console.log(error)
            })
    }).done();
}

//for page refersh

pageStackComponentDidMount(id,parent) {
    var bodyData="",url="";
    switch(parent) {
        case 0:
        // Region level
        bodyData=JSON.stringify({
            date:this.state.date,
            filter_type:'year',
        }),
        url='getRegionSales'

        break;
        case 1:
        this.state.regionId=id;
        
        // Cities level

        bodyData=JSON.stringify({
            date:this.state.date,
            filter_type:'year',
            region_id:id,
        }),
        url='getCitySales'

        
        break;
        case 2:
        // Store level
        this.state.cityId=id;
        // this.state.storeId=id;
        bodyData=JSON.stringify({
            date:this.state.date,
            filter_type:'year',
            city_id:id,
        }),
        url='getStoreSales'

        break;
   }
    var screenPosition = ''
    // this.getDate();
    AsyncStorage.getItem("parent_key").then((value) => {
        console.log(" Getter date : " + value);
        screenPosition = value;
        this.callApi(url,bodyData)
    }).done();
  
}



callApi = (url,bodyData) => {
   
    const urlPan ='http://115.112.181.53:3000/api/'+url;
        console.log("  url " + urlPan)


        fetch(urlPan,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyData,
        }).then((response) => response.json())
            .then((responseJson) => {
                // this.setState.dataSource.push( responseJson.sale_info );
                this.setState({
                    dataSource: responseJson.data
                })

                if (responseJson != null) {

                }

            })
            .catch((error) => {
                console.log(error)
            })
            .catch((error) => {
                console.log(error)
            })
    
};

// for back stack navigation
onBackPress = () => {

    console.log('onBackPress function')
    if(this.state.parent==0){
        return;
            }
 // works best when the goBack is async
 else{
    console.log('onBackPress function to calling setBackStackScreen ')
this.setBackStackScreen();

 }
    return true;
  }


  render() {
        
    // const { navigate } = this.props.navigation;

  

// console.log('Parent : '+parent)
    /* 2. Read the params from the navigation state */
    // const { params } = this.props.navigation.state;
    //const itemId = params ? params.itemId : null;
    // const filterType = params ? params.filterType : null;
    if (this.state.dataSource != null && this.state.dataSource.length > 0) {
        return (
            <View style={{ backgroundColor: '#000000', flex: 1, }}>

                <View style={styless.categries}>
                    <DatePicker

                        date={this.state.date}
                        placeholder="placeholder"

                        mode="date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../images/date_icon.png')}
                        onDateChange={(date) => {
                            this.setState({ date: date });
                            AsyncStorage.setItem("date_key", this.state.date);
                            this.customComponentDidMount();
                        }}

                    />
                    <Text style={styless.instructions}>{this.state.date}</Text>
                    {/* <Text style={{
                        fontSize: 12,

                        color: '#ffffff',
                        // paddingLeft: 40,

                        marginLeft: 40,
                        //justifyContent: 'center',
                        textAlignVertical: "center",
                        alignItems: 'center',

                    }}>Net Sales</Text>  */}

                    <Image
                        source={require('../images/select_people.png')}
                        style={{
                            padding: 10,
                            margin: 5,
                            marginLeft: 150,
                            resizeMode: 'stretch',

                        }}
                    />

                    <Image
                        source={require('../images/select_geo.png')}
                        style={styless.ImageIconStyle}
                    />


                </View>
              


                <FlatList
                    data={this.state.dataSource}
                    renderItem={
                        this.renderItem
                    }
                />
            </View>



        );
    }
    else {
        return (
            <View style={styless.MainContainer}>

                <Progress.Bar
                    style={styles.progress}
                    progress={this.state.progress}
                    indeterminate={this.state.indeterminate}
                    width={380}
                    borderColor={'#FAC209'}
                    borderRadius={0}
                    color={'rgb(250, 194, 9)'}
                    marginTop={1}
                />

                <View style={styless.categries}>
                    <DatePicker

                        date={this.state.date}
                        // placeholder="placeholder"

                        mode="date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../images/date_icon.png')}
                        onDateChange={(date) => {
                            this.setState({ date: date });
                            AsyncStorage.setItem("date_key", this.state.date);
                            this.customComponentDidMount();
                        }} />
                    <Text style={styless.instructions}>{this.state.date}</Text>
                    {/* <Text style={{
                        fontSize: 12,

                        color: '#ffffff',
                        // paddingLeft: 40,


                        //justifyContent: 'center',
                        textAlignVertical: "center",
                        alignItems: 'center',

                    }}>Net Sales</Text>  */}
                    <Image
                        source={require('../images/select_people.png')}
                        style={{
                            padding: 10,
                            margin: 5,
                            marginLeft: 150,
                            resizeMode: 'stretch',

                        }}
                    />

                    <Image
                        source={require('../images/select_geo.png')}
                        style={styless.ImageIconStyle}
                    />

                </View>


                <FlatList
                    data={this.state.dataSource}
                    renderItem={
                        this.renderItem
                    }
                />

            </View>
        );
    }
}
}

const styless = StyleSheet.create({

    MainContainer: {

        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column',


    },
    categries: {

        // width: '100%',
        height: 40,
        marginTop: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    ImageIconStyle: {
        padding: 10,
        margin: 5,

        resizeMode: 'stretch',

    },

    cardViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 100,
        backgroundColor: '#313131',
        marginTop: 10,
        //    // marginBottom: 10,
        //     marginLeft: 10,
        //     marginRight: 10
    },
    cardViewRow: {
        flexDirection: 'column',
        height: 22.7,
        //backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        // textAlignVertical: "center"





    },
    cardViewText: {
        flex: 1,
        fontSize: 10,
        width: 80,
        paddingLeft: 35,
        backgroundColor: 'red',
        color: '#ffffff',
        //justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: "center"


    },
    cardViewHeader: {
        fontSize: 10,
        width: 75,

        color: '#ffffff',

        paddingLeft: 20,
        backgroundColor: '#FAC209',
        //justifyContent: 'center',
        textAlignVertical: "center",
        alignItems: 'center',

    },
    dataRow:

    {
        fontSize: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 60,
        justifyContent: 'center',
        color: '#ffffff',
        alignItems: 'flex-end'

    },
    hairline: {
        backgroundColor: '#000',
        height: 2,

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
    },
    instructions: {
        //justifyContent: 'center',
        textAlignVertical: "center",
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5
    },




});

// const navigateToScreen =StackNavigator({
//    // DayPage: {screen: DayPage}, 
//     SaleDetails: {screen: SaleDetails}, 
// } , 
// //initialRouteName: 'DayPage',

// );
