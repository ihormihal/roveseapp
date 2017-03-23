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

export default class SupportError extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form_subject: '',
			form_message: ''
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
					<Text style={styles.white}>{t.reportAnError}</Text>
				</View>
				<View style={[styles.container, styles.whiteBg]}>

					<View style={[styles.textInput, styles.inputDefault]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							placeholder={t.letterSubject}
							onChangeText={(value) => this.setState({form_subject: value})}
							value={this.state.form_subject}
						/>
					</View>

					<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
						<TextInput
							style={[ styles.textAreaInput ]}
							multiline = {true}
							numberOfLines = {4}
							underlineColorAndroid='transparent'
							placeholder={t.message}
							onChangeText={(value) => this.setState({form_message: value})}
							value={this.state.form_message}
						/>
					</View>
					<Text style={[styles.italic]}>*{t.describeTheProblem}</Text>

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
