import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';

var backgroundImage = require('./../images/bg/login.jpg');

export default class About extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phone: ''
		};
	};

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	render() {
		return (
			<Image
				style={[styles.scene, styles.background]}
				source={backgroundImage}>
				<Header
					buttonText={t.back}
					buttonIcon="arrow-back"
					shadow="true"
					onButtonPress={() => this.props.navigator.pop()}>
				</Header>
				<View style={styles.pageHeader}>
					<Text style={styles.white}>О приложении</Text>
				</View>
				<View style={[styles.container, styles.center, styles.whiteBg]}>
					<Text style={[styles.h2, styles.mb1]}>ROVESE RETAIL CLUB</Text>
					<Text style={styles.small}>Version: 1.0.0</Text>
					<View style={styles.hr} />
					<Text><Icon name="copyright" /> 2017 JayaDigital. All rights reserved.</Text>
				</View>
			</Image>
		);
	}


};
