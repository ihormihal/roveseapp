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

export default class SupportOffer extends Component {

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
							onPress={() => this.props.navigator.pop()}
							activeOpacity={75 / 50}>
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.btnText, styles.primary]}>{t.back}</Text>
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
					<Text style={styles.white}>Отправить отзыв или предложение</Text>
				</View>
				<View style={[styles.container, styles.whiteBg]}>

					<View style={[styles.textInput, styles.inputDefault]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							placeholder="Тема"
							onChangeText={(phone) => this.setState({phone: phone})}
							value={(this.state && this.state.phone) || ''}
						/>
					</View>

					<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
						<TextInput
							style={[ styles.textAreaInput ]}
							multiline = {true}
							numberOfLines = {4}
							underlineColorAndroid='transparent'
							placeholder="Комментарий"
							onChangeText={(phone) => this.setState({phone: phone})}
							value={(this.state && this.state.phone) || ''}
						/>
					</View>

					<View style={[styles.center, styles.mt2]}>
						<TouchableOpacity
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
							<Text style={styles.white}>{t.submit}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</Image>
		);
	}


};
