import React, { Component } from "react";
import { Alert, StyleSheet, View, TouchableHighlight, StatusBar, KeyboardAvoidingView, Platform, Image, ScrollView } from "react-native";
import { Header } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import TextInputComponent from '../src/component/TextInputComponent';
import PincodeComponent from '../src/component/PincodeComponent';
import ErrorComponent from '../src/component/ErrorComponent';
import { Button, CheckBox } from 'react-native-elements';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      flagFirst: false,
      lastName: "",
      flagLast: false,
      phoneNumber: "",
      flagPhone: false,
      email: "",
      flagEmail: false,
      pinPassword: "",
      flagPin: false,
      checked: false
    };
  }

  onChangeTextfirstName = (value) => {
    this.setState({ firstName: value })
  }
  onChangeTextlastName = (value) => {
    this.setState({ lastName: value })
  }
  onChangeTextphoneNumber = (value) => {
    this.setState({ phoneNumber: value })
  }
  onChangeTextemail = (value) => {
    this.setState({ email: value })
  }
  onChangeTextPassword = (value) => {
    this.setState({ pinPassword: value })
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  _validation = () => {

    var f = this.state.firstName.length > 3;
    var l = this.state.lastName.length > 3;
    var m = this.state.phoneNumber.length == 10;
    var e = this.validateEmail(this.state.email)
    var p = this.state.pinPassword.length == 4;

    this.setState({
      flagFirst: !f,
      flagLast: !l,
      flagPhone: !m,
      flagEmail: !e,
      flagPin: !p
    }, () => {
      if (f & l & m & e & p)
        Alert.alert("Registration...!!!!")
    })



    console.log("firstName : ", this.state.firstName);
    console.log("lastName : ", this.state.lastName);
    console.log("phoneNumber : ", this.state.phoneNumber);
    console.log("email : ", this.state.email, this.validateEmail(this.state.email));
    console.log("pinPassword : ", this.state.pinPassword);

  }

  render() {
    const { firstName, flagFirst, lastName, flagLast, email, flagEmail, phoneNumber, flagPhone, pinPassword, flagPin } = this.state;
    return (
      <View >
        <Header
          placement="left"
          leftComponent={
            <TouchableHighlight
              activeOpacity={0}
              style={{ padding: 10 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <IconI name="chevron-back" size={25} color="#548247" />
            </TouchableHighlight>
          }
          centerComponent={{ text: 'REGISTER', style: { color: '#548247', fontWeight: "bold", fontSize: 18 } }}

          containerStyle={{
            backgroundColor: 'white'
          }}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={"height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView>
            <Image
              style={styles.imageStyle}
              resizeMode={'contain'}
              source={require('../src/assests/Images/logo.png')}
            />
            <TextInputComponent title={"FIRST NAME"} keyboard_type={"default"} onChangeText={this.onChangeTextfirstName} value={firstName} />
            {
              flagFirst ? <ErrorComponent title={"Enter at least 3 characters"} /> : null
            }
            <TextInputComponent title={"LAST NAME"} keyboard_type={"default"} onChangeText={this.onChangeTextlastName} value={lastName} />
            {
              flagLast ? <ErrorComponent title={"Enter at least 3 characters"} /> : null
            }
            <TextInputComponent title={"PHONE NUMBER"} keyboard_type={"number-pad"} onChangeText={this.onChangeTextphoneNumber} value={phoneNumber} />
            {
              flagPhone ? <ErrorComponent title={"Enter your 10 digit phone number"} /> : null
            }
            <TextInputComponent title={"EMAIL"} keyboard_type={"email-address"} onChangeText={this.onChangeTextemail} value={email} />
            {
              flagEmail ? <ErrorComponent title={"Enter a valid email address"} /> : null
            }
            <PincodeComponent title={"PIN PASSWORD"} onChangeText={this.onChangeTextPassword} value={pinPassword} />
            {
              flagPin ? <ErrorComponent title={"Should enter pin password"} /> : null
            }
            <CheckBox
              title='I agree to the TERMS & CONDITIONS'
              checkedColor="#548247"
              containerStyle={{
                backgroundColor: "transparent",
                marginLeft: -5
              }}
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
            <Button
              title="Solid Button"
              title="REGISTER"
              buttonStyle={{
                backgroundColor: "#548247",
                borderRadius: 20
              }}
              onPress={this._validation}
            />

          </ScrollView>
        </KeyboardAvoidingView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    margin: 20
  },
  imageStyle: {
    width: "50%",
    height: 50,
    // borderColor :"red",
    // borderWidth : 1,
    alignSelf: "center",
    paddingBottom: 50

  }
});

export default RegisterScreen;
