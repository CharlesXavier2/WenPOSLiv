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
import CardView from 'react-native-cardview' ;

import styles from '../styles';

export default class WeekPage extends Component{
  constructor() {
    super()
    this.state = {
        dataSource: []
    }
}

renderItem = ({ item }) => {
    var rounfFranchise = '0.00';

    return (

        <View style={styless.MainContainer}>

            <CardView
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
                style={styless.cardViewStyle}>
                <View style={styless.cardViewRow}>
                    <Text style={styless.cardViewHeader}>Name</Text>
                    <Text style={styless.cardViewHeader}>National</Text>
                    <Text style={styless.cardViewHeader}>Company</Text>
                    <Text style={styless.cardViewHeader}>Franchise</Text>

                </View>


                {item.sale_data.map((data) =>


                    // if(data.franchise && data.franchise!=null){
                    //     rounfFranchise=data.franchise

                    // }

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



componentDidMount() {
  const url = 'http://bkliveapp.bklive.in:3600/v2/get_pan_level_sale?filter_type=week&date=2018-10-13&is_delivery=0'
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
        height: 250,
        marginTop: 20,
        marginBottom: 20,
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
        paddingLeft: 30,
        backgroundColor: 'orange',
        color: '#000000',
        //justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: "center"


    },
    cardViewHeader: {
        fontSize: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 60,
        color: 'blue',

        justifyContent: 'center',
        alignItems: 'center',

    },
    dataRow:

    {
        fontSize: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 60,
        justifyContent: 'center',
        color: '#000000',
        alignItems: 'flex-end'

    },
    hairline: {
        backgroundColor: '#000',
        height: 2,

    },




});