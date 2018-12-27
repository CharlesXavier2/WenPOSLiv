import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,AsyncStorage,
} from 'react-native'

class LogoutScreen extends Component {
  constructor(props) {
      super(props);
   }

  componentWillMount() {
    AsyncStorage.clear();
      this.props.navigation.navigate('LoginPage')
  }
  render() {
    return (
      <View ></View>)
}
}
export default LogoutScreen;
const stylesss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
