import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	ScrollView,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	Picker,
	Item,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import data from './../Data';

export default class Registration extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: undefined,
			selected1: 'key1',
			results: {
				items: []
			},

			form: {
				name: '',
				surname: '',
				middleName: '',
				email: '',
				password: '',
				passwordConfirm: '',
				region: 0,
				position: 0,
				phoneNumber: '',
			}
		}
	}

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

	//const api_url_signup = 'http://rovese.jaya-test.com/api/register';
	//http://192.168.1.11:3001/sessions/create

	valid() {
		if(this.state.form.name && this.state.form.surname && this.state.form.middlename && this.state.form.email && this.state.form.phone && this.state.form.password && this.state.form.passwordConfirm){
			if(this.state.form.email.indexOf('@') == -1){
				Alert.alert('Error', 'Неверный формат e-mail');
				return false;
			}else if(this.state.form.password !== this.state.form.passwordConfirm){
				Alert.alert('Error', 'Пароли не совпадают');
				return false;
			}
			return true;
		}else{
			Alert.alert(t.error, t.errorEmptyField);
			return false;
		}
	}

	_submit() {
		if(this.valid()){
			fetch('http://rovese.jaya-test.com/api/register', {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			})
			.then((response) => response.json())
			.then((responseData) => {
				await AsyncStorage.setItem(item, selectedValue);
				Alert.alert(t.done, t.data_send, [{text: 'OK', onPress: () => this.navigate('login')}]);
			})
			.done();
		}
	}

	// _signUp() {
	// 	if(this.state.form_name && this.state.form_surname && this.state.form_middleName && this.state.form_email && this.state.form_password && this.state.form_passwordConfirm && this.state.form_phoneNumber){
	// 		Alert.alert(t.done, t.data_send, [{text: 'OK', onPress: () => this.navigate('login')}]);
	// 	}else{
	// 		Alert.alert(t.error, t.errorEmptyField)
	// 	}
	// }

	render() {

		return (
			<View style={styles.scene}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.props.navigator.pop()}>
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.textSM, styles.primary]}>{t.back}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerCenter} />
					<View style={styles.headerRight} />
				</View>
				<ScrollView style={styles.scroll}>

					<View style={styles.container}>

						<View style={styles.logoTitle}>
							<Image
								style={styles.logoTitleImg}
								source={require('./../images/logo-blue.png')}
							/>
							<View style={styles.logoRightText}>
								<Text style={styles.logoTitleText1}>{t.logoRegistration}</Text>
								<Text style={styles.logoTitleText2}>{t.logoRegional}</Text>
								<Text style={styles.logoTitleText2}>{t.logoMember}</Text>
							</View>
						</View>

						<View style={[styles.cols, styles.inputOffsetB]}>
							<View style={[styles.col, styles.textInput, styles.inputDefault, styles.inputOffsetR]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.name}
									onChangeText={(value) => this.setForm('name', value)}
									value={this.state.form.name}
								/>
							</View>
							<View style={[styles.col, styles.textInput, styles.inputDefault]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.surname}
									onChangeText={(value) => this.setForm('surname', value)}
									value={this.state.form.surname}
								/>
							</View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.middleName}
								onChangeText={(value) => this.setForm('middleName', value)}
								value={this.state.form.middleName}
							/>
						</View>

						<View style={styles.legend}>
							<View style={styles.lline}></View>
							<Text style={styles.ltext}>{t.loginData}</Text>
							<View style={styles.lline}></View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.email}
								onChangeText={(value) => this.setForm('email', value)}
								value={this.state.form.email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.password}
								secureTextEntry={true}
								onChangeText={(value) => this.setForm('password', value)}
								value={this.state.form.password}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.passwordConfirm}
								secureTextEntry={true}
								onChangeText={(value) => this.setForm('passwordConfirm', value)}
								value={this.state.form.passwordConfirm}
							/>
						</View>


						<View style={styles.formHR} />

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.region}
								onValueChange={(value) => this.setForm('region', value)}
								mode="dropdown">
								{data.regions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={item} />);
								}, this)}
							</Picker>
						</View>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.poisition}
								onValueChange={(value) => this.setForm('poisition', value)}
								mode="dropdown">
									<Picker.Item label="Position 1" value={0} />
									<Picker.Item label="Position 2" value={1} />
									<Picker.Item label="Position 3" value={2} />
							</Picker>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.phoneNumber}
								onChangeText={(value) => this.setForm('phoneNumber', value)}
								value={this.state.form.phoneNumber}
							/>
						</View>

						<View style={[styles.center]}>
							<TouchableOpacity
								onPress={() => this._submit()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={[styles.white, styles.inputText]}>{t.submit}</Text>
							</TouchableOpacity>

							<Text style={[styles.mt1, styles.textSM]}>{t.regRulesAgreement_1}</Text>
							<Text onPress={() => this.navigate('rules')} style={[styles.primary, styles.textSM]}>{t.regRulesAgreement_2}</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
