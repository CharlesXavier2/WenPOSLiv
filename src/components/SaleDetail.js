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
    AsyncStorage,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardView from 'react-native-cardview';
import styles from '../styles';
import * as Progress from 'react-native-progress'
import DatePicker from '../utils/datepicker.js';

var dataSource1 = []
var dateFormat = require('dateformat');

export default class SaleDetails extends Component {


    static navigationOptions = ({ navigation }) => {
        return { headerTitle: navigation.state.params.itemName+'',
        headerTitleStyle :{ alignSelf:'center'}
     }
    }

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            progress: 0,
            indeterminate: true,
            refreshing: true,
            date: '',
        }
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

    componentDidMount() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        var date = new Date().toDateString();
        date = dateFormat(date, "yyyy-mm-dd");
        const itemId = navigation.getParam('itemId', 'Undefined');
        const parent = navigation.getParam('parent', '0');
        const isGeo = navigation.getParam('isGeo', '0');
        const date11 = navigation.getParam('date', date);
        const filter_type = navigation.getParam('filter_type', date);

        this.customComponentDidMount(itemId, parent, isGeo, date11, filter_type)
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

    //for date
    customComponentDidMount = (itemId, parent, isGeo, date, filter_type) => {
        console.log(" customComponentDidMount start ")
        // const {params} = this.props.navigation.state
        // this.getDate();
        var urlPanDate = ""
        // var regionId = ''
        // var cityId = '';
        // AsyncStorage.getItem(GLOBAL.REGION_ID_KEY).then((regionIdVal) => {
        //     regionId = regionIdVal
        // }).done()
        // AsyncStorage.getItem(GLOBAL.CITY_ID_KEY).then((cityIdVal) => {
        //     cityId = cityIdVal
        // }).done()

        urlPanDate = date;
        console.log(" Is_Geo_key : " + isGeo);
        var urlValue = ''
        var bodyJson = JSON.stringify({
            date: urlPanDate,
            filter_type: filter_type,
        })
        urlValue = 'http://115.112.181.53:3000/api/getBmSales'

        console.log(" customComponentDidMount start =>  http://115.112.181.53:3000/api/getBmSales ");
        if (isGeo == "true") {
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
                        region_id: itemId,
                    })
                    break;
                case 1:
                case '1':
                    console.log(" value1==true  case 1");

                    bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,
                        city_id: itemId,
                    })
                    break;
                case 2:
                case '2':
                    console.log(" value1==true  case 2");

                    bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,
                        store_id: itemId,
                    })
                    break;
                case 3:
                case '3':


            }
        } else {
            console.log("else value1==true")
            bodyJson = JSON.stringify({
                date: urlPanDate,
                filter_type: filter_type,
            })
            // urlValue='http://115.112.181.53:3000/api/getDeputyMgnSales' 
            switch (parent) {
                case 0:
                case '0':
                    console.log("else value1==true case  0")
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
                        deputy_id: itemId,
                    })
                    break;
                case 2:
                case '2':
                    console.log("else value1==true case  2");
                    return

            }
        }

        console.log(" Body Request : " + bodyJson)
        const urlPan = urlValue
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
        console.log(" customComponentDidMount End ");
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

                                    <TouchableOpacity
                                    //  onPress={() => { this.setCurrentScreen(item.id); }}
                                    >
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
                                    <TouchableOpacity 
                                    // onPress={() => { this.setCurrentScreen(item.id) } }
                                    >
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
                            </View>
                        }



                        <View style={styless.hairline} />
                    </CardView>
                </View>
            )
        }



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
                        


                    <FlatList
                        data={this.state.dataSource}
                        renderItem={
                            this.renderItem
                        }
                    />

                    </View>
            )
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