import React, { Component } from "react";
import { BackHandler, StyleSheet, View, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView, Platform, Text, ScrollView } from "react-native";
import { Header, Button } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';

import TextInputComponent from '../src/component/TextInputComponent';
import PincodeComponent from '../src/component/PincodeComponent';
import ErrorComponent from '../src/component/ErrorComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";

import { connect } from 'react-redux';
import { varifyOtp ,resendOtp} from '../src/actions';

class OtpVarification extends Component {

    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            OtpPassword: "",
            flagOtp: false,
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
                    routeData : this.props.route.params.directionTo
                })
            }
        })
    }

    _resendOTP = () => {
        this.setState({ isLoading: true });
        this.props.resendOtp({
            endurl: '/RESendOTP',
            requestData: {
                "UserId": this.props.userDetails?.userId,
                "MobileNo": this.props.userDetails?.mobileNo
            },
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
                    (this.props.resend_otp_failure || this.props.otp_failure || this.props.resend_otp_success ) ? <ToastMessage message={this.props.errorMessage} /> : null
                }
                


                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"position"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <ScrollView>
                        <TextInputComponent title={"YOUR PHONE NUMBER"} keyboard_type={"number-pad"} onChangeText={this.onChangeTextphoneNumber} value={this.props.userDetails?.mobileNo} phoneNumber={true} isDisable={true} />
                        <PincodeComponent title={"ENTER THE OTP"} onChangeText={this.onChangeTextPassword} value={OtpPassword} passwordvisible={true} />
                        {flagOtp ? (
                            <ErrorComponent title={'Should Enter Valid OTP'} />
                        ) : null}

                        <TouchableOpacity
                            style={{ padding: 15 }}
                            onPress={this._resendOTP}
                        >
                            <Text style={{ fontSize: 12, top: -20 }}>{`Not received OTP?    RESEND OTP`}</Text>

                        </TouchableOpacity>
                        <Button
                            title="Solid Button"
                            title="VERIFY OTP"
                            buttonStyle={{
                                backgroundColor: "#548247",
                                borderRadius: 20,
                                marginTop: 5
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

    const { isLoading, userDetails, otp_failure,resend_otp_failure ,errorMessage, resend_otp_success} = state.register;
    return {
        userDetails,
        isLoading,
        otp_failure,
        errorMessage,
        resend_otp_failure,
        resend_otp_success
    }
}

export default connect(mapStateToProps, { varifyOtp , resendOtp})(OtpVarification);
