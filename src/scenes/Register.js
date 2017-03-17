import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { 
	StyleProvider, 
	Container, 
	Header, 
	Content, 
	Body, 
	Grid, 
	Col, 
	Form, 
	Item, 
	Input, 
	Left, 
	Right, 
	Title, 
	Label, 
	Text, 
	Button, 
	Picker, 
	Icon 
} from 'native-base';
import t from './../Translations';

import getTheme from './../theme/components';
import rovese from './../theme/variables/rovese';

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	box: {
		padding: 16
	},
	row: {
		paddingLeft: 8,
		paddingRight: 8,
		marginLeft: -16,
		marginRight: -16
	},
	col: {
		paddingLeft: 8,
		paddingRight: 8
	},
	logo: {
		width: 200,
		height: 100,
		alignSelf: 'center',
		marginBottom: 32
	},
	legend: {
		marginTop: 8,
		marginBottom: 8,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},
	hr: {
		backgroundColor: '#D9D5DC',
		height: 1,
		width: 250,
		marginTop: 16,
		marginBottom: 16
	},
	ltext: {
		color: '#003595',
		fontSize: 12,
		marginLeft: 8,
		marginRight: 8
	},
	lline: {
		height: 1,
		width: 32,
		backgroundColor: '#003595'
	},
	picker: {
		padding: 0,
		margin: 0,
		height: 32
		//color: '#ff0000',
	},
	pickerWrapper: {
		marginLeft: 2,
		backgroundColor: 'transparent',	
  		borderWidth: 1,
  		borderColor: '#D9D5DC',
  		borderRadius: 2
	}
};


export default class Post extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: undefined,
            selected1: 'key1',
            results: {
                items: []
            }
		}
	}

	onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }

	render() {
		
		return (
			<StyleProvider style={getTheme(rovese)}>
				<Container style={styles.container} >
					<Header>
						<Left>
							<Button transparent onPress={() => this.props.navigator.pop()}>
								<Icon name='arrow-back' />
								<Text>{t.back}</Text>
							</Button>
						</Left>
						<Body>
							<Title>{t.registration}</Title>
						</Body>
					</Header>
					<Content>

						<View style={styles.box}>

						<Image style={styles.logo} source={require('./../images/logo.png')} />

						<Grid style={styles.row}>
							<Col style={styles.col}>
								<Item default>
									<Input placeholder={t.name} />
								</Item>
							</Col>
							<Col style={styles.col}>
								<Item default>
									<Input placeholder={t.surname} />
								</Item>
							</Col>
						</Grid>

						<Item default topGap>
							<Input placeholder={t.middleName} />
						</Item>

						<View style={styles.legend}>
							<View style={styles.lline}></View>
							<Text style={styles.ltext}>{t.loginData}</Text>
							<View style={styles.lline}></View>
						</View>

						<Item default>
							<Input placeholder={t.email} />
						</Item>

						<Item default topGap>
							<Input placeholder={t.password} />
						</Item>
						<Item default topGap>
							<Input placeholder={t.passwordConfirm} />
						</Item>

						<View style={styles.legend}>
							<View style={styles.hr}></View>
						</View>

						<View style={styles.pickerWrapper}>
							<Picker
								style={styles.picker}
								iosHeader="Select one"
								mode="dropdown"
								selectedValue={this.state.selected1}
								onValueChange={this.onValueChange.bind(this)}>
								<Item label="Wallet" value="key0" />
								<Item label="ATM Card" value="key1" />
								<Item label="Debit Card" value="key2" />
								<Item label="Credit Card" value="key3" />
								<Item label="Net Banking" value="key4" />
							</Picker>
						</View>

						<Item default topGap>
							<Input placeholder={t.position} />
						</Item>
						<Item default topGap bottomGap>
							<Input placeholder={t.phoneNumber} />
						</Item>

						<Button full primary onPress={() => this.navigate('register')}>
							<Text>{t.registration.toUpperCase()}</Text>
						</Button>

						</View>
					</Content>
				</Container>
			</StyleProvider>
		);

	}
}