import React,{Component} from 'react';
import Navigator from './src/setup/routes';
export default class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title: "McD"
        }
    }
  render(){
      return(
        <Navigator onNavigationStateChange={this._onNavigationStateChange} screenProps={this.state} 
        />
        //   <Navigator/>
      )
  }
}



{/* <key>NSAppTransportSecurity</key>
	<!--See http://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/ -->
	<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
		<key>NSExceptionDomains</key>
		<dict>
			<key>localhost</key>
			<dict>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict>
	</dict> */}