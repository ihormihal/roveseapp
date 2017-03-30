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

//import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import d from './../Data';
import settings from './../Settings';


export default class Settings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form: this.props.data
		}
	}

	setForm(key, value) {
		var form = this.state.form;
		form[key] = value;
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
		if(this.state.form.name && this.state.form.surname && this.state.form.email && this.state.form.phone){
			if(this.state.form.email.indexOf('@') == -1){
				Alert.alert(t.error.error, t.error.email);
				return false;
			}else if(this.state.form.phone.length !== 12){
				Alert.alert(t.error.error, t.error.phone);
				return false;
			}else if(this.state.form.password){
				if(this.state.form.password.length < 6){
					Alert.alert(t.error.error, t.error.password);
					return false;
				}
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

	fetch(token){
		var formData = {
			firstName: this.state.form.name,
			lastName: this.state.form.surname,
			middleName: this.state.form.middleName,
			region: this.state.form.region,
			position: this.state.form.position,
			phoneNumber: this.state.form.phone,
			current_password: this.state.form.oldPassword,
			plain_password: this.state.form.password
		};
		//console.log(settings.serialize(formData));
		fetch(settings.domain+'/api/profile', {
			method: 'PATCH',
			headers: {
				'Authorization': 'Bearer '+token,
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			body: settings.serialize(formData)
		})
		.then((response) => response.json())
		.then((data) => {
			//console.log(data);
			if(data.status == 'success'){
				Alert.alert(t.message.done, t.message.dataUpdated, [{text: 'OK', onPress: () => this.navigate('root')}]);
			}else{
				if(data.code && data.message){
					Alert.alert(t.error.error, t.message.errorCode+': '+data.code+'\n'+t.message.errorDescription+': '+data.message);
				}else{
					Alert.alert(t.error.error, t.error.serverError);
				}
			}
		})
		.done();
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
					<View style={styles.headerRight}>
					</View>
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
								onChangeText={(value) => this.setForm('surname', value)}
								value={this.state.form.surname}
							/>
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

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<Text style={styles.required}>*</Text>
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
							<Text style={styles.required}>*</Text>
							<Picker
								style={styles.picker}
								selectedValue={parseInt(this.state.form.region)}
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
								selectedValue={parseInt(this.state.form.position)}
								onValueChange={(value) => this.setForm('position', value)}
								mode="dropdown">
								{d.positions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={index} />);
								}, this)}
							</Picker>
						</View>

						<Text style={[styles.inputLabel, styles.textCenter]}>{t.form.passwordEdit}</Text>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.oldPassword}
								secureTextEntry={true}
								onChangeText={(value) => this.setForm('oldPassword', value)}
								value={this.state.form.oldPassword}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.newPassword}
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

						<View style={[styles.center, styles.inputOffsetB]}>
							<TouchableOpacity
								onPress={() => this._submit()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={[styles.white, styles.inputText]}>{t.btn.save}</Text>
							</TouchableOpacity>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
