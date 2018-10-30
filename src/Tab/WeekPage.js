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
export default class WeekPage extends Component{
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
        date = dateFormat(date, "yyyy-mm-dd");
        this.setState({ date });
        AsyncStorage.setItem("date_key", date);

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
       // try {
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
    // } catch (Exception e) {
    //     return (0 + " K");
    // } 
    }

    renderItem = ({ item }) => {
        var val =item.current_sale;
       
       
        
        var rounfFranchise = '0.00';
        if (item != null) {
            this.setState({ indeterminate: false });
        }

        if (item.current_sale > item.last_sale){
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


                                <Text style={{
                                    fontSize: 22,

                                    color: '#ffffff',


                                    justifyContent: 'center',
                                    // textAlignVertical: "center",
                                    alignItems: 'center',

                                }}>
                                    {
                                        item.name
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
                                            this.totalSaleFormat(val)
                                        }
                                    </Text>


                                </View>
                                

                                  
                            </View>


                            <Image
                                source={require('../images/line_graph.png')}
                                style={{
                                    width: 40,
                                    height: 40,
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#313131',
                                    marginLeft: 15,
                                    resizeMode: 'stretch',

                                }} />


                        </View>


                    }


                    {/* {item.sale_data.map((data) =>


                        <View style={styless.cardViewRow}>
                            <Text style={styless.cardViewText}>
                                {
                                    data[0].name
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

                    )} */}
                    <View style={styless.hairline} />
                </CardView>
            </View>
        ) }
        else
        {
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
  
  
                                  <Text style={{
                                      fontSize: 22,
  
                                      color: '#ffffff',
  
  
                                      justifyContent: 'center',
                                      // textAlignVertical: "center",
                                      alignItems: 'center',
  
                                  }}>
                                      {
                                          item.name
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
                                               this.totalSaleFormat(val)
                                          }
                                      </Text>
  
  
                                  </View>
                                  
  
                                    
                              </View>
  
  
                              <Image
                                  source={require('../images/line_graph.png')}
                                  style={{
                                      width: 40,
                                      height: 40,
                                      padding: 10,
                                      margin: 5,
                                      backgroundColor: '#313131',
                                      marginLeft: 15,
                                      resizeMode: 'stretch',
  
                                  }} />
  
  
                          </View>
  
  
                      }
  
  
                      {/* {item.sale_data.map((data) =>
  
  
                          <View style={styless.cardViewRow}>
                              <Text style={styless.cardViewText}>
                                  {
                                      data[0].name
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
  
                      )} */}
                      <View style={styless.hairline} />
                  </CardView>
              </View>
          ) }

        

    }

    componentDidMount() {
        var urlPanDate = ''
        this.getDate();
        AsyncStorage.getItem("date_key").then((value) => {
            console.log(" Getter date" + value);
            urlPanDate = value;
            const urlPan = 'http://192.168.1.25:3000/tasks'
            console.log("  url " + urlPan)
            fetch(urlPan)
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

    customComponentDidMount() {
        var urlPanDate = ''
        // this.getDate();
        AsyncStorage.getItem("date_key").then((value) => {
            console.log(" Getter date" + value);
            urlPanDate = value;
            const urlPan = 'http://192.168.1.25:3000/tasks'
            console.log("  url " + urlPan)
            fetch(urlPan)
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


    render() {


        /* 2. Read the params from the navigation state */
        // const { params } = this.props.navigation.state;
        //const itemId = params ? params.itemId : null;
        // const filterType = params ? params.filterType : null;
        if (this.state.dataSource != null && this.state.dataSource.length > 0) {
            return (
                <View style={{ backgroundColor: '#000000', flex: 1, }}>

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
                            onDateChange={(date) => {
                                this.setState({ date: date });
                                AsyncStorage.setItem("date_key", this.state.date);
                                this.customComponentDidMount();
                            }}

                        />
                        <Text style={styless.instructions}>{this.state.date}</Text>
                        {/* <Text style={{
                            fontSize: 12,

                            color: '#ffffff',
                            // paddingLeft: 40,

                            marginLeft: 40,
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
                            onDateChange={(date) => {
                                this.setState({ date: date });
                                AsyncStorage.setItem("date_key", this.state.date);
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