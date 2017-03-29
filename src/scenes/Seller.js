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

export default class Seller extends Component {

	constructor(props) {
		super(props);
		this.state = {
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
			selectedMonth: 0
		};
	};

	componentDidMount() {
		AsyncStorage.getItem('access_token',(error, result) => {
			this.fetch(result);
		});
	}

	fetch(token){
		fetch(settings.api.seller, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				this.setState({
					seller: data.data
				});
			}else{
				//Alert(t.error.error, data.message);
			}
		})
		.done();

		fetch(settings.api.bonuses, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
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
				//Alert(t.error.error, data.message);
			}
		})
		.done();
	}


	prepareChart(index){
		var data = this.state.bonuses.monthly[index].daily;
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


	_selectMonth(index){
		this.setState({
			selectedMonth: index
		});
		this.prepareChart(index);
	}

	_payMonth(month){
		var monthName = d.months[parseInt(month)];
		Alert.alert(
		  'Подтвердите действие',
		  'Вы подтверждаете списание бонусов за '+monthName+'?',
		  [
		    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		    {text: 'OK', onPress: () => console.log('OK Pressed')},
		  ],
		  { cancelable: false }
		)
	}



	render() {
		var selectedMonth = this.state.bonuses.monthly[this.state.selectedMonth];
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
								if(item.status == 'topay'){
									return (
										<View key={index} style={rowStyle}>
											<Text onPress={() => this._selectMonth(index)} style={[styles.pickerCol, styles.textMD, styles.primary]}>{d.months[item.month]}</Text>
											<Text style={[styles.pickerCol, styles.textMD]}>{item.total}</Text>
											<View>
												<TouchableOpacity
													style={[styles.btn, styles.btnDefault, styles.btnPrimary]}
													onPress={() => this._payMonth(item.month)}>
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
