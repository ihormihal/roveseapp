import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';

import { InputText } from './../components/Form';

export default class PasswordReset extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phone: ''
		};
	};

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
					<View style={styles.headerCenter}>
						<Image
							style={[ styles.logoHeader ]}
							source={require('./../images/logo-header.png')}
						/>
					</View>
					<View style={styles.headerRight}>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.center}>
						<Text style={[styles.h2]}>{t.passwordRecovery.toUpperCase()}</Text>
						<View style={styles.hr} />
					</View>

					<InputText
						label={t.enterEmail}
						placeholder={t.email}
						value=""
						onInputChange={(value) => this.setState({email: value})}
					/>

					<Text style={[styles.inputLabel, styles.textCenter, styles.textDivider, styles.primary]}>{t.or}</Text>

					<InputText
						label={t.phoneNumber}
						placeholder={t.phone}
						value=""
						onInputChange={(value) => this.setState({phone: value})}
					/>

					<View style={[styles.center, styles.mt2]}>
						<TouchableOpacity
							onPress={() => Alert.alert(
								'',
								'На Ваш почтовый ящик отправлено письмо с новым паролем!',
								[{text: 'OK', onPress: () => this.props.navigator.pop() }]
							)}
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
							<Text style={styles.white}>{t.change}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</View>
		);
	}


};
