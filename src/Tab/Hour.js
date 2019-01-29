
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
import { StackNavigator } from 'react-navigation';
import CardView from 'react-native-cardview';
import styles from '../styles';
import * as Progress from 'react-native-progress'
import DatePicker from '../utils/datepicker.js';

var dataSource1 = []
var dateFormat = require('dateformat');

export default class Hour extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params.itemName + '',
            headerTitleStyle: { alignSelf: 'center' }
        }
    }


    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            progress: 0,
            indeterminate: true,

            date: '',
            netSales: ' ',
            itemName: '',



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
        const title = navigation.getParam('itemName', "McDLiv")
        this.setState({ itemName: title });


        this.customComponentDidMount()
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
    customComponentDidMount = () => {
        console.log(" customComponentDidMount start ")
        const urlPan = 'http://bkliveapp.bklive.in:4500/v2/get_hourly_sale?filter_type=day&date=2018-12-24&region_id=1';
        console.log("  url " + urlPan)
        return fetch(urlPan)
            .then((response) => response.json())
            .then((responseJson) => {
               
                this.setState({ indeterminate: false });
                console.log("Response data responseJson -> " + responseJson);
                console.log("data----responseJson  Total Sale -> " + responseJson.sale_info.total_sales);
                // responseJson.sale_info.hourly_sales.map((data) => {
                //     console.log("data----responseJson -> " + data);
                //     // dataSourceTemp.push({
                //     //    data
                //     // })
                // })
                var netsale= this.totalSaleFormat(responseJson.sale_info.total_sales)
                this.setState({ netSales:netsale });
                this.setState({
                    dataSource: responseJson.sale_info.hourly_sales
                }) 
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
                                        color: '#FFFFFF',
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
                                        marginRight:-20,
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


    render() {


        if (this.state.dataSource != null && this.state.dataSource.length > 0) {

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
                }}>Hourly Sales</Text>
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
                    width:'30%',
                   justifyContent: 'center',
                   alignItems: 'center',  
                }}>
                <Text  style={{
                     fontSize: 10,
                     marginLeft:-60,
                     color: '#000000',
                }}>Time</Text>
                </View>
                <View style={{
                   justifyContent: 'center',
                    width:'30%',
                   alignItems: 'center',  
                }}>
                <Text  style={{
                     fontSize: 10,
                     marginLeft:30,
                     color: '#000000',
                }}>%</Text>
                </View>
                <View style={{
                   justifyContent: 'center',
                   width:'30%',
                 
                   alignItems: 'center',  
                }}>
                <Text  style={{
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



                    <View
                        style={{
                            marginTop: 30,

                        }} >
                        {/* <Text>Data not found </Text> */}
                        {/* <FlatList
                        data={this.state.dataSource}
                        renderItem={
                            this.renderItem
                        }
                    /> */}
                    </View >
                </View>
            )
        }
    }

}


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
        width: '50%',
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
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'flex-end',


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
    },
    instructions: {
        //justifyContent: 'center',
        textAlignVertical: "center",
        fontSize: 10,
        marginLeft:10,
        textAlign: 'center',
        color: '#000',
    },
    separator: {
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: 'red'
    },




});

