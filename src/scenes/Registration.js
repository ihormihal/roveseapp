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
			form: {
				name: '',
				surname: '',
				middleName: '',
				email: '',
				password: '',
				passwordConfirm: '',
				region: 0,
				position: 0,
				phone: '',
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
		if(this.state.form.name && this.state.form.surname && this.state.form.middleName && this.state.form.email && this.state.form.phone && this.state.form.password && this.state.form.passwordConfirm){
			if(this.state.form.email.indexOf('@') == -1){
				Alert.alert(t.error.error, t.error.email);
				return false;
			}else if(this.state.form.password !== this.state.form.passwordConfirm){
				Alert.alert(t.error.error, t.error.passwordConfirm);
				return false;
			}
			return true;
		}else{
			Alert.alert(t.error.error, t.error.empty);
			return false;
		}
	}

	_submit() {
		if(this.valid()){
			fetch('https://raw.githubusercontent.com/ihormihal/roveseapp/master/api/success.json', {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			})
			.then((response) => response.json())
			.then((data) => {
				if(data.status == "success"){
					Alert.alert(t.message.done, t.message.dataSent, [{text: 'OK', onPress: () => this.navigate('login')}]);
				}else{
					Alert(t.error.error, data.message);
				}
			})
			.done();
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
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.textSM, styles.primary]}>{t.btn.back}</Text>
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
								<Text style={styles.logoTitleText1}>{t.logo.registration}</Text>
								<Text style={styles.logoTitleText2}>{t.logo.regional}</Text>
								<Text style={styles.logoTitleText2}>{t.logo.member}</Text>
							</View>
						</View>

						<View style={[styles.cols, styles.inputOffsetB]}>
							<View style={[styles.col, styles.textInput, styles.inputDefault, styles.inputOffsetR]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.form.name}
									onChangeText={(value) => this.setForm('name', value)}
									value={this.state.form.name}
								/>
							</View>
							<View style={[styles.col, styles.textInput, styles.inputDefault]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.form.surname}
									onChangeText={(value) => this.setForm('surname', value)}
									value={this.state.form.surname}
								/>
							</View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.middleName}
								onChangeText={(value) => this.setForm('middleName', value)}
								value={this.state.form.middleName}
							/>
						</View>

						<View style={styles.legend}>
							<View style={styles.lline}></View>
							<Text style={styles.ltext}>{t.form.loginData}</Text>
							<View style={styles.lline}></View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.email}
								onChangeText={(value) => this.setForm('email', value)}
								value={this.state.form.email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.password}
								secureTextEntry={true}
								onChangeText={(value) => this.setForm('password', value)}
								value={this.state.form.password}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.passwordConfirm}
								secureTextEntry={true}
								onChangeText={(value) => this.setForm('passwordConfirm', value)}
								value={this.state.form.passwordConfirm}
							/>
						</View>


						<View style={styles.formHR} />

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.phoneNumber}
								onChangeText={(value) => this.setForm('phone', value)}
								value={this.state.form.phone}
							/>
						</View>

						<Text style={styles.inputLabel}>{t.form.region}</Text>
						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.region}
								onValueChange={(value) => this.setForm('region', value)}
								mode="dropdown">
								{data.regions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={index} />);
								}, this)}
							</Picker>
						</View>

						<Text style={styles.inputLabel}>{t.form.position}</Text>
						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.position}
								onValueChange={(value) => this.setForm('position', value)}
								mode="dropdown">
								{data.positions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={index} />);
								}, this)}
							</Picker>
						</View>


						<View style={[styles.center]}>
							<TouchableOpacity
								onPress={() => this._submit()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={[styles.white, styles.inputText]}>{t.btn.submit}</Text>
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
