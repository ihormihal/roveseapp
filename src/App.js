import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Alert, View, Navigator, TouchableOpacity, Text } from 'react-native';

import Login from './scenes/Login';
import PasswordReset from './scenes/PasswordReset';
import Registration from './scenes/Registration';
import Rules from './scenes/Rules';
import Root from './scenes/Root';
import Presentation from './scenes/Presentation';
import SellerRegistration from './scenes/SellerRegistration';
import Statistics from './scenes/Statistics';
import Seller from './scenes/Seller';
import SellerEdit from './scenes/SellerEdit';
import Support from './scenes/Support';
import SupportOffer from './scenes/SupportOffer';
import SupportError from './scenes/SupportError';
import About from './scenes/About';
import Settings from './scenes/Settings';


export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			initialRoute: 'login',
			isLoading: true
		}
	};

	navScene(route, navigator) {
		if(route.name == 'login'){
			return (<Login navigator={navigator} />);
		}
		if(route.name == 'password-reset'){
			return (<PasswordReset navigator={navigator} data={route.data} />);
		}
		if(route.name == 'registration'){
			return (<Registration navigator={navigator} data={route.data} />);
		}
		if(route.name == 'rules'){
			return (<Rules navigator={navigator} data={route.data} />);
		}
		if(route.name == 'root'){
			return (<Root navigator={navigator} />);
		}
		if(route.name == 'presentation'){
			return (<Presentation navigator={navigator} data={route.data} />);
		}
		if(route.name == 'seller-registration'){
			return (<SellerRegistration navigator={navigator} data={route.data} />);
		}
		if(route.name == 'statistics'){
			return (<Statistics navigator={navigator} data={route.data} />);
		}
		if(route.name == 'seller'){
			return (<Seller navigator={navigator} data={route.data} />);
		}
		if(route.name == 'seller-edit'){
			return (<SellerEdit navigator={navigator} data={route.data} />);
		}
		if(route.name == 'support'){
			return (<Support navigator={navigator} data={route.data} />);
		}
		if(route.name == 'support-offer'){
			return (<SupportOffer navigator={navigator} data={route.data} />);
		}
		if(route.name == 'support-error'){
			return (<SupportError navigator={navigator} data={route.data} />);
		}
		if(route.name == 'about'){
			return (<About navigator={navigator} data={route.data} />);
		}
		if(route.name == 'settings'){
			return (<Settings navigator={navigator} data={route.data} />);
		}
	}

	componentWillMount() {
		AsyncStorage.getItem('access_token', (token) => {
			this.setState({
				initialRoute: (token ? 'root' : 'login'),
				isLoading: false
			});
		})
	}

	navigatorConfig(route) {
		if(route.name == 'login' || route.name == 'root'){
			return {
				...Navigator.SceneConfigs.FloatFromBottom,
				gestures: false
			}
		}else{
			return Navigator.SceneConfigs.PushFromRight;
		}
	}

	render() {
		if(this.state.isLoading) {
			return <View><Text>Loading...</Text></View>;
		}
		return (
			<Navigator
				initialRoute={{name: this.state.initialRoute}}
				renderScene={this.navScene}
				configureScene={this.navigatorConfig}
			/>
		);
	}
}
