import React, { Component } from 'react';
import { AppRegistry, View, TextInput } from 'react-native';

class InputText extends Component {
	render() {
		return (
			<View
				{...this.props} // Inherit any props passed to it;
				style={[styles.textInput, styles.inputDefault, styles.mt1]}
				>
				<TextInput
					style={[ styles.textInputInput ]}
					underlineColorAndroid='transparent'
					placeholder={this.props.placeholder}
					//onChangeText={(password) => this.setState({password: password})}
					value={this.props.value}
				/>
			</View>
		);
	}
}

class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Multiline Placeholder',
    };
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
     <View style={{
       backgroundColor: this.state.text,
       borderBottomColor: '#000000',
       borderBottomWidth: 1 }}
     >
       <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
       />
     </View>
    );
  }
}

export default {
	InputText: InputText,
	Textarea: Textarea,
}