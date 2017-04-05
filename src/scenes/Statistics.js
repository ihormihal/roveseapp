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
	Keyboard
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
			//language: this.props.lang,
			search: '',
			data: [],
			sellersRows: dataset.cloneWithRows([]),
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
			//console.log(data);
			if(data.status == "success"){
				this.setState({
					data: data.data
				});
				this.parseSellers();
			}else{
				if(data.code && data.message){
					Alert.alert(t.error.error, t.message.errorCode+': '+data.code+'\n'+t.message.errorDescription+': '+data.message);
				}else{
					Alert.alert(t.error.error, t.error.serverError);
				}
			}
		})
		.catch((error) => {
			Alert.alert(t.error.error, t.error.offline);
		});
	}

	parseSellers(){
		var months_indexes = {};
		var sellers = [];

		for (var index = 0, item; item = this.state.data[index]; index++){
			var monthly = item.balance_per_months.monthly;
			for (var i = 0; i < monthly.length; i++) {
				months_indexes[monthly[i].month] = parseInt(monthly[i].month);
			}
			var name = item.first_name+" "+item.last_name;

			if(this.state.search.length > 2){
				if(name.indexOf(this.state.search) == -1){
					continue;
				}
			}

			sellers.push({
				id: item.id,
				name: name,
				registered: settings.dateConv(item.created_at),
				total: item.balance,
				monthly: monthly
			});
		}

		var months = [];
		for(var monthIndex in months_indexes){
			months.push(months_indexes[monthIndex]);
		}

		this.setState({
			sellersRows: dataset.cloneWithRows(sellers),
			months: months
		});
	}

	search(value){
		this.setState({search: value});
		this.parseSellers();
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
				<Text style={[styles.td, {flex: 0.5, textAlign: 'center'}]}>{item.name}</Text>
				<Text style={[styles.td, styles.tdb, {flex: 0.4, textAlign: 'center'}]}>{item.registered}</Text>
				{this.state.months.map((number,index) => {
					return (<View key={index} style={[styles.td, styles.tdb, {flex: 0.25}]}>
						<Text key={index}>{item.monthly[index].total}</Text>
						<View style={styles.checkbox}></View>
					</View>);
				})}
				<Text style={[styles.td, styles.tdb, {flex: 0.25, textAlign: 'center'}]}>{item.total}</Text>
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
				<View style={[styles.box]}>
					<View style={styles.center}>
						<Text style={[styles.textMD, styles.primary, styles.textCenter]}>{t.title.sellerBase}</Text>
						<View style={styles.hr} />
					</View>

					<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							placeholder={t.form.name}
							autoCorrect={false}
							onChangeText={(value) => this.search(value)}
							value={this.state.search}
							returnKeyType="search"
						/>
					</View>
				</View>

				<View style={styles.tr}>
					<Text style={[styles.th, {flex: 0.5}]}>{t.form.name}</Text>
					<Text style={[styles.th, {flex: 0.4}]}>{t.regDate}</Text>
					{this.state.months.map((item,index) => {
						return <Text key={index} style={[styles.th, {flex: 0.25}]}>{d.months[item]}</Text>;
					})}
					<Text style={[styles.th, {flex: 0.25}]}>{t.summ}</Text>
				</View>

				<ListView
					enableEmptySections={true}
					dataSource={this.state.sellersRows}
					renderRow={(rowData) => this.renderListItem(rowData)}
				/>
			</View>
		);
	}


};
