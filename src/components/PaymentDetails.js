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
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

import { StackNavigator } from 'react-navigation';
import CardView from 'react-native-cardview';
import styles from '../styles';
import * as Progress from 'react-native-progress'
import DatePicker from '../utils/datepicker';

var dataSource1 = []
var dateFormat = require('dateformat');
const baseUrl= 'http://104.211.49.150:3001/v2/get_payments_sale?filter_type=';
export default class PaymentDetails extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            // headerTitle: navigation.state.params.itemName + '',
            headerTitle: <CustomHeader title={navigation.state.params.itemName + ''} subtitle={navigation.state.params.date}/>,
            headerTitleStyle: { alignSelf: 'center', upperCaseLabel: false, justifyContent: (Platform.OS === 'ios') ? 'center' : 'flex-start' }
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
            itemName: '',
            parent: '',
            isGeo:true,
            filter_type: '',
            itemId: '',
            sales: '',
            netSales:''

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
        const isGeo = navigation.getParam('isGeo',false);
        const date11 = navigation.getParam('date', date);
        const filter_type = navigation.getParam('filter_type', date);
        const title = navigation.getParam('itemName', "McDLiv")
        const sales = navigation.getParam('sales', '0 K')

        this.setState({ itemId: itemId });
        this.setState({ parent: parent });
        this.setState({ isGeo: isGeo });
        this.setState({ date: date11 });
        this.setState({ filter_type: filter_type });
        this.setState({ itemName: title });
        this.setState({ sales: sales });
        console.log(" DetailPage");
        console.log(" itemId --" + itemId);
        console.log(" parent --" + parent);
        console.log(" isGeo --" + isGeo);
        console.log(" date --" + date11);
        console.log(" filter_type --" + filter_type);
        console.log(" Total Net sales --" + sales);
        this.customComponentDidMount(itemId, parent, isGeo, date11, filter_type);
        EventRegister.emit('myCustomEvent', 'it works!!!');
    }

    totalSaleFormat = (val) => {
        try {
      if(val!="NA"){
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
        }else{
            return (0.00 + " K");
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

    customComponentDidMount = (itemId, parent, isGeo, date, filter_type) => {
        // console.log(" customComponentDidMount start ")
        var urlPanDate = ""
        urlPanDate = date;
        console.log(" Is_Geo_key : " + isGeo);
        var urlValue = ''
        // var bodyJson = JSON.stringify({
        //     date: urlPanDate,
        //     filter_type: filter_type,
        // })
        // urlValue = 'http://115.112.224.200:3000/api/getBmSales'

        if ("" + isGeo == "true") {
            console.log(" value1==true");

           
           switch (parent) {
                case 0:
                case '0':
                    console.log(" value1==true  case 0");
                   
                    if(itemId=='National'){
                        urlValue = filter_type+'&date='+urlPanDate

                    }else{
                        urlValue = filter_type+'&date='+urlPanDate+'&region_id='+itemId;

                    // urlValue = 'http://115.112.224.200:3000/v2/get_sale_details?filter_type='+filter_type+'&date='+urlPanDate+'&region_id='+itemId
                }
                    break;
                case 1:
                case '1':
                    console.log(" value1==true  case 1");
                    urlValue = filter_type+'&date='+urlPanDate+'&city_id='+itemId;

                    // urlValue = 'http://115.112.224.200:3000/v2/get_sale_details?filter_type='+filter_type+'&date='+urlPanDate+'&sub_region_id='+itemId

                    break;
                case 2:
                case '2':
                    console.log(" value1==true  case 2");

                    urlValue = filter_type+'&date='+urlPanDate+'&store_id='+itemId;


                    break;
                case 3:
                case '3':
                // console.log(" value1==true  case 3");
               
                // urlValue = 'http://115.112.224.200:3000/v2/get_sale_details?filter_type='+filter_type+'&date='+urlPanDate+'&store_id='+itemId

                break;

            }
        } else {
            console.log("else value1==true")
            // bodyJson = JSON.stringify({
            //     date: urlPanDate,
            //     filter_type: filter_type,
            //     // city_id: itemId,
            // })
            // urlValue='http://115.112.224.200:3000/api/getDeputyMgnSales' 
            switch (parent) {
                case 0:
                case '0':
                    // console.log("else value1==true case  0")
                    
                    urlValue =  urlValue = filter_type+'&date='+urlPanDate+'&am_id='+itemId;
                    // 'http://115.112.224.200:3000/v2/get_sale_details?filter_type='+filter_type+'&date='+urlPanDate+'&deputy_id='+itemId

                    break;
                case 1:
                case '1':
                    console.log("else value1==true case  1");

                    
                    // urlValue = 'http://115.112.224.200:3000/v2/get_sale_details?filter_type='+filter_type+'&date='+urlPanDate+'&petch_id='+itemId

                    break;
                case 2:
                case '2':
                    console.log("else value1==true case  2");
                    // bodyJson = JSON.stringify({
                    //     date: urlPanDate,
                    //     filter_type: filter_type,
                    //     store_id: itemId,
                    // })
                    // break;
                    return

            }
        }

            const urlPan = baseUrl + urlValue;
            console.log("  url " + urlPan)
            this.setState({ indeterminate: true });
            this.setState({ refreshing: true });
            return fetch(urlPan)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            // console.log(" Body Response of get_sale_detailsAPI : " + responseJson);
                            // console.log(" Body Response of get_sale_detailsAPI-sale info : " + responseJson.sale_info);

                    this.setState({ indeterminate: false });
                    this.setState({ refreshing: false });
                    // this.setState.dataSource.push( responseJson.sale_info );
                    if (responseJson != null) {
                        var netsale = this.totalSaleFormat(responseJson.sale_info.NetSale)
                        this.setState({ netSales: netsale });
                        this.setState({
                            dataSource: responseJson.sale_info.sale_data
                        })
                    }
                    // console.log(" Body Response of get_sale_detailsAPI-dataSource : " + this.state.dataSource);

                })
                .catch((error) => {
                    console.log(error)
                })
    
    
                .catch((error) => {
                    console.log(error)
                })
            // console.log(" customComponentDidMount End ");
    }

    //for date
    // customComponentDidMount = (itemId, parent, isGeo, date, filter_type) => {
    //     console.log(" customComponentDidMount start ")
    //     // const {params} = this.props.navigation.state
    //     // this.getDate();
    //     var urlPanDate = ""
    //     // var regionId = ''
    //     // var cityId = '';
    //     // AsyncStorage.getItem(GLOBAL.REGION_ID_KEY).then((regionIdVal) => {
    //     //     regionId = regionIdVal
    //     // }).done()
    //     // AsyncStorage.getItem(GLOBAL.CITY_ID_KEY).then((cityIdVal) => {
    //     //     cityId = cityIdVal
    //     // }).done()

    //     urlPanDate = date;
    //     console.log(" Is_Geo_key : " + isGeo);
    //     var urlValue = ''
    //     var bodyJson = JSON.stringify({
    //         date: urlPanDate,
    //         filter_type: filter_type,
    //     })
    //     urlValue = 'http://115.112.224.200:3000/api/getBmSales'

    //     console.log(" customComponentDidMount start =>  http://115.112.224.200:3000/api/getBmSales ");
    //     if ("" + isGeo == "true") {
    //         console.log(" value1==true");

    //         bodyJson = JSON.stringify({
    //             date: urlPanDate,
    //             filter_type: filter_type,
    //         })
    //         switch (parent) {
    //             case 0:
    //             case '0':
    //                 console.log(" value1==true  case 0");
    //                 bodyJson = JSON.stringify({
    //                     date: urlPanDate,
    //                     filter_type: filter_type,
    //                     region_id: itemId,
    //                 })
    //                 break;
    //             case 1:
    //             case '1':
    //                 console.log(" value1==true  case 1");

    //                 bodyJson = JSON.stringify({
    //                     date: urlPanDate,
    //                     filter_type: filter_type,
    //                     city_id: itemId,
    //                 })
    //                 break;
    //             case 2:
    //             case '2':
    //                 console.log(" value1==true  case 2");

    //                 bodyJson = JSON.stringify({
    //                     date: urlPanDate,
    //                     filter_type: filter_type,
    //                     storeid: itemId,
    //                 })
    //                 break;
    //             case 3:
    //             case '3':


    //         }
    //     } else {
    //         console.log("else value1==true")
    //         bodyJson = JSON.stringify({
    //             date: urlPanDate,
    //             filter_type: filter_type,
    //             city_id: itemId,
    //         })
    //         // urlValue='http://115.112.224.200:3000/api/getDeputyMgnSales' 
    //         switch (parent) {
    //             case 0:
    //             case '0':
    //                 console.log("else value1==true case  0")
    //                 bodyJson = JSON.stringify({
    //                     date: urlPanDate,
    //                     filter_type: filter_type,
    //                     deputy_id: itemId,
    //                 })
    //                 break;
    //             case 1:
    //             case '1':
    //                 console.log("else value1==true case  1");

    //                 bodyJson = JSON.stringify({
    //                     date: urlPanDate,
    //                     filter_type: filter_type,
    //                     petch_id: itemId,
    //                 })
    //                 break;
    //             case 2:
    //             case '2':
    //                 console.log("else value1==true case  2");
    //                 // bodyJson = JSON.stringify({
    //                 //     date: urlPanDate,
    //                 //     filter_type: filter_type,
    //                 //     store_id: itemId,
    //                 // })
    //                 // break;
    //                 return

    //         }
    //     }

    //     console.log(" Body Request : " + bodyJson)
    //     const urlPan = urlValue
    //     console.log("  url " + urlPan)
    //     this.setState({ indeterminate: true });
    //     this.setState({ refreshing: true });
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
    //             this.setState({ indeterminate: false });
    //             this.setState({ refreshing: false });
    //             // this.setState.dataSource.push( responseJson.sale_info );
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
    //     console.log(" customComponentDidMount End ");
    // }


    renderItem = ({ item }) => {
       

        return (

            <View style={styless.MainContainer}>
                <View style={{
                    flexDirection: 'row',

                }}>
                 <View style={styless.cardViewStyle}>
                        {/* <View style={styless.hairline} /> */}
                        <View style={{
                            flexDirection: 'row', width: '100%',

                        }}>
                            <View style={styless.shapeyellow}>
                                <TouchableOpacity >

                                    <Text style={{
                                        fontSize: 12,
                                        //width: 150,
                                        color: '#FFFFFF',
                                        marginLeft: -20,
                                        textAlign: 'left',

                                        // fontWeight: 'bold',
                                        justifyContent: 'flex-start',
                                        //textAlignVertical: "center",
                                        alignItems: 'center',

                                    }}> 
                                        {
                                              "" + item.Name
                                             
                                             }

                                    </Text>
                                </TouchableOpacity>

                            </View>
                            {
                                
                                <View style={styless.shapeinnerwhite}>


                                    <Text style={{
                                        fontSize: 12,
                                        //width: 150,
                                        color: '#000000',
                                        marginLeft: 40,

                                        // fontWeight: 'bold',
                                        justifyContent: 'flex-end',
                                        //textAlignVertical: "center",
                                        alignItems: 'center',

                                    }}>
                                         {
                                              "" + this.totalSaleFormat(item.NetSale)
                                             
                                             }
                                    </Text>

                                </View>
                            }
                           

                            {
                                // item.key == "Total Net Sales" &&
                                <TouchableOpacity

                                onPress={() => {
                                    // this.props.navigation.navigate('Hour', {
                                    //     // itemName: this.state.itemName,
                                    //     itemName: this.state.itemName,
                                    //     itemId: this.state.itemId,
                                    //     parent: this.state.parent,
                                    //     date: this.state.date,
                                    //     isGeo: this.state.isGeo,
                                    //     filter_type: this.state.filter_type
                                    // });


                                    // }
                                }}  >
                                <View style={styless.shapewhite}>
                                   

                                        {/* <View >
                                            <Image
                                                source={require('../images/nxt.png')}
                                                style={{
                                                    width: 12,
                                                    height: 12,
                                                    margin: 5,
                                                    marginLeft: 70,
                                                    justifyContent: 'center',

                                                    resizeMode: 'stretch',

                                                }} />

                                        </View> */}


                                      </View>
                                    </TouchableOpacity>
                                
                            }
                            {/* {
                                item.key != "Total Net Sales" &&
                                <View style={styless.shapewhite} />

                            } */}
                        </View>
                    </View>
              </View>     
            </View>
        )

    }


    render() {

        // const { navigate } = this.props.navigation;



        // console.log('Parent : '+parent)
        /* 2. Read the params from the navigation state */
        // const { params } = this.props.navigation.state;
        //const itemId = params ? params.itemId : null;
        // const filterType = params ? params.filterType : null;
        if (this.state.dataSource != null ) {

            return (
                <View style={{ backgroundColor: '#FFFFFF', flex: 1}}>

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
  <View
                        style={{
                            marginTop: 20,

                        }} >
                         <View style={{
                    
                    flexDirection: 'row',

                   alignItems: 'center',  
                }}>
                <Text  style={{
                     fontSize: 10,
                     marginLeft:23,
                     color: '#000000',
                }}>Total Payments</Text>
              <Text style={styless.instructions}>{this.state.netSales}</Text>

                </View>
             <View style={{
                     width:'90%',
                     marginTop: 20,
                    flexDirection: 'row',
                   justifyContent: 'center',
                   alignItems: 'center',  
                }}>
                <View style={{
                    width:'45%',
                   justifyContent: 'center',
                   alignItems: 'center',  
                }}>
                <Text  style={{
                     fontSize: 10,
                     marginLeft:-60,
                     color: '#000000',
                }}>Type</Text>
                </View>
               
                <View style={{
                   justifyContent: 'center',
                   width:'45%',
                 
                   alignItems: 'center',  
                }}>
                <Text  style={{
                     fontSize: 10,
                     
                     color: '#000000',
                }}>Total</Text>
                </View>
                </View>

                        <FlatList

                            data={this.state.dataSource}
                            renderItem={
                                this.renderItem
                            }
                        />
                    </View >
                   
                </View >



            );
        }
        else {
            return (
               
                <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', width: '100%', height: '100%' }}>
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
                  
                  
                 
                 {/* <View
                        style={{
                            marginTop: 30,

                        }} >
                        <FlatList

                            // data={[
                            //     { key: 'Total Net Sales' },
                            //     { key: 'APC' },
                            //     { key: 'Total Collections' },
                            //     { key: 'Promotions' },
                            //     { key: 'Discounts' },
                            //     { key: 'Voids' },
                            //     { key: 'Refunds' },


                            // ]}
                            data={this.state.dataSource}

                            renderItem={
                                this.renderItem
                            }
                        />
                    </View >
                </View> */}
                </View>
            )
        }
    }
}

const CustomHeader = ({ title, subtitle }) => (
    <View >
      <Text style={{ fontSize: 16, color: '#FFFFFF',alignSelf: (Platform.OS === 'ios') ? 'center' : 'flex-start',}}>{title}</Text>
      <Text style={{ fontSize: 10, color: '#FFFFFF',alignSelf: (Platform.OS === 'ios') ? 'center' : 'flex-start',}}>{subtitle}</Text>
    </View>
  );
const styless = StyleSheet.create({

    MainContainer: {


        width: '100%',


        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',


    },
    categries: {

        width: '100%',
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
    cardViewBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 21,

        // borderRadius: 1,
        height: 30,
        marginTop: 7,
        // marginBottom:3,
        backgroundColor: '#FBE028',

        // marginBottom: 5,


        //     marginLeft: 10,
        //     marginRight: 10
    },

    cardViewStyle: {
        //justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        //   marginLeft:30,
        height: 40,
        // borderRadius: 1,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        // marginBottom: 5,
        borderWidth: 0.5,
        borderRadius: 1,

        //     marginLeft: 10,
        //     marginRight: 10
    },
    cardViewRowHeader: {
        flexDirection: 'column',
        height: 40,

        //backgroundColor: '#fff',
        justifyContent: 'center',
        // alignItems: 'center',
        // textAlignVertical: "center"





    },
    cardViewRow: {
        flexDirection: 'column',
        height: 30,

        // width: '90%',
        //backgroundColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center',
        // textAlignVertical: "center"





    },

    cardViewHeader: {
        fontSize: 10,
        width: 75,

        color: '#ffffff',

        // paddingLeft: 20,
        backgroundColor: '#1e2b51',
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
        backgroundColor: '#1e2b51',
        width: '55%',
        marginLeft: -30,

        height: 30,
        marginTop: 3,
        // marginBottom:3,
        // flex: 1,
        // height: 23,
        alignItems: 'center',
        justifyContent: 'center',

    },
    shapewhite: {
        backgroundColor: '#FFFFFF',
        width: '10%',
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'flex-end',


    },
    shapeinnerwhite: {
        backgroundColor: '#FFFFFF',
        width: '35%',
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'center',

    },
    hairline: {
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#000000',
        height: 1,
        width: '100%',

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
        marginLeft:10,
        textAlign: 'center',
        color: '#000000',
    },
    separator: {
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: 'red'
    },




});