import React from 'react'
import {
  View,
  Button,
} from 'react-native'

export default class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    return {
      headerTitle: 'New Task',
      headerRight: <Button title="Save" onPress={() => state.params.handleSave()} />,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: () => this.saveDetails() })
  }

  saveDetails() {
    alert('saved')
  }

  render() {
    return (
      <View />
    )
  }
}