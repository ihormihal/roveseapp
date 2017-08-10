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
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import d from './../Data';
import settings from './../Settings';


var backgroundImage = require('./../images/bg/root.jpg');

var currentDate = new Date();
export default class Seller extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
			seller: {},
			month: 0,
			total: 0,
			chart: [],
			bonuses: {
				total: 0,
				monthly: [{
					total: 0,
					status: "disabled"
				}]
			},
			selectedMonth: 0,
			token: ''
		};
	};

	componentDidMount() {
		AsyncStorage.getItem('access_token',(error, result) => {
			this.setState({token: result});
			this.fetch(result);
		});
	}

	fetch(token){
		var sellerID = parseInt(this.props.data.id);
		fetch(settings.domain+'/api/seller?id='+sellerID, {
			method: "GET",
			headers: {
				'Authorization': 'Bearer '+token,
			}
		})
		.then((response) => response.json())
		.then((data) => {

			if(data.status == "success"){

				var dt = data.data.created_at.substring(0, 10).split('-');
				var date = dt[2]+' '+d.months[parseInt(dt[1])-1]+' '+dt[0];

				//Alert.alert('',date.getFullYear());
				var seller = {
					registered: date,
					balance: data.data.balance,
					id: data.data.id,
					phone: data.data.phone,
					email: data.data.email,
					name: data.data.first_name,
					surname: data.data.last_name,
					middleName: data.data.middle_name,
					tradePoint: data.data.trade_point,
					program: data.data.program,
					progText: 'none',
					certificate: data.data.certificate
				}

				if(data.data.program){
					if(data.data.program.BSD && !data.data.program.F){
						seller.progText = 'a';
					}else if(!data.data.program.BSD && data.data.program.F){
						seller.progText = 'c';
					}else if(data.data.program.BSD && data.data.program.F){
						seller.progText = 'ac';
					}
				}

				var bonuses = {total: 0, monthly: []};
				bonuses.total = data.data.balance_per_months.total;
				bonuses.monthly = data.data.balance_per_months.monthly;
				/*for(var m in this.state.bonuses.monthly){
					bonuses.monthly.push(this.state.bonuses.monthly[m]);
				}*/

				this.setState({
					seller: seller,
					bonuses: bonuses
				});
				if(bonuses.monthly.length){
					this.prepareChart(this.state.selectedMonth);
				}
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

		/*fetch(settings.api.bonuses, {
			method: "GET",
			headers: {
				'Authorization': token
			}
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				this.setState({
					bonuses: data.data
				});
				this.prepareChart(this.state.selectedMonth);
			}else{
				Alert.alert(t.error.error, JSON.stringify(data));
			}
		})
		.catch((error) => {
				Alert.alert(t.error.error, t.error.offline);
			});*/
	}


	prepareChart(index){
		var data = this.state.bonuses.monthly[index].daily;
		if(data === undefined){
			return false;
		}
		var normalize = 100;
		var chartData = [];
		var maxValue = 1;
		for (var i = 0; i < data.length; i++) {
			maxValue = maxValue < parseInt(data[i].value) ? parseInt(data[i].value) : maxValue;
		}
		var ratio = normalize/maxValue;

		for (var i = 0; i < data.length; i++) {
			var date = new Date(data[i].date);
			chartData.push({
				dayNumber: date.getDate(),
				dayName: d.days[date.getDay()],
				value: data[i].value,
				height: parseInt(data[i].value)*(normalize/maxValue)*variables.CHART_BAR_RATIO
			})
		}

		this.setState({
			chart: chartData
		});
	}

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	_payMonth(index){
		fetch(settings.domain+'/api/paids/sellers/set', {
			method: "POST",
			headers: {
				'Authorization': 'Bearer '+this.state.token
			},
			body: settings.serialize({
				id: this.state.seller.id,
				month: this.state.bonuses.monthly[index].month,
			})
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				var bonuses = this.state.bonuses;
				bonuses.monthly[index].status = "paid";
				this.setState({
					bonuses: bonuses
				});
			}else{
				Alert.alert(t.error.error, JSON.stringify(data));
			}
		})
		.catch((error) => {
			Alert.alert(t.error.error, t.error.offline);
		});
	}


	_selectMonth(index){
		this.setState({
			selectedMonth: index
		});
		this.prepareChart(index);
	}

	_payMonthAction(index){
		var month = this.state.bonuses.monthly[index].month;
		var monthName = d.months[parseInt(month)];

		var m = (new Date()).getMonth();
		if(month >= m+1){
			Alert.alert(t.error.error, t.error.month);
			return false;
		}

		Alert.alert(
		  t.message.confirmAction,
		  t.message.payConfirm+" "+monthName+"?",
		  [
		    { text: t.message.no, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
		    { text: t.message.yes, onPress: () => this._payMonth(index) },
		  ],
		  { cancelable: false }
		)
	}



	render() {
		var selectedMonth = {
			month: currentDate.getMonth(),
			total: 0
		};
		if(this.state.bonuses.monthly.length){
			selectedMonth = this.state.bonuses.monthly[this.state.selectedMonth];
		}
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

					<Image
						style={{height: null, width: null}}
						source={backgroundImage}>
						<TouchableOpacity activeOpacity={90} style={[styles.pageHeader, styles.center]} onPress={() => this.navigate('seller-edit', this.state.seller)}>
							<Text style={[styles.white, styles.textLG]}>{this.state.seller.name} {this.state.seller.surname}</Text>
							<View style={[styles.sellerInfo, styles.center]}>
								<Text style={[styles.white, styles.textMD]}>{this.state.seller.phone}</Text>
								<Text style={[styles.white, styles.textSM]}>{this.state.seller.tradePoint}</Text>
							</View>
							<Text style={[styles.white, styles.textSM]}>{t.registrationDate}: {this.state.seller.registered}</Text>
							<Text style={[styles.white, styles.textSM]}>{t.programText}: {t.program[this.state.seller.progText]}</Text>
						</TouchableOpacity>
					</Image>
					<View style={[styles.section, styles.whiteBg]}>

						<View style={[styles.cols, styles.middle]}>
							<View style={[styles.bonusCircle]}>
								<Text style={styles.textSM}>{d.months[selectedMonth.month]}</Text>
								<Text style={ styles.bonusText }>{selectedMonth.total}</Text>
								<Text style={styles.textSM}>{t.bonuses}</Text>
							</View>

							<View style={[styles.bonusCircle]}>
								<Text style={styles.textSM}>{t.allTime}</Text>
								<Text style={ styles.bonusText }>{this.state.bonuses.total}</Text>
								<Text style={styles.textSM}>{t.bonuses}</Text>
							</View>
						</View>

						<ScrollView style={styles.chartScroll} horizontal={true}>
							<View style={styles.chart}>
								<View style={styles.chartArea}>
									{this.state.chart.map((item, index) => {
										return (
											<View key={index} style={styles.chartBar}>
												<Text style={styles.chartBarText}>{item.value}</Text>
												<View style={styles.chartBarBar}>
													<View style={[styles.chartBarValue, {height: item.height} ]} />
													<View style={[styles.chartBarShadow, {height: item.height-5} ]} />
												</View>
											</View>
										)
									})}
								</View>
								<View style={styles.chartX}>
									{this.state.chart.map((item, index) => {
										return (
											<View key={index} style={styles.chartXitem}>
												<Text style={styles.axisText}>{item.dayName}</Text>
												<Text style={styles.axisText}>{item.dayNumber}</Text>
											</View>
										)
									})}
								</View>
							</View>
						</ScrollView>

						<View style={styles.selectSection}>
							{this.state.bonuses.monthly.map((item, index) => {
								var rowStyle = (index == this.state.selectedMonth) ? [styles.pickerRow, styles.pickerRowSelected] : styles.pickerRow;
								if(item.status == 'not_paid'){
									return (
										<View key={index} style={rowStyle}>
											<Text onPress={() => this._selectMonth(index)} style={[styles.pickerCol, styles.textMD, styles.primary]}>{d.months[item.month]}</Text>
											<Text style={[styles.pickerCol, styles.textMD]}>{item.total}</Text>
											<View>
												<TouchableOpacity onPress={() => this._payMonthAction(index)}
													style={[styles.btn, styles.btnDefault, styles.btnSuccess]}>
													<Text style={[styles.white, styles.inputText]}>{t.btn.pay}</Text>
												</TouchableOpacity>
											</View>
										</View>
									);
								}
								if(item.status == 'paid'){
									return (
										<View key={index} style={rowStyle}>
											<Text onPress={() => this._selectMonth(index)} style={[styles.pickerCol, styles.textMD, styles.primary]}>{d.months[item.month]}</Text>
											<Text style={[styles.pickerCol, styles.textMD]}>{item.total}</Text>
											<View>
												<View
													style={[styles.btn, styles.btnDefault, styles.btnDisabled]}>
													<Text style={[styles.white, styles.inputText]}>{t.btn.paid}</Text>
												</View>
											</View>
										</View>
									);
								}
							}, this)}
						</View>

					</View>

				</ScrollView>

			</View>
		);
	}


};
