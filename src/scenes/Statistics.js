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
			sellers: dataset.cloneWithRows([]),
			months: []
		};
	};

	componentDidMount() {
		AsyncStorage.getItem('access_token',(error, result) => {
			this.fetch(result);
		});
	}

	fetch(token) {
		fetch(settings.domain+'/api/sellers', {
			method: "GET",
			headers: {
				'Authorization': 'Bearer '+token
			}
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				this.prepareData(data.data);
			}else{
				if(data.code && data.message){
					Alert.alert(t.error.error, t.message.errorCode+': '+data.code+'\n'+t.message.errorDescription+': '+data.message);
				}else{
					Alert.alert(t.error.error, t.error.serverError);
				}
			}
		})
		.done();
	}

	prepareData(array){
		var sellers = [];
		var months_indexes = {};

		var sellers = array.map((item, index) => {
			var monthly = item.balance_per_months.monthly;
			for (var i = 0; i < monthly.length; i++) {
				months_indexes[monthly[i].month] = 1;
			}
			//var date = new Date(item.created_at);
			//(date.getDate()+' '+d.months[date.getMonth()]+' '+date.getFullYear())
			//console.log(date);
			var dt = item.created_at.substring(0, 10).split('-');
			var date = dt[2]+' '+d.months[parseInt(dt[1])-1]+' '+dt[0];

			return {
				id: item.id,
				name: item.first_name+" "+item.last_name,
				registered: date,
				total: item.balance,
				monthly: monthly
			}
		});
		this.setState({
			sellers: dataset.cloneWithRows(sellers),
			months: Object.keys(months_indexes)
		});
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
				<Text style={[styles.td, {flex: 0.5}]}>{item.name}</Text>
				<Text style={[styles.tdb, {flex: 0.4}]}>{item.registered}</Text>
				{this.state.months.map((item,index) => {
					return <Text key={index} style={[styles.tdb, {flex: 0.25}]}>{item.monthly[index].total}</Text>;
				})}
				<Text style={[styles.tdb, {flex: 0.25}]}>{item.total}</Text>
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

					<View style={styles.tr}>
						<Text style={[styles.th, {flex: 0.5, textAlign: 'left'}]}>{t.form.name}</Text>
						<Text style={[styles.th, {flex: 0.4}]}>{t.regDate}</Text>
						{this.state.months.map((item,index) => {
							return <Text key={index} style={[styles.th, {flex: 0.25}]}>{d.months[item]}</Text>;
						})}
						<Text style={[styles.th, {flex: 0.25}]}>{t.bonuses}</Text>
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
