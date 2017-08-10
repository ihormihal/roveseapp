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

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import d from './../Data';
import settings from './../Settings';



export default class SellerEdit extends Component {

	constructor(props) {
		super(props);
		var form = this.props.data;
		if(!form.program){
			form.program = {BSD: false, F: false};
		}
		this.state = {
			language: this.props.lang,
			form: form,

			// form: {
			// 	id: 1,
			// 	name: 'Злата',
			// 	surname: 'Новикова',
			// 	middleName: '',
			// 	email: 'zlata@tets.com',
			// 	phone: '+380509999999',
			// 	tradePoint: '',
			// 	certificate: 0,
			// }
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
		var program = this.state.form.program;
		program[key] = !program[key];
		this.setForm('program', program);
	}

	navigate(routeName, routeData) {
		Keyboard.dismiss();
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	valid() {
		if(this.state.form.name && this.state.form.surname && this.state.form.email && this.state.form.phone && this.state.form.tradePoint){
			if(!settings.valid.email(this.state.form.email)){
				Alert.alert(t.error.error, t.error.email);
				return false;
			}else if(this.state.form.phone.length !== 12){
				Alert.alert(t.error.error, t.error.phone);
				return false;
			}
			return true;
		}else{
			console.log(this.state.form);
			Alert.alert(t.error.error, t.error.empty);
			return false;
		}
	}

	fetch(token){
		var sellerID = parseInt(this.props.data.id);
		var formData = {
			phone: this.state.form.phone,
			email: this.state.form.email,
			firstName: this.state.form.name,
			lastName: this.state.form.surname,
			middleName: this.state.form.middleName,
			tradePoint: this.state.form.tradePoint,
			certificate: this.state.form.certificate,
			program: this.state.form.program,
		};
		fetch(settings.domain+'/api/sellers/'+sellerID, {
			method: "PATCH",
			headers: {
				'Authorization': 'Bearer '+token,
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			body: settings.serialize(formData)
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if(data.status == "success"){
				this.props.navigator.pop();
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
					<View style={styles.headerRight} />
				</View>
				<ScrollView style={styles.scroll}>

					<View style={styles.container}>

						<Text style={[styles.inputLabel, styles.textCenter]}>{t.title.editProfile}</Text>

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
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}
								onPress={() => this._submit()}>
								<Text style={[styles.white, styles.inputText]}>{t.btn.save}</Text>
							</TouchableOpacity>
						</View>

						<View style={[styles.center, styles.last]}>
							<Text style={styles.textMD}>* {t.form.requiredFields}</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
