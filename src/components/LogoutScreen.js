import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class LogoutScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen One',
    // drawerIcon: () => (
    //   <Image
    //     source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
    //     style={{width: 30, height: 30, borderRadius: 15}}
    //   />
    // )
  }

  render() {
    return (
      <View style={stylesss.container}>
        <Text>Screen 1</Text>
      </View>
    )
  }
}

const stylesss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
