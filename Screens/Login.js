import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    BackHandler
} from 'react-native';
import { Header } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputComponent from '../src/component/TextInputComponent';
import PincodeComponent from '../src/component/PincodeComponent';
import { Button } from 'react-native-elements';
import ErrorComponent from '../src/component/ErrorComponent';
import ToastMessage from "../src/component/ToastMessage";
//for redux
import { connect } from 'react-redux';
import { loginUser } from '../src/actions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

        this.state = {
            phoneNumber: '',
            flagPhone: false,
            pinPassword: '',
            flagPin: false,
            isLoading: false
        };
    }

  
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = ()=> {
        this.props.navigation.goBack();
        return true;
    }

    onChangeTextphoneNumber = (value) => {
        this.setState({ phoneNumber: value });
    };
    onChangeTextPassword = (value) => {
        this.setState({ pinPassword: value });
    };


    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading) {
            return {
                isLoading: false,
            };
        }
        return null;
    }


    _loginuser = () => {

        var m = this.state.phoneNumber.length === 10;
        var p = this.state.pinPassword.length === 4;

        this.setState({
            flagPhone: !m,
            flagPin: !p,
        }, () => {
            if (m & p) {

                this.setState({ isLoading: true })
                this.props.loginUser({
                    endurl: '/SignIn',
                    requestData: {
                        MobileNo: Number(this.state.phoneNumber),
                        LoginPinCode: Number(this.state.pinPassword),
                    },
                });

            }
        });

    };

    _forgetPassword = () => {

        var m = this.state.phoneNumber.length === 10;

        this.setState({
            flagPhone: !m
        }, () => {
            if (m) {
                this.props.navigation.navigate("ForgetPassword", { phoneNumber: this.state.phoneNumber })
            }
        });



    }

    render() {
        const { phoneNumber, flagPhone, pinPassword, flagPin } = this.state;

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
                        text: 'SIGN IN',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />
                {
                    this.props.login_failure ? <ToastMessage message={this.props.errorMessage} /> : null
                }


                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={'position'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                    <ScrollView
                        keyboardShouldPersistTaps={'handled'}
                    >
                        <Image
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                            source={require('../src/assests/Images/logo.png')}
                        />
                        <TextInputComponent
                            title={'PHONE NUMBER'}
                            keyboard_type={'number-pad'}
                            onChangeText={this.onChangeTextphoneNumber}
                            value={phoneNumber}
                            phoneNumber={true}
                            isDisable={false}
                        />
                        {flagPhone ? (
                            <ErrorComponent title={'Enter your 10 digit phone number'} />
                        ) : null}
                        <PincodeComponent
                            title={'PIN PASSWORD'}
                            onChangeText={this.onChangeTextPassword}
                            value={pinPassword}
                        />
                        {flagPin ? (
                            <ErrorComponent title={'Should enter pin password'} />
                        ) : null}

                        <Button
                            title="Solid Button"
                            title="SIGN IN"
                            buttonStyle={{
                                backgroundColor: '#548247',
                                borderRadius: 20,
                                marginTop: 20,
                            }}
                            onPress={this._loginuser}
                        />
                    </ScrollView>

                    <TouchableOpacity
                        style={{ padding: 15 }}
                        onPress={this._forgetPassword}
                    >
                        <Text style={{ fontSize: 12, color: "blue", textDecorationLine: "underline" }}>FORGET PASSWORD</Text>

                    </TouchableOpacity>
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
        marginBottom: 30,
    },
    forgetbutton: {
        width: '50%',
        fontSize: 10,
        color: 'green',
    },
});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage } = state.register;
    return {
        isLoading, login_failure, errorMessage
    };
}

export default connect(mapStateToProps, { loginUser })(LoginScreen);
