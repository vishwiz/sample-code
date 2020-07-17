import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';

const TextInputComponent = (props) => {
    const [highlight, onFocusHighlight] = React.useState(false);

    return (

        <KeyboardAvoidingView style={{ marginVertical: 5 }}>
            <Text style={styles.textinput}>{props.title}</Text>

            <View style={[styles.inputarea, { borderColor: highlight ? "green" : "gray" }]}>
                {
                    props.title === "PHONE NUMBER" ? <Text style={styles.prefix}>+91</Text> : null
                }
                <TextInput
                    style={{ height: 40, width: "100%", fontSize: 16 }}
                    onChangeText={text => {
                        if (props.title === "PHONE NUMBER") {
                            text = text.replace(/[^0-9]/g, "")
                        }
                        props.onChangeText(text)
                    }}
                    onFocus={() => onFocusHighlight(true)}
                    onBlur={() => onFocusHighlight(false)}
                    value={props.value}
                    keyboardType={props.keyboard_type}
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
    textinput: {
        color: "gray",
        paddingVertical: 5,
        fontSize: 12
    },
    inputarea: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    prefix: {
        paddingHorizontal: 5,
        color: 'black',
        alignItems: 'center',
        fontSize: 16,
        textAlignVertical: "center",
        height: 40

    }

})

export default TextInputComponent;