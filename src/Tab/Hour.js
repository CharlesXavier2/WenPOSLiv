
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Button,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners'

import CardView from 'react-native-cardview';
import styles from '../styles';
import * as Progress from 'react-native-progress'
import DatePicker from '../utils/datepicker.js';

var dataSource1 = []
var dateFormat = require('dateformat');

export default class Hour extends Component {


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
            isGeo: true,
            filter_type: '',
            itemId: '',
            sales: '',
            showIndicator: true,
            isResponse: false,



        }

    }


    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            setInterval(() => {
                progress = 0
                // progress += Math.random() / 5;
                // if (progress > 1) {
                //     progress = 1;
                // }
                this.setState({ progress });
            }, 50);
        }, 9100);
    }

    closeActivityIndicator() {
        console.log("closeActivityIndicator isResponse"+this.state.isResponse)
        if (this.state.isResponse) {
            setTimeout(() => this.setState({
                showIndicator: false
            }), 1500);
        } 
        // else {
        //     setTimeout(() => this.setState({
        //         showIndicator: false
        //     }), 6000);
        // }
    }

    componentDidMount() {
        /* 2. Get the param, provide a fallback value if not available */
        // const { navigation } = this.props;
        // var date = new Date().toDateString();
        // date = dateFormat(date, "yyyy-mm-dd");
        // const title = navigation.getParam('itemName', "McDLiv")
        // this.setState({ itemName: title });
        /* 2. Get the param, provide a fallback value if not available */

        const { navigation } = this.props;
        var date = new Date().toDateString();
        date = dateFormat(date, "yyyy-mm-dd");
        const itemId = navigation.getParam('itemId', 'Undefined');
        const parent = navigation.getParam('parent', '0');
        const isGeo = navigation.getParam('isGeo', false);
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
        console.log(" Hour=================================page");
        console.log(" itemId --" + itemId);
        console.log(" parent --" + parent);
        console.log(" isGeo --" + isGeo);
        console.log(" date --" + date11);
        console.log(" filter_type --" + filter_type);
        console.log(" Total Net sales --" + sales);
        this.customComponentDidMount(itemId, parent, isGeo, date11, filter_type);
        EventRegister.emit('myCustomEvent', 'it works!!!');
        //  this.animate();
        // this.closeActivityIndicator();

        // this.customComponentDidMount()
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
    getTimeIn12HrFormat(time) {
        var str = "";
        var result = time - 12;
        if (result > 0) {
            str = result + "PM";
        } else {
            str = time + "AM";
        }
        return str;
    }
    parseFloat2Decimals = (value) => {
        return parseFloat(parseFloat(value).toFixed(2));
    }


    //for date
    customComponentDidMount = (itemId, parent, isGeo, date, filter_type) => {
        // console.log(" customComponentDidMount start ")
        var urlPanDate = ""
        urlPanDate = date;
        console.log(" Is_Geo_key : " + isGeo);
        var baseUrl = ''
        var urlValue = ''

        // var bodyJson = JSON.stringify({
        //     date: urlPanDate,
        //     filter_type: filter_type,
        // })
        // urlValue = 'http://115.112.224.200:3000/api/getBmSales'
        baseUrl='http://104.211.49.150:3001/v2/get_hourly_sale?filter_type=';
        // baseUrl = 'http://115.112.224.200:3000/v2/get_hourly_sale?filter_type='
        if ("" + isGeo == "true") {
            console.log(" value1==true");


            switch (parent) {
                case 0:
                case '0':
                    console.log(" value1==true  case 0");

                    if (itemId == 'National') {
                       
                        urlValue = baseUrl + filter_type + '&date=' + urlPanDate

                    } else {
                        urlValue = baseUrl + filter_type + '&date=' + urlPanDate + '&region_id=' + itemId
                    }
                    break;
                case 1:
                case '1':
                    console.log(" value1==true  case 1");
                    urlValue = baseUrl + filter_type + '&date=' + urlPanDate + '&city_id=' + itemId

                    break;
                case 2:
                case '2':
                    console.log(" value1==true  case 2");
                    urlValue = baseUrl + filter_type + '&date=' + urlPanDate + '&store_id=' + itemId



                    break;
                case 3:
                case '3':
                    // console.log(" value1==true  case 3");


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
                    console.log("else value1==true case  0")

                    urlValue = baseUrl + filter_type + '&date=' + urlPanDate + '&am_id=' + itemId

                    break;
                case 1:
                case '1':
                    // console.log("else value1==true case  1");


                    // urlValue = baseUrl + filter_type + '&date=' + urlPanDate + '&petch_id=' + itemId

                    break;
                case 2:
                case '2':
                    // console.log("else value1==true case  2");
                    // // bodyJson = JSON.stringify({
                    // //     date: urlPanDate,
                    // //     filter_type: filter_type,
                    // //     store_id: itemId,
                    // // })
                    // // break;
                    return

            }
        }

        const urlPan = urlValue;
        console.log("  url " + urlPan)
        this.setState({ indeterminate: true });
        this.setState({ refreshing: true });
        return fetch(urlPan)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isResponse: true });
                // this.setState({ indeterminate: false });
                console.log("Response data isResponse"+this.state.isResponse)

                console.log("Response data responseJson -> " + responseJson);
                console.log("data----responseJson  Total Sale -> " + responseJson.sale_info.total_sales);
                // responseJson.sale_info.hourly_sales.map((data) => {
                //     console.log("data----responseJson -> " + data);
                //     // dataSourceTemp.push({
                //     //    data
                //     // })
                // })
                var netsale = this.totalSaleFormat(responseJson.sale_info.total_sales)
                this.setState({ netSales: netsale });
                this.setState({
                    dataSource: responseJson.sale_info.hourly_sales
                })
                 this.closeActivityIndicator();
            })
            .catch((error) => {
                console.log(error)
            })
            .catch((error) => {
                console.log(error)
            })
    }



    renderItem = ({ item }) => {
        var time = item.hour_slot;


        return (
            // responseJson.map((data) => { 

            <View style={styless.MainContainer}>


                <View style={{
                    flexDirection: 'row',

                }}>
                    {/* item.hourly_sales.map((dataa) => { */}


                    <View style={styless.cardViewStyle}>
                        {/* <View style={styless.hairline} /> */}
                        <View style={{
                            flexDirection: 'row', width: '100%',

                        }}>
                            <View style={styless.shapeyellow}>
                                <TouchableOpacity >

                                    <Text style={{
                                        fontSize: 10,
                                        //width: 150,
                                        color: '#FFF',
                                        marginLeft: -40,
                                        textAlign: 'left',

                                        // fontWeight: 'bold',
                                        justifyContent: 'flex-start',
                                        //textAlignVertical: "center",
                                        alignItems: 'center',

                                    }}>
                                        {

                                            this.getTimeIn12HrFormat(time)
                                        }

                                    </Text>
                                </TouchableOpacity>

                            </View>


                            <View style={styless.shapeinnerwhite}>


                                <Text style={{
                                    fontSize: 10,
                                    //width: 150,
                                    color: '#000000',
                                    marginLeft: 20,

                                    // fontWeight: 'bold',
                                    justifyContent: 'center',
                                    //textAlignVertical: "center",
                                    alignItems: 'center',

                                }}>
                                    {
                                        
                                        //item.current_sale.toFixed(2)
                                        this.parseFloat2Decimals(item.percentage) + '%'
                                    }
                                </Text>

                            </View>


                            <View style={styless.shapewhite}>
                                <TouchableOpacity

                                    onPress={() => {

                                        // if ((item.key == "Total Net Sales")) {


                                        // this.props.navigation.navigate('SaleDetails', {
                                        //     itemName: this.state.itemName,
                                        //     itemId: this.state.itemId,
                                        //     parent: this.state.parent,
                                        //     date: this.state.date,
                                        //     isGeo: this.state.isGeo,
                                        //     filter_type: this.state.filter_type
                                        // });


                                        // }
                                    }}  >



                                    <View style={{
                                        flexDirection: 'row',
                                        marginLeft: 20,
                                        marginRight: -20,
                                        justifyContent: 'flex-end',
                                        // alignItems: 'center',


                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            //width: 150,
                                            color: 'blue',
                                            // marginLeft: 20,

                                            // fontWeight: 'bold',
                                            justifyContent: 'flex-end',
                                            //textAlignVertical: "center",
                                            alignItems: 'center',

                                        }}>
                                            {

                                                //item.current_sale.toFixed(2)
                                                this.totalSaleFormat(item.netsales)
                                            }
                                        </Text>

                                        {/* <Image
                                            source={require('../images/nxt.png')}
                                            style={{
                                                width: 12,
                                                height: 12,
                                                margin: 5,
                                                marginLeft: 10,
                                                justifyContent: 'flex-start',

                                                resizeMode: 'stretch',

                                            }} /> */}

                                    </View>



                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>


                </View>

            </View>

        )

    }


    // render() {
    //     //Check if showIndicator state is true the show indicator if not show button
    //     if (this.state.showIndicator) {
    //       return (
    //         <View >
    //           {/*Code to show Activity Indicator*/}
    //           <ActivityIndicator size="large" color="#0000ff" />
    //           {/*Size can be large/ small*/}
    //         </View>
    //       );
    //     } else {
    //       return (
    //         <View >
    //           {/*On CLick of a button onButtonPress will bw called will change the state*/}
    //           <Button onPress={this.onButtonPress} title="Click to see Indicator" />
    //         </View>
    //       );
    //     }
    //   }

    render() {

        if (!this.state.showIndicator) {
            if (this.state.dataSource != null && this.state.dataSource.length > 0) {

                return (

                    <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

                        <View
                            style={{
                                marginTop: 20,

                            }} >
                            <View style={{

                                flexDirection: 'row',

                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 10,
                                    marginLeft: 23,
                                    color: '#000000',
                                }}>Hourly Sales</Text>
                                <Text style={styless.instructions}>{this.state.netSales}</Text>

                            </View>
                            <View style={{
                                width: '90%',
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: '30%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        fontSize: 10,
                                        marginLeft: -60,
                                        color: '#000000',
                                    }}>Time</Text>
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    width: '30%',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        fontSize: 10,
                                        marginLeft: 30,
                                        color: '#000000',
                                    }}>%</Text>
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    width: '30%',

                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        fontSize: 10,

                                        color: '#000000',
                                    }}>NetSales</Text>
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
                    <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        {/* {
                        this.state.indeterminate &&
                       
                         <Progress.Bar progress={0.3} width={200}
                         style={{
                            alignItems:'center',
                            justifyContent: 'center',}}
                         progress={this.state.progress}
                         indeterminate={this.state.indeterminate}
                         alignItems={'center'}
                         justifyContent={'center'}
                         // width={380}
                        //  unfilledColor={'#EBEBEB'}
                         thickness={2}
                         borderColor={'#FAC209'}
                         borderRadius={0}
                         color={'rgb(250, 194, 9)'}
                         marginTop={1}
                     />
                   
                    } */}
                        <Image

                            source={require('../images/error.png')}
                        />
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#ff0000',
                            marginTop: 5,
                        }} >OOOPS!</Text>
                        <Text>Sorry, Data not found.</Text>



                    </View>
                )
            }
        } else {
            return (
                <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    {/*Code to show Activity Indicator*/}
                    <ActivityIndicator size="large" color="#fac209" />
                    {/*Size can be large/ small*/}
                </View>
            );
        }
    }


    //     render() {


    //         if (this.state.dataSource != null && this.state.dataSource.length > 0) {

    //             return (

    //                 <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
    //                 {
    //                      this.state.indeterminate &&


    //                     <Progress.Bar progress={0.3} width={200}
    //                     style={{
    //                         alignItems:'center',
    //                         justifyContent: 'center',}}
    //                     progress={this.state.progress}
    //                     indeterminate={this.state.indeterminate}
    //                     // width={380}

    //                     thickness={2}
    //                     // unfilledColor={'#EBEBEB'}
    //                     borderColor={'#FAC209'}
    //                     borderRadius={0}
    //                     color={'rgb(250, 194, 9)'}
    //                     marginTop={1}
    //                 />


    //                 }

    // {
    //     !this.state.indeterminate &&




    //                     <View
    //                         style={{
    //                             marginTop: 20,

    //                         }} >
    //                          <View style={{

    //                     flexDirection: 'row',

    //                    alignItems: 'center',  
    //                 }}>
    //                 <Text  style={{
    //                      fontSize: 10,
    //                      marginLeft:23,
    //                      color: '#000000',
    //                 }}>Hourly Sales</Text>
    //               <Text style={styless.instructions}>{this.state.netSales}</Text>

    //                 </View>
    //              <View style={{
    //                      width:'90%',
    //                      marginTop: 20,
    //                     flexDirection: 'row',
    //                    justifyContent: 'center',
    //                    alignItems: 'center',  
    //                 }}>
    //                 <View style={{
    //                     width:'30%',
    //                    justifyContent: 'center',
    //                    alignItems: 'center',  
    //                 }}>
    //                 <Text  style={{
    //                      fontSize: 10,
    //                      marginLeft:-60,
    //                      color: '#000000',
    //                 }}>Time</Text>
    //                 </View>
    //                 <View style={{
    //                    justifyContent: 'center',
    //                     width:'30%',
    //                    alignItems: 'center',  
    //                 }}>
    //                 <Text  style={{
    //                      fontSize: 10,
    //                      marginLeft:30,
    //                      color: '#000000',
    //                 }}>TC</Text>
    //                 </View>
    //                 <View style={{
    //                    justifyContent: 'center',
    //                    width:'30%',

    //                    alignItems: 'center',  
    //                 }}>
    //                 <Text  style={{
    //                      fontSize: 10,

    //                      color: '#000000',
    //                 }}>NetSales</Text>
    //                 </View>
    //                 </View>

    //                         <FlatList

    //                             data={this.state.dataSource}
    //                             renderItem={
    //                                 this.renderItem
    //                             }
    //                         />
    //                     </View >


    //     }
    // </View >
    //             );
    //         }
    //         else {
    //             return (
    //                 <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
    //                     {
    //                         this.state.indeterminate &&

    //                          <Progress.Bar progress={0.3} width={200}
    //                          style={{
    //                             alignItems:'center',
    //                             justifyContent: 'center',}}
    //                          progress={this.state.progress}
    //                          indeterminate={this.state.indeterminate}
    //                          alignItems={'center'}
    //                          justifyContent={'center'}
    //                          // width={380}
    //                         //  unfilledColor={'#EBEBEB'}
    //                          thickness={2}
    //                          borderColor={'#FAC209'}
    //                          borderRadius={0}
    //                          color={'rgb(250, 194, 9)'}
    //                          marginTop={1}
    //                      />

    //                     }





    //                 </View>
    //             )
    //         }
    //     }

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
        marginTop: 8,
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
        width: '25%',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',


    },
    shapeinnerwhite: {
        backgroundColor: '#FFFFFF',
        width: '25%',
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
        alignItems: 'center',
        justifyContent: 'center',

    },
    instructions: {
        //justifyContent: 'center',
        textAlignVertical: "center",
        fontSize: 10,
        marginLeft: 10,
        textAlign: 'center',
        color: '#000',
    },
    separator: {
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: 'red'
    },




});

