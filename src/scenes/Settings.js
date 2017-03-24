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

			form_name: '',
			form_surname: '',
			form_middleName: '',
			form_region: 0,
			form_poisition: 0,
			form_phone: '',
			form_language: 'en',
			form_oldPassword: '',
			form_newPassword: '',
			form_passwordConfirm: '',
		}
	}

	onValueChange (value: string) {
		this.setState({
			selected1 : value
		});
	}

	navigate(routeName, routeData) {
		Keyboard.dismiss();
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	_save() {
		Alert.alert(t.error, t.errorEmptyField);
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
								onChangeText={(value) => this.setState({form_name: value})}
								value={this.state.form_name}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.surname}
								onChangeText={(value) => this.setState({form_surname: value})}
								value={this.state.form_surname}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.middleName}
								onChangeText={(value) => this.setState({form_middleName: value})}
								value={this.state.form_middleName}
							/>
						</View>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form_region}
								onValueChange={(value) => { this.setState({form_region: value}) }}
								mode="dropdown">
								{data.regions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={item} />);
								}, this)}
							</Picker>
						</View>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form_poisition}
								onValueChange={(value) => { this.setState({form_poisition: value}) }}
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
								onChangeText={(value) => this.setState({form_phone: value})}
								value={this.state.form_phone}
							/>
						</View>

						<Text style={[styles.inputLabel, styles.textCenter]}>{t.selectLanguage}</Text>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form_language}
								onValueChange={(value) => { this.setState({form_language: value}) }}
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
								onChangeText={(value) => this.setState({form_oldPassword: value})}
								value={this.state.form_oldPassword}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.newPassword}
								secureTextEntry={true}
								onChangeText={(value) => this.setState({form_newPassword: value})}
								value={this.state.form_newPassword}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.passwordConfirm}
								secureTextEntry={true}
								onChangeText={(value) => this.setState({form_passwordConfirm: value})}
								value={this.state.form_passwordConfirm}
							/>
						</View>

						<View style={[styles.center, styles.inputOffsetB]}>
							<TouchableOpacity
								onPress={() => this._save()}
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
