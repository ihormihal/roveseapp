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
			months: [],
			token: '',
		};
	};

	componentDidMount() {
		AsyncStorage.getItem('access_token',(error, result) => {
			this.setState({token: result});
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
				if(name.toLowerCase().indexOf(this.state.search.toLowerCase()) == -1){
					continue;
				}
			}

			//var date = new Date(item.created_at);
			//var registered = (date.getDate()+' '+d.months[date.getMonth()]+' '+date.getFullYear());

			var date = item.created_at;
			try {
				var dt = date.substring(0, 10).split('-');
				date = dt[2]+' '+d.months[parseInt(dt[1])-1]+' '+dt[0];
			} catch (error) {
				//console.log(error)
			}

			sellers.push({
				id: item.id,
				name: name,
				created_at: item.created_at,
				registered: date,
				total: item.balance,
				monthly: monthly
			});
		}

		function compare(a, b) {
		    if (a.created_at > b.created_at)
		        return -1;
		    if (a.created_at < b.created_at)
		        return 1;
		    return 0;
		}

		sellers.sort(compare);


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

	_paidStatus(id, month) {
		var sellers = this.state.data;
		for (let i = 0; i < sellers.length; i++) {
			if(sellers[i].id == id){
				if(sellers[i].balance_per_months){
					let monthly = sellers[i].balance_per_months.monthly;
					for (let j = 0; j < monthly.length; j++) {
						if(monthly[j].month == month){
							monthly[j].status = "paid";
						}
					}
					sellers[i].balance_per_months.monthly = monthly;
				}
			}	
		}
		this.setState({
			data: sellers
		});
		this.parseSellers();
	}

	_payMonth(id, index){
		fetch(settings.domain+'/api/paids/sellers/set', {
			method: "PUT",
			headers: {
				'Authorization': 'Bearer '+this.state.token
			},
			body: settings.serialize({
				id: id,
				month: index,
			})
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				//this._paidStatus(id, index);
			}else{
				this._paidStatus(id, index);
				Alert.alert(t.error.error, JSON.stringify(data));
			}
		})
		.catch((error) => {
			Alert.alert(t.error.error, t.error.offline);
		});
	}

	_payMonthAction(id, index){
		var monthName = d.months[index];
		var m = (new Date()).getMonth();
		if(index >= m+1){
			Alert.alert(t.error.error, t.error.month);
			return false;
		}
		Alert.alert(
		  t.message.confirmAction,
		  t.message.payConfirm+" "+monthName+"?",
		  [
		    {text: t.message.no, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		    {text: t.message.yes, onPress: () => this._payMonth(id, index)},
		  ],
		  { cancelable: false }
		)
	}

	renderListItem(item) {
		return (
			<View style={styles.tr} >
				<TouchableOpacity onPress={() => this.navigate('seller', {id: item.id})} style={[styles.td, {flex: 0.5}]}><Text>{item.name}</Text></TouchableOpacity>
				<Text style={[styles.td, styles.tdb, {flex: 0.4, textAlign: 'center'}]}>{item.registered}</Text>
				{this.state.months.map((number,index) => {
					var month = item.monthly[index];
					var total = month ? month.total : 0;
					var checkboxStyle = month.status == 'paid' ? [styles.checkbox, styles.checkboxChecked] : [styles.checkbox];
					return (<View key={index} style={[styles.td, styles.tdb, {flex: 0.25}]}>
						<Text key={index}>{total}</Text>
						<TouchableOpacity onPress={() => this._payMonthAction(item.id, month.month)} style={checkboxStyle}></TouchableOpacity>
					</View>);
				})}
				<Text style={[styles.td, styles.tdb, {flex: 0.25, textAlign: 'center'}]}>{item.total}</Text>
			</View>
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

					<View style={[styles.textInput, styles.inputDefault]}>
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
