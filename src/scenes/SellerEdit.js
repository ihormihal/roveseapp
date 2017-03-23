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

export default class SellerEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: undefined,
			selected1: 'key1',
			results: {
				items: []
			},

			form_name: 'Злата',
			form_surname: 'Новикова',
			form_middleName: '',
			form_email: 'zlata@tets.com',
			form_phone: '+380509999999',
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

	render() {

		return (
			<View style={styles.scene}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.props.navigator.pop()}>
							<Icon style={[styles.btnIcon, styles.textSM, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.textSM, styles.primary]}>{t.back}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerCenter} />
					<View style={styles.headerRight} />
				</View>
				<ScrollView style={styles.scroll}>

					<View style={styles.container}>

						<Text style={[styles.inputLabel, styles.textCenter]}>{t.edit_profile}</Text>

						<View style={[styles.textInput, styles.inputDefault]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.name}
								onChangeText={(value) => this.setState({form_name: value})}
								value={this.state.form_name}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.surname}
								onChangeText={(value) => this.setState({form_surname: value})}
								value={this.state.form_surname}
							/>
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

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.email}
								onChangeText={(value) => this.setState({form_email: value})}
								value={this.state.form_email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
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

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.phoneNumber}
								onChangeText={(value) => this.setState({form_phone: value})}
								value={this.state.form_phone}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
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

						<View style={[styles.center, styles.mt2]}>
							<TouchableOpacity
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={styles.white}>{t.save}</Text>
							</TouchableOpacity>
						</View>

						<View style={[styles.center, styles.last, styles.mt2]}>
							<Text style={styles.mt1}>* {t.requiredFields}</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}
