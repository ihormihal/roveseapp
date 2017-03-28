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
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';

var backgroundImage = require('./../images/bg/root.jpg');

export default class SupportError extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form: {
				subject: '',
				message: ''
			}
		};
	};

	setForm(key, value) {
		var form = this.state.form;
		if(key in form){
			form[key] = value;
		}
		this.setState({
			form: form
		});
	}

	navigate(routeName, routeData) {
		Keyboard.dismiss();
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	valid() {
		if(this.state.form.subject && this.state.form.message){
			return true;
		}else{
			Alert.alert(t.error, t.errorEmptyField);
			return false;
		}
	}

	_submit(){
		if(this.state.form.subject && this.state.form.message){
			fetch('http://rovese.jaya-test.com/api/support_error', {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.form.reset
				})
			})
			.then((response) => response.json())
			.then((data) => {
				Alert.alert(JSON.stringify(data));
				//AsyncStorage.setItem(item, selectedValue);
				//this.navigate('root');
			})
			.done();
		}else{
			Alert.alert(t.error, t.errorEmptyField);
		}
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
					<View style={styles.headerRight}>
					</View>
				</View>
				<View style={styles.pageHeader}>
					<Text style={[styles.white, styles.textMD]}>{t.reportAnError}</Text>
				</View>
				<View style={[styles.container, styles.whiteBg]}>

					<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							placeholder={t.letterSubject}
							onChangeText={(value) => this.setForm('subject', value)}
							value={this.state.form.subject}
						/>
					</View>

					<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
						<TextInput
							style={[ styles.textAreaInput ]}
							multiline = {true}
							numberOfLines = {4}
							underlineColorAndroid='transparent'
							placeholder={t.message}
							onChangeText={(value) => this.setForm('message', value)}
							value={this.state.form.message}
						/>
					</View>
					<Text style={[styles.italic, styles.textSM, styles.inputOffsetB]}>*{t.describeTheProblem}</Text>

					<View style={styles.center}>
						<TouchableOpacity
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}
							onPress={() => this._submit()}>
							<Text style={[styles.white, styles.inputText]}>{t.submit}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</Image>
		);
	}


};
