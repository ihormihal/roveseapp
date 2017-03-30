import React, { Component } from 'react';
import {
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

//import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import d from './../Data';
import settings from './../Settings';


const dataset = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Statistics extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
			sellers: dataset.cloneWithRows([])
		};
	};

	componentDidMount() {
		AsyncStorage.getItem('access_token',(error, result) => {
			this.fetch(result);
		});
	}

	fetch(token) {
		fetch(settings.api.statistics, {
			method: "GET",
			headers: {
				'Authorization': 'Bearer '+token
			}
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){

				var array = data.data;
				var sellers = [];
				for (var i = 0; i < array.length; i++) {
					let t = array[i].created_at.split('+');
					var date = new Date(t[0]);
					sellers.push({
						id: array[i].id,
						name: array[i].first_name+" "+array[i].last_name,
						registered: date.getDate()+' '+d.months[date.getMonth()]+' '+date.getFullYear()
					});
				}
				this.setState({
					sellers: dataset.cloneWithRows(sellers)
				});
			}else{
				//Alert(t.error.error, data.message);
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
			<TouchableOpacity style={styles.tr} onPress={() => this.navigate('seller', {id: item.id})}>
				<Text style={styles.td}>{item.name}</Text>
				<Text style={styles.tdb}>{item.registered}</Text>
				<Text style={styles.tdb}>{item.month}</Text>
				<Text style={styles.tdb}>{item.total}</Text>
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
				<View style={[styles.container]}>
					<View style={styles.center}>
						<Text style={[styles.textMD, styles.primary, styles.textCenter]}>{t.title.sellerBase}</Text>
						<View style={styles.hr} />
					</View>
					<ListView
						enableEmptySections={true}
						dataSource={this.state.sellers}
						renderRow={(rowData) => this.renderListItem(rowData)}
					/>
				</View>
			</View>
		);
	}


};
