import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  TouchableHighlight,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  BackHandler
} from 'react-native';
import { Header } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import TextInputComponent from '../src/component/TextInputComponent';
import PincodeComponent from '../src/component/PincodeComponent';
import ErrorComponent from '../src/component/ErrorComponent';
import ToastMessage from "../src/component/ToastMessage";
import Spinner from 'react-native-loading-spinner-overlay';

import { Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { registerUser } from '../src/actions';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.state = {
      firstName: '',
      flagFirst: false,
      lastName: '',
      flagLast: false,
      phoneNumber: '',
      flagPhone: false,
      email: '',
      flagEmail: false,
      pinPassword: '',
      flagPin: false,
      checked: false,
      isLoading: false,
      isError: false
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  onChangeTextfirstName = (value) => {
    this.setState({ firstName: value });
  };
  onChangeTextlastName = (value) => {
    this.setState({ lastName: value });
  };
  onChangeTextphoneNumber = (value) => {
    this.setState({ phoneNumber: value });
  };
  onChangeTextemail = (value) => {
    this.setState({ email: value });
  };
  onChangeTextPassword = (value) => {
    this.setState({ pinPassword: value });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  _validation = () => {
    var f = this.state.firstName.length > 3;
    var l = this.state.lastName.length > 3;
    var m = this.state.phoneNumber.length == 10;
    var e = this.state.email.length === 0 || this.validateEmail(this.state.email);
    var p = this.state.pinPassword.length == 4;

    this.setState(
      {
        flagFirst: !f,
        flagLast: !l,
        flagPhone: !m,
        flagEmail: !e,
        flagPin: !p,
      },
      () => {
        if (f & l & m & e & p) {
          let register_user = {
            "UserId": 0,
            "FirstName": this.state.firstName,
            "LastName": this.state.lastName,
            "MobileNo": this.state.phoneNumber,
            "EmailId": this.state.email,
            "LoginPinCode": this.state.pinPassword
          };
          if (!this.state.checked) {
            ToastAndroid.showWithGravity(
              "Pleade agree to our T&C to register",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            this.setState(function (state, props) { return { isLoading: true, isError: true } });
            this.props.registerUser({
              endurl: '/RegisterUser',
              requestData: register_user,
            });
          }


        }
      },
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.isLoading) {
      return {
        isLoading: false,
      };
    }

    return null;
  }

  render() {
    const {
      firstName,
      flagFirst,
      lastName,
      flagLast,
      email,
      flagEmail,
      phoneNumber,
      flagPhone,
      pinPassword,
      flagPin,
    } = this.state;
    return (
      <View>
        <Header
          placement="left"
          leftComponent={
            <TouchableHighlight
              activeOpacity={0}
              style={{ padding: 10 }}
              onPress={() => this.props.navigation.goBack()}>
              <IconI name="chevron-back" size={25} color="#548247" />
            </TouchableHighlight>
          }
          centerComponent={{
            text: 'REGISTER',
            style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
          }}
          containerStyle={{
            backgroundColor: 'white',
          }}
        />
        <Spinner visible={this.state.isLoading} color="green" />

        {
          (this.state.isError && this.props.register_failure) ? <ToastMessage message={this.props.errorMessage} /> : null
        }

        <KeyboardAvoidingView
          style={styles.container}
          behavior={'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
          >
            <Image
              style={styles.imageStyle}
              resizeMode={'contain'}
              source={require('../src/assests/Images/online_bazar_logo.png')}
            />

            <TextInputComponent
              title={'FIRST NAME'}
              keyboard_type={'default'}
              onChangeText={this.onChangeTextfirstName}
              value={firstName}
              isDisable={false}
              isMandatory={true}
              maxLength={50}
            />
            {flagFirst ? (
              <ErrorComponent title={'Enter at least 3 characters'} />
            ) : null}
            <TextInputComponent
              title={'LAST NAME'}
              keyboard_type={'default'}
              onChangeText={this.onChangeTextlastName}
              value={lastName}
              isDisable={false}
              isMandatory={true}
              maxLength={50}
            />
            {flagLast ? (
              <ErrorComponent title={'Enter at least 3 characters'} />
            ) : null}
            <TextInputComponent
              title={'PHONE NUMBER'}
              keyboard_type={'number-pad'}
              onChangeText={this.onChangeTextphoneNumber}
              value={phoneNumber}
              phoneNumber={true}
              isDisable={false}
              isMandatory={true}
              maxLength={10}
            />
            {flagPhone ? (
              <ErrorComponent title={'Enter your 10 digit phone number'} />
            ) : null}
            <TextInputComponent
              title={'EMAIL (Optional)'}
              keyboard_type={'email-address'}
              onChangeText={this.onChangeTextemail}
              value={email}
              isDisable={false}
              maxLength={50}
            />
            {flagEmail ? (
              <ErrorComponent title={'Enter a valid email address'} />
            ) : null}
            <PincodeComponent
              title={'PIN PASSWORD'}
              onChangeText={this.onChangeTextPassword}
              value={pinPassword}
              passwordvisible={false}
              isMandatory={true}
            />
            {flagPin ? (
              <ErrorComponent title={'Should enter pin password'} />
            ) : null}
            <CheckBox
              title="I agree to the TERMS & CONDITIONS"
              checkedColor="#548247"
              containerStyle={{
                backgroundColor: 'transparent',
                marginLeft: -5,
              }}
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
            <Button
              title="Solid Button"
              title="REGISTER"
              buttonStyle={{
                backgroundColor: '#548247',
                borderRadius: 20,
              }}
              onPress={this._validation}
            />
            {/* <View style={{ height: 100 }}></View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    margin: 20,
  },
  imageStyle: {
    width: '50%',
    height: 50,
    alignSelf: 'center',
    paddingBottom: 50,
  },
});

function mapStateToProps(state) {
  return {
    userDetails: state.register.userDetails,
    isLoading: state.register.isLoading,
    register_failure: state.register.register_failure,
    errorMessage: state.register.errorMessage
  };
}

export default connect(mapStateToProps, { registerUser })(RegisterScreen);
