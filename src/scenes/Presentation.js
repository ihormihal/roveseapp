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
	TouchableHighlight,
	TouchableOpacity,
	ViewPagerAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';



var slides = [
	{
		image: require('./../images/presentation-1.jpg'),
		imageBg: require('./../images/bg-presentation-1.jpg'),
		title: 'Продажа',
		description: 'За каждую проданную единицу со специальным кодом продавец получает бонусное вознаграждение',
	},
	{
		image: require('./../images/presentation-2.jpg'),
		imageBg: require('./../images/bg-presentation-2.jpg'),
		title: 'Отправка SMS',
		description: 'Продавец осуществляет продажи и отправляет SMS c индивидуальным кодом упаковки на специальный номер Rovese',
	},
	{
		image: require('./../images/presentation-3.jpg'),
		imageBg: require('./../images/bg-presentation-3.jpg'),
		title: 'Бонусы',
		description: 'Все бонусы суммируются на протяжении установленного периода и в конце каждый продавец получает сертификат на сумму бонусов',
	},
];



export default class Presentation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
			tabWidth: 100/slides.length,
			tabOffset: 0,
		};
	};

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	onPageScroll = (e) => {
		var offset = this.state.tabWidth*(e.nativeEvent.position + e.nativeEvent.offset);
		this.setState({tabOffset: parseInt(offset)});
	};

	renderSlide = (item, index) => {
		return (
			<View key={index} style={styles.presentation}>
				<Image source={item.imageBg} style={styles.presentationTop}>
					<View style={styles.last}>
						<Text style={styles.presentationText}>{item.description.toUpperCase()}</Text>
					</View>
				</Image>
				<Image source={item.image} style={styles.presentationBottom} />
			</View>
		);
	}

	go (page) {
		this.viewPager.setPage(page);
	}

	render() {

		var tabIndicator = {
			width: this.state.tabWidth + '%',
			height: 2,
			backgroundColor: '#ffffff',

			position: 'absolute',
			bottom: 0,
			left: this.state.tabOffset+'%'
		};

		return (
			<View style={styles.scene}>
				<View style={styles.presentationsHeader}>
					<View style={[styles.header, styles.opacityDark]}>
						<View style={styles.headerLeft}>
							<TouchableOpacity
								style={styles.btn}
								onPress={() => this.props.navigator.pop()}>
								<Icon style={[styles.btnIcon, styles.white]} size={20} name="arrow-back"/>
								<Text style={[styles.btnText, styles.white]}>{t.back}</Text>
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

					<View style={styles.tabs}>
						{slides.map((item, index) => {
							return (
								<TouchableOpacity key={index} style={styles.tab} onPress={() => this.viewPager.setPage(index)}>
									<Text style={styles.tabText}>{item.title}</Text>
								</TouchableOpacity>
							)
						})}
					</View>
					<View style={tabIndicator} />

				</View>

				<ViewPagerAndroid
					style={styles.presentations}
					onPageScroll={this.onPageScroll}
					initialPage={0}
					ref={viewPager => { this.viewPager = viewPager }}>
					{slides.map(this.renderSlide)}
				</ViewPagerAndroid>

			</View>
		);
	}


};
