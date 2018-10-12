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

    FlatList
} from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';

export default class DayPage extends Component {

    constructor() {
        super()
        this.state = {
            dataSource: []
        }
    }

    renderItem = ({ item }) => {
        return (


            <View style={styless.MainContainer}>

                <CardView
                     cardElevation={2}
                     cardMaxElevation={2}
                     cornerRadius={5}
                    style={styless.cardViewStyle}>

                    {item.sale_data.map((data) =>

                        <View style={styless.cardViewRow}>
                            <Text style={styless.cardViewText}>
                                {
                                    data.name
                                }
                            </Text>
                            <Text style={styless.cardViewText}>
                                {
                                    data.total
                                }
                            </Text>
                            <Text style={styless.cardViewText}>
                                {
                                    data.self
                                }
                            </Text>
                            <Text style={styless.cardViewText}>
                                {
                                    data.franchise
                                }
                            </Text>
                            

                        </View>

                    )}
                    <View style={styless.hairline} />
                </CardView>
            </View>




        )

    }

    componentDidMount() {
        const url = 'http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=day&date=2018-10-11&is_delivery=0'
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.sale_info

                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
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

const styless = StyleSheet.create({

    MainContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    cardViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        height: 300,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5


    },
    cardViewRow: {
       
        
        
        flexDirection: 'row',
        
        alignItems:'flex-start',
         

    },
    cardViewText: {
        fontSize: 10,
         color: '#000000',
          justifyContent: 'center', 
          alignItems:'flex-start',
       
    },
    hairline: {
        backgroundColor: '#000',
        height: .5,
      
      },




});