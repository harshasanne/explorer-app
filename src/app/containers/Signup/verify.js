import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  code: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //codeInput: {}
});

class SignupVerifyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeNum1: '',
      codeNum2: '',
      codeNum3: '',
      codeNum4: ''
    };
  }
  validate() {
    // TODO: Validate the code & then go to the profile settings page.
  }
  render() {
    return (
      <View>
        <Text>please enter the 4-digit code to verify we sent an SMS to the number below</Text>
        <View style={styles.code}>
          <TextInput 
            value={this.props.phoneNumber}
            textContentType="telephoneNumber"
            editable={false}
          />
          <TextInput
            value={this.state.codeNum1}
            maxLength={1}
            onChangeText={num => this.setState({codeNum1: num})}
          />
          <TextInput
            value={this.state.codeNum2}
            maxLength={1}
            onChangeText={num => this.setState({codeNum2: num})}
          />
          <TextInput
            value={this.state.codeNum3}
            maxLength={1}
            onChangeText={num => this.setState({codeNum3: num})}
          />
          <TextInput
            value={this.state.codeNum4}
            maxLength={1}
            onChangeText={num => this.setState({codeNum4: num})}
          />
        </View>
        <Button 
          title="Verify"
          onPress={this.validate.bind(this)}
        />
      </View>
    );
  }
}

SignupVerifyScreen.propTypes = {
  phoneNumber: PropTypes.string
};

export default SignupVerifyScreen;