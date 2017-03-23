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
	legend: 'Янв',
	value: 60,
},
{
	legend: 'Фев',
	value: 80,
},
{
	legend: 'Мар',
	value: 65,
},
{
	legend: 'Апр',
	value: 85,
},
{
	legend: 'Май',
	value: 45,
},
{
	legend: 'Июн',
	value: 50,
},
{
	legend: 'Июл',
	value: 90,
},
{
	legend: 'Авг',
	value: 95,
},
{
	legend: 'Сен',
	value: 100,
},
{
	legend: 'Окт',
	value: 80,
},
{
	legend: 'Ноя',
	value: 70,
},
{
	legend: 'Дек',
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
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.btnText, styles.primary]}>{t.back}</Text>
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
					<Text style={[styles.white, styles.h2]}>Злата Новикова</Text>
					<View style={[styles.sellerInfo, styles.center]}>
						<Text style={[styles.white, styles.h3]}>+38 (050) XXX-XX-XX</Text>
						<Text style={styles.white}>вул. Михайла Грушевського, 93,</Text>
						<Text style={styles.white}>Житомирська область</Text>
					</View>
					<Text style={styles.white}>04.06.16</Text>
				</View>
				<View style={[styles.container, styles.center, styles.whiteBg]}>


					<ScrollView style={styles.chartScroll} horizontal={true}>
						<View style={styles.chart}>

							<View style={styles.chartArea}>
								{chartData.map((item, index) => {
									return (
										<View key={index} style={styles.chartBar}>
											<View style={[styles.chartBarValue, {height: item.value} ]} />
											<View style={[styles.chartBarShadow, {height: item.value-5} ]} />
										</View>
									)
								})}

								<View style={[styles.chartGridH, {bottom: 0}]} />
								<View style={[styles.chartGridH, {bottom: 20}]} />
								<View style={[styles.chartGridH, {bottom: 40}]} />
								<View style={[styles.chartGridH, {bottom: 60}]} />
								<View style={[styles.chartGridH, {bottom: 80}]} />
							</View>
							<View style={styles.chartX}>
								{chartData.map((item, index) => {
									return (<Text key={index} style={styles.chartXitem}>{item.legend}</Text>)
								})}
							</View>
						</View>
					</ScrollView>

					<View style={ styles.center }>
						<Text style={[styles.primary, styles.h2]}>Общая сумма бонусов</Text>
						<Text style={ styles.bonusText }>900</Text>
						<Text>Бонусов</Text>
					</View>


				</View>
			</Image>
		);
	}


};
