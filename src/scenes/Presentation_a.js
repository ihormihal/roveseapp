import React, { Component } from 'react';
import {
	AsyncStorage,
	Animated,
	View,
	Text,
	Alert,
	Image,
	TextInput,
	TouchableOpacity,
	ViewPagerAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from "react-native-router-flux";

//import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';



var slides = [
	{
		image: t.lng == 'ru' ? require('./../images/presentation/image_1_ru.jpg') : require('./../images/presentation/image_1.jpg'),
		imageBg: require('./../images/presentation/bg_1.jpg'),
		title: t.presentation.title1,
		description: t.presentation.description1,
	},
	{
		image: t.lng == 'ru' ? require('./../images/presentation/image_2_ru.jpg') : require('./../images/presentation/image_2.jpg'),
		imageBg: require('./../images/presentation/bg_2.jpg'),
		title:  t.presentation.title2,
		description: t.presentation.description2,
	},
	{
		image: t.lng == 'ru' ? require('./../images/presentation/image_3_ru.jpg') : require('./../images/presentation/image_3.jpg'),
		imageBg: require('./../images/presentation/bg_3.jpg'),
		title:  t.presentation.title3,
		description: t.presentation.description3,
	},
];



export default class Presentation_a extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
			activeTab: 0,
			tabWidth: 100/slides.length,
			tabOffset: 0,
		};
	};

	onPageScroll = (e) => {
		var offset = this.state.tabWidth*(e.nativeEvent.position + e.nativeEvent.offset);
		this.setState({tabOffset: parseInt(offset)});
	};

	renderSlide = (item, index) => {
		return (
			<View key={index} style={styles.presentation}>
				<Image source={item.imageBg} style={styles.presentationTop}>
					<View style={styles.presentationTopWrapper}>
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
			bottom: 2,
			left: this.state.tabOffset+'%'
		};

		return (
			<View style={[styles.scene, styles.relative]}>

				<View style={styles.presentationsHeader}>
					<View style={[styles.header, styles.opacityDark]}>
						<View style={styles.headerLeft}>
							<TouchableOpacity
								style={styles.btn}
								onPress={() => Actions.pop()}>
								<Icon style={[styles.btnIcon, styles.textSM, styles.white]} size={20} name="arrow-back"/>
								<Text style={[styles.textSM, styles.white]}>{t.btn.back}</Text>
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
				</View>

				<View style={styles.tabsContainer}>
					<View style={[styles.tabs, styles.opacityBlue]}>
						{slides.map((item, index) => {
							return (
								<TouchableOpacity key={index} style={styles.tab} onPress={() => this.viewPager.setPage(index)}>
									<Text style={styles.tabText}>{item.title.toUpperCase()}</Text>
								</TouchableOpacity>
							)
						})}
					</View>
					<Animated.View style={tabIndicator} />
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
