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


var regions = [
	{id: 0, title: 'Регион'},
	{id: 1, title: 'Киев'},
	{id: 2, title: 'Харьков'},
	{id: 3, title: 'Днепр'},
];


export default class SellerRegistration extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: undefined,
			selected1: 'key1',
			results: {
				items: []
			},
			selectedRegion: 0
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
								<Text style={styles.lrt}>торгового</Text>
								<Text style={styles.lrt}>представителя</Text>
							</View>
						</View>

						<View style={[styles.textInput, styles.inputDefault]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.name}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.surname}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.middleName}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder="Торговая точка"
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.phoneNumber}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder="Желаемый сертификат"
							/>
						</View>

						<View style={[styles.center, styles.mt2]}>
							<TouchableOpacity
								activeOpacity={75 / 100}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={styles.white}>{t.submit}</Text>
							</TouchableOpacity>
						</View>

						<View style={[styles.center, styles.last, styles.mt2]}>
							<Text style={styles.mt1}>* Поля обязательны к заполнению</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}