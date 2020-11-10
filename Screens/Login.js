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
import { Header, Divider } from 'react-native-elements';
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
                // isError: props.login_failure
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

                this.setState({ isLoading: true, isError : true })
                this.props.loginUser({
                    endurl: '/SignIn',
                    routeTo: this.props.route.params.routeTo ?  this.props.route.params.routeTo : "Home", 
                    requestData: {
                        MobileNo: Number(this.state.phoneNumber),
                        LoginPinCode: this.state.pinPassword,
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
                    (this.state.isError && this.props.login_failure) ? <ToastMessage message={this.props.errorMessage} /> : null
                }
                {
                    this.props.route.params.register ?
                        <View style={{padding:20}}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Register")}
                                style={{ borderColor: "#548247", width: "100%", borderWidth: 1, alignItems: "center", height: 40, justifyContent: "center", borderRadius: 5 }}>
                                <Text style={{ color: "#548247" }}>REGISTER</Text>
                            </TouchableOpacity>
                            <View style={{ width: 300, alignSelf: "center", padding: 20, marginTop: 20 }}>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <View style={{ alignSelf: "center", borderColor: "gray", borderWidth: 1, height: 30, width: 30, padding: 5, borderRadius: 15, top: -15, backgroundColor: "white", }}>
                                    <Text style={{ fontSize: 12 }}>OR</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <Image
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                            source={require('../src/assests/Images/Log_png-01.png')}
                        />
                }


                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={'position'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                    <ScrollView
                        keyboardShouldPersistTaps={'always'}
                    >

                        <TextInputComponent
                            title={'PHONE NUMBER'}
                            keyboard_type={'number-pad'}
                            onChangeText={this.onChangeTextphoneNumber}
                            value={phoneNumber}
                            phoneNumber={true}
                            isDisable={false}
                            isMandatory={true}
                        />
                        {flagPhone ? (
                            <ErrorComponent title={'Enter your 10 digit phone number'} />
                        ) : null}
                        <PincodeComponent
                            title={'PIN PASSWORD'}
                            onChangeText={this.onChangeTextPassword}
                            value={pinPassword}
                            isMandatory={true}
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
        marginTop:-30
    },
    imageStyle: {
        width: '50%',
        height: 70,
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
