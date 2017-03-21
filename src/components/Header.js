import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StatusBar,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';


export default class Header extends Component {

	constructor(props) {
		super(props);
	};

	render() {
		var logo = null;
		var style = [styles.header];
		if(this.props.showLogo == "false"){
			logo = <View style={styles.headerCenter} />;
		}else{
			logo = (
				<View style={styles.headerCenter}>
					<Image
						style={styles.logoHeader}
						source={require('./../images/logo-header.png')}
					/>
				</View>
			);
		}
		if(this.props.shadow == "true"){
			style.push(styles.shadow);
		}
		if(this.props.opacity == "light"){
			style.push({backgroundColor: 'rgba(0,0,0,0.1)'});
		}
		if(this.props.opacity == "dark"){
			style.push({backgroundColor: 'rgba(0,0,0,0.5)'});
		}
		return (
			<View style={style}>
				<View style={styles.headerLeft}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => this.props.onButtonPress()}>
						<Icon style={[styles.btnIcon, styles.primary]} size={20} name={this.props.buttonIcon}/>
						<Text style={[styles.btnText, styles.primary]}>{this.props.buttonText}</Text>
					</TouchableOpacity>
				</View>
				{logo}
				<View style={styles.headerRight} />
			</View>
		)
	}
}

