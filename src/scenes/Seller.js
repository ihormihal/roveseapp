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

var backgroundImage = require('./../images/bg/root.jpg');

var chartData = [
{
	dayName: 'Пн',
	dayNumber: '10',
	value: 60,
},
{
	dayName: 'Вт',
	dayNumber: '11',
	value: 80,
},
{
	dayName: 'Ср',
	dayNumber: '12',
	value: 65,
},
{
	dayName: 'Чт',
	dayNumber: '13',
	value: 85,
},
{
	dayName: 'Пт',
	dayNumber: '14',
	value: 45,
},
{
	dayName: 'Сб',
	dayNumber: '15',
	value: 50,
},
{
	dayName: 'Вс',
	dayNumber: '16',
	value: 90,
},
{
	dayName: 'Пн',
	dayNumber: '17',
	value: 95,
},
{
	dayName: 'Вт',
	dayNumber: '18',
	value: 100,
},
{
	dayName: 'Ср',
	dayNumber: '19',
	value: 80,
},
{
	dayName: 'Чт',
	dayNumber: '20',
	value: 70,
},
{
	dayName: 'Пт',
	dayNumber: '21',
	value: 45,
},
];

export default class Seller extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phone: ''
		};
	};

	componentDidMount() {

		fetch('https://raw.githubusercontent.com/ihormihal/roveseapp/master/api/seller.json', {
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
					form: data.data
				});
			}else{
				//Alert(t.error, data.message);
			}
		})
		.done();

		fetch('https://raw.githubusercontent.com/ihormihal/roveseapp/master/api/bonuses.json', {
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
					bonuses: data.data
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
				<TouchableOpacity activeOpacity={90} style={[styles.pageHeader, styles.center]} onPress={() => this.navigate('seller-edit')}>
					<Text style={[styles.white, styles.textLG]}>Злата Новикова</Text>
					<View style={[styles.sellerInfo, styles.center]}>
						<Text style={[styles.white, styles.textMD]}>+38 (050) XXX-XX-XX</Text>
						<Text style={[styles.white, styles.textSM]}>вул. Михайла Грушевського, 93,</Text>
						<Text style={[styles.white, styles.textSM]}>Житомирська область</Text>
					</View>
					<Text style={[styles.white, styles.textSM]}>04.06.16</Text>
				</TouchableOpacity>
				<View style={[styles.section, styles.whiteBg]}>

					<View style={[styles.cols, styles.middle]}>
						<View style={[styles.bonusCircle]}>
							<Text style={styles.textSM}>Май</Text>
							<Text style={ styles.bonusText }>900</Text>
							<Text style={styles.textSM}>Бонусы</Text>
						</View>

						<View style={[styles.bonusCircle]}>
							<Text style={styles.textSM}>За все время</Text>
							<Text style={ styles.bonusText }>1500</Text>
							<Text style={styles.textSM}>Бонусы</Text>
						</View>
					</View>

					<ScrollView style={styles.chartScroll} horizontal={true}>
						<View style={styles.chart}>

							<View style={styles.chartArea}>
								{chartData.map((item, index) => {
									var barHeight =  item.value*variables.CHART_BAR_RATIO;
									return (
										<View key={index} style={styles.chartBar}>
											<Text style={styles.chartBarText}>{item.value}</Text>
											<View style={styles.chartBarBar}>
												<View style={[styles.chartBarValue, {height: barHeight} ]} />
												<View style={[styles.chartBarShadow, {height: barHeight-5} ]} />
											</View>
										</View>
									)
								})}
							</View>
							<View style={styles.chartX}>
								{chartData.map((item, index) => {
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
