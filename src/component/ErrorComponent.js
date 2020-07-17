import React from 'react';
import { Text, StyleSheet, } from 'react-native';

const ErrorComponent = (props) => {
    return (
        <Text style={styles.textinput}>{props.title}</Text>
    );
}

const styles = StyleSheet.create({

    textinput: {
        color: "#dd2a2a",
        fontSize: 12,
        alignSelf : "flex-end" 
    }


})

export default ErrorComponent;