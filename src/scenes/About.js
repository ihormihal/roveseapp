import React, { Component } from 'react';
import {
	AsyncStorage,
	View,
	Text,
	Image,
	TouchableOpacity,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';


var backgroundImage = require('./../images/bg/service.jpg');

export default class About extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
		}
	};

	navigate(routeName, routeData) {
		Keyboard.dismiss();
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
							<Text style={[styles.textSM, styles.primary]}>{t.btn.back}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerCenter}>
						<Image
							style={[ styles.logoHeader ]}
							source={require('./../images/logo-header.png')}
						/>
					</View>
					<View style={styles.headerRight}>
					</View>
				</View>
				<View style={styles.pageHeader}>
					<Text style={[styles.white, styles.textMD]}>{t.title.about}</Text>
				</View>
				<View style={[styles.container, styles.center, styles.whiteBg]}>
					<Text style={[styles.textLG, styles.mb1]}>ROVESE RETAIL CLUB</Text>
					<Text style={styles.textXS}>Version: 1.1.0</Text>
					<View style={styles.hr} />
					<Text style={styles.textSM}><Icon name="copyright" /> {t.copyright}</Text>
				</View>
			</Image>
		);
	}


};
