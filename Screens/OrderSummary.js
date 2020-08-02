import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    FlatList,
    Image,
    ScrollView
} from 'react-native';
import { Header, Badge, Divider } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";

//for redux
import { connect } from 'react-redux';
import { loginUser } from '../src/actions';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

        };
    }


    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading) {
            return {
                isLoading: false,
            };
        }
        return null;
    }

    _renderFlatList = (item, index) => {
        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <View>
                    <Image
                        style={styles.imageStyle}
                        source={{
                            uri: item.item.productImageUrl
                        }}
                        resizeMode={"contain"}

                    />

                </View>
                <View style={{ marginLeft: 20, flex: 1 }}>
                    <Text>{item.item.name}</Text>
                    <Text style={{ color: "#6bb757", fontWeight: "bold", alignSelf: "flex-end" }}> You Pay ₹ {item.item.totalSelllingPriceWithQuantity}.00</Text>
                    <Text style={{ color: "#ef2626", fontSize: 12, alignSelf: "flex-end" }}> You Save ₹ {item.item.totalSavingAmmount}.00</Text>
                    <Text style={{ fontSize: 12 }}> Quantity {item.item.quantity}</Text>
                </View>
            </View>
        )
    }




    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.goBack()}>
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{
                        text: 'ORDER SUMMARY',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}

                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />
                {
                    this.props.login_failure ? <ToastMessage message={this.props.errorMessage} /> : null
                }

                <View style={{
                    flexDirection: "column", padding: 10, backgroundColor: "white", borderColor: "#dddbdb",
                    borderWidth: 1,
                    borderRadius: 5,

                }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
                        <Text style={{ color: "black" }}>Cart Value: <Text style={{ fontStyle: "italic", fontSize: 10, color: "gray" }}>(Incl. of Taxes)</Text></Text>
                        <Text style={{ fontWeight: "bold" }}>₹{this.props.totalPaymentedValue}.00</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
                        <Text style={{ color: "black" }}>Delivery Charges : </Text>
                        <Text style={{ fontWeight: "bold" }}>₹0.00</Text>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
                        <Text style={{ color: "#6bb757" }}>Amount Payable: <Text style={{ fontStyle: "italic", fontSize: 10, color: "gray" }}>(Incl. of Taxes)</Text> </Text>
                        <Text style={{ fontWeight: "bold", color: "#6bb757" }}>₹{this.props.totalPaymentedValue}.00</Text>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
                        <Text style={{ color: "#ef2626" }}>Your Saving <Text style={{ fontSize: 10 }}>(on M.R.P.) :</Text> </Text>
                        <Text style={{ fontWeight: "bold", color: "#ef2626" }}>₹{this.props.totalSaving}.00</Text>
                    </View>
                </View>

                <ScrollView>

                    <View style={{
                        flexDirection: "column",
                        padding: 10,
                        backgroundColor: "white",
                        borderColor: "#dddbdb",
                        borderWidth: 1,
                        borderRadius: 5,
                        marginVertical: 10
                    }}>
                        <Text>You Selected: <Text>Self Pick Up</Text></Text>
                        <View style={{ marginVertical: 10 }}>
                            <Divider style={{ backgroundColor: 'black' }} />
                        </View>
                        <Text>You Selected: <Text>Self Pick Up</Text></Text>
                        <Text>You Selected: <Text>Self Pick Up</Text></Text>

                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            padding: 10,
                            backgroundColor: "white",
                            borderColor: "#dddbdb",
                            borderWidth: 1,
                            borderRadius: 5,
                            marginVertical: 10,
                            marginBottom: 50
                        }}
                    >
                        <FlatList
                            data={this.props.OrderSummaryItemArray}
                            ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'gray' }} />}

                            ListHeaderComponent={() => <View >
                                <Text style={{ backgroundColor: "white", color: "black", fontSize: 14 }}>Item(s) in cart {this.props.OrderSummaryItemArray.length}, Quantity {this.props.totalItem}</Text>
                                <View style={{ marginVertical: 10 }}>
                                    <Divider style={{ backgroundColor: 'black' }} />
                                </View>
                            </View>}
                            renderItem={(item, index) => this._renderFlatList(item, index)}
                            keyExtractor={item => item.id.toString()}
                        />


                    </View>


                </ScrollView>

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#548247", height: 50, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("SelectDeliveryType")}
                    >
                        <Text style={{ color: "white", fontSize: 14 }}>PROCEED TO MAKE PAYMENT</Text>
                    </TouchableOpacity>
                </View>




            </View>

        );
    }
}

const styles = StyleSheet.create({
    upperContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        backgroundColor: "#e5e5e5",
        padding: 10,
        alignItems: "center"
    },
    imageStyle: {
        height: 80,
        width: 80,
    }
});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage } = state.register;
    const { totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray } = state.userOrderAndDeliveryReducer;
    return {
        isLoading, login_failure, errorMessage, totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray
    };
}

export default connect(mapStateToProps, { loginUser })(OrderSummary);
