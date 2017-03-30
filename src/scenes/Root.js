import React, { Component } from 'react';
import {
	AsyncStorage,
	StatusBar,
	Animated,
	View,
	ScrollView,
	ViewPagerAndroid,
	Text,
	Alert,
	Image,
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity,
	DrawerLayoutAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import settings from './../Settings';


var rippleBg = TouchableNativeFeedback.Ripple(variables.colorRipple);

var slides = [
	{
		image: require('./../images/slides/presentation.jpg'),
		title: t.main.title1,
		description: t.main.description1,
		route: 'presentation'
	},
	{
		image: require('./../images/slides/registration.jpg'),
		title: t.main.title2,
		description: t.main.description2,
		route: 'seller-registration'
	},
	{
		image:  require('./../images/slides/statistics.jpg'),
		title: t.main.title3,
		description: t.main.description3,
		route: 'statistics'
	},
	{
		image: require('./../images/slides/support.jpg'),
		title: t.main.title4,
		description: t.main.description4,
		route: 'support'
	}
];

var backgroundImage = require('./../images/bg/root.jpg');

export default class Root extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
			pagOffset: 0,
			pagWidth: variables.pagSize,
			user: {id: null, name: "", surname: ""},
			menu: [
				{
					title: t.menu_root,
					route: 'root',
					data: null
				},
				{
					title: t.menu.statistics,
					route: 'statistics',
					data: null
				},
				{
					title: t.menu.sellerRegistration,
					route: 'seller-registration',
					data: null
				},
				{
					title: t.menu.settings,
					route: 'settings',
					data: null
				},
				{
					title: t.menu.support,
					route: 'support',
					data: null
				}
			]
		};
	};

	componentDidMount() {
		AsyncStorage.getItem('access_token',(error, result) => {
			this.fetch(result);
		});
	}

	fetch(token) {
		fetch(settings.domain+'/api/profile', {
			method: "GET",
			headers: {
				'Authorization': 'Bearer '+token
			}
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				var profile = {
					id: data.data.id,
					email: data.data.email,
					name: data.data.first_name,
					surname: data.data.last_name,
					middleName: data.data.middle_name,
					phone: data.data.phone_number,
					region: parseInt(data.data.region),
					position: parseInt(data.data.position)
				};
				var menu = this.state.menu;
				menu[3].data = profile; //bind user data to settings
				this.setState({
					user: profile,
					menu: this.state.menu,
				})
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

	openDrawer() {
		this.refs['DRAWER'].openDrawer()
	}

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	_logout() {
		AsyncStorage.setItem('access_token', '', () => {
			this.navigate('login');
		});
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
	};

	render() {
		
		var Drawer = (
			<View style={styles.drawer}>
				<View style={[styles.drawerSection, styles.drawerSectionTop]}>
					<Text style={[styles.textXL, styles.white, styles.textCenter]}>{this.state.user.name}</Text>
					<Text style={[styles.textXL, styles.white, styles.textCenter]}>{this.state.user.surname}</Text>
				</View>
				<View style={styles.divider}></View>
				<View style={styles.drawerSection}>
					{this.state.menu.map((item, index) => {
						return (
							<TouchableNativeFeedback
								key={index}
								background={rippleBg}
								onPress={() => this.navigate(item.route, item.data)}>
								<View style={styles.menuItem}>
									<Text style={styles.menuItemText}>{item.title}</Text>
								</View>
							</TouchableNativeFeedback>
						)
					})}
				</View>

				<View style={[styles.drawerSection, styles.drawerSectionBottom]}>
					<View style={styles.divider}></View>
					<TouchableNativeFeedback
						background={rippleBg}
						onPress={() => this._logout()}>
						<View style={styles.btnDrawerBottom}>
							<Text style={[styles.menuItemText, styles.textCenter]}>{t.btn.logout}</Text>
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
				drawerWidth={200*variables.PIXEL_RATIO}
				drawerBackgroundColor="transparent"
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => Drawer}
				ref={'DRAWER'}>

				<StatusBar translucent={false} backgroundColor={variables.colorPrimaryDark} />

				<Image
					style={[styles.scene, styles.background]}
					source={backgroundImage}>
					<View style={[styles.header, styles.opacityLight]}>
						<View style={styles.headerLeft}>
							<TouchableOpacity
								style={styles.btn}
								onPress={() => this.openDrawer()} style={styles.TEXT_MD}>
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
							<Animated.View style={[styles.pagDot, styles.pagDotActive, pagination_transform]} />
						</View>
					</View>

				</Image>
			</DrawerLayoutAndroid>
		);
	}


};
