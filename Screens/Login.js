import React, { Component } from "react";
import { Alert, StyleSheet, View, TouchableHighlight, StatusBar, KeyboardAvoidingView, Platform, Image, ScrollView } from "react-native";
import { Header } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import TextInputComponent from '../src/component/TextInputComponent';
import PincodeComponent from '../src/component/PincodeComponent';
import { Button } from 'react-native-elements';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            flagPhone: false,
            pinPassword: "",
            flagPin: false,
        };
    }


    render() {
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
                    centerComponent={{ text: 'SIGN IN', style: { color: '#548247', fontWeight: "bold", fontSize: 18 } }}

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
                        <Image
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                            source={require('../src/assests/Images/logo.png')}
                        />
                        <TextInputComponent title={"PHONE NUMBER"} keyboard_type={"number-pad"} />
                        <PincodeComponent title={"PIN PASSWORD"} />
                        <Button
                            title="Solid Button"
                            title="SIGN IN"
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

    }
});

export default LoginScreen;
