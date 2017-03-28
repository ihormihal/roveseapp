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
	ListView,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';

export default class Statistics extends Component {

	constructor(props) {
		super(props);
		const dataset = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			sellers: dataset.cloneWithRows([
				{
					id: 1,
					name: 'Злата Новикова',
					date: '05.01.15',
					bonus: 160,
					total: 900
				}
			])
		};
	};

	componentDidMount() {
		fetch('http://rovese.jaya-test.com/api/stats', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.form)
		})
		.then((response) => response.json())
		.then((responseData) => {
			// this.setState({
			// 	sellers: responseData
			// })
		})
		.done();
	}

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	renderListItem(item) {
		return (
			<TouchableOpacity style={styles.cols} onPress={() => this.navigate('seller', {id: item.id})}>
				<Text style={styles.col}>{item.name}</Text>
				<Text style={styles.col}>{item.date}</Text>
				<Text style={styles.col}>{item.bonus}</Text>
				<Text style={styles.col}>{item.total}</Text>
			</TouchableOpacity>
		)
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
				<View style={[styles.container]}>
					<View style={styles.center}>
						<Text style={[styles.textMD, styles.primary, styles.textCenter]}>{t.sellerBase}</Text>
						<View style={styles.hr} />
					</View>
					<ListView
						dataSource={this.state.sellers}
						renderRow={(rowData) => this.renderListItem(rowData)}
					/>
				</View>
			</View>
		);
	}


};
