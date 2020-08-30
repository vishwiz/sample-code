import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import MarqueeText from 'react-native-marquee';
import TextTicker from 'react-native-text-ticker';

const TextInputComponent = (props) => {
    const [highlight, onFocusHighlight] = React.useState(false);

    return (

        <KeyboardAvoidingView style={{ marginVertical: 5 }}>
            <View style={{flexDirection:"row"}}>
                <Text style={[styles.textinput, { color: highlight ? "green" : "gray" }]}>{props.title}</Text>
               {
                   props.isMandatory ? <Text style={{ color: "red" }}> *</Text> : null
               } 
            </View>


            <View style={[styles.inputarea, { borderColor: highlight ? "green" : "gray" }]}>
                {
                    props.phoneNumber ? <Text style={styles.prefix}>+91</Text> : null
                }
                {props.marquee ?

                    <TextTicker
                        style={{ fontSize: 12 }}
                        duration={20000}
                        loop
                        bounce
                        repeatSpacer={50}
                    >
                        {props.value}
                    </TextTicker>
                    :
                    <TextInput
                        style={[{ height: 40, width: "100%", fontSize: 16 }, props.personalStyle]}
                        editable={!props.isDisable}
                        onChangeText={text => {
                            if (props.phoneNumber) {
                                text = text.replace(/[^0-9]/g, "")
                            }
                            props.onChangeText(text)
                        }}
                        // inlineImageLeft='search_icon'
                        onFocus={() => onFocusHighlight(true)}
                        onBlur={() => onFocusHighlight(false)}
                        value={props.value}
                        keyboardType={props.keyboard_type}
                        placeholder={props.placeholder}
                    // placeholderStyle={{ }}
                    />

                }
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
        backgroundColor: "#f4f4f4"
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