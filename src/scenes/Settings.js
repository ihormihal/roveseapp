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


export default class Settings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: undefined,
			selected1: 'key1',
			results: {
				items: []
			},

			//form: this.props.data

			form: {
				name: '',
				surname: '',
				middleName: '',
				region: 0,
				poisition: 0,
				phone: '',
				language: 'en',
				oldPassword: '',
				password: '',
				passwordConfirm: '',
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
				if(data.status == 'success'){
					Alert.alert(t.done, 'success', [{text: 'OK', onPress: () => this.navigate('root')}]);
				}else{
					Alert(t.error, data.message);
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

				<ScrollView style={styles.scroll}>

					<View style={styles.container}>

						<Text style={[styles.inputLabel, styles.textCenter]}>Редактировать профиль</Text>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.name}
								onChangeText={(value) => this.setForm('name', value)}
								value={this.state.form.name}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.surname}
								onChangeText={(value) => this.setForm('surname', value)}
								value={this.state.form.surname}
							/>
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
								onValueChange={(value) => this.setForm('region', value)}
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
								onChangeText={(value) => this.setForm('phone', value)}
								value={this.state.form.phone}
							/>
						</View>

						<Text style={[styles.inputLabel, styles.textCenter]}>{t.selectLanguage}</Text>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.language}
								onValueChange={(value) => this.setForm('region', value)}
								mode="dropdown">
								<Picker.Item label="English" value="en" />
								<Picker.Item label="Русский" value="ru" />
								<Picker.Item label="Украинский" value="uk" />
							</Picker>
						</View>

						<Text style={[styles.inputLabel, styles.textCenter]}>{t.passwordEdit}</Text>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.oldPassword}
								secureTextEntry={true}
								onChangeText={(value) => this.setForm('oldPassword', value)}
								value={this.state.form.oldPassword}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.newPassword}
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

						<View style={[styles.center, styles.inputOffsetB]}>
							<TouchableOpacity
								onPress={() => this._submit()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={[styles.white, styles.inputText]}>{t.save}</Text>
							</TouchableOpacity>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
