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

import { InputText } from './../components/Form';

export default class PasswordReset extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form_email: ''
		};
	};

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	_passwordReset(){
		if(this.state.form_email){
			if(this.state.form_email.indexOf('@') == -1){
				Alert.alert(t.error, t.errorEmailField);
			}else{
				if(this.state.form_email == 'test@test.com'){
					Alert.alert(
						'',
						t.passwordResetSuccess,
						[{text: 'OK', onPress: () => this.props.navigator.pop() }]
					);
				}else{
					Alert.alert(t.error, t.errorUserNotFound);
				}
			}
		}else{
			Alert.alert(t.error, t.errorEmptyField);
		}
	}

	render() {
		return (
			<View style={styles.scene}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.props.navigator.pop()}>
							<Icon style={[styles.btnIcon, styles.textSM, styles.primary]} size={20} name="arrow-back"/>
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
				<View style={styles.container}>
					<View style={styles.center}>
						<Text style={styles.sceneTitle}>{t.passwordRecovery.toUpperCase()}</Text>
					</View>

					<Text style={styles.inputLabel}>{t.enterEmail}</Text>
					<View style={[styles.textInput, styles.inputDefault]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							onChangeText={(value) => this.setState({form_email: value})}
							value={this.state.form_email}
						/>
					</View>

					<View style={[styles.center, styles.mt2]}>
						<TouchableOpacity
							onPress={() => this._passwordReset()}
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
							<Text style={[styles.white, styles.textMD]}>{t.change}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</View>
		);
	}


};
