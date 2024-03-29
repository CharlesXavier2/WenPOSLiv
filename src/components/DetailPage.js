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
import DatePicker from '../utils/datepicker.js';

var dataSource1 = []
var dateFormat = require('dateformat');

export default class DetailPage extends Component {


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
            sales: ''

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
        urlValue = 'http://115.112.224.200:3000/api/getBmSales'

        console.log(" customComponentDidMount start =>  http://115.112.224.200:3000/api/getBmSales ");
        if ("" + isGeo == "true") {
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
                        storeid: itemId,
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
                city_id: itemId,
            })
            // urlValue='http://115.112.224.200:3000/api/getDeputyMgnSales' 
            switch (parent) {
                case 0:
                case '0':
                    console.log("else value1==true case  0")
                    bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,
                        deputy_id: itemId,
                    })
                    break;
                case 1:
                case '1':
                    console.log("else value1==true case  1");

                    bodyJson = JSON.stringify({
                        date: urlPanDate,
                        filter_type: filter_type,
                        petch_id: itemId,
                    })
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
        // var val = item.current_sale;
        // var rounfFranchise = '0.00';

        // if (item.current_sale > item.last_sale) {
        //     return (
        //         <View style={styless.MainContainer}>
        //             <CardView
        //                 cardElevation={2}
        //                 cardMaxElevation={2}
        //                 cornerRadius={1}
        //                 style={styless.cardViewStyle}
        //             >
        //                 {
        //                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

        //                         <View style={styless.cardViewRow}>

        //                             <TouchableOpacity
        //                             //  onPress={() => { this.setCurrentScreen(item.id); }}
        //                             >
        //                                 <Text style={{
        //                                     fontSize: 22,
        //                                     color: '#ffffff',
        //                                     justifyContent: 'center',
        //                                     // textAlignVertical: "center",
        //                                     alignItems: 'center',
        //                                 }} >
        //                                     {
        //                                         "" + item.name
        //                                     }
        //                                 </Text>
        //                             </TouchableOpacity>

        //                             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
        //                                 <Image
        //                                     source={require('../images/saleup.png')}
        //                                     style={styless.ImageIconStyle} />
        //                                 <Text style={{
        //                                     fontSize: 16,
        //                                     //width: 150,
        //                                     color: '#ffffff',
        //                                     justifyContent: 'center',
        //                                     //textAlignVertical: "center",
        //                                     alignItems: 'center',

        //                                 }}>Total Sale :
        //                         {
        //                             //item.current_sale.toFixed(2)
        //                                         "" + this.totalSaleFormat(val)
        //                                     }
        //                                 </Text>
        //                             </View>
        //                         </View>
        //                     </View>
        //                 }
        //                 <View style={styless.hairline} />
        //             </CardView>
        //         </View>
        //     )
        // }

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
                                        color: '#000000',
                                        marginLeft: -20,
                                        textAlign: 'left',

                                        // fontWeight: 'bold',
                                        justifyContent: 'flex-start',
                                        //textAlignVertical: "center",
                                        alignItems: 'center',

                                    }}>{
                                            item.key
                                        }

                                    </Text>
                                </TouchableOpacity>

                            </View>
                            {
                                item.key == "Total Net Sales" &&
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
                                            this.state.sales
                                            //item.current_sale.toFixed(2)
                                            // "" + this.totalSaleFormat(val)
                                        }
                                    </Text>

                                </View>
                            }
                            {
                                item.key != "Total Net Sales" &&
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

                                    }}>0 K
                                    {/* {
                                        this.state.sales
                                        //item.current_sale.toFixed(2)
                                        "" + this.totalSaleFormat(val)
                                    } */}
                                    </Text>

                                </View>
                            }

                            {
                                item.key == "Total Net Sales" &&
                                <TouchableOpacity

                                onPress={() => {
                                     // if ((item.key == "Total Net Sales")) {
                                            this.props.navigation.navigate('SaleDetails', {
                                            itemName: this.state.itemName,
                                            itemId: this.state.itemId,
                                            parent: this.state.parent,
                                            date: this.state.date,
                                            isGeo: this.state.isGeo,
                                            filter_type: this.state.filter_type
                                        });


                                    // }
                                }}  >
                                <View style={styless.shapewhite}>
                                   

                                        <View >
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

                                        </View>


                                      </View>
                                    </TouchableOpacity>
                                
                            }
                            {
                                item.key != "Total Net Sales" &&
                                <View style={styless.shapewhite} />

                            }
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

                    {/* <View
                    // cardElevation={2}
                    // cardMaxElevation={2}
                    // cornerRadius={1}
                    // borderRadius={5}
                    // borderColor={'#CE000A'}

                    //shadowRadius={'#CE000A'}
                    style={styless.cardViewStyle}
                > */}
                    {/* <View style={styless.cardViewRowHeader}>

<View style={{
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    // textAlignVertical: "center",
    alignItems: 'center',
    flexDirection: 'row',
}}>

    <Text numberOfLines={1} style={{
        fontSize: 20,

        color: '#0000FF',

       
        
        justifyContent: 'center',
        // textAlignVertical: "center",
        alignItems: 'center',

    }}>
     {this.state.itemName} 
        
    </Text>
</View>

</View> */}

                    {/* <View style={styless.hairline} /> */}









                    <View
                        style={{
                            marginTop: 30,

                        }} >
                        <FlatList

                            data={[
                                { key: 'Total Net Sales' },
                                { key: 'APC' },
                                { key: 'Total Collections' },
                                { key: 'Promotions' },
                                { key: 'Discounts' },
                                { key: 'Voids' },
                                { key: 'Refunds' },


                            ]}
                            //   const dataSet={this.state.dataSource}

                            renderItem={
                                this.renderItem
                            }
                        />
                    </View >
                    {/* </View>    */}
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
                    // cardElevation={2}
                    // cardMaxElevation={2}
                    // cornerRadius={1}
                    // borderRadius={5}
                    // borderColor={'#CE000A'}

                    //shadowRadius={'#CE000A'}
                    style={styless.cardViewStyle}
                >
                  <View style={styless.cardViewRowHeader}> */}

                    {/* <View style={{
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    // textAlignVertical: "center",
    alignItems: 'center',
    flexDirection: 'row',
}}>

    <Text numberOfLines={1} style={{
        fontSize: 20,

        color: '#0000FF',

       
        
        justifyContent: 'center',
        // textAlignVertical: "center",
        alignItems: 'center',

    }}> {this.state.itemName} 
        
    </Text>
</View> */}
                    {/* <View style={styless.hairline} /> */}
                    {/* </View> */}
                    {/* </View> */}


                 
                 <View
                        style={{
                            marginTop: 30,

                        }} >
                        <FlatList

                            data={[
                                { key: 'Total Net Sales' },
                                { key: 'APC' },
                                { key: 'Total Collections' },
                                { key: 'Promotions' },
                                { key: 'Discounts' },
                                { key: 'Voids' },
                                { key: 'Refunds' },


                            ]}
                            //   const dataSet={this.state.dataSource}

                            renderItem={
                                this.renderItem
                            }
                        />
                    </View >
                </View>
            )
        }
    }
}

const CustomHeader = ({ title, subtitle }) => (
    <View >
      <Text style={{ fontSize: 16, color: '#FAC209',alignSelf: (Platform.OS === 'ios') ? 'center' : 'flex-start',}}>{title}</Text>
      <Text style={{ fontSize: 10, color: '#FAC209',alignSelf: (Platform.OS === 'ios') ? 'center' : 'flex-start',}}>{subtitle}</Text>
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
        borderColor: '#F4F5F5',
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
        backgroundColor: '#FBE028',
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
        textAlign: 'center',
        color: '#fff',
    },
    separator: {
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: 'red'
    },




});