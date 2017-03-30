import React, { Component } from 'react';
import {
	View,
	Image,
	StatusBar,
} from 'react-native';
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
