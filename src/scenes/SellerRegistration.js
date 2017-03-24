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

export default class SellerRegistration extends Component {

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
			form_tradePoint: 0,
			form_sertifivate: 0,
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

	_save() {
		if(this.state.form_name && this.state.form_surname && this.state.form_middleName && this.state.form_email){
			Alert.alert(t.done, t.data_send, [{text: 'OK', onPress: () => this.navigate('seller')}]);
		}else{
			Alert.alert(t.error, t.errorEmptyField);
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
							<Text style={[styles.primary]}>{t.back}</Text>
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
								<Text style={styles.logoTitleText2}>{t.logoSeller}</Text>
								<Text style={styles.logoTitleText2}>{t.logoMember}</Text>
							</View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.name}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.surname}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.middleName}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form_tradePoint}
								onValueChange={(value) => { this.setState({form_tradePoint: value}) }}
								mode="dropdown">
									<Picker.Item label="Point 1" value={0} />
									<Picker.Item label="Point 2" value={1} />
									<Picker.Item label="Point 3" value={2} />
							</Picker>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.phoneNumber}
							/>
						</View>

						<View style={[styles.textInput, styles.inputPickerDefault, styles.inputOffsetB]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.form_sertifivate}
								onValueChange={(value) => { this.setState({form_sertifivate: value}) }}
								mode="dropdown">
									<Picker.Item label="Sertificate 1" value={0} />
									<Picker.Item label="Sertificate 2" value={1} />
									<Picker.Item label="Sertificate 3" value={2} />
							</Picker>
						</View>

						<View style={[styles.center, styles.inputOffsetB]}>
							<TouchableOpacity
								onPress={() => this._save()}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={[styles.white, styles.inputText]}>{t.submit}</Text>
							</TouchableOpacity>
						</View>

						<View style={[styles.center, styles.last]}>
							<Text style={[styles.mt1, styles.textMD]}>* {t.requiredFields}</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
