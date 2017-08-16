import React, { Component } from 'react';
import {
	AsyncStorage,
	View,
	Image,
	StatusBar,
} from 'react-native';

import { Actions } from "react-native-router-flux";
//import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';


var backgroundImage = require('./../images/bg/splash.jpg');
var logo = require('./../images/logo-splash.png');
var bottomLogo = require('./../images/logo-powered-by.png');

export default class Splash extends Component {

	constructor(props) {
		super(props);
	};

	componentDidMount() {
		setTimeout(() => {
			AsyncStorage.getItem('access_token', (error, token) => {
				console.log(error, token);
				if(token){
					Actions.slides();
				}else{
					Actions.login();
				}
			});
		}, 2000)
	}

	render() {
		return (
			<Image
				style={[styles.scene, styles.background]}
				source={backgroundImage}>

				<StatusBar translucent={false} backgroundColor={variables.colorPrimaryDark} />
				<StatusBar translucent={false} backgroundColor={variables.colorPrimaryDark} />
				<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
					<Image
						style={styles.logo}
						source={logo}
					/>
				</View>
				<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
						<Image
							style={{height: 62, width: 178, marginBottom: 20}}
							source={bottomLogo}
						/>
				</View>
			</Image>
		);
	}

};
