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


export default class Registration extends Component {

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
				<View style={styles.header}>
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

						<View style={styles.logoTitle}>
							<Image
								style={[ styles.logoHeader ]}
								source={require('./../images/logo-blue.png')}
							/>
							<View style={styles.logoRightText}>
								<Text style={styles.lrtBig}>Регистрация</Text>
								<Text style={styles.lrt}>регионального</Text>
								<Text style={styles.lrt}>представителя</Text>
							</View>
						</View>

						<View style={styles.cols}>
							<View style={[styles.col, styles.textInput, styles.inputDefault, styles.mr1]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.name}
									onChangeText={(name) => this.setState({name: name})}
									value={(this.state && this.state.name) || ''}
								/>
							</View>
							<View style={[styles.col, styles.textInput, styles.inputDefault]}>
								<TextInput
									style={[ styles.textInputInput ]}
									underlineColorAndroid='transparent'
									placeholder={t.surname}
									onChangeText={(surname) => this.setState({surname: surname})}
									value={(this.state && this.state.surname) || ''}
								/>
							</View>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.middleName}
								onChangeText={(middleName) => this.setState({middleName: middleName})}
								value={(this.state && this.state.middleName) || ''}
							/>
						</View>

						<View style={styles.legend}>
							<View style={styles.lline}></View>
							<Text style={styles.ltext}>{t.loginData}</Text>
							<View style={styles.lline}></View>
						</View>

						<View style={[styles.textInput, styles.inputDefault]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.email}
								onChangeText={(email) => this.setState({email: email})}
								value={(this.state && this.state.email) || ''}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.password}
								onChangeText={(password) => this.setState({password: password})}
								value={(this.state && this.state.password) || ''}
							/>
						</View>

						<View style={[styles.textInput, styles.inputDefault, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput ]}
								underlineColorAndroid='transparent'
								placeholder={t.passwordConfirm}
								onChangeText={(passwordConfirm) => this.setState({passwordConfirm: passwordConfirm})}
								value={(this.state && this.state.passwordConfirm) || ''}
							/>
						</View>


						<View style={styles.hr} />

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

						<View style={[styles.center, styles.mt2]}>
							<TouchableOpacity
								activeOpacity={75 / 100}
								style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
								<Text style={styles.white}>{t.submit}</Text>
							</TouchableOpacity>

							<Text style={styles.mt1}>Регистрируясь в Retail Club, вы принимаете</Text>
							<Text onPress={() => this.navigate('rules')} style={styles.primary}>Правила пользования и зашиты информации</Text>
						</View>

					</View>


				</ScrollView>
			</View>
		);


	}
}