import React, { Component } from "react";
import { Alert, StyleSheet, View, TouchableHighlight, StatusBar, KeyboardAvoidingView, Platform, Image, ScrollView } from "react-native";
import { Header } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";

import { registerUser } from "../src/actions";
import TextInputComponent from '../src/component/TextInputComponent';
import PincodeComponent from '../src/component/PincodeComponent';

import { Button } from 'react-native-elements';

class OtpVarification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // phoneNumber : "",
            OtpPassword: "",
            flagOtp: false,
        };
    }


    onChangeTextPassword = (value) => {
        this.setState({ OtpPassword: value })
    }



    render() {

        const { OtpPassword, flagPin } = this.state;


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

                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"position"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <ScrollView>
                        <TextInputComponent title={"YOUR PHONE NUMBER"} keyboard_type={"number-pad"} onChangeText={this.onChangeTextphoneNumber} value={this.props.userDetails.mobileNo} phoneNumber={true} isDisable={true} />
                        <PincodeComponent title={"ENTER THE OTP"} onChangeText={this.onChangeTextPassword} value={OtpPassword} passwordvisible={true} />

                        <Button
                            title="Solid Button"
                            title="VERIFY OTP"
                            buttonStyle={{
                                backgroundColor: "#548247",
                                borderRadius: 20,
                                marginTop: 20
                            }}
                        // onPress={this._fetchData}
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
        marginBottom: 30

    },
    forgetbutton: {
        width: "50%",
        fontSize: 10,
        color: "green"
    }
});

function mapStateToProps(state) {
    return {
        userDetails: state.register.userDetails,
        isLoading: state.register.isLoading
    }
}

export default connect(mapStateToProps, { registerUser })(OtpVarification);
