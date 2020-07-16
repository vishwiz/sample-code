import React, { Component } from 'react';
import {View, TextInput, Text ,StyleSheet,KeyboardAvoidingView } from 'react-native';

const TextInputComponent = (props) => {
    const [value, onChangeText] = React.useState('');

    return (

        <KeyboardAvoidingView style={{marginVertical:5}}>
            <Text>{props.title}</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6e6e6e"
    }
})

export default TextInputComponent;