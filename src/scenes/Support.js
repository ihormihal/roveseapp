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

var backgroundImage = require('./../images/bg/service.jpg');

export default class Support extends Component {

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
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.props.navigator.pop()}>
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.textSM, styles.primary]}>{t.back}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerCenter}>
						<Image
							style={[ styles.logoHeader ]}
							source={require('./../images/logo-header.png')}
						/>
					</View>
					<View style={styles.headerRight} />
				</View>
				<View style={styles.pageHeader}>
					<Text style={[styles.white, styles.textCenter, styles.textLG]}>{t.tech_support.toUpperCase()}</Text>
				</View>
				<View style={[styles.box, styles.whiteBg]}>
					<TouchableOpacity
						onPress={() => this.navigate('support-error')}
						style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
						<Text style={[styles.white, styles.inputText]}>{t.reportAnError}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.navigate('about')}
						style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
						<Text style={[styles.white, styles.inputText]}>{t.aboutApp}</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.container, styles.center, styles.last]}>
					<Text style={styles.textMD}>{t.helpToImproveApp},</Text>
					<Text onPress={() => this.navigate('support-offer')} style={[styles.primary, styles.textMD]}>{t.submitFeedback}</Text>
				</View>
			</Image>
		);
	}


};
