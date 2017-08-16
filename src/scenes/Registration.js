import React, { Component } from 'react';
import {
	AsyncStorage,
	ScrollView,
	View,
	Text,
	Alert,
	Image,
	TextInput,
	TouchableOpacity,
	Picker,
	Item,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from "react-native-router-flux";

//import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import d from './../Data';
import settings from './../Settings';


export default class Registration extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
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

	//const api_url_signup = 'http://rovese.jaya-test.com/api/register';
	//http://192.168.1.11:3001/sessions/create

	valid() {
		if(this.state.form.name && this.state.form.surname && this.state.form.email && this.state.form.phone && this.state.form.password && this.state.form.passwordConfirm){
			if(!settings.valid.email(this.state.form.email)){
				Alert.alert(t.error.error, t.error.email);
				return false;
			}else if(this.state.form.phone.length !== 12){
				Alert.alert(t.error.error, t.error.phone);
				return false;
			}else if(this.state.form.password.length < 6){
				Alert.alert(t.error.error, t.error.password);
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
			var formData = {
				firstName: this.state.form.name,
				lastName: this.state.form.surname,
				middleName: this.state.form.middleName,
				email: this.state.form.email,
				plainPassword: this.state.form.password,
				region: this.state.form.region,
				position: this.state.form.position,
				phoneNumber: this.state.form.phone,
			};
			//console.log(settings.serialize(formData));
			fetch(settings.domain+'/api/register', {
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'Cookie': null
				},
				body: settings.serialize(formData)
			})
			.then((response) => response.json())
			.then((data) => {
				//console.log(data);
				//{msg, token}
				if(data.token){
					Alert.alert(t.message.done, t.message.dataSent, [{text: 'OK', onPress: () => Actions.login()}]);
				}else{
					if(data.code && data.message){
						Alert.alert(t.error.error, t.message.errorCode+': '+data.code+'\n'+t.message.errorDescription+': '+data.message);
					}else{
						let errors = data.data.children;
						if(errors.phone && errors.phone.errors){
							Alert.alert(t.error.error, t.error.phoneUsed);
						}else if(errors.email && errors.email.errors){
							Alert.alert(t.error.error, t.error.emailUsed);
						}else{
							Alert.alert(t.error.error, t.error.serverError);
						}
					}
				}
			})
			.catch((error) => {
				Alert.alert(t.error.error, t.error.offline);
			});
		}
	}

	render() {

		return (
			<View style={styles.scene}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => Actions.pop()}>
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
								<Text style={styles.required}>*</Text>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.form.name}
									autoCorrect={false}
									onChangeText={(value) => this.setForm('name', value)}
									value={this.state.form.name}
								/>
							</View>
							<View style={[styles.col, styles.textInput, styles.inputDefault]}>
								<Text style={styles.required}>*</Text>
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
								autoCorrect={false}
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
							<Text style={styles.required}>*</Text>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.email}
								keyboardType="email-address"
								onChangeText={(value) => this.setForm('email', value)}
								value={this.state.form.email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<Text style={styles.required}>*</Text>
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
							<Text style={styles.required}>*</Text>
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
							<Text style={styles.required}>*</Text>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.phoneNumber}
								keyboardType='phone-pad'
								onChangeText={(value) => this.setForm('phone', value)}
								value={this.state.form.phone}
							/>
						</View>

						<Text style={styles.inputLabel}>{t.form.region}</Text>
						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Text style={styles.required}>*</Text>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.region}
								onValueChange={(value) => this.setForm('region', value)}
								mode="dropdown">
								{d.regions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={index} />);
								}, this)}
							</Picker>
						</View>

						<Text style={styles.inputLabel}>{t.form.position}</Text>
						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Text style={styles.required}>*</Text>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.position}
								onValueChange={(value) => this.setForm('position', value)}
								mode="dropdown">
								{d.positions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={index} />);
								}, this)}
							</Picker>
						</View>


						<View style={[styles.center, styles.last]}>
							<TouchableOpacity
								onPress={() => this._submit()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={[styles.white, styles.inputText]}>{t.btn.submit}</Text>
							</TouchableOpacity>

							<Text style={[styles.mt1, styles.textSM]}>{t.regRulesAgreement_1}</Text>
							<Text onPress={() => Actions.rules()} style={[styles.primary, styles.textSM]}>{t.regRulesAgreement_2}</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
