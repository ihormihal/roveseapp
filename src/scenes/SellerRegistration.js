import React, { Component } from 'react';
import {
	AsyncStorage,
	ScrollView,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableOpacity,
	Picker,
	Item,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from "react-native-router-flux";

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import d from './../Data';
import settings from './../Settings';


export default class SellerRegistration extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
			form: {
				name: '',
				surname: '',
				middleName: '',
				email: '',
				phone: '',
				tradePoint: '',
				certificate: 0,
				program: { BSD: false, F: false}
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

	setProgram(key){
		let program = this.state.form.program;
		let value = program[key];
		program[key] = !value;
		this.setForm('program', program);
	}

	valid() {
		if(this.state.form.name && this.state.form.surname && this.state.form.email && this.state.form.phone && this.state.form.tradePoint && (this.state.form.program.BSD || this.state.form.program.F)){
			if(!settings.valid.email(this.state.form.email)){
				Alert.alert(t.error.error, t.error.email);
				return false;
			}else if(this.state.form.phone.length !== 12){
				Alert.alert(t.error.error, t.error.phone);
				return false;
			}
			return true;
		}else{
			Alert.alert(t.error.error, t.error.empty);
			return false;
		}
	}

	fetch(token){
		var formData = {
			phone: this.state.form.phone,
			email: this.state.form.email,
			firstName: this.state.form.name,
			lastName: this.state.form.surname,
			middleName: this.state.form.middleName,
			tradePoint: this.state.form.tradePoint,
			certificate: this.state.form.certificate,
			program: this.state.form.program
		};
		//console.log(formData);
		//console.log(settings.serialize(formData));
		fetch(settings.domain+'/api/sellers', {
			method: "POST",
			headers: {
				'Authorization': 'Bearer '+token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( formData )
		})
		.then((response) => response.json())
		.then((data) => {
			//console.log(data);
			if(data.status == "success"){
				if(data.data && data.data.id){
					Actions.seller({id: data.data.id});
				}else{
					Actions.statistics();
				}
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

	_submit() {
		if(this.valid()){
			AsyncStorage.getItem('access_token',(error, result) => {
				//console.log(result);
				this.fetch(result);
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
								<Text style={styles.logoTitleText2}>{t.logo.seller}</Text>
								<Text style={styles.logoTitleText2}>{t.logo.member}</Text>
							</View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
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

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<Text style={styles.required}>*</Text>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.surname}
								autoCorrect={false}
								onChangeText={(value) => this.setForm('surname', value)}
								value={this.state.form.surname}
							/>
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
								placeholder={t.form.tradePoint}
								autoCorrect={false}
								onChangeText={(value) => this.setForm('tradePoint', value)}
								value={this.state.form.tradePoint}
							/>
						</View>

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

						<Text style={styles.inputLabel}>{t.form.desiredCertificate}</Text>
						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Text style={styles.required}>*</Text>
							<Picker
								style={styles.picker}
								selectedValue={parseInt(this.state.form.certificate)}
								onValueChange={(value) => this.setForm('certificate', value)}
								mode="dropdown">
								{d.certificates.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={index} />);
								}, this)}
							</Picker>
						</View>

						<View style={[styles.row, styles.inputOffsetB]}>
							<View style={[styles.col, styles.inputCheckbox]}>
								<Text style={[styles.inputLabel, styles.inputLabelCheckbox]}>{t.programText}: {t.program.a}</Text>
								<TouchableOpacity onPress={() => this.setProgram('BSD')}>
									<Icon style={[styles.primary]} size={variables.INPUT_HEIGHT} name={this.state.form.program.BSD ? 'check-box' : 'check-box-outline-blank'}/>
								</TouchableOpacity>
							</View>
							<View style={[styles.col, styles.inputCheckbox]}>
								<Text style={[styles.inputLabel, styles.inputLabelCheckbox]}>{t.programText}: {t.program.c}</Text>
								<TouchableOpacity onPress={() => this.setProgram('F')}>
									<Icon style={[styles.primary]} size={variables.INPUT_HEIGHT} name={this.state.form.program.F ? 'check-box' : 'check-box-outline-blank'}/>
								</TouchableOpacity>
							</View>
						</View>

						<View style={[styles.center, styles.inputOffsetB]}>
							<TouchableOpacity
								onPress={() => this._submit()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={[styles.white, styles.inputText]}>{t.btn.submit}</Text>
							</TouchableOpacity>
						</View>

						<View style={[styles.center, styles.last]}>
							<Text style={[styles.mt1, styles.textMD]}>* {t.form.requiredFields}</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
