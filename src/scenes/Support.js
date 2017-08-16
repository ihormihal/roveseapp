import React, { Component } from 'react';
import {
	AsyncStorage,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from "react-native-router-flux";

//import variables from './../theme/variables.js';
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

	render() {

		return (
			<Image
				style={[styles.scene, styles.background]}
				source={backgroundImage}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => Actions.pop()}>
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.textSM, styles.primary]}>{t.btn.back}</Text>
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
					<Text style={[styles.white, styles.textCenter, styles.textLG]}>{t.title.techSupport.toUpperCase()}</Text>
				</View>
				<View style={[styles.box, styles.whiteBg]}>
					<TouchableOpacity
						onPress={() => Actions.supportError()}
						style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
						<Text style={[styles.white, styles.inputText]}>{t.btn.reportAnError}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => Actions.about()}
						style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
						<Text style={[styles.white, styles.inputText]}>{t.btn.about}</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.container, styles.center, styles.last]}>
					<Text style={styles.textMD}>{t.helpToImproveApp},</Text>
					<Text onPress={() => Actions.supportOffer()} style={[styles.primary, styles.textMD]}>{t.btn.submitFeedback}</Text>
				</View>
			</Image>
		);
	}


};
