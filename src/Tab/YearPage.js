/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { EventRegister } from 'react-native-event-listeners'
const GLOBAL = require('../constant/Globals.js');
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
    Alert,
    exitApp,


} from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';
import { StackNavigator } from 'react-navigation';
import DrawerScreen from '../components/DrawerScreen';
import * as Progress from 'react-native-progress';
import DatePicker from '../utils/datepicker.js';
import Moment from 'moment';
import SaleDetails from '../components/SaleDetail';


var dateFormat = require('dateformat');
var filter_type = 'year';
var tabPositionVal = 0;
//var dateValue='';
export default class YearPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            progress: 0,
            indeterminate: true,
            date: '',
            parent: 0,
            tabPosition: 0,
            clickId: "0",
            regionId: 0,
            cityId: 0,
            storeId: 0,
            isGeo: "true",
            isLoading: true,
            filter_type: 'year',
            netSales:'',

        }
        this.onBackPress = this.onBackPress.bind(this);
        props.navigation.setParams({
            onTabFocus: this.tabClick
        });
    }
    // static navigationOptions= ({navigation}) => {
    //     return {title: navigation.state.params.itemId}
    //   }

    static navigationOptions = ({ navigation }) => (
        {
            // tabBarOnPress: e => {
            // //   Alert.alert("Test", "Tab selected"); // Here
            // //   e.jumpToIndex(e.scene.index);
            // console.log('Month -> tabBarOnPress ') 
            // this.callCurrentApi()
            // }
            // title: 'McDLiv',
            // title: navigation.state.titleName,
            // headerRight: <HeaderBackButton  onPress={() => { 
            //     this.setBackStackScreen(); 

            // }} />,

            swipeEnabled: false,
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                // perform your logic here
                // this is mandatory to perform the actual switch
                // don't call this if you want to prevent focus

                navigation.state.params.onTabFocus();
                defaultHandler();
            },


        });

    _myHomeFunction = () => {
        alert('Here is home tab!');
    }
    
    componentWillMount() {
        this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
            this.customComponentDidMount()
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    componentWillReceiveProps(newProps) {
        // this._myHomeFunction();
        try {
            // this.customComponentDidMount()
            console.log(" componentWillReceiveProps year : ")
        } catch (error) {

        }
        // alert('Here is home tab! : '+newProps.screenProps.currentScreen);
        // if (newProps.screenProps.route_index == 0) {
        //   this._myHomeFunction();
        // }
    }

    getDate = () => {
        AsyncStorage.getItem("date_key").then((value) => {
            console.log(" Getter date" + value);
            if (value == null || value == '') {
                var date = new Date().toDateString();
                date = dateFormat(date, "yyyy-mm-dd");
                this.setState({ date });
                AsyncStorage.setItem(GLOBAL.DATE_KEY, date);
            } else {
                this.setState({ date: value });
            }
        })
    };

    openDialog = () => {
        // Works on both iOS and Android
        Alert.alert(
            '',
            'Are you want to switch Geographical/People',
            [
                //   {text: 'Ask me later', onPress: () => {
                //       console.log('Ask me later pressed')
                //   }
                // },
                {
                    text: 'Cancel', onPress: () => {
                        console.log('Cancel Pressed')
                    }, style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        console.log('OK Pressed');

                        AsyncStorage.getItem(GLOBAL.IS_GEO_KEY).then((value) => {

                            if (value === null) {
                                value = "true";
                            }
                            console.log(" Is_Geo_key : " + value);
                            if (value == "true") {
                                AsyncStorage.setItem(GLOBAL.IS_GEO_KEY, "false");
                                this.setState({ isGeo: true })

                            } else {
                                AsyncStorage.setItem(GLOBAL.IS_GEO_KEY, "true");
                                this.setState({ isGeo: false })

                            }
                            console.log("State value Is_Geo_key : " + this.state.isGeo);

                            this.setState({ parent: 0 })
                            AsyncStorage.setItem(GLOBAL.PARENT_KEY, "0");

                            this.customComponentDidMount()
                        }).done();
                    }

                },
            ],
            { cancelable: false }
        )
    }


    // For show Expandable data on click button.
    setExpandableData = (obj) => {
        var id = obj.id;
        var name = obj.name
        this.setState({ indeterminate: true });
        this.getDate();
        var urlPanDate = ''
        var regionId = ''
        var cityId = '';
        // this.getDate();
        AsyncStorage.getItem(GLOBAL.REGION_ID_KEY).then((regionIdVal) => {
            regionId = regionIdVal
        }).done()
        AsyncStorage.getItem(GLOBAL.CITY_ID_KEY).then((cityIdVal) => {
            cityId = cityIdVal
        }).done()
        AsyncStorage.getItem(GLOBAL.CITY_NAME_KEY).then((cityNameVal) => {
            cityName = cityNameVal
            console.log("cityName : " + cityName);

        }).done()

        AsyncStorage.getItem(GLOBAL.PARENT_KEY).then((parent) => {
            console.log(" parent_key : " + parent);
            if (parent == null) {
                parent = 0
            }
            AsyncStorage.getItem(GLOBAL.DATE_KEY).then((value) => {
                console.log(" date_key : " + value);
                if (value == null || value == '') {
                    var date = new Date().toDateString();
                    date = dateFormat(date, "yyyy-mm-dd");
                    AsyncStorage.setItem(GLOBAL.DATE_KEY, date);
                    value = date;
                }
                urlPanDate = value;
                AsyncStorage.getItem(GLOBAL.IS_GEO_KEY).then((value1) => {
                    console.log("1st Is_Geo_key : " + value1);
                    if (value1 === null) {
                        value1 = "true";
                    }
                    console.log(" Is_Geo_key : " + value1);
                    var urlValue = ''
                    var bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,

                    })
                    if (value1 == "true") {
                        this.setState({isGeo:true})
                        console.log(" value1==true");
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log(" value1==true  case 0");
                                console.log(" region_id= " + id);
                                urlValue = 'get_all_region_sale?filter_type=day&date=' + urlPanDate + '&region_id=' + id;
                                // var cityId=id

                                // bodyJson = JSON.stringify({
                                //     date: urlPanDate,
                                //     filter_type: filter_type,
                                // })
                                break;
                            case 1:
                            case '1':
                                console.log(" value1==true  case 1");

                                console.log(" region_id= " + id);
                                console.log("city_name= " + name);
                                urlValue = 'get_all_city_sale?filter_type=day&date=' + urlPanDate + '&region_id=' + regionId + '&city_name=' + name;

                                break;
                            case 2:
                            case '2':
                                console.log(" value1==true  case 2");
                                urlValue = 'get_all_store_sale?filter_type=day&date=' + urlPanDate + '&city_name=' + cityId + '&store_code=' + id;
                                break;
                            // case 3:
                            // case '3':
                            //     console.log(" value1==true  case ");
                            //     urlValue = 'http://115.112.224.200:3000/api/getRegionSales'
                            //     break;

                        }
                    } else {
                        this.setState({isGeo:false})
                        console.log("else value1==true");
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log("else value1==true case  0");
                                console.log(" region_id= " + id);
                                console.log(" region_id---= " + regionId);
                                console.log("city_name= " + name);
                                urlValue = 'get_all_deputy_manager_sale?filter_type=day&date=' + urlPanDate + '&deputy_name=' + name;

                                break;
                            case 1:
                            case '1':
                                console.log("else value1==true case  1");
                                urlValue = 'get_all_petch_manager_sale?filter_type=day&date=' + urlPanDate + '&deputy_name=' + regionId + '&petch_name=' + id;

                                break;
                            case 2:
                            case '2':
                                console.log("else value1==true case  2");
                                return

                        }
                    }
                    const urlPan = 'http://115.112.224.200:3000/v2/' + urlValue;
                    console.log("  url " + urlPan)
                    return fetch(urlPan)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            var dataSourceTemp = [];
                            this.setState({ indeterminate: false });
                            console.log("Response data responseJson -> " + responseJson);
                            this.state.dataSource.map((value) => {

                                dataSourceTemp.push({
                                    id: value.id, name: value.name,
                                    current_sale: value.current_sale,
                                    last_sale: value.last_sale, sale_data: []
                                })
                            }),
                                console.log("dataSourceTem -> " + JSON.stringify(dataSourceTemp)),

                                responseJson.sale_info.map((data) => {
                                    console.log("responseJson.sale_info.map((data) -> " + JSON.stringify(data)),
                                        dataSourceTemp.map((dataa) => {
                                            if (id == dataa.id) {
                                                dataa.hasSaleData = true
                                                dataa.sale_data = data.sale_data
                                            } else {
                                                var sale_data = []
                                                sale_data.push({
                                                    name: 'Net Sales', total: dataa.current_sale,
                                                })
                                                dataa.hasSaleData = false
                                                dataa.sale_data = sale_data
                                            }


                                        })
                                })

                            const myObjStr = JSON.stringify(dataSourceTemp);

                            console.log("dataSource : " + myObjStr);

                            this.setState({
                                dataSource: dataSourceTemp
                            })

                        })
                        .catch((error) => {
                            console.log(error)
                        })


                        .catch((error) => {
                            console.log(error)
                        })

                }).done();
            }).done();
        }).done();
    }

    setCurrentScreen = (id,name) => {
        //0 for region 1 for city 2 for store
        var isGeoVal = "true"
        console.log('setCurrentScreen before parent : ' + this.state.parent)
        AsyncStorage.getItem(GLOBAL.IS_GEO_KEY).then((value) => {
            isGeoVal = value
        }).done()
        if ((isGeoVal == "true" && this.state.parent >= 2) || (isGeoVal == "false" && this.state.parent >= 1)) {
            console.log('Already in store ')
            return;
        }
        var parent = (parseInt(this.state.parent) + 1);

        var clickId = id;
        var parentVal = parent
        //    var pageFlow = this.state.pageFlow + clickId;
        this.setState({
            parent: parentVal
        });
        this.setState({
            clickId: id
        });


        AsyncStorage.setItem(GLOBAL.PARENT_KEY, JSON.stringify(parent))
        switch (parent) {
            case 0:
            case '0':
                break;
            case 1:
            case '1':
                AsyncStorage.setItem(GLOBAL.REGION_ID_KEY, "" + id)
                break;
            case 2:
            case '2':
            AsyncStorage.setItem(GLOBAL.CITY_ID_KEY, "" + id)
            AsyncStorage.setItem(GLOBAL.CITY_NAME_KEY, "" + name)
            console.log("GLOBAL.CITY_NAME_KEY : " + name);
            case 3:
            case '3':
                break;

        }
        this.pageStackComponentDidMount(clickId, parent);

    };
    setBackStackScreen = () => {
        var bodyData = "", url = "";
        //0 for region 1 for city 2 for store
        console.log('before parent : ' + this.state.parent)
        var parent = this.state.parent - 1;
        console.log('before parent : ' + parent)
        AsyncStorage.setItem(GLOBAL.PARENT_KEY, JSON.stringify(parent))
        this.setState({ parent });
        this.customComponentDidMount();
        //     var id=0;

        //   // var clickId=id;
        //     this.setState({ parent });
        //     var isGeo="true"
        //     AsyncStorage.getItem("Is_Geo_key").then((isGeoVal) => {
        //         if(isGeoVal==null){
        //             isGeo="true"
        //         }else{
        //             isGeo=isGeoVal
        //         }

        //     }).done()
        //     console.log('isGeo : '+isGeo)
        //     if(isGeo=="true") {
        //     switch(this.state.parent) {
        //         case 0:
        //         // Region level
        //         bodyData=JSON.stringify({
        //             date:this.state.date,
        //             filter_type:'day',
        //         }),
        //         url='getRegionSales'

        //         break;
        //         case 1:

        //         // Cities level
        //         id=this.state.regionId;
        //         bodyData=JSON.stringify({
        //             date:this.state.date,
        //             filter_type:'day',
        //             region_id:id,
        //         }),
        //         url='getCitySales'
        //         console.log('setBackStackScreenswitchCities'+id)
        //         AsyncStorage.setItem(GLOBAL.REGION_ID_KEY, ""+id);
        //         break;
        //         case 2:
        //         // Store level
        //         id=this.state.cityId;
        //         bodyData=JSON.stringify({
        //             date:this.state.date,
        //             filter_type:'day',
        //             city_id:id,
        //         }),
        //         url='getStoreSales'
        //         AsyncStorage.setItem(GLOBAL.CITY_ID_KEY, ""+id);
        //         break;
        //    }
        // }else{
        //     switch(this.state.parent) {
        //         case 0:
        //         // Region level
        //         bodyData=JSON.stringify({
        //             date:this.state.date,
        //             filter_type:'day',
        //         }),
        //         url='getDeputyMgnSales'

        //         break;
        //         case 1:

        //         // Cities level
        //         id=this.state.regionId;
        //         bodyData=JSON.stringify({
        //             date:this.state.date,
        //             filter_type:'day',
        //             deputy_id:id,
        //         }),
        //         url='getPetchMgnSales'
        //         console.log('setBackStackScreenswitch Cities in People : '+id)
        //         AsyncStorage.setItem(GLOBAL.REGION_ID_KEY, ""+id);
        //         break;
        //         case 2:
        //         // Store level
        //         id=this.state.cityId;
        //         bodyData=JSON.stringify({
        //             date:this.state.date,
        //             filter_type:'day',
        //             city_id:id,
        //         }),
        //         url='getStoreSales'
        //         AsyncStorage.setItem(GLOBAL.CITY_ID_KEY, ""+id);
        //         break;
        //    }
        // }
        //    console.log('Action ID : '+id)
        //    console.log('URL : '+url)
        // //    AsyncStorage.getItem("parent_key").then((value) => {
        // //     console.log(" parent_key : " + value);
        // //     screenPosition = value;   
        // // }
        // this.callApi(url,bodyData)
        //   this.pageStackComponentDidMount(id);

    };



    clickButton() {
        console.log('click button')
    }

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
        try {
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
        } catch (error) {
            return (0 + " K");
        }
    }

    //for set string in camel case.
    toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    // Rerender data in row on click Expandable button
    renderItemSaleData = ({ item }) => {
        var val = item.total;
        console.log(' renderItemSaleData' + item.name)
        return (


            <View>
                <View style={{
                    marginLeft: -30,
                    backgroundColor: '#F4F5F5',
                    height: 0.8,

                }} />

                <View style={styless.cardViewRow}>
                    <View style={{
                        flexDirection: 'row',

                    }}>


                        <View style={styless.shapeyellow}>


                            <Text style={{
                                fontSize: 12,
                                //width: 150,
                                color: '#000000',
                                marginLeft: 30,


                                justifyContent: 'center',
                                //textAlignVertical: "center",
                                alignItems: 'center',

                            }}
                            > {

                                    "" + item.name
                                }

                            </Text>

                        </View>





                        <View style={styless.shapeinnerwhite}>


                            <Text style={{
                                fontSize: 12,
                                //width: 150,
                                color: '#000000',
                                marginLeft: 70,


                                justifyContent: 'center',
                                //textAlignVertical: "center",
                                alignItems: 'center',

                            }}> {
                                    //item.current_sale.toFixed(2)
                                    "" + this.totalSaleFormat(val)
                                }
                            </Text>

                        </View>
                    </View>
                </View>

                {/* <View style={{
                    marginLeft:-30,
                    backgroundColor: '#F4F5F5',
                    height: 0.8,

                }} /> */}

            </View>


        )

    }
    // Flatlist UI
    renderItem = ({ item }) => {
        var val = item.current_sale;
        var str = item.name;
        var rounfFranchise = '0.00';
        if(item.name == "National"){
            var netsale= this.totalSaleFormat(item.current_sale)
            this.setState({ netSales:netsale });

        }
        // console.log('UI refeashing start')

        return (

            <View style={styless.MainContainer}>


                <View
                    // cardElevation={2}
                    // cardMaxElevation={2}
                    // cornerRadius={1}
                    // borderRadius={5}
                    // borderColor={'#CE000A'}

                    //shadowRadius={'#CE000A'}
                    style={styless.cardViewStyle}
                >


                    <View style={styless.cardViewRowHeader}>

                        <View style={{ flexDirection: 'row', }}>


                            <View style={{
                                backgroundColor: '#FFFFFF',
                                width: '25%',
                            }}>
                               {
                               !( (this.state.parent==2 && this.state.isGeo)||(this.state.parent==1 && !this.state.isGeo) )  &&
                                <TouchableOpacity
                                    onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        this.props.navigation.navigate('DetailPage', {
                                            itemName: this.toTitleCase(str),
                                            itemId: item.id,
                                            sales: this.totalSaleFormat(item.current_sale),
                                            parent: this.state.parent,
                                            date: this.state.date,
                                            isGeo: this.state.isGeo,
                                            filter_type: this.state.filter_type
                                        });
                                    }} >
                                    <Image
                                        source={require('../images/list.png')}
                                        style={{
                                            width: 14,
                                            height: 14,
                                            padding: 10,
                                            marginLeft: 20,
                                            margin: 5,
                                            alignItems: 'center', justifyContent: 'center',
                                            resizeMode: 'stretch',

                                        }} />
                                </TouchableOpacity>
                                 }
                                  {
                                       ( (this.state.parent==2 && this.state.isGeo)||(this.state.parent==1 && !this.state.isGeo) ) &&
                              
                                  <View style={{ flexDirection: 'column',alignItems: 'center', justifyContent: 'center',marginTop:5}}>
                                   <Text
                                       
                                       style={{
                                          fontSize:8,
                                          marginLeft: 20,
                                          
                                           color:'#0000FF',
                                           alignItems: 'center', justifyContent: 'center',
                                          

                                       }} >
                                       {
                                         this.state.date  
                                       }
                                       </Text>
                                    <Text
                                       
                                        style={{
                                           fontSize:8,
                                            
                                            marginLeft: 25,
                                           
                                            color:'#0000FF',
                                            alignItems: 'center', justifyContent: 'center',
                                           

                                        }} >
                                          14:31
                                        </Text>
                                       
                                        </View>
                                 }
                            </View>

                            <View style={{
                                backgroundColor: '#FFFFFF',
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        
                                         if(this.state.parent==2 && this.state.isGeo){
                                            /* 1. Navigate to the Details route with params */
                                            this.props.navigation.navigate('DetailPage', {
                                                itemName: this.toTitleCase(str),
                                                itemId: item.id,
                                                sales: this.totalSaleFormat(item.current_sale),
                                                parent: this.state.parent,
                                                date: this.state.date,
                                                isGeo: this.state.isGeo,
                                                filter_type: this.state.filter_type
                                            });
                                        }
                                        else if(this.state.parent==1 && !(this.state.isGeo)){
                                            /* 1. Navigate to the Details route with params */
                                            this.props.navigation.navigate('DetailPage', {
                                                itemName: this.toTitleCase(str),
                                                itemId: item.id,
                                                sales: this.totalSaleFormat(item.current_sale),
                                                parent: this.state.parent,
                                                date: this.state.date,
                                                isGeo: this.state.isGeo,
                                                filter_type: this.state.filter_type
                                            });
                                        }
                                        else if (!(item.name == "National")) {
                                            this.setCurrentScreen(item.id, item.name);
                                        }
                                    }}  >

                                    <Text numberOfLines={1} style={{
                                        fontSize: 12,

                                        // color: '#CE000A',
                                        color: '#0000FF',
                                       
                                        marginLeft: 50,

                                        justifyContent: 'center',
                                        // textAlignVertical: "center",
                                        alignItems: 'center',

                                    }}>
                                        {
                                            "" + this.toTitleCase(str)
                                        }
                                    </Text>
                                </TouchableOpacity>

                            </View>

                            {
                                !item.hasSaleData &&
                                <TouchableOpacity

                                    onPress={() => {
                                        console.log("  !item.hasSaleData && : ");

                                        if (!(item.name == "National")) {
                                            var obj = {};
                                            obj.id = item.id;
                                            obj.name = item.name;

                                            this.setExpandableData(obj);


                                        }
                                    }}  >

                                    {(!(item.name == "National")) &&

                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            width: '15%', 
                                           
                                        }}>


                                            <Image
                                                source={require('../images/down.png')}
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    padding: 10,
                                                    marginLeft: 20,

                                                    margin: 5,
                                                    resizeMode: 'stretch',

                                                }} />

                                        </View>

                                    }
                                    {((item.name == "National")) &&

                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            width: '15%',
                                          
                                        }}>



                                        </View>

                                    }


                                </TouchableOpacity>

                            }

                            {
                                item.hasSaleData &&
                                <TouchableOpacity

                                    onPress={() => {
                                        console.log("  item.hasSaleData && : ");


                                        var dataSourceTemp = []
                                        this.setState({ indeterminate: true });
                                        this.state.dataSource.map((value) => {
                                            dataSourceTemp.push({
                                                id: value.id, name: value.name,
                                                current_sale: value.current_sale,
                                                last_sale: value.last_sale,
                                                sale_data: value.sale_data
                                            })

                                        })

                                        dataSourceTemp.map((data) => {
                                            if (item.id == data.id) {
                                                var sale_data = []
                                                sale_data.push({
                                                    name: 'Net Sales', total: data.current_sale,
                                                })
                                                data.hasSaleData = false
                                                data.sale_data = sale_data
                                                this.setState({ indeterminate: false });
                                            }


                                        })
                                        this.setState({ dataSource: dataSourceTemp });
                                        // const myObjStr = JSON.stringify(dataSourceTemp);
                                        // console.log("sale_data in dataSourceTemp : " + myObjStr); 


                                    }}  >

                                    {(!(item.name == "National")) &&

                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            width: '15%',
                                           
                                        }}>


                                            <Image
                                                source={require('../images/up.png')}
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    padding: 10,
                                                     marginLeft: 20,

                                                    margin: 5,
                                                    resizeMode: 'stretch',

                                                }} />

                                        </View>

                                    }
                                    {((item.name == "National")) &&

                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            width: '15%',
                                           
                                        }}>



                                        </View>

                                    }
                                </TouchableOpacity>

                            }


                        </View>

                    </View>

                    {/* {console.log('sale_data in render item:' + item.sale_data)} */}


                    {
                        item.sale_data != null &&
                        <FlatList

                            data={item.sale_data}
                            renderItem={
                                this.renderItemSaleData
                            }


                        />

                    }


                </View>


            </View>

        )




    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

    }
    componentDidMount() {
        console.log('GLOBAL.BASE_URL : ' + GLOBAL.BASE_URL)
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
        this.customComponentDidMount()
    }

    callCurrentApi = () => {
        var urlPanDate = ''
        this.getDate();
        AsyncStorage.getItem("date_key").then((value) => {
            console.log(" Getter date" + value);
            urlPanDate = value;
            const urlPan = 'http://115.112.224.200:3000/api/getRegionSales'
            console.log("  url " + urlPan)
            fetch(urlPan, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    date: this.state.date,
                    filter_type: filter_type,

                })
            })
                .then((response) => response.json())

                .then((responseJson) => {
                    this.setState({ indeterminate: false });

                    console.log("this.callApi(url,bodyData)  responseJson.data : " + responseJson.data);

                    responseJson.data.map((dataa) => {
                        var sale_data = []
                        sale_data.push({
                            name: 'Net Sales', total: dataa.current_sale,
                        })
                        dataa.hasSaleData = false
                        dataa.sale_data = sale_data
                    })
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

    tabClick = () => {
        this.setState({ parent: 0 })
        AsyncStorage.setItem(GLOBAL.PARENT_KEY, "0");
        this.customComponentDidMount()
    }
    //for date
    customComponentDidMount = () => {
        this.getDate()
        AsyncStorage.getItem(GLOBAL.PARENT_KEY).then((parent1) => {
            console.log(" parent_key : " + parent1);
            if (parent1 == null) {
                parent1 = 0
            }
            this.setState({
                parent: parent1
            })
        }).done()
        console.log(" customComponentDidMount ");
        var urlPanDate = ''
        var regionId = ''
        var cityId = '';
        // this.getDate();
        AsyncStorage.getItem(GLOBAL.REGION_ID_KEY).then((regionIdVal) => {
            regionId = regionIdVal
        }).done()
        AsyncStorage.getItem(GLOBAL.CITY_ID_KEY).then((cityIdVal) => {
            cityId = cityIdVal
        }).done()

        AsyncStorage.getItem("parent_key").then((parent) => {
            console.log(" parent_key : " + parent);
            if (parent == null) {
                parent = 0
            }
            AsyncStorage.getItem(GLOBAL.DATE_KEY).then((value) => {
                console.log(" date_key : " + value);
                if (value == null || value == '') {
                    var date = new Date().toDateString();
                    date = dateFormat(date, "yyyy-mm-dd");
                    AsyncStorage.setItem(GLOBAL.DATE_KEY, date);
                    value = date;
                }
                urlPanDate = value;
                AsyncStorage.getItem(GLOBAL.IS_GEO_KEY).then((value1) => {
                    console.log("1st Is_Geo_key : " + value1);
                    if (value1 === null) {
                        value1 = "true";
                    }
                    console.log(" Is_Geo_key : " + value1);
                    var urlValue = ''
                    var bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,

                    })
                    if (value1 == "true") {
                        this.setState({isGeo:true})
                        console.log(" value1==true");
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log(" value1==true  case 0");
                                urlValue = 'http://115.112.224.200:3000/api/getRegionSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log(" value1==true  case 1");
                                urlValue = 'http://115.112.224.200:3000/api/getCitySales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    region_id: regionId,
                                })
                                break;
                            case 2:
                            case '2':
                                console.log(" value1==true  case 2");
                                urlValue = 'http://115.112.224.200:3000/api/getStoreSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    city_id: cityId,
                                })
                                break;
                            case 3:
                            case '3':
                                console.log(" value1==true  case ");
                                urlValue = 'http://115.112.224.200:3000/api/getRegionSales'
                                break;

                        }
                    } else {
                        this.setState({isGeo:false})
                        console.log("else value1==true");
                        // urlValue='http://115.112.181.53:3000/api/getDeputyMgnSales' 
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log("else value1==true case  0");
                                urlValue = 'http://115.112.224.200:3000/api/getDeputyMgnSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log("else value1==true case  1");
                                urlValue = 'http://115.112.224.200:3000/api/getPetchMgnSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    deputy_id: regionId,
                                })
                                break;
                            case 2:
                            case '2':
                                console.log("else value1==true case  2");
                                return

                        }
                    }

                    console.log(" Body Request : " + bodyJson)
                    const urlPan = urlValue//'http://115.112.181.53:3000/api/getRegionSales':'http://115.112.181.53:3000/api/getDeputyMgnSales'
                    console.log("  url " + urlPan)
                    fetch(urlPan, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: bodyJson
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({ indeterminate: false });

                            console.log("this.callApi(url,bodyData)  responseJson.data : " + responseJson.data);

                            responseJson.data.map((dataa) => {
                                var sale_data = []
                                sale_data.push({
                                    name: 'Net Sales', total: dataa.current_sale,
                                })
                                dataa.hasSaleData = false
                                dataa.sale_data = sale_data
                            })
                            // this.setState.dataSource.push( responseJson.sale_info );


                            if (responseJson != null) {
                                this.setState({
                                    dataSource: responseJson.data
                                })
                            }

                        })
                        .catch((error) => {
                            console.log(error)
                        })


                        .catch((error) => {
                            console.log(error)
                        })

                }).done();
            }).done();
        }).done();
    }

    //for page refersh

    pageStackComponentDidMount(id, parent) {
        // this.setState({
        //     indeterminate=true
        // })
        console.log(" pageStackComponentDidMount clickId : " + id + "  parent : " + parent)
        var bodyData = "", url = "";
        var isGeo = this.state.isGeo

        AsyncStorage.getItem(GLOBAL.IS_GEO_KEY).then((isGeoVal) => {
            console.log(" pageStackComponentDidMount Is_Geo_key : " + isGeoVal)
            isGeo = isGeoVal;
            if (isGeo == "true") {
                this.setState({isGeo:true})
                switch (parent) {
                    case 0:
                        // Region level
                        bodyData = JSON.stringify({
                            date: this.state.date,
                            filter_type: filter_type,
                        }),
                            url = 'getRegionSales'

                        break;
                    case 1:
                        this.state.regionId = id;

                        // Cities level

                        bodyData = JSON.stringify({
                            date: this.state.date,
                            filter_type: filter_type,
                            region_id: id,
                        }),
                            url = 'getCitySales'



                        break;
                    case 2:
                        // Store level
                        this.state.cityId = id;
                        // this.state.storeId=id;
                        bodyData = JSON.stringify({
                            date: this.state.date,
                            filter_type: filter_type,
                            city_id: id,
                        }),
                            url = 'getStoreSales'

                        break;
                }
            } else {
                this.setState({isGeo:false})
                switch (parent) {
                    case 0:
                        // Region level
                        bodyData = JSON.stringify({
                            date: this.state.date,
                            filter_type: filter_type,
                        }),
                            url = 'getDeputyMgnSales'

                        break;
                    case 1:

                        // Cities level
                        this.state.regionId = id;
                        bodyData = JSON.stringify({
                            date: this.state.date,
                            filter_type: filter_type,
                            deputy_id: id,
                        }),
                            url = 'getPetchMgnSales'
                        AsyncStorage.setItem(GLOBAL.REGION_ID_KEY, "" + id);
                        break;
                    case 2:
                        break;
                }
            }



            console.log("this.callApi(url,bodyData)  url : " + url + "   bodyData : " + bodyData)
            this.callApi(url, bodyData)
            // AsyncStorage.getItem("parent_key").then((parent) => {
            //     console.log(" Parent : " + parent);
            //     if(parent===null){
            //         parent=0
            //     }
            //     screenPosition = parent;

            // }).done();




        }).done()
    }



    callApi = (url, bodyData) => {

        const urlPan = 'http://115.112.224.200:3000/api/' + url;
        console.log("  url " + urlPan)
        fetch(urlPan, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ indeterminate: false });

                console.log("this.callApi(url,bodyData)  responseJson.data : " + responseJson.data);

                responseJson.data.map((dataa) => {
                    var sale_data = []
                    sale_data.push({
                        name: 'Net Sales', total: dataa.current_sale,
                    })
                    dataa.hasSaleData = false
                    dataa.sale_data = sale_data
                })
                // this.setState.dataSource.push(responseJson.sale_info);
                // this.setState({
                //     indeterminate=false
                // })
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


    render() {

        if (this.state.dataSource != null && this.state.dataSource.length > 0) {

            return (
                <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                    {
                        this.state.indeterminate &&
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
                    }
                    {
                        this.state.parent > 0 &&
                        <View style={styless.categries}>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>

                                <Image
                                    source={require('../images/back.png')}
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        marginLeft: 10,
                                        resizeMode: 'stretch',

                                    }}
                                />
                                <Text style={{
                                    fontSize: 14,

                                    color: '#ffffff',
                                    // paddingLeft: 40,


                                    //justifyContent: 'center',
                                    textAlignVertical: "center",
                                    alignItems: 'center',

                                }} onPress={() => {

                                    this.setBackStackScreen();

                                }}>Back</Text>

                            </View>


                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 60,
                            }}>
                             <Text style={styless.instructions}>Net Sales </Text>
                                <Text style={styless.instructions}>{this.state.netSales}</Text>
                                {/* <DatePicker

                                    date={this.state.date}
                                    placeholder="placeholder"

                                    mode="date"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2021-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    iconSource={require('../images/calendar.png')}
                                    onDateChange={(date) => {
                                        this.setState({ date });
                                        AsyncStorage.setItem("date_key", date);
                                        // AsyncStorage.setItem(GLOBAL.DATE_KEY, this.state.date);
                                        console.log("  constant={(GLOBAL.DATE_KEY) => " + this.state.date)
                                        this.customComponentDidMount();
                                    }}

                                />
                                <Text style={styless.instructions}>{this.state.date}</Text> */}
                            </View>




                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 20,

                            }}>


                                {


                                    this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                        {/* <Image
                                             source={require('../images/geo.png')
                                            }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 40,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        /> */}
                                         <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center', 

                                            }}>
                                        <Image
                                             source={require('../images/yellow_geo.png')
                                            }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        /> 
                                         <Image
                                             source={require('../images/select_people.png')
                                            }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        /> 
                                        </View>
                                    </TouchableOpacity>
                                }
                                {
                                    !this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                         <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center', 

                                            }}>
                                         <Image
                                         source={require('../images/select_geo.png')}
                                          
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                 marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                            onPress={() => this.openDialog()}
                                        />
                                        <Image
                                         source={require('../images/yellow_people.png')}
                                          
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                            onPress={() => this.openDialog()}
                                        />
                                         </View>
                                    </TouchableOpacity>

                                }




                            </View>

                        </View>

                    }

                    {
                       this.state.parent == 0 &&
                        <View style={styless.categries}>



                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 100,
                            }}>
                                {/* <DatePicker

                                    date={this.state.date}
                                    placeholder="placeholder"

                                    mode="date"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2021-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    iconSource={require('../images/calendar.png')}
                                    onDateChange={(date) => {
                                        this.setState({ date });
                                        AsyncStorage.setItem("date_key", date);
                                        // AsyncStorage.setItem(GLOBAL.DATE_KEY, this.state.date);
                                        console.log("  constant={(GLOBAL.DATE_KEY) => " + this.state.date)
                                        this.customComponentDidMount();
                                    }}

                                /> */}
                                 <Text style={styless.instructions}>Net Sales </Text>
                                <Text style={styless.instructions}>{this.state.netSales}</Text>
                            </View>



                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft:20

                            }}>


                                {


                                    this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                        {/* <Image
                                             source={require('../images/geo.png')
                                            }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 40,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        /> */}
                                        <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center', 

                                            }}>
                                        <Image
                                             source={require('../images/yellow_geo.png')
                                            }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        /> 
                                         <Image
                                             source={require('../images/select_people.png')
                                            }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        /> 
                                        </View>
                                    </TouchableOpacity>
                                }
                                {
                                    !this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                         <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center', 

                                            }}>
                                         <Image
                                         source={require('../images/select_geo.png')}
                                          
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                 marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                            onPress={() => this.openDialog()}
                                        />
                                        <Image
                                         source={require('../images/yellow_people.png')}
                                          
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 10,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                            onPress={() => this.openDialog()}
                                        />
                                        </View>
                                        
                                    </TouchableOpacity>

                                }




                            </View>

                        </View>

                    }


                    <FlatList

                        data={this.state.dataSource}
                        renderItem={
                            this.renderItem
                        }


                    />



                </View >



            );
        }
        else {
            return (
                <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                    {
                        this.state.indeterminate &&
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
                    }


                    {
                        this.state.parent > 0 &&
                        <View style={styless.categries}>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>

                                <Image
                                    source={require('../images/back.png')}
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        marginLeft: 10,
                                        resizeMode: 'stretch',

                                    }}
                                />
                                <Text style={{
                                    fontSize: 14,

                                    color: '#ffffff',
                                    // paddingLeft: 40,


                                    //justifyContent: 'center',
                                    textAlignVertical: "center",
                                    alignItems: 'center',

                                }} onPress={() => {

                                    this.setBackStackScreen();

                                }}>Back</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 60,
                            }}>
                                {/* <DatePicker

                                    date={this.state.date}
                                    placeholder="placeholder"

                                    mode="date"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2021-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    iconSource={require('../images/calendar.png')}
                                    onDateChange={(date) => {
                                        console.log("  onDateChange={(date) => " + date)
                                        this.setState({ date });
                                        AsyncStorage.setItem("date_key", date);
                                        this.customComponentDidMount();
                                    }}

                                /> */}
                                <Text style={styless.instructions}>Net Sales </Text>
                                <Text style={styless.instructions}>{this.state.netSales}</Text>
                            </View>


                            {/* <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>


                                {


                                    this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                        <Image
                                           source={require('../images/geo.png')
                                        }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 40,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        />
                                    </TouchableOpacity>
                                }
                                {
                                    !this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                        <Image
                                         source={require('../images/people.png')}
                                            
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 40,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                            onPress={() => this.openDialog()}
                                        />
                                    </TouchableOpacity>

                                }




                            </View> */}

                        </View>
                    }
                    {
                        this.state.parent == 0 &&
                        <View style={styless.categries}>



                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 25,
                            }}>
                             <Text style={styless.instructions}>Net Sales </Text>
                             <Text style={styless.instructions}>{this.state.netSales}</Text>
                                {/* <DatePicker

                                    date={this.state.date}
                                    placeholder="placeholder"

                                    mode="date"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2021-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    iconSource={require('../images/calendar.png')}
                                    onDateChange={(date) => {
                                        this.setState({ date });
                                        AsyncStorage.setItem("date_key", date);
                                        this.customComponentDidMount();
                                    }}

                                />
                                <Text style={styless.instructions}>{this.state.date}</Text> */}
                            </View>


                            {/* <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>


                                {


                                    this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                        <Image
                                            source={require('../images/geo.png')
                                        }
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 130,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                        />
                                    </TouchableOpacity>
                                }
                                {
                                    !this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>
                                        <Image
                                         source={require('../images/people.png')}
                                           
                                            style={{
                                                padding: 10,
                                                margin: 5,
                                                marginLeft: 130,

                                                justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }}
                                            onPress={() => this.openDialog()}
                                        />
                                    </TouchableOpacity>

                                }




                            </View> */}

                        </View>
                    }




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
    ShowAlertWithDelay = () => {

        setTimeout(function () {

            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            // Alert.alert("Alert Shows After 5 Seconds of Delay.")

        }, 1000);


    }
    // for back stack navigation
    onBackPress = () => {
        this.ShowAlertWithDelay()
        this.customComponentDidMount()
        return true;
    }


}


const styless = StyleSheet.create({

    MainContainer: {

        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column',


    },
    categries: {

        // width: '100%',
        height: 70,
        marginTop: 5,
        backgroundColor: '#000000',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    ImageIconStyle: {
        padding: 10,
        margin: 5,

        resizeMode: 'stretch',

    },

    cardViewStyle: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '90%',
        // height: 105,
        // borderRadius: 1,
        borderColor: '#F4F5F5',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 0.5,
        borderRadius: 1,

        //     marginLeft: 10,
        //     marginRight: 10
    },
    cardViewRowHeader: {
        flexDirection: 'column',
        height: 30,

        //backgroundColor: '#fff',
        justifyContent: 'center',
        // alignItems: 'center',
        // textAlignVertical: "center"





    },
    cardViewRow: {
        flexDirection: 'column',
        height: 20,

        //backgroundColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center',
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
    shapeyellow: {
        backgroundColor: '#FBE028',
        marginLeft: -30,
        width: '45%',
        height: 21,

    },
    shapewhite: {
        backgroundColor: '#FFFFFF',
        width: '30%',
    },
    shapeinnerwhite: {
        backgroundColor: '#FFFFFF',
        width: '55%',
        height: 19.6,

    },
    hairline: {
        backgroundColor: '#000',
        height: 0.8,

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
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
    },
    separator: {
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: 'red'
    },




});


// const navigateToScreen =StackNavigator({
//    // DayPage: {screen: DayPage}, 
//     SaleDetails: {screen: SaleDetails}, 
// } , 
// //initialRouteName: 'DayPage',

// );

