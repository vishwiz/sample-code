import React, { Component } from "react";
import { Alert, StyleSheet, View, TouchableHighlight, Text, KeyboardAvoidingView, Platform, Image, ScrollView } from "react-native";
import { Header, Button } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';

import TextInputComponent from '../src/component/TextInputComponent';
import ErrorComponent from '../src/component/ErrorComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";

import { connect } from 'react-redux';
import { forgetPassword } from '../src/actions';

class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: this.props.route.params.phoneNumber,
            flagPhone: false,
            isLoading: false
        };
    }


    onChangeTextphoneNumber = (value) => {
        this.setState({ phoneNumber: value });
    };

    _resetPassword = () => {

        var m = this.state.phoneNumber.length == 10;

        this.setState({
            flagPhone: !m
        }, () => {
            if (m) {

                this.setState({ isLoading: true });
                this.props.forgetPassword({
                    endurl: '/ForgotPassword',
                    requestData: {
                        UserId: 1,
                        MobileNo: this.state.phoneNumber
                    },
                })
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


        const { phoneNumber, flagPhone } = this.state;


        return (
            <View >
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.navigate("Home")}
                        >
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{ text: 'FORGET PASSWORD', style: { color: '#548247', fontWeight: "bold", fontSize: 18 } }}

                    containerStyle={{
                        backgroundColor: 'white'
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />
                {
                    this.props.forget_password_failure ? <ToastMessage message={this.props.errorMessage} /> : null
                }


                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"position"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <ScrollView>
                        <Text
                            style={styles.textArea}
                        >
                            {`One Time Password (OTP) will be send to your registered phone number.`}
                        </Text>
                        <TextInputComponent title={"ENTER REGISTERED PHONE NUMBER"} keyboard_type={"number-pad"} onChangeText={this.onChangeTextphoneNumber} value={phoneNumber} phoneNumber={true} isDisable={true} />
                       
                        <Button
                            title="Solid Button"
                            title="RESET PASSWORD"
                            buttonStyle={{
                                backgroundColor: "#548247",
                                borderRadius: 20,
                                marginTop: 20
                            }}
                            onPress={this._resetPassword}
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

    const { isLoading, userDetails, forget_password_failure, errorMessage } = state.register;
    return {
        userDetails,
        isLoading,
        forget_password_failure,
        errorMessage

    }
}

export default connect(mapStateToProps, { forgetPassword })(ForgetPassword);
