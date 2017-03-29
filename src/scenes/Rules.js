import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	View,
	ScrollView,
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

//Правила користування та захисту інформації

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
						<View style={styles.center}>
							<Text style={[styles.textMD, styles.primary, styles.textCenter]}>{t.title.rules}</Text>
							<View style={styles.hr} />
						</View>

						<Text>1. {t.rules.t1}</Text>
						<Text>1.1. {t.rules.p11}</Text>
						<Text>1.2. {t.rules.p12}</Text>

						<Text>2. {t.rules.t2}</Text>
						<Text>2.1. {t.rules.p21}</Text>
						<Text>2.2. {t.rules.p22}</Text>
						<Text>2.3. {t.rules.p23}</Text>
						<Text>2.4. {t.rules.p24}</Text>
						<Text>2.5. {t.rules.p25}</Text>
						<Text>2.6. {t.rules.p26}</Text>

						<Text>3. {t.rules.t3}</Text>
						<Text>3.1. {t.rules.p31}</Text>
						<Text>3.2. {t.rules.p32}</Text>
						<Text>3.3. {t.rules.p33}</Text>

						<Text>4. {t.rules.t4}</Text>
						<Text>4.1. {t.rules.p41}</Text>
						<Text>4.2. {t.rules.p42}</Text>
						<Text>4.3. {t.rules.p43}</Text>

						<Text>5. {t.rules.t5}</Text>
						<Text>5.1. {t.rules.p51}</Text>
						<Text>5.2. {t.rules.p52}</Text>
						<Text>5.3. {t.rules.p53}</Text>

					</View>

				</ScrollView>

			</View>
		);
	}


};
