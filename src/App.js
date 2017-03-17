import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, View, Navigator, Text } from 'react-native';
import { connect } from 'react-redux';

import Login from './scenes/Login';
//import Register from './scenes/Register';
//import Root from './scenes/Root';


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
		if(route.name == 'root'){
			//return (<Root navigator={navigator} />);
		}
		if(route.name == 'login'){
			return (<Login navigator={navigator} />);
		}
		if(route.name == 'register'){
			//return (<Register navigator={navigator} data={route.data} />);
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

	render() {
		if (this.state.isLoading) {
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
