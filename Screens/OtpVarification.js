import React, { Component } from "react";
import { Alert, StyleSheet, View, TouchableHighlight, StatusBar, KeyboardAvoidingView, Platform, Image, ScrollView } from "react-native";
import { Header, Button } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';

import TextInputComponent from '../src/component/TextInputComponent';
import PincodeComponent from '../src/component/PincodeComponent';
import ErrorComponent from '../src/component/ErrorComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";

import { connect } from 'react-redux';
import { varifyOtp } from '../src/actions';

class OtpVarification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            OtpPassword: "",
            flagOtp: false,
            isLoading: false
        };
    }


    onChangeTextPassword = (value) => {
        this.setState({ OtpPassword: value })
    }

    _varifyOtp = () => {

        var p = this.state.OtpPassword.length == 4;

        this.setState({
            flagOtp: !p
        }, () => {
            if (p) {

                let otpRequestData = this.props.userDetails;
                otpRequestData.otp = this.state.OtpPassword

                this.setState({ isLoading: true });
                this.props.varifyOtp({
                    endurl: '/VerifyOtp',
                    requestData: this.props.userDetails,
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


        console.log("this.props.userDetails : ", this.props);

        const { OtpPassword, flagOtp } = this.state;


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
                    centerComponent={{ text: 'OTP VARIFICATION', style: { color: '#548247', fontWeight: "bold", fontSize: 18 } }}

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
                        <TextInputComponent title={"YOUR PHONE NUMBER"} keyboard_type={"number-pad"} onChangeText={this.onChangeTextphoneNumber} value={this.props.userDetails.mobileNo} phoneNumber={true} isDisable={true} />
                        <PincodeComponent title={"ENTER THE OTP"} onChangeText={this.onChangeTextPassword} value={OtpPassword} passwordvisible={true} />
                        {flagOtp ? (
                            <ErrorComponent title={'Should Enter Valid OTP'} />
                        ) : null}
                        <Button
                            title="Solid Button"
                            title="VERIFY OTP"
                            buttonStyle={{
                                backgroundColor: "#548247",
                                borderRadius: 20,
                                marginTop: 20
                            }}
                            onPress={this._varifyOtp}
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
    }
});

function mapStateToProps(state) {

    const { isLoading, userDetails, otp_failure, errorMessage } = state.register;
    return {
        userDetails,
        isLoading,
        otp_failure,
        errorMessage

    }
}

export default connect(mapStateToProps, { varifyOtp })(OtpVarification);
