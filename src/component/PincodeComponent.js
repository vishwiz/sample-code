import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const PincodeComponent = (props) => {

    return (

        <KeyboardAvoidingView style={{ marginVertical: 5, height: 80 }}>
            <Text style={styles.textinput}>{props.title}</Text>
            <View style={styles.pincodeStyle}>
                <SmoothPinCodeInput
                    password
                    mask="﹡"
                    cellSize={36}
                    codeLength={4}
                    cellStyleFocused={{
                        borderColor: 'green',
                    }}
                    value={props.value}
                    onTextChange={value => {
                        value = value.replace(/[^0-9]/g, "")
                        props.onChangeText(value)
                    }}
                />
            </View>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6e6e6e"
    },
    pincodeStyle: {
        flex: 1,
        alignItems: "center",
    },
    textinput: {
        color: "gray",
        padding: 5,
        fontSize: 12,
        alignItems: "center",
    }
})

export default PincodeComponent;