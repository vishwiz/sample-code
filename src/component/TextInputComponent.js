import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import MarqueeText from 'react-native-marquee';
import TextTicker from 'react-native-text-ticker';

const TextInputComponent = (props) => {
    const [highlight, onFocusHighlight] = React.useState(false);

    return (

        <KeyboardAvoidingView style={{ marginVertical: 5 }}>
            <Text style={[styles.textinput, { color: highlight ? "green" : "gray" }]}>{props.title}</Text>

            <View style={[styles.inputarea, { borderColor: highlight ? "green" : "gray" }]}>
                {
                    props.phoneNumber ? <Text style={styles.prefix}>+91</Text> : null
                }
                {props.marquee ?
                    <TextInput
                        style={{ height: 40, width: "100%", fontSize: 16 }}
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
                    />
                    :
                    <TextTicker
                        style={{ fontSize: 12 }}
                        duration={20000}
                        loop
                        bounce
                        repeatSpacer={50}
                    >
                        Super long piece of text is long. The quick brown fox jumps over the lazy dog. fdgdfg gdgdf fgdfg rdgdfgdf grdg hdfh rdfhfukf  hdfhddtw  gdgfd jftjtf hfdfhdf.
                  </TextTicker>
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
        backgroundColor: "#f7f7f7"
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