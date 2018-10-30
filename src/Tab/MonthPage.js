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


} from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';
import DrawerScreen from '../components/DrawerScreen';
import * as Progress from 'react-native-progress';
import DatePicker from '../utils/datepicker.js';
import Moment from 'moment';

var dateFormat = require('dateformat');
export default class MonthPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            progress: 0,
            indeterminate: true,
           
            
            date: '',
           





        }

        

    }
    getDate = () => {
        var date = new Date().toDateString();
        date=dateFormat(date, "yyyy-mm-dd");
        this.setState({ date });
       AsyncStorage.setItem("date_key",date);
        
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
dateFind(){ 
   
      dateValue:{ this.state.date };
 }

    


    renderItem = ({ item }) => {
        var rounfFranchise = '0.00';
        if (item != null) {
            this.setState({ indeterminate: false });


        }



        return (

            <View style={styless.MainContainer}>

                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    style={styless.cardViewStyle}>
                    {

                        <View style={styless.cardViewRow}>
                            <Text style={styless.cardViewHeader}>
                            </Text>

                            <Text style={{
                                fontSize: 10,
                                width: 75,
                                color: '#ffffff',
                                paddingLeft: 30,

                                backgroundColor: '#FAC209',
                                //justifyContent: 'center',
                                textAlignVertical: "center",
                                alignItems: 'center',

                            }}>
                                {
                                    item.name
                                }
                            </Text>
                            <Text style={styless.cardViewHeader}>
                                Company
                        </Text><Text style={styless.cardViewHeader}>
                                Franchise
                        </Text>


                        </View>
                    }



                    {item.sale_data.map((data) =>


                        <View style={styless.cardViewRow}>
                            <Text style={styless.cardViewText}>
                                {
                                    data.name
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

                    )}
                    <View style={styless.hairline} />
                </CardView>
            </View>
        )

    }

//   componentDidMount() {
//     const urlPan = 'http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=month&date=2018-10-13&is_delivery=0 '
//     fetch(urlPan)
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 // this.setState.dataSource.push( responseJson.sale_info );
//                 this.setState({
//                     dataSource: responseJson.sale_info
//                 })

//                 if (responseJson != null) {

//                 }

//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//         const urlResion = 'http://bkliveapp.bklive.in:3600/v2/get_all_region_sale?filter_type=month&date=2018-10-17&hour=11&minute=35&is_delivery=0 '
//         fetch(urlResion)
//             .then((response) => response.json())
//             .then((responseJson) => {

//                 // this.setState.dataSource.push( responseJson.sale_info );
//                 // this.setState({
//                 // dataSource.push( responseJson.sale_info )
//                 // })

//                 // this.setState({dataSource: this.state.dataSource.push.apply(this.state.dataSource, responseJson.sale_info)})

//                 var joined = this.state.dataSource.concat(responseJson.sale_info);
//                 this.setState({ dataSource: joined })


//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }

componentDidMount() {
    var urlPanDate =''
    this.getDate();
     AsyncStorage.getItem("date_key").then((value) => {
        console.log( " Getter date"+ value);
        urlPanDate=value;
       // 'http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=month&date=2018-10-13&is_delivery=0 '
        const urlPan = 'http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=month&is_delivery=0&date=' + value
        console.log( "  url "+ urlPan)
        fetch(urlPan)
        .then((response) => response.json())
        .then((responseJson) => {
            // this.setState.dataSource.push( responseJson.sale_info );
            this.setState({
                dataSource: responseJson.sale_info
            })

            if (responseJson != null) {

            }

        })
        .catch((error) => {
            console.log(error)
        })
                    // 'http://bkliveapp.bklive.in:3600/v2/get_all_region_sale?filter_type=month&date=2018-10-17&hour=11&minute=35&is_delivery=0 '
    const urlResion = 'http://bkliveapp.bklive.in:3600/v2/get_all_region_sale?filter_type=month&hour=13&minute=57&is_delivery=0&date='+value
    fetch(urlResion)
        .then((response) => response.json())
        .then((responseJson) => {

            // this.setState.dataSource.push( responseJson.sale_info );
            // this.setState({
            // dataSource.push( responseJson.sale_info )
            // })

            // this.setState({dataSource: this.state.dataSource.push.apply(this.state.dataSource, responseJson.sale_info)})

            var joined = this.state.dataSource.concat(responseJson.sale_info);
            this.setState({ dataSource: joined })


        })
        .catch((error) => {
            console.log(error)
        })
     }).done();
   
     


    
}

customComponentDidMount() {
    var urlPanDate =''
    // this.getDate();
     AsyncStorage.getItem("date_key").then((value) => {
        console.log( " Getter date"+ value);
        urlPanDate=value;
        const urlPan = 'http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=month&is_delivery=0&date=' + value
        console.log( "  url "+ urlPan)
        fetch(urlPan)
        .then((response) => response.json())
        .then((responseJson) => {
            // this.setState.dataSource.push( responseJson.sale_info );
            this.setState({
                dataSource: responseJson.sale_info
            })

            if (responseJson != null) {

            }

        })
        .catch((error) => {
            console.log(error)
        })
        const urlResion = 'http://bkliveapp.bklive.in:3600/v2/get_all_region_sale?filter_type=month&hour=13&minute=57&is_delivery=0&date='+value
        fetch(urlResion)
        .then((response) => response.json())
        .then((responseJson) => {

            // this.setState.dataSource.push( responseJson.sale_info );
            // this.setState({
            // dataSource.push( responseJson.sale_info )
            // })

            // this.setState({dataSource: this.state.dataSource.push.apply(this.state.dataSource, responseJson.sale_info)})

            var joined = this.state.dataSource.concat(responseJson.sale_info);
            this.setState({ dataSource: joined })


        })
        .catch((error) => {
            console.log(error)
        })
     }).done();
}


render() {

    
    /* 2. Read the params from the navigation state */
    // const { params } = this.props.navigation.state;
    //const itemId = params ? params.itemId : null;
    // const filterType = params ? params.filterType : null;
    if (this.state.dataSource != null && this.state.dataSource.length > 0) {
        return (
            <View style={styless.MainContainer}>

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
                        onDateChange={(date) => { this.setState({ date: date });
                        AsyncStorage.setItem("date_key",this.state.date);
                        this.customComponentDidMount(); }}

                    />
                    <Text style={styless.instructions}>{this.state.date}</Text>
                    {/* <Text style={{
                        fontSize: 16,

                        color: '#ffffff',
                        // paddingLeft: 40,


                        //justifyContent: 'center',
                        textAlignVertical: "center",
                        alignItems: 'center',

                    }}>Net Sales</Text> */}
                    <Image
                        source={require('../images/select_people.png')}
                        style={{
                            padding: 10,
                            margin: 5,
                            marginLeft: 110,
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
                        onDateChange={(date) => { this.setState({ date: date });
                        AsyncStorage.setItem("date_key",this.state.date);
                        this.customComponentDidMount(); }}                        />
                    <Text style={styless.instructions}>{this.state.date}</Text>
                    {/* <Text style={{
                        fontSize: 16,

                        color: '#ffffff',
                        paddingLeft: 40,


                        //justifyContent: 'center',
                        textAlignVertical: "center",
                        alignItems: 'center',

                    }}>Net Sales</Text> */}
                    <Image
                        source={require('../images/select_people.png')}
                        style={{
                            padding: 10,
                            margin: 5,
                            marginLeft: 130,
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
    width: '100%',
    height: '100%',
    backgroundColor: '#313131',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',


},
categries: {

    width: '100%',
    height: 40,
    marginTop: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
},
ImageIconStyle: {
    padding: 10,
    margin: 5,
    marginLeft: 20,
    resizeMode: 'stretch',

},

cardViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 250,
    backgroundColor: '#000',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
},
cardViewRow: {
    flexDirection: 'row',
    marginBottom: 1,
    height: 22.7,




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
    fontSize:12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
},




});