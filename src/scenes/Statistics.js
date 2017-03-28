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
			sellers: dataset.cloneWithRows([])
		};
	};

	componentDidMount() {
		fetch('https://raw.githubusercontent.com/ihormihal/roveseapp/master/api/statistics.json', {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				this.setState({
					sellers: dataset.cloneWithRows(data.data)
				});
			}else{
				//Alert(t.error, data.message);
			}
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
