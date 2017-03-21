import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput } from 'react-native';
import styles from './../theme/styles.js';

class InputText extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	_ifLabel(){
		if(this.props.label){
			return (<Text style={styles.inputLabel}>{this.props.label}</Text>);
		}
	}

	_onChange = (value) => {
		if(this.props.onInputChange){
			this.props.onInputChange(value);
		}
		this.setState({value: value});
	}

	render() {
		return (
			<View>
				{this._ifLabel()}
				<View style={[styles.textInput, styles.inputDefault]}>
					<TextInput
						style={styles.textInputInput}
						underlineColorAndroid='transparent'
						placeholder={this.props.placeholder}
						onChangeText={this._onChange}
						value={this.state.value}
					/>
				</View>
			</View>
		);
	}
}

// class Textarea extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: 'Useless Multiline Placeholder',
//     };
//   }

//   // If you type something in the text box that is a color, the background will change to that
//   // color.
//   render() {
//     return (

//      <View {...this.props} style={{
//       backgroundColor: this.state.text,
//       borderBottomColor: '#000000',
//       borderBottomWidth: 1 }}
//      >
//        <UselessTextInput
//          multiline = {true}
//          numberOfLines = {4}
//          onChangeText={(text) => this.setState({text})}
//          value={this.state.text}
//        />
//      </View>
//     );
//   }
// }

module.exports = {
	'InputText': InputText,
	//Textarea: Textarea,
}