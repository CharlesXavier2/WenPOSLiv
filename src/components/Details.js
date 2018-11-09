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
    RefreshControl,


} from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';
import { StackNavigator } from 'react-navigation';
import DrawerScreen from './DrawerScreen';
import * as Progress from 'react-native-progress';
import DatePicker from '../utils/datepicker.js';
import Moment from 'moment';


var dateFormat = require('dateformat');
var filter_type = 'day';
var tabPositionVal = 0;
export default class Details extends Component {



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
            refreshing: false,


        }
        this.onBackPress = this.onBackPress.bind(this);

    }
    // static navigationOptions= ({navigation}) => {
    //     return {title: navigation.state.params.itemId}
    //   }

   
    componentWillMount() {
 /* 2. Get the param, provide a fallback value if not available */
//  const { navigation } = this.props;
//  const itemId = navigation.getParam('itemId', 'Undefined');
//  const otherParam = navigation.getParam('parent', '0');
    }

    componentWillReceiveProps(newProps) {
        // this._myHomeFunction();
        try {
            this.customComponentDidMount()
            console.log(" componentWillReceiveProps : ")
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

                                    <TouchableOpacity onPress={() => { this.setCurrentScreen(item.id); }}>
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
                                    </TouchableOpacity>














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
                                     >
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
                                    <TouchableOpacity onPress={() => { this.setCurrentScreen(item.id); }}>
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
                                    </TouchableOpacity>


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
                                   >
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
    }
    componentDidMount() {
        console.log('GLOBAL.BASE_URL : ' + GLOBAL.BASE_URL)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        const { navigation } = this.props;
        const parent = navigation.getParam('parent', '0');
        const tabPosition = navigation.getParam('tabPosition', '0');
        this.customComponentDidMount()
    }
   

    //for date
    customComponentDidMount = () => {
        const {params} = this.props.navigation.state
        params.
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
                    urlValue = 'http://115.112.181.53:3000/api/getBmSales'
                    if (value1 == "true") {
                        console.log(" value1==true");
                      
                        bodyJson = JSON.stringify({
                            date: urlPanDate,
                            filter_type: filter_type,
                        })
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log(" value1==true  case 0");
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    region_id: regionId,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log(" value1==true  case 1");
                            
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    city_id: cityId,
                                })
                                break;
                            case 2:
                            case '2':
                                console.log(" value1==true  case 2");
                            
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                    store_id: cityId,
                                })
                                break;
                            case 3:
                            case '3':
                            // console.log(" value1==true  case ");
                            // urlValue = 'http://115.112.181.53:3000/api/getRegionSales'
                            // break;

                        }
                    } else {
                        console.log("else value1==true");
                       
                        bodyJson = JSON.stringify({
                            date: urlPanDate,
                            filter_type: filter_type,
                        })
                        // urlValue='http://115.112.181.53:3000/api/getDeputyMgnSales' 
                        switch (parent) {
                            case 0:
                            case '0':
                                console.log("else value1==true case  0");
                               
                                bodyJson = JSON.stringify({
                                    date: urlPanDate,
                                    filter_type: filter_type,
                                })
                                break;
                            case 1:
                            case '1':
                                console.log("else value1==true case  1");
                              
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
                    this.setState({ indeterminate: true });
                    this.setState({ refreshing: true });
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
                            this.setState({ refreshing: false });
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
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
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

                        <TouchableOpacity
                            onPress={() => {
                                this.openDialog()
                            }}>
                            <Image
                                source={require('../images/select_people.png')}
                                style={{
                                    padding: 10,
                                    margin: 5,
                                    marginLeft: 120,
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


                    <FlatList
                        data={this.state.dataSource}
                        renderItem={
                            this.renderItem
                        }
                    />

                    <Text style={{
                        fontSize: 16,
                        height: 25,
                        color: '#ffffff',
                        // paddingLeft: 40,

                        marginLeft: 40,
                        //justifyContent: 'center',
                        textAlignVertical: "center",
                        alignItems: 'center',

                    }} onPress={() => {

                        this.setBackStackScreen();

                    }}>Back</Text>
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
                            onPress={() => this.openDialog()}
                        />

                        <Image
                            source={require('../images/select_geo.png')}
                            style={styless.ImageIconStyle}
                            onPress={() => this.openDialog()}
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
