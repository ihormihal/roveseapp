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
				<View style={styles.header}>
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

					<Text style={[styles.inputLabel]}>{t.enterEmail}</Text>
					<View style={[styles.textInput, styles.inputDefault]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							placeholder={t.email}
							onChangeText={(email) => this.setState({email: email})}
							value={(this.state && this.state.email) || ''}
						/>
					</View>


					<Text style={[styles.inputLabel, styles.textCenter, styles.mt1, styles.mb1, styles.primary]}>{t.or}</Text>

					<Text style={[styles.inputLabel]}>{t.phoneNumber}</Text>
					<View style={[styles.textInput, styles.inputDefault]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							placeholder={t.phone}
							onChangeText={(phone) => this.setState({phone: phone})}
							value={(this.state && this.state.phone) || ''}
						/>
					</View>

					<View style={[styles.center, styles.mt2]}>
						<TouchableOpacity
							activeOpacity={75 / 100}
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
							<Text style={styles.white}>{t.change}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</View>
		);
	}


};
