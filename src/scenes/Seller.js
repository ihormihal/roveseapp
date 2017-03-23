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
//
//
// var chartData = [
// {
// 	legend: 'Янв',
// 	value: 60,
// },
// {
// 	legend: 'Фев',
// 	value: 80,
// },
// {
// 	legend: 'Мар',
// 	value: 65,
// },
// {
// 	legend: 'Апр',
// 	value: 85,
// },
// {
// 	legend: 'Май',
// 	value: 45,
// },
// {
// 	legend: 'Июн',
// 	value: 50,
// },
// {
// 	legend: 'Июл',
// 	value: 90,
// },
// {
// 	legend: 'Авг',
// 	value: 95,
// },
// {
// 	legend: 'Сен',
// 	value: 100,
// },
// {
// 	legend: 'Окт',
// 	value: 80,
// },
// {
// 	legend: 'Ноя',
// 	value: 70,
// },
// {
// 	legend: 'Дек',
// 	value: 45,
// },
// ];



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
							<Icon style={[styles.btnIcon, styles.textSM, styles.primary]} size={20} name="arrow-back"/>
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
				<View style={[styles.pageHeader, styles.center]}>
					<Text style={[styles.white, styles.h2]} onPress={() => this.navigate('seller-edit')}>Злата Новикова</Text>
					<View style={[styles.sellerInfo, styles.center]}>
						<Text style={[styles.white, styles.h3]}>+38 (050) XXX-XX-XX</Text>
						<Text style={styles.white}>вул. Михайла Грушевського, 93,</Text>
						<Text style={styles.white}>Житомирська область</Text>
					</View>
					<Text style={styles.white}>04.06.16</Text>
				</View>
				<View style={[styles.section, styles.whiteBg]}>

					<View style={[styles.cols, styles.mb1, styles.mt1]}>
						<View style={[styles.col, styles.center]}>
							<Text>Май</Text>
							<Text style={ styles.bonusText }>900</Text>
							<Text>Бонусы</Text>
						</View>

						<View style={[styles.col, styles.center]}>
							<Text>За все время</Text>
							<Text style={ styles.bonusText }>1500</Text>
							<Text>Бонусы</Text>
						</View>
					</View>

					<ScrollView style={styles.chartScroll} horizontal={true}>
						<View style={styles.chart}>

							<View style={styles.chartArea}>
								{chartData.map((item, index) => {
									return (
										<View key={index} style={styles.chartBar}>
											<Text style={styles.chartBarText}>{item.value}</Text>
											<View style={styles.chartBarBar}>
												<View style={[styles.chartBarValue, {height: item.value} ]} />
												<View style={[styles.chartBarShadow, {height: item.value-5} ]} />
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
