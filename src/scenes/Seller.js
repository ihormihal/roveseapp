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
			chart: []
		};
	};

	componentDidMount() {

		fetch(settings.api.seller, {
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
					seller: data.data
				});
			}else{
				//Alert(t.error, data.message);
			}
		})
		.done();

		fetch(settings.api.bonuses, {
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
					month: data.data.month,
					total: data.data.total
				});
				this.prepareChart(data.data.all);
			}else{
				//Alert(t.error, data.message);
			}
		})
		.done();

	}

	prepareChart(data){
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

	render() {
		return (
			<Image
				style={[styles.scene, styles.background]}
				source={backgroundImage}>
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
				<TouchableOpacity activeOpacity={90} style={[styles.pageHeader, styles.center]} onPress={() => this.navigate('seller-edit', this.state.seller)}>
					<Text style={[styles.white, styles.textLG]}>{this.state.seller.name} {this.state.seller.surname}</Text>
					<View style={[styles.sellerInfo, styles.center]}>
						<Text style={[styles.white, styles.textMD]}>{this.state.seller.phone}</Text>
						<Text style={[styles.white, styles.textSM]}>{this.state.seller.tradePoint}</Text>
					</View>
					<Text style={[styles.white, styles.textSM]}>{this.state.seller.registered}</Text>
				</TouchableOpacity>
				<View style={[styles.section, styles.whiteBg]}>

					<View style={[styles.cols, styles.middle]}>
						<View style={[styles.bonusCircle]}>
							<Text style={styles.textSM}>Май</Text>
							<Text style={ styles.bonusText }>{this.state.month}</Text>
							<Text style={styles.textSM}>Бонусы</Text>
						</View>

						<View style={[styles.bonusCircle]}>
							<Text style={styles.textSM}>За все время</Text>
							<Text style={ styles.bonusText }>{this.state.total}</Text>
							<Text style={styles.textSM}>Бонусы</Text>
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

				</View>
			</Image>
		);
	}


};
