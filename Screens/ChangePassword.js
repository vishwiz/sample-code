import React, { Component } from "react";
import { Alert, StyleSheet, View, TouchableHighlight, ToastAndroid, KeyboardAvoidingView, Platform, Image, ScrollView } from "react-native";
import { Header, Button } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';

import PincodeComponent from '../src/component/PincodeComponent';
import ErrorComponent from '../src/component/ErrorComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";

import { connect } from 'react-redux';
import { changePassword } from '../src/actions';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmPinPassword: "",
            pinPassword: "",
            flagConfirmPinPassword: false,
            flagPinPassword: false,

            isLoading: false
        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.navigate("Home");
        return true;
    }




    onChangeTextphoneNumber = (value) => {
        this.setState({ pinPassword: value });
    };
    onChangeTextConfirmPassword = (value) => {
        this.setState({ confirmPinPassword: value });
    };

    _changePassword = () => {

        var Pm = this.state.pinPassword.length == 4;
        var Cm = this.state.confirmPinPassword.length == 4;




        this.setState({
            flagPinPassword: !Pm,
            flagConfirmPinPassword: !Cm
        }, () => {
            if (Pm & Cm) {

                if (this.state.pinPassword !== this.state.confirmPinPassword) {

                    ToastAndroid.showWithGravity(
                        "Pin password not matched..!!!",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );

                } else {


                    let pinPasswordRequestData = this.props.userDetails;
                    pinPasswordRequestData.loginPinCode = this.state.pinPassword

                    this.setState({ isLoading: true });
                    this.props.changePassword({
                        endurl: '/ChangePassword',
                        requestData: this.props.userDetails,
                    })

                }

            }
        })


    }

    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading) {
            return {
                isLoading: false,
            };
        }
        return null;
    }




    render() {


        const { pinPassword, confirmPinPassword, flagConfirmPinPassword, flagPinPassword } = this.state;


        return (
            <View >
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.navigate("Login")}
                        >
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{ text: 'CHANGE PASSWORD', style: { color: '#548247', fontWeight: "bold", fontSize: 18 } }}

                    containerStyle={{
                        backgroundColor: 'white'
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />
                {
                    this.props.otp_failure ? <ToastMessage message={this.props.errorMessage} /> : null
                }


                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"position"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <ScrollView>

                        <PincodeComponent
                            title={"ENTER NEW PIN PASSWORD"}
                            keyboard_type={"number-pad"}
                            onChangeText={this.onChangeTextphoneNumber}
                            value={pinPassword}
                        />
                        {flagPinPassword ? (
                            <ErrorComponent title={'Please enter pin password'} />
                        ) : null}

                        <PincodeComponent
                            title={'CONFIRM PIN PASSWORD'}
                            onChangeText={this.onChangeTextConfirmPassword}
                            value={confirmPinPassword}
                            passwordvisible={false}
                        />
                        {flagConfirmPinPassword ? (
                            <ErrorComponent title={'Please enter pin password to confirm'} />
                        ) : null}
                        <Button
                            title="Solid Button"
                            title="CHANGE PASSWORD"
                            buttonStyle={{
                                backgroundColor: "#548247",
                                borderRadius: 20,
                                marginTop: 20
                            }}
                            onPress={this._changePassword}
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
        alignSelf: "center",
        marginBottom: 30

    },
    forgetbutton: {
        width: "50%",
        fontSize: 10,
        color: "green"
    },
    textArea: {
        marginBottom: 40,
        fontSize: 15
    }
});

function mapStateToProps(state) {

    const { isLoading, userDetails, change_password_failure, errorMessage } = state.register;
    return {
        userDetails,
        isLoading,
        change_password_failure,
        errorMessage

    }
}

export default connect(mapStateToProps, { changePassword })(ChangePassword);
