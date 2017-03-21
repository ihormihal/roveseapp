import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	ScrollView,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	Picker,
	Item
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';


var regions = [
	{id: 0, title: 'Регион'},
	{id: 1, title: 'Киев'},
	{id: 2, title: 'Харьков'},
	{id: 3, title: 'Днепр'},
];



export default class Settings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: undefined,
			selected1: 'key1',
			results: {
				items: []
			},
			selectedRegion: 0
		}
	}

	onValueChange (value: string) {
		this.setState({
			selected1 : value
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
			<View style={styles.scene}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.props.navigator.pop()}
							activeOpacity={75 / 50}>
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

				<ScrollView style={styles.scroll}>

					<View style={styles.container}>

						<Text style={[styles.inputLabel, styles.textCenter]}>Редактировать профиль</Text>

						<View style={[styles.textInput, styles.inputDefault]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.name}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.surname}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.middleName}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.selectedRegion}
								onValueChange={this.onValueChange.bind(this, 'selected2')}
								onValueChange={(value) => { this.setState({selectedRegion: value}) }}
								mode="dropdown">
								{regions.map((item, index) => {
									return (<Picker.Item key={index} label={item.title} value={item.id} />);
								}, this)}
							</Picker>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.position}
								onChangeText={(position) => this.setState({passwordConfirm: position})}
								value={(this.state && this.state.position) || ''}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.phoneNumber}
								onChangeText={(phoneNumber) => this.setState({phoneNumber: phoneNumber})}
								value={(this.state && this.state.passwordConfirm) || ''}
							/>
						</View>

						<Text style={[styles.inputLabel, styles.textCenter, styles.mt1]}>Выбор языка интерфейса</Text>

						<View style={[styles.textInput, styles.inputDefault]}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.selectedRegion}
								onValueChange={this.onValueChange.bind(this, 'selected2')}
								onValueChange={(value) => { this.setState({selectedRegion: value}) }}
								mode="dropdown">
								{regions.map((item, index) => {
									return (<Picker.Item key={index} label={item.title} value={item.id} />);
								}, this)}
							</Picker>
						</View>

						<Text style={[styles.inputLabel, styles.textCenter, styles.mt1]}>Изменение пароляа</Text>

						<View style={[styles.textInput, styles.inputDefault]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder="Старий пароль"
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder="Новый пароль"
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder="Подтвердите пароль"
							/>
						</View>

						<View style={[styles.center, styles.mt2]}>
							<TouchableOpacity
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={styles.white}>{t.save}</Text>
							</TouchableOpacity>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}