/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=month&date=2018-10-13&is_delivery=0 
 * http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=year&date=2018-10-13&is_delivery=0
 * @flow
 */

import React, { Component } from 'react';
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
import Details from '../components/Details';


var dateFormat = require('dateformat');
var filter_type = 'day';
var tabPositionVal = 0;
//var dateValue='';
export default class DayPage extends Component {


    //  navigateToScreen = (SaleDetails) => () => {
    //         navigateToScreen =createStackNavigator({
    //             SaleDetails:{screen: SaleDetails}, 
    //         });
    //         //  this.props.navigation.navigate(navigateAction);
    //         // this.props.navigation.dispatch(DrawerActions.closeDrawer())
    //       }


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

    tabClick = () => {
        this.setState({ parent: 0 })
        AsyncStorage.setItem(GLOBAL.PARENT_KEY, "0");
        this.customComponentDidMount()
    }


    componentWillMount() {

    }
    componentWillReceiveProps(newProps) {
        // this._myHomeFunction();
        try {
            // this.customComponentDidMount()
            console.log(" componentWillReceiveProps day : ")
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
                AsyncStorage.setItem("date_key", date);
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
                                this.setState({ isGeo: false })

                            } else {
                                AsyncStorage.setItem(GLOBAL.IS_GEO_KEY, "true");
                                this.setState({ isGeo: true })

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



    setCurrentScreen = (id) => {
        //0 for region 1 for city 2 for store
        console.log('setCurrentScreen before parent : ' + this.state.parent)
        if (this.state.parent >= 2) {
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
                AsyncStorage.setItem(GLOBAL.CITY_ID_KEY, "" + id)
                break;
            case 3:
            case '3':
                break;

        }
        this.pageStackComponentDidMount(clickId, parent);

    };
    setBackStackScreen = () => {

        //0 for region 1 for city 2 for store
        console.log('before parent : ' + this.state.parent)
        var parent = this.state.parent - 1;
        console.log('before parent : ' + parent)
        AsyncStorage.setItem(GLOBAL.PARENT_KEY, "" + parent)
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

    renderItem = ({ item }) => {
        var val = item.current_sale;
        var rounfFranchise = '0.00';

        if (item.current_sale > item.last_sale) {
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

                                    {/* <TouchableOpacity onPress={() => { this.setCurrentScreen(item.id); }}>
                                        <Text style={{
                                            fontSize: 22,

                                            color: '#ffffff',


                                            justifyContent: 'center',
                                            // textAlignVertical: "center",
                                            alignItems: 'center',

                                        }} >
                                            {
                                                "" + item.name
                                            }
                                        </Text>
                                    </TouchableOpacity> */}
                                    <Text style={{
                                        fontSize: 22,

                                        color: '#ffffff',


                                        justifyContent: 'center',
                                        // textAlignVertical: "center",
                                        alignItems: 'center',

                                    }} onPress={() => { this.setCurrentScreen(item.id); }} >
                                        {
                                            "" + item.name
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
                                                "" + this.totalSaleFormat(val)
                                            }
                                        </Text>


                                    </View>



                                </View>


                                <TouchableOpacity
                                    onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        this.props.navigation.navigate('SaleDetails', {
                                            itemName: item.name,
                                            itemId: item.id,
                                            parent: this.state.parent,
                                            date: this.state.date,
                                            isGeo: this.state.isGeo,
                                            filter_type: filter_type
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
                                        }} />
                                </TouchableOpacity>
                            </View>


                        }



                        <View style={styless.hairline} />
                    </CardView>
                </View>
            )
        }
        else {
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
                                    {/* <TouchableOpacity onPress={() => { this.setCurrentScreen(item.id); }}>
                                        <Text style={{
                                            fontSize: 22,

                                            color: '#ffffff',


                                            justifyContent: 'center',
                                            // textAlignVertical: "center",
                                            alignItems: 'center',

                                        }} >
                                            {
                                                "" + item.name
                                            }
                                        </Text>
                                    </TouchableOpacity> */}
                                    <Text style={{
                                        fontSize: 22,

                                        color: '#ffffff',


                                        justifyContent: 'center',
                                        // textAlignVertical: "center",
                                        alignItems: 'center',

                                    }} onPress={() => { this.setCurrentScreen(item.id); }} >
                                        {
                                            "" + item.name
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
                                                //item.current_sale.toFixed(2)
                                                "" + this.totalSaleFormat(val)
                                            }
                                        </Text>


                                    </View>



                                </View>


                                <TouchableOpacity
                                    onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        this.props.navigation.navigate('SaleDetails', {
                                            itemName: item.name,
                                            itemId: item.id,
                                            parent: this.state.parent,
                                            date: this.state.date,
                                            isGeo: this.state.isGeo,
                                            filter_type: filter_type
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

                                        }} />
                                </TouchableOpacity>




                            </View>


                        }



                        <View style={styless.hairline} />
                    </CardView>
                </View>
            )
        }



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
            const urlPan = 'http://115.112.181.53:3000/api/getRegionSales'
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
    customComponentDidMount = () => {
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
                        console.log(" value1==true");
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log(" value1==true  case 0");
                                urlValue = 'http://115.112.181.53:3000/api/getRegionSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log(" value1==true  case 1");
                                urlValue = 'http://115.112.181.53:3000/api/getCitySales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    region_id: regionId,
                                })
                                break;
                            case 2:
                            case '2':
                                console.log(" value1==true  case 2");
                                urlValue = 'http://115.112.181.53:3000/api/getStoreSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    city_id: cityId,
                                })
                                break;
                            case 3:
                            case '3':
                                console.log(" value1==true  case ");
                                urlValue = 'http://115.112.181.53:3000/api/getRegionSales'
                                break;

                        }
                    } else {
                        console.log("else value1==true");
                        // urlValue='http://115.112.181.53:3000/api/getDeputyMgnSales' 
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log("else value1==true case  0");
                                urlValue = 'http://115.112.181.53:3000/api/getDeputyMgnSales'
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log("else value1==true case  1");
                                urlValue = 'http://115.112.181.53:3000/api/getPetchMgnSales'
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

        const urlPan = 'http://115.112.181.53:3000/api/' + url;
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
                console.log("this.callApi(url,bodyData)  responseJson.data : " + responseJson.data);
                // this.setState.dataSource.push(responseJson.sale_info);
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
        console.log('onBackPress function  this.state.parent  : ' + this.state.parent)

        AsyncStorage.getItem(GLOBAL.PARENT_KEY).then((parent) => {
            console.log(" parent_key : " + parent);
            if (this.state.parent == 0) {
                console.log('1 onBackPress Parent : ' + this.state.parent)
                Alert.alert(
                    'Quiting',
                    'Want to quit?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        { text: 'OK', onPress: () => BackHandler.exitApp() }
                    ],
                    { cancelable: false }
                );
                return true;
            }
            // works best when the goBack is async
            else {
                console.log('2 onBackPress Parent : ' + this.state.parent)
                this.setBackStackScreen();
            }
        }).done()
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
                <View style={{ backgroundColor: '#000000', flex: 1 }}>

                    <View style={styless.categries}>
                    {
                            this.state.parent > 0 &&
                    <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        
                        <Image
                            source={require('../images/back.png')}
                            style={{
                                paddingLeft: 10,
                                paddingTop:10,
                                paddingBottom:10,
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
                    }
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 80,
                        }}>
                            <DatePicker

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
                                    this.setState({ date: date });
                                    AsyncStorage.setItem(GLOBAL.DATE_KEY, this.state.date);
                                    this.customComponentDidMount();
                                }}

                            />
                            <Text style={styless.instructions}>{this.state.date}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.openDialog()
                            }}>
                            <Image
                                source={require('../images/select_people.png')}
                                style={{
                                    padding: 10,
                                    margin: 5,
                                    marginLeft: 80,
                                    resizeMode: 'stretch',

                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.openDialog()
                            }}>
                            <Image
                                source={require('../images/select_geo.png')}
                                style={styless.ImageIconStyle}
                                onPress={() => this.openDialog()}
                            />
                        </TouchableOpacity>

                      </View> 
                    </View>


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
                <View style={styless.MainContainer}>
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
                    <View style={styless.categries}>
                    <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            
                        }}>
                        <Image
                            source={require('../images/back.png')}
                            style={{
                                paddingLeft: 10,
                                paddingTop:10,
                                paddingBottom:10,
                               
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
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 80,
                        }}>
                            <DatePicker

                                date={this.state.date}
                                // placeholder="placeholder"
                                mode="date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2021-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconSource={require('../images/calendar.png')}
                                onDateChange={(date) => {
                                    this.setState({ date: date });
                                    AsyncStorage.setItem(GLOBAL.DATE_KEY, this.state.date);
                                    this.customComponentDidMount();
                                }} />
                            <Text style={styless.instructions}>{this.state.date}</Text>
                        </View>
                        {/* <Text style={{
                            fontSize: 12,

                            color: '#ffffff',
                            // paddingLeft: 40,


                            //justifyContent: 'center',
                            textAlignVertical: "center",
                            alignItems: 'center',

                        }}>Net Sales</Text>  */}
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 80,
                        }}>
                        <Image
                            source={require('../images/select_people.png')}
                            style={{
                                padding: 10,
                                margin: 5,
                               
                                resizeMode: 'stretch',

                            }}
                            onPress={() => this.openDialog()}
                        />

                        <Image
                            source={require('../images/select_geo.png')}
                            style={styless.ImageIconStyle}
                            onPress={() => this.openDialog()}
                        />
                      </View>
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

    // render() {
    //     return (
    //         <View style={styless.MainContainer}>

    //         <View style={styless.cardViewStyle} >
    //         <View style={styless.cardViewRow} />
    //         </View>
    //         </View>
    //     )
    // }


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
        height: 70,
        marginTop: 5,
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
    },




});

// const navigateToScreen =StackNavigator({
//    // DayPage: {screen: DayPage}, 
//     SaleDetails: {screen: SaleDetails}, 
// } , 
// //initialRouteName: 'DayPage',

// );

