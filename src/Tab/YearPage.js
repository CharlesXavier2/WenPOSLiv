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
const baseUrl='http://104.211.49.150:3001/';

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
            subregionId: 0,
            cityId: 0,
            storeId: 0,
            isGeo: "true",
            isLoading: true,
            filter_type: 'year',
            netSales: '',
            netSales1: ' ',
            netSales2: ' ',
            netSale:'',
            adsSale:''

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
        this.listenerios = EventRegister.addEventListener('myCustomEventIOS', (data) => {
            console.log('componentWillMount ')
            this.setBackStackScreen();
        }),
            this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
                this.customComponentDidMount()
            });
        if (Platform.OS != 'android') {
            this.listener = EventRegister.addEventListener('onBackPress', (data) => {
                console.log('componentWillMount ')
                this.onBackPress();
            })
        }

    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    componentWillReceiveProps(newProps) {
        try {
            console.log(" componentWillReceiveProps year : ")
        } catch (error) {

        }
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
        var netSalesVal = obj.netSales;
        console.log("setExpandableData id : " + obj.id);
        console.log("setExpandableData name : " + obj.name);
        console.log("setExpandableData netSalesVal : " + obj.netSales);

        this.setState({ indeterminate: true });
        this.getDate();
        var urlPanDate = ''
        var urlPan = ''
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
                    // console.log("1st Is_Geo_key : " + value1);
                    if (value1 === null) {
                        value1 = "true";
                    }
                    // console.log(" Is_Geo_key : " + value1);
                    var urlValue = ''
                    var bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,

                    })
                    if (value1 == "true") {
                        this.setState({ isGeo: true })
                        // console.log(" value1==true");
                        switch (parent) {
                            case 0:
                            case '0':
                                // console.log(" value1==true  case 0");
                                // console.log(" region_id= " + id);
                                // console.log(" parent for case 0 : "+parent);
                                urlValue = 'v2/get_all_region_sale?filter_type='+ filter_type +'&date='+ urlPanDate +'&region_id='+ id;

                            // urlValue='http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=day&date=2018-10-13&is_delivery=0';
                            

                            //     // bodyJson = JSON.stringify({
                            //     //     date: urlPanDate,
                            //     //     filter_type: filter_type,
                            //     // })
                                break;
                            case 1:
                            case '1':
                                // console.log(" value1==true  case 1");

                                // console.log(" city_id= " + id);
                                // console.log("city_name= " + name);
                                // console.log(" parent for case 1 :"+parent);
                                // urlValue='http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=day&date=2018-10-13&is_delivery=0';
                                urlValue = 'v2/get_all_city_sale?filter_type='+ filter_type +'&date='+ urlPanDate +'&region_id='+regionId+'&city_name='+name;


                                break;
                            case 2:
                            case '2':
                                // console.log(" value1==true  case 2");
                                urlValue = 'v2/get_all_store_sale?filter_type='+ filter_type +'&date='+ urlPanDate +'&store_code='+ id;
                                break;
                            // case 3:
                            // case '3':
                            //     console.log(" value1==true  case ");
                            //     urlValue = 'http://115.112.224.200:3000/api/getRegionSales'
                            //     break;

                        }
                    } else {
                        this.setState({ isGeo: false })
                        console.log("else value1==true");
                        switch (parent) {
                            case 0:
                            case '0':
                                // console.log("else value1==true case  0");
                                // console.log(" region_id= " + id);
                                // console.log(" region_id---= " + regionId);
                                // console.log("city_name= " + name);
                                urlValue = 'v2/get_all_area_manager_sale?filter_type='+ filter_type +'&date='+ urlPanDate +'&am_id='+ id;
                                // urlValue = 'get_all_deputy_manager_sale?filter_type=' + filter_type + '&date=' + urlPanDate + '&deputy_name=' + name;

                                break;
                            case 1:
                            case '1':
                                // console.log("else value1==true case  1");
                                // urlValue = 'get_all_petch_manager_sale?filter_type=' + filter_type + '&date=' + urlPanDate + '&deputy_name=' + regionId + '&petch_name=' + id;

                                break;
                            case 2:
                            case '2':
                                // console.log("else value1==true case  2");
                                return

                        }
                    }
                    if (name != "National") {
                        urlPan =  urlValue;

                    } else {
                        urlPan = 'v2/get_pan_level_sale?filter_type=' + filter_type + '&date=' + urlPanDate+'&region_id=1';


                    }
                    const urlForKpi = baseUrl+urlPan;
                    console.log("  url " + urlForKpi)
                    return fetch(urlForKpi)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            var dataSourceTemp = [];
                            this.setState({ indeterminate: false });
                            console.log("Response data responseJson -> " + responseJson);
                            this.state.dataSource.map((value) => {

                                dataSourceTemp.push({
                                    id: value.id, name: value.name,
                                    current_sale: value.current_sale,
                                    ads: value.ads,
                                    last_sale: value.last_sale, sale_data: []
                                })
                            }),
                                console.log("dataSource -> " + JSON.stringify(responseJson.sale_info)),

                                responseJson.sale_info.map((data) => {
                                    console.log("responseJson.sale_info.map((data) -> " + JSON.stringify(data)),
                                        dataSourceTemp.map((dataa) => {

                                            if (id == dataa.id) {
                                                dataa.hasSaleData = true;
                                                data.sale_data[0].total = netSalesVal;
                                                dataa.sale_data = data.sale_data
                                            } else {
                                                var sale_data = []
                                                sale_data.push({
                                                    name: 'Net Sale', total: dataa.current_sale,
                                                })
                                                // sale_data.push({
                                                //     name: 'ADS', total: dataa.ads,
                                                // })
                                                dataa.hasSaleData = false
                                                dataa.sale_data = sale_data
                                            }

                                        })
                                })
                            console.log("dataSourceTemp -> " + JSON.stringify(dataSourceTemp));

                          

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

    setCurrentScreen = (id, name) => {
        //0 for region 1 for city 2 for store
        var isGeoVal = "true"
        console.log('setCurrentScreen before parent : ' + this.state.parent)
        AsyncStorage.getItem(GLOBAL.IS_GEO_KEY).then((value) => {
            isGeoVal = value
        }).done()
        if ((isGeoVal == "true" && this.state.parent >= 3) || (isGeoVal == "false" && this.state.parent >= 1)) {
            console.log('Already in store ')
            return;
        }
        var parent = this.state.parent + 1

        var clickId = id
        var parentVal = parent
        //    var pageFlow = this.state.pageFlow + clickId;
        this.setState({
            parent: parentVal
        });
        this.setState({
            clickId: id
        });
        AsyncStorage.setItem(GLOBAL.PARENT_KEY, "" + parent)
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
                // AsyncStorage.setItem(GLOBAL.SUB_REGION_ID_KEY, "" + id)
                AsyncStorage.setItem(GLOBAL.CITY_ID_KEY, "" + id)
                AsyncStorage.setItem(GLOBAL.CITY_NAME_KEY, "" + name)
                break;
            case 3:
            case '3':
                // AsyncStorage.setItem(GLOBAL.CITY_ID_KEY, "" + id)
                // AsyncStorage.setItem(GLOBAL.CITY_NAME_KEY, "" + name)
                console.log("GLOBAL.CITY_NAME_KEY : " + name);

                break;
            case 4:
            case '4':
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

    totalSaleFormatWithPercentage = (val) => {
        try {
            if (val != 0) {

                op = val.toFixed(2);
                return (op + "%");
            } else {

                return (val + "%");
            }
        } catch (error) {
            return (0 + "%");
        }
    }
    totalSaleFormat = (val) => {
        try {
            if (val > 999999) {
                val = val / 1000000;
                op = val.toFixed(2);
                return (op + " mn");
            } else if (val > 999) {
                val = val / 1000;
                op = val.toFixed(2);
                // op = getTwoDecimalFormat(val);
                return (op + " K");
            } else {
                op = val.toFixed(2);
                // op = getTwoDecimalFormat(val);
                return (op + " ");
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
                {/* <View style={styless.cardViewRow}>
                    <View style={{
                        flexDirection: 'row',

                    }}> */}


                {/* <View style={styless.shapeyellow}>


                            <Text style={{
                                fontSize: 12,
                                //width: 150,
                                color: '#000000',
                                marginLeft: 30,


                                justifyContent: 'center',
                                //textAlignVertical: "center",
                                alignItems: 'center',

                            }}
                            > Net Sale
                            

                            </Text>

                        </View> */}




                {/* <View style={styless.shapeinnerwhite}>


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
                                    "" + this.state.netSales
                                }
                            </Text>

                        </View>
                     */}

                {/* </View> */}

                {/* </View> */}
                {/* {(!(item.name == "Net Sale")) && */}
                {
                            item.name != "Total Tickets" &&

                <View style={styless.cardViewRow}>
                    <View style={{
                        flexDirection: 'row',

                    }}>

                        
                            <View style={styless.shapeyellow}>


                                <Text style={{
                                    fontSize: 11,
                                    //width: 150,
                                    color: '#FFFFFF',
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

                       

                            {/* <View style={styless.shapeinnerwhite}>


                                <Text style={{
                                    fontSize: 12,
                                    //width: 150,
                                    color: '#000000',
                                    marginLeft: 60,
                                    justifyContent: 'center',
                                    //textAlignVertical: "center",
                                    alignItems: 'center'

                                }}> {
                                        //item.current_sale.toFixed(2)
                                        "" + this.totalSaleFormat(item.total)
                                    }
                                </Text>

                            </View> */}
                          {
                             ((item.name == "SSTG %") || (item.name == "SSSG %") || (item.name == "MOM SSSG %")|| (item.name == "WOW SSSG %")||(item.name == "Delivery %")) &&
                             <View style={styless.shapeinnerwhite}>


                                <Text style={{
                                    fontSize: 11,
                                    color: '#000000',
                                    marginLeft: 55,
                                    justifyContent: 'center',
                                    //textAlignVertical: "center",
                                    alignItems: 'center'

                                }}>
                                    {
                                    
                                       
                                        " " + this.totalSaleFormatWithPercentage(item.total)
                                      
                                    }
                                </Text>

                            </View>

                        }
                        {
                             !((item.name == "SSTG %") || (item.name == "SSSG %") || (item.name == "MOM SSSG %")|| (item.name == "WOW SSSG %")||(item.name == "Delivery %")) &&
                             <View style={styless.shapeinnerwhite}>


                                <Text style={{
                                    fontSize: 11,
                                    color: '#000000',
                                    marginLeft: 55,
                                    justifyContent: 'center',
                                    //textAlignVertical: "center",
                                    alignItems: 'center'

                                }}> {
                                                      
                                        "" + this.totalSaleFormat(item.total)
                                    }
                                </Text>

                            </View>

                        }
                        


                    </View>

                </View>

                                }

            </View>
        )

    }
    // Flatlist UI
    renderItem = ({ item }) => {
        var val = item.current_sale;
        var str = item.name;
        var rounfFranchise = '0.00';
        if (item.name == "National") {
            var netsale = this.totalSaleFormat(item.current_sale)
            this.setState({ netSales: netsale });

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
                                    !((this.state.parent == 2 && this.state.isGeo) || (this.state.parent == 1 && !this.state.isGeo)) &&
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
                                                padding: 8,
                                                marginLeft: 20,
                                                margin: 5,
                                                alignItems: 'center', justifyContent: 'center',
                                                resizeMode: 'stretch',

                                            }} />
                                    </TouchableOpacity>
                                }
                                {
                                    ((this.state.parent == 3 && this.state.isGeo) || (this.state.parent == 1 && !this.state.isGeo)) &&

                                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                                        <Text

                                            style={{
                                                fontSize: 8,
                                                marginLeft: 20,

                                                color: '#0000FF',
                                                alignItems: 'center', justifyContent: 'center',


                                            }} >
                                            {
                                                this.state.date
                                            }
                                        </Text>
                                        <Text

                                            style={{
                                                fontSize: 8,

                                                marginLeft: 25,

                                                color: '#0000FF',
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
                                        var netsale = this.totalSaleFormat(item.current_sale)
                                        AsyncStorage.getItem(GLOBAL.REGION_ID_KEY).then((regionIdVal) => {
                                            this.setState({ netSales: netsale });
                                            switch (parseInt(this.state.parent)) {
                                                case 1:
                                                case "1":
                                                    console.log("Setter -> Case1");
                                                    this.setState({ netSales1: netsale });
                                                    console.log("Setter -> Case1  netSales1 -> " + this.state.netSales1);
                                                    break;
                                                case 2:
                                                case "2":
                                                    console.log("Setter -> Case2");
                                                    this.setState({ netSales2: netsale });
                                                    console.log("Setter -> Case2  netSales2 ->" + this.state.netSales2);
                                                    break;
                                            }

                                            console.log("Setter -> Parent : " + (this.state.parent + 1) + "  netSales:regionIdVal for back  : " + netsale);

                                        }).done()

                                        if (this.state.parent == 2 && this.state.isGeo) {
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
                                        else if (this.state.parent == 1 && !(this.state.isGeo)) {
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

                                        // if ((item.name == "National")) {
                                        var obj = {};
                                        obj.id = item.id;
                                        obj.name = item.name;
                                        obj.netSales = item.current_sale;
                                        this.setExpandableData(obj);
                                        // this.setExpandableNationalData(obj);

                                        // }
                                        // else {
                                        //     var obj = {};
                                        //     obj.id = item.id;
                                            // obj.name = item.name;

                                            // this.setExpandableData(obj);
                                        // }
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
                                                    padding: 3,
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


                                            <Image
                                                source={require('../images/down.png')}
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    padding: 3,
                                                    marginLeft: 20,

                                                    margin: 5,
                                                    resizeMode: 'stretch',

                                                }} />

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
                                                ads: value.ads,
                                                last_sale: value.last_sale,
                                                sale_data: value.sale_data
                                            })

                                        })

                                        dataSourceTemp.map((data) => {
                                            if (item.id == data.id) {
                                                var sale_data = []
                                                sale_data.push({
                                                    name: 'Net Sale', total: data.current_sale,
                                                })
                                                // sale_data.push({
                                                //     name: 'ADS', total: data.ads,
                                                // })
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
                                                    padding: 3,
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


                                            <Image
                                                source={require('../images/up.png')}
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    padding: 3,
                                                    marginLeft: 20,

                                                    margin: 5,
                                                    resizeMode: 'stretch',

                                                }} />

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
        this.customComponentDidMount()
        EventRegister.emit('myCustomEvent', 'it works!!!')
    }

    callCurrentApi = () => {
        var urlPanDate = ''
        this.getDate();
        AsyncStorage.getItem("date_key").then((value) => {
            console.log(" Getter date" + value);
            urlPanDate = value;
            const urlPan = baseUrl+'api/getRegionSales'
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

                    // this.setState.dataSource.push( responseJson.sale_info );
                    responseJson.data.map((dataa) => {
                        var adsSale;
                        adsSale = this.totalSaleFormat(dataa.ads)
                        var sale_data = []
                        sale_data.push({
                            name: 'Net Sale', total: dataa.current_sale,
                        })
                        // sale_data.push({
                        //     name: 'ADS', total: dataa.ads,
                        // })
                        dataa.hasSaleData = false
                        dataa.sale_data = sale_data
                    })
                    this.setState({
                        dataSource: responseJson.data
                    })

                    if (responseJson != null) {
                        this.setState({ adsSale: adsSale });
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
        console.log("YEAR customComponentDidMount ");
        this.setState({ indeterminate: true });
        this.getDate();
        var urlPanDate = ''
        var regionId = ''
        var subregionId = ''
        var cityId = '';
        // this.getDate();

        AsyncStorage.getItem(GLOBAL.REGION_ID_KEY).then((regionIdVal) => {
            regionId = regionIdVal
        }).done()
        AsyncStorage.getItem(GLOBAL.SUB_REGION_ID_KEY).then((subregionIdVal) => {
            subregionId = subregionIdVal
        }).done()
        AsyncStorage.getItem(GLOBAL.CITY_ID_KEY).then((cityIdVal) => {
            cityId = cityIdVal
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
                    AsyncStorage.getItem("day" + parent + "" + value1).then((regionIdVal) => {
                        this.setState({ netSales: regionIdVal });
                        console.log("netSales:regionIdVal for  state  : " + regionIdVal);
                        console.log("netSales:===== : " + this.state.netSales);
                    }).done()
                    console.log("Getter -> Parent : " + parent + "  netSales:regionIdVal for back  : " + this.state.netSales);
                    var urlValue = ''
                    var bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,

                    })
                    if (value1 == "true") {
                        this.setState({ isGeo: true })
                        console.log(" value1==true");
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log(" value1==true  case 0");
                                // urlValue = 'http://115.112.224.200:3000/api/getRegionSales'
                                // urlValue = 'http://104.211.49.150:3200/api/getPanSales'
                                urlValue = 'api/getRegionSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log(" value1==true  case 1");
                                // urlValue = 'http://115.112.224.200:3000/api/getSubRegionSales'
                                urlValue = 'api/getCitySales'
                                // urlValue = 'http://104.211.49.150:3001/api/getStoreSales'

                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    region_id: regionId,
                                })
                                break;
                            case 2:
                            case '2':
                                console.log(" cityId=="+cityId);
                                console.log(" value1==true  case 1");
                                urlValue = 'api/getStoreSales'

                                // urlValue = 'http://104.211.49.150:6060/api/getCitySales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    city_id: cityId,
                                })
                                break;
                            case 3:
                            case '3':
                                console.log(" value1==true  case 2");
                                // urlValue = 'http://104.211.49.150:6060/api/getStoreSales'
                                // bodyJson = JSON.stringify({
                                //     date: urlPanDate,
                                //     filter_type: filter_type,
                                //     city_id: cityId,
                                // })
                                break;
                            case 4:
                            case '4':
                                console.log(" value1==true  case ");
                                // urlValue = 'http://115.112.224.200:3000/api/getRegionSales'
                                break;

                        }
                    }  else {
                        this.setState({ isGeo: false })
                        console.log("else value1==true");
                        // urlValue='http://115.112.224.200:3000/api/getDeputyMgnSales' 
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log("else value1==true case  0");
                                urlValue ='api/getAreaMgnSales'
                                // urlValue = 'http://115.112.224.200:3000/api/getDeputyMgnSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log("else value1==true case  1");
                                // urlValue = 'http://115.112.224.200:3000/api/getPetchMgnSales'
                                // bodyJson = JSON.stringify({
                                //     date: urlPanDate,
                                //     filter_type: filter_type,
                                //     deputy_id: regionId,
                                // })
                                break;
                            case 2:
                            case '2':
                                console.log("else value1==true case  2");
                                return

                        }
                    }
                    console.log(" Body Request : " + bodyJson)
                    const urlPan = baseUrl+urlValue//'http://115.112.181.53:3000/api/getRegionSales':'http://115.112.181.53:3000/api/getDeputyMgnSales'
                    console.log("  url " + urlPan)
                    console.log(" body===" + JSON.stringify(bodyJson));

                    // if (this.state.parent == 0) {
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

                            var nets, adsSale;
                            responseJson.data.map((info) => {
                                nets = info.current_sale
                            })


                            // responseJson.data.push({
                            //     id: 1,
                            //     name: "North",
                            //     current_sale: nets,
                            //     last_sale: 0,
                            //     sale_data: []
                            // })

                            responseJson.data.map((dataa) => {
                                nets = dataa.current_sale
                                adsSale = this.totalSaleFormat(dataa.ads)
                                AsyncStorage.setItem(GLOBAL.NET_SALES, "" + dataa.current_sale)
                                var sale_data = []
                                sale_data.push({
                                    name: 'Net Sale', total: dataa.current_sale,
                                })
                                // sale_data.push({
                                //     name: 'ADS', total: dataa.ads,
                                // })
                                dataa.hasSaleData = false
                                dataa.sale_data = sale_data

                            })


                            // this.setState.dataSource.push( responseJson.sale_info );
                            this.setState({ indeterminate: false });
                            // this.setState({ netSales: responseJson.data[0].current_sale });
                            if (responseJson != null) {
                                var netSaless = this.totalSaleFormat(responseJson.total_sale);
                                this.setState({ netSale: netSaless });
                                this.setState({ adsSale: adsSale });
                                this.setState({
                                    dataSource: responseJson.data
                                })
                                console.log("this.CustomComponentDid(response)  responseJson.data : " + JSON.stringify(responseJson.data));

                            }


                        })
                        .catch((error) => {
                            console.log(error)
                        })


                        .catch((error) => {
                            console.log(error)
                        })

                    // } 
                    // else {
                    //     AsyncStorage.getItem(GLOBAL.NET_SALES).then((netSalesVal) => {
                    //         getNetSale = netSalesVal
                    //     }).done()
                    //     fetch(urlPan, {
                    //         method: 'POST',
                    //         headers: {
                    //             'Accept': 'application/json',
                    //             'Content-Type': 'application/json'
                    //         },
                    //         body: bodyJson
                    //     })
                    //         .then((response) => response.json())
                    //         .then((responseJson) => {

                    //             // var nets;
                    //             // responseJson.data.map((info) => {
                    //             //     nets = info.current_sale
                    //             // })


                    //             // responseJson.data.push({
                    //             //     id: 1,
                    //             //     name: "North",
                    //             //     current_sale: nets,
                    //             //     last_sale: 0,
                    //             //     sale_data: []
                    //             // })

                    //             responseJson.data.map((dataa) => {
                    //                 nets = dataa.current_sale

                    //                 var sale_data = []
                    //                 sale_data.push({
                    //                     name: 'Net Salesss', total: dataa.current_sale,
                    //                 })
                    //                 dataa.hasSaleData = false
                    //                 dataa.sale_data = sale_data

                    //             })


                    //             // this.setState.dataSource.push( responseJson.sale_info );
                    //             this.setState({ indeterminate: false });
                    //             // this.setState({ netSales: responseJson.data[0].current_sale });
                    //             if (responseJson != null) {
                    //                 this.setState({
                    //                     dataSource: responseJson.data
                    //                 })
                    //             }


                    //         })
                    //         .catch((error) => {
                    //             console.log(error)
                    //         })


                    //         .catch((error) => {
                    //             console.log(error)
                    //         })

                    // }

                }).done();

            }).done();

        }).done();

    }

    //for page refersh

    pageStackComponentDidMount(id, parent) {
      
        // console.log(" pageStackComponentDidMount clickId : " + id + "  parent : " + parent)
        var bodyData = "", url = "";
        var isGeo = this.state.isGeo

        AsyncStorage.getItem(GLOBAL.IS_GEO_KEY).then((isGeoVal) => {
            console.log(" pageStackComponentDidMount Is_Geo_key : " + isGeoVal)
            isGeo = isGeoVal;
            if (isGeo == "true") {
                this.setState({ isGeo: true })
                switch (parent) {
                    case 0:
                        // Region level
                        bodyData = JSON.stringify({
                            date: this.state.date,
                            filter_type: filter_type,
                        }),
                            url = 'api/getRegionSales'

                        break;
                        case 1:
                        this.state.regionId = id;

                        // city level

                        bodyData = JSON.stringify({
                            date: this.state.date,
                            filter_type: filter_type,
                            region_id: id,
                        }),
                            url = 'api/getCitySales'



                        break;
                    case 2:
                        this.state.subregionId = id;

                       // Store level
                       this.state.cityId = id;
                       // this.state.storeId=id;
                       bodyData = JSON.stringify({
                           date: this.state.date,
                           filter_type: filter_type,
                           city_id: id,
                       }),
                           url = 'api/getStoreSales'




                        break;
                    case 3:
                        // Store level
                        this.state.cityId = id;
                        // this.state.storeId=id;
                        // bodyData = JSON.stringify({
                        //     date: this.state.date,
                        //     filter_type: filter_type,
                        //     city_id: id,
                        // }),
                        //     url = 'getStoreSales'

                        break;
                }
            } else {
                this.setState({ isGeo: false })
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

        // const urlPan = 'http://115.112.224.200:3000/api/' + url;
        const urlPan = baseUrl+url;
        console.log("  url " + urlPan)
        if (this.state.parent == 0) {
            fetch(urlPan, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: bodyData
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("response.json() =======: " + responseJson)

                    var nets;
                    responseJson.data.map((info) => {
                        nets = info.current_sale
                    })


                    // responseJson.data.push({
                    //     id: 1,
                    //     name: "North",
                    //     current_sale: nets,
                    //     last_sale: 0,
                    //     sale_data: []
                    // })

                    responseJson.data.map((dataa) => {
                        nets = dataa.current_sale
                        AsyncStorage.setItem(GLOBAL.NET_SALES, "" + dataa.current_sale)
                        var sale_data = []
                        sale_data.push({
                            name: 'Net Sale', total: dataa.current_sale,
                        })
                        // sale_data.push({
                        //     name: 'ADS', total: dataa.ads,
                        // })
                        dataa.hasSaleData = false
                        dataa.sale_data = sale_data

                    })


                    // this.setState.dataSource.push( responseJson.sale_info );
                    this.setState({ indeterminate: false });
                    // this.setState({ netSales: responseJson.data[0].current_sale });
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

        } else {
            AsyncStorage.getItem(GLOBAL.NET_SALES).then((netSalesVal) => {
                getNetSale = netSalesVal
            }).done()
            fetch(urlPan, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: bodyData
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    // var nets;
                    // responseJson.data.map((info) => {
                    //     nets = info.current_sale
                    // })


                    // responseJson.data.push({
                    //     id: 1,
                    //     name: "North",
                    //     current_sale: nets,
                    //     last_sale: 0,
                    //     sale_data: []
                    // })

                    responseJson.data.map((dataa) => {
                        nets = dataa.current_sale

                        var sale_data = []
                        sale_data.push({
                            name: 'Net Sale', total: dataa.current_sale,
                        })
                        // sale_data.push({
                        //     name: 'ADS', total: dataa.ads,
                        // })
                        dataa.hasSaleData = false
                        dataa.sale_data = sale_data

                    })


                    // this.setState.dataSource.push( responseJson.sale_info );
                    this.setState({ indeterminate: false });
                    // this.setState({ netSales: responseJson.data[0].current_sale });
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

        }

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

                        <View style={styless.categries}>





                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%'
                            }}>
                                <Text style={styless.instructions}>Net Sales </Text>
                                <Text style={styless.instructions}>{this.state.netSale}</Text>

                            </View>




                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%'


                            }}>


                                {


                                    this.state.isGeo &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openDialog()
                                        }}>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginLeft: 40

                                        }}>
                                            <Image
                                                source={require('../images/selected_geo.png')
                                                }
                                                style={{
                                                    padding: 2,
                                                    margin: 5,
                                                    marginLeft: 10,
                                                    width: 20,
                                                    height: 20,
                                                    justifyContent: 'center',
                                                    resizeMode: 'stretch',

                                                }}
                                            />
                                            <Image
                                                source={require('../images/unselected_people.png')
                                                }
                                                style={{
                                                    padding: 2,
                                                    margin: 5,
                                                    marginLeft: 10,
                                                    width: 24,
                                                    height: 24,
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
                                            justifyContent: 'center',
                                            marginLeft: 40

                                        }}>
                                            <Image
                                                source={require('../images/unselected_geo.png')}

                                                style={{
                                                    padding: 2,
                                                    margin: 5,
                                                    marginLeft: 10,
                                                    width: 20,
                                                    height: 20,
                                                    justifyContent: 'center',
                                                    resizeMode: 'stretch',

                                                }}
                                                onPress={() => this.openDialog()}
                                            />
                                            <Image
                                                source={require('../images/selected_people.png')}

                                                style={{
                                                    padding: 2,
                                                    margin: 5,
                                                    marginLeft: 10,
                                                    width: 24,
                                                    height: 24,
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

                        <View style={styless.categries}>



                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 25,
                            }}>
                                <Text style={styless.instructions}>Net Sales </Text>
                                <Text style={styless.instructions}>{this.state.netSale}</Text>

                            </View>




                        </View>
                    }

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
        console.log('YEAR onBackPress ')
        this.setBackStackScreen()
        EventRegister.emit('onBackPress', 'it works!!!')
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
        height: 40,
        marginTop: 5,
        backgroundColor: '#FFFFFF',
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
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 0.8,
        borderRadius: 1,

        //     marginLeft: 10,
        //     marginRight: 10
    },
    cardViewRowHeader: {
        flexDirection: 'column',
        height: 30,
        backgroundColor: '#fff',
        //backgroundColor: '#fff',
        justifyContent: 'center',
        // alignItems: 'center',
        // textAlignVertical: "center"





    },
    cardViewRow: {
        flexDirection: 'column',
        height: 20,
        backgroundColor: '#fff',
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
        backgroundColor: '#1E2B51',
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
        color: '#000000',
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

