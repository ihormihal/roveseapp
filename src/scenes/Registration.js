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
	Item
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

			form_name: '',
			form_surname: '',
			form_middleName: '',
			form_email: '',
			form_password: '',
			form_passwordConfirm: '',
			form_region: 0,
			form_position: '',
			form_phoneNumber: '',
		}
	}

	onValueChange (value: string) {
		this.setState({
			selected1 : value
		});
	}

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	_signUp() {
		Alert.alert('Готово!', 'Ваши данные отправлены на валидацию.', [{text: 'OK', onPress: () => this.navigate('login')}])
	}

	render() {

		return (
			<View style={styles.scene}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.props.navigator.pop()}
							activeOpacity={75 / 50}>
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.btnText, styles.primary]}>{t.back}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerCenter} />
					<View style={styles.headerRight} />
				</View>
				<ScrollView style={styles.scroll}>

					<View style={styles.container}>

						<View style={styles.logoTitle}>
							<Image
								style={[ styles.logoHeader ]}
								source={require('./../images/logo-blue.png')}
							/>
							<View style={styles.logoRightText}>
								<Text style={styles.lrtBig}>Регистрация</Text>
								<Text style={styles.lrt}>регионального</Text>
								<Text style={styles.lrt}>представителя</Text>
							</View>
						</View>

						<View style={styles.cols}>
							<View style={[styles.col, styles.textInput, styles.inputDefault, styles.mr1]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.name}
									onChangeText={(value) => this.setState({form_name: value})}
									value={this.state.form_name}
								/>
							</View>
							<View style={[styles.col, styles.textInput, styles.inputDefault]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.surname}
									onChangeText={(value) => this.setState({form_surname: value})}
									value={this.state.form_surname}
								/>
							</View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.middleName}
								onChangeText={(value) => this.setState({form_middleName: value})}
								value={this.state.form_middleName}
							/>
						</View>

						<View style={styles.legend}>
							<View style={styles.lline}></View>
							<Text style={styles.ltext}>{t.loginData}</Text>
							<View style={styles.lline}></View>
						</View>

						<View style={[styles.textInput, styles.inputDefault]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.email}
								onChangeText={(value) => this.setState({form_email: value})}
								value={this.state.form_email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.password}
								secureTextEntry={true}
								onChangeText={(value) => this.setState({form_password: value})}
								value={this.state.form_password}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.passwordConfirm}
								secureTextEntry={true}
								onChangeText={(value) => this.setState({form_passwordConfirm: value})}
								value={this.state.form_passwordConfirm}
							/>
						</View>


						<View style={styles.hr} />

						<View style={[styles.textInput, styles.inputDefault]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form_region}
								onValueChange={this.onValueChange.bind(this, 'selected2')}
								onValueChange={(value) => { this.setState({form_region: value}) }}
								mode="dropdown">
								{data.regions.map((item, index) => {
									return (<Picker.Item key={index} label={item} value={item} />);
								}, this)}
							</Picker>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.position}
								onChangeText={(value) => this.setState({form_position: value})}
								value={this.state.form_position}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.phoneNumber}
								onChangeText={(value) => this.setState({form_phoneNumber: value})}
								value={this.state.form_phoneNumber}
							/>
						</View>

						<View style={[styles.center, styles.mt2]}>
							<TouchableOpacity
								onPress={() => this._signUp()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={styles.white}>{t.submit}</Text>
							</TouchableOpacity>

							<Text style={styles.mt1}>Регистрируясь в Retail Club, вы принимаете</Text>
							<Text onPress={() => this.navigate('rules')} style={styles.primary}>Правила пользования и зашиты информации</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}