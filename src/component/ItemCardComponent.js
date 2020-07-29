import React from 'react';
import { Text, StyleSheet, Image, View, TouchableHighlight } from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Intl = require('react-native-intl');


const ItemCardComponent = (props) => {

    const { item, index } = props.itemData;

    return (
        <View style={styles.container}>
            <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={styles.imageStyle}
                    source={{
                        uri: item.productImageUrl
                    }}
                    resizeMode = {"contain"}

                />

                <TouchableOpacity
                    onPress={() => props.remove(index)}
                >
                    <Text style={styles.textRemove}>REMOVE</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "70%", padding: 10 }}>
                <Text style={styles.textinput}>{item.name}</Text>
                <Text style={[styles.textinput, { fontSize: 12 }]}>{item.quantity} {item.unit}</Text>

                <View style={{ alignItems: 'flex-end', a: "center" }}>
                    <Text style={styles.textinputDmart}>{"DMart   ₹"}{item.totalSelllingPriceWithQuantity}{".00"}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.textRemove, { marginTop: 0, textAlignVertical: "center" }]}>{"You Save   "}</Text>
                        <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 10, borderRadius: 5, backgroundColor: "#d1801d", color: "white" }}>
                            {"₹"}{item.totalSavingAmmount}{".00"}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", textAlignVertical: "center", borderColor: "#e0e0e0", borderWidth: 1, borderRadius: 5, marginTop: 30 }}>

                        <TouchableOpacity
                            activeOpacity={0}
                            style={{ padding: 10, borderColor: "#e0e0e0", borderRightWidth: 1, backgroundColor: "#e0e0e0", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}

                            onPress={() => props.counterIncrementAndDecrement(index, -1)}
                        >
                            <IconA name="minus" size={15} color="#548247" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, width: 40, textAlignVertical: "center", textAlign: "center" }}>{item.quantity}</Text>
                        <TouchableOpacity
                            activeOpacity={0}
                            style={{ padding: 10, borderColor: "#e0e0e0", borderLeftWidth: 1, backgroundColor: "#e0e0e0", borderTopEndRadius: 5, borderBottomEndRadius: 5 }}
                            onPress={() => props.counterIncrementAndDecrement(index, +1)}

                        >
                            <IconA name="plus" size={15} color="#548247" />
                        </TouchableOpacity>
                    </View>


                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignContent: "center",
        height: 170,
        backgroundColor: "white",
        // borderWidth : 1,
        // borderColor : "red"
    },
    textRemove: {
        color: "#dd2a2a",
        marginTop: 30,
        fontSize: 10,
        //  borderWidth : 1,
        // borderColor : "red"
    },
    textinput: {
        color: "#474747",
    },
    textinputDmart: {
        color: "green",
        fontSize: 15,
        fontWeight: "bold"
    },
    imageStyle: {
        width: 80,
        height: 80
    }


})

export default ItemCardComponent;