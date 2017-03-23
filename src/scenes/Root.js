import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	View,
	ScrollView,
	ViewPagerAndroid,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity,
	DrawerLayoutAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import Drawer from './../components/Drawer.js';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';

var rippleBg = TouchableNativeFeedback.Ripple(variables.colorPrimaryRGBA);

var slides = [
	{
		image: require('./../images/slides/presentation.jpg'),
		title: 'Презентация программы мотивации',
		description: 'В данном разделе региональный представитель может кратко презентовать условия программы новому участнику',
		route: 'presentation'
	},
	{
		image: require('./../images/slides/registration.jpg'),
		title: 'Регистрация продавца',
		description: 'В данном разделе региональный представитель может зарегистрировать нового участника программы Retail Club',
		route: 'seller-registration'
	},
	{
		image:  require('./../images/slides/statistics.jpg'),
		title: 'Статистика',
		description: 'В данном разделесодержится детальная информация о всех зарегистрированных участниках программы Retail Club',
		route: 'statistics'
	},
	{
		image: require('./../images/slides/support.jpg'),
		title: 'Техническая поддержка',
		description: '',
		route: 'support'
	}
];

var menu = [
	{
		title: 'Домой',
		route: 'root'
	},
	{
		title: 'Статистика',
		route: 'statistics'
	},
	{
		title: 'Анкета продавца',
		route: 'seller-registratio'
	},
	{
		title: 'Настройки',
		route: 'settings'
	},
	{
		title: 'Сообщить о проблеме',
		route: 'support'
	}
];

var backgroundImage = require('./../images/bg/root.jpg');

export default class PasswordReset extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pagOffset: 0,
			pagWidth: variables.pagSize
		};
	};

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	openDrawer() {
		this.refs['DRAWER'].openDrawer()
	}

	renderSlide = (item, index) => {
		return (
			<View key={index} style={styles.slide}>
				<TouchableOpacity style={styles.slidePage} onPress={() => this.navigate(item.route)} activeOpacity={100 / 100}>
					<Image style={styles.slideImage} source={item.image} />
					<View style={styles.slideText}>
						<Text style={styles.slideTitle}>{item.title.toUpperCase()}</Text>
						<View style={styles.titleDivider}></View>
						<Text style={styles.slideDescription}>{item.description}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	onPageScroll = (e) => {
		var offset = parseInt((variables.pagStep+variables.pagSize)*(e.nativeEvent.position + e.nativeEvent.offset));
		this.setState({pagOffset: parseInt(offset)});
		// var delta_w = variables.pagStep + variables.pagSize;
		// var offset = (variables.pagStep+variables.pagSize)*e.nativeEvent.position;
		// var width = this.state.pagWidth;
		// if(e.nativeEvent.offset <= 0.5){
		// 	width = variables.pagSize + delta_w * e.nativeEvent.offset * 2;
		// }else{
		// 	offset = offset + delta_w * e.nativeEvent.offset;
		// 	width = variables.pagSize + delta_w * (1 - e.nativeEvent.offset );
		// }
		// this.setState({pagOffset: parseInt(offset), pagWidth: parseInt(width)});
	};

	render() {
		var Drawer = (
			<View style={styles.drawer}>
				<View style={[styles.drawerSection, styles.drawerSectionTop]}>
					<Text style={[styles.h1, styles.white, styles.textCenter]}>Имя Фамилия</Text>
				</View>
				<View style={styles.divider}></View>
				<View style={styles.drawerSection}>
					{menu.map((item, index) => {
						return (
							<TouchableNativeFeedback
							key={index}
								background={rippleBg}
								onPress={() => this.navigate(item.route)}>
								<View style={styles.menuItem}>
									<Text style={[styles.white, styles.h2]}>{item.title}</Text>
								</View>
							</TouchableNativeFeedback>
						)
					})}
				</View>

				<View style={[styles.drawerSection, styles.drawerSectionBottom]}>
					<View style={styles.divider}></View>
					<TouchableNativeFeedback
						background={rippleBg}
						onPress={() => this.navigate('login')}>
						<View style={styles.btnDrawerBottom}>
							<Text style={[styles.h2, styles.white, styles.textCenter]}>Выйти из учетной записи</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		);

		var pagination_transform = {
			//width: this.state.pagWidth,
			transform: [
				{translateX: this.state.pagOffset}
			]
		};

		return (
			<DrawerLayoutAndroid
				drawerWidth={250}
				drawerBackgroundColor="transparent"
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => Drawer}
				ref={'DRAWER'}>

				<Image
					style={[styles.scene, styles.background]}
					source={backgroundImage}>
					<View style={[styles.header, styles.opacityLight]}>
						<View style={styles.headerLeft}>
							<TouchableOpacity
								style={styles.btn}
								onPress={() => this.openDrawer()}>
								<Icon style={[styles.btnIcon, styles.white]} size={20} name="menu"/>
							</TouchableOpacity>
						</View>
						<View style={styles.headerCenter}>
							<Image
								style={[ styles.logoHeader ]}
								source={require('./../images/logo-inverted-header.png')}
							/>
						</View>
						<View style={styles.headerRight}>
						</View>
					</View>

					<View style={[styles.col, styles.middle]}>
						<ViewPagerAndroid
							style={styles.slider}
							onPageScroll={this.onPageScroll}
							initialPage={0}>
							{slides.map(this.renderSlide)}
						</ViewPagerAndroid>
						<View style={styles.sliderPagination}>
							{slides.map((item, index) => {
								return (
									<View key={index} style={styles.pagDot}></View>
								)
							})}
							<View style={[styles.pagDot, styles.pagDotActive, pagination_transform]}></View>
						</View>
					</View>

				</Image>
			</DrawerLayoutAndroid>
		);
	}


};
