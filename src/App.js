import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, View, Navigator, Text } from 'react-native';
import { connect } from 'react-redux';

import Login from './scenes/Login';
import PasswordReset from './scenes/PasswordReset';
import Registration from './scenes/Registration';
import Rules from './scenes/Rules';

import Root from './scenes/Root';
import Presentation from './scenes/Presentation';
import SellerRegistration from './scenes/SellerRegistration';
import Statistics from './scenes/Statistics';
import Support from './scenes/Support';
import SupportOffer from './scenes/SupportOffer';


const styles = {
	container: {
		flex: 1
	}
};

var initialRoute = {'name': 'root'};

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			isLoading: true,
			tiken: null
		};
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
		if(route.name == 'support'){
			return (<Support navigator={navigator} data={route.data} />);
		}
		if(route.name == 'support-offer'){
			return (<SupportOffer navigator={navigator} data={route.data} />);
		}
	}

	async getToken() {
		try {
			let token = await AsyncStorage.getItem('id_token');
			return token;
		} catch (e) {
			console.log('caught error', e);
		}
	}

	componentWillMount() {
		AsyncStorage.getItem('id_token').then((token) => {
			this.setState({
				token: token,
				isLoading: false
			});
		})
	}

	navigatorConfig(route) {
		switch (route.name){
			case 'root':
				return Navigator.SceneConfigs.FloatFromBottom;
			default:
				return Navigator.SceneConfigs.PushFromRight;
		}
	}

	render() {
		if(this.state.isLoading) {
			return <View><Text>Loading...</Text></View>;
		}
		if(this.state.token === null){
			initialRoute.name = 'login';
		}
		initialRoute.name = 'login';
		return (
			<View style={styles.container}>
				<Navigator
					initialRoute={initialRoute}
					renderScene={this.navScene}
					configureScene={this.navigatorConfig}
				/>
			</View>
		);
	}


}

module.exports = connect(
	//закидываем в this.props
	state => ({
		testStore: state
	}),
	dispatch => ({})
)(App);
