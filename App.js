import React,{Component} from 'react';
import Navigator from './src/setup/routes';
export default class App extends Component{
    
    _onNavigationStateChange = (prevState, newState) => {
        this.setState({...this.state, route_index: newState.index});
      }
  render(){
      return(
        <Navigator onNavigationStateChange={this._onNavigationStateChange} screenProps={this.state} />
        //   <Navigator/>
      )
  }
}