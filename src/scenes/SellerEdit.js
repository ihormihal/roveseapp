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
import settings from './../Settings';

export default class SellerEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form: this.props.data,

			// form: {
			// 	id: 1,
			// 	name: 'Злата',
			// 	surname: 'Новикова',
			// 	middleName: '',
			// 	email: 'zlata@tets.com',
			// 	phone: '+380509999999',
			// 	tradePoint: '',
			// 	sertifiсate: 0,
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

	navigate(routeName, routeData) {
		Keyboard.dismiss();
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	valid() {
		if(this.state.form.name && this.state.form.surname && this.state.form.middleName && this.state.form.email){
			if(this.state.form.email.indexOf('@') == -1){
				Alert.alert(t.error.error, t.error.email);
				return false;
			}
			return true;
		}else{
			Alert.alert(t.error.error, t.error.empty);
			return false;
		}
	}

	_submit() {
		if(this.valid){
			fetch(settings.api.success, {
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
				if(data.status == "success"){
					this.props.navigator.pop();
				}else{
					Alert.alert(t.error.error, data.message);
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
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.name}
								onChangeText={(value) => this.setForm('name', value)}
								value={this.state.form.name}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
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
								placeholder={t.form.tradePoint}
								onChangeText={(value) => this.setForm('tradePoint', value)}
								value={this.state.form.tradePoint}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.phoneNumber}
								onChangeText={(value) => this.setForm('phone', value)}
								value={this.state.form.phone}
							/>
						</View>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form.sertifiсate}
								onValueChange={(value) => this.setForm('sertifiсate', value)}
								mode="dropdown">
								{data.sertificates.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={index} />);
								}, this)}
							</Picker>
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
