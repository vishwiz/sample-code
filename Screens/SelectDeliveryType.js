import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Alert,
    BackHandler
} from 'react-native';
import { Header, Divider } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Entypo';
import Popover from 'react-native-popover-view';


import Spinner from 'react-native-loading-spinner-overlay';

//for redux
import { connect } from 'react-redux';
import { loginUser } from '../src/actions';

class SelectDeliveryType extends Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

        this.state = {
            fullView: false,
            showPopover: false

        };
    }

    componentWillUnmount() {


        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.navigate("ViewCart");
        return true;
    }



    render() {


        return (
            <View>
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.navigate("ViewCart")}>
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{
                        text: 'SELECT DELIVERY TYPE',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />


                <View style={styles.upperContainer}>
                    <View >
                        <Text style={{ fontSize: 12, color: 'black' }}>Order Summary</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ fullView: !this.state.fullView })
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: "black", fontSize: 12, fontStyle: 'italic', marginEnd: 5 }}>
                                {this.state.fullView ? "Show Less" : `Tap for more details`}
                            </Text>
                            <IconA name="down" size={12} color="black" />
                        </View>

                    </TouchableOpacity>


                </View>
                {
                    this.state.fullView ? <View style={styles.lowerContainer}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 12, color: 'black' }}>Your Cart Value :</Text>
                            <Text style={{ fontSize: 12, color: 'black' }}>₹{this.props.totalPaymentedValue}.00</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 12, color: 'black' }}>Delivery Charges :</Text>

                            <Popover
                                isVisible={this.state.showPopover}
                                onRequestClose={() => {
                                    this.setState({ showPopover: false })
                                }}
                                popoverStyle={{ backgroundColor: "#fff6b2" }}
                                from={(
                                    <TouchableOpacity
                                        onPress={() => this.setState({ showPopover: true })}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <IconA name="exclamationcircle" size={12} color="black" />

                                            <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold", marginLeft: 5 }}>VIEW</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}>
                                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                                    <Text style={{ fontSize: 12, color: "black" }}>{`For Home  Delivery, we Charge Rs. 49.00 or 3.00% of the order value- whichever is higer.\nFor Free Delivery, Select Pick-up Point.`}</Text>
                                </View>
                            </Popover>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 12, color: 'black' }}>Your Charges :</Text>
                            <Text style={{ fontSize: 12, color: 'black' }}>₹{this.props.totalSaving}.00</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10, fontStyle: "italic", color: 'black' }}>
                                Tax of 206.53 included in total amount
                                </Text>
                        </View>

                    </View>
                        :
                        null
                }

                <Text
                    style={{ fontSize: 12, padding: 10, color: "#494949" }}
                >Tap to select one of the delivery modes</Text>

                <TouchableOpacity
                    onPress={() => {
                        if (Number(this.props.productSettings.StoreCollectMinimumOrderAmount) > Number(this.props.totalPaymentedValue)) {
                            Alert.alert("", `For Self Up Minimum Order Amount Rs. ${this.props.productSettings.StoreCollectMinimumOrderAmount}` )

                        } else {
                            this.props.navigation.navigate("SelectPickUpPoint", { headerValue: "SELECT PICK UP POINT" })
                        }
                    }}
                >

                    <View style={styles.deliveryContainer}>
                        <View style={styles.leftDeliveryContainer}>
                            <Text style={{ fontSize: 14, color: 'black' }}>SELF PICK UP</Text>
                            <View style={{ height: 25 }}>
                                <Text style={{ fontSize: 10, color: 'gray', fontStyle: 'italic' }}>{`(Our Recommendation)`}</Text>
                            </View>
                            <Text style={{ fontSize: 11, color: 'black' }}>You can collect your order from a FeelFul Ready Pick-up point. Select a self Pick-up Point near you and a convenient time slot.</Text>
                            <Text style={{ fontSize: 14, color: '#0f4760', paddingTop: 10 }}>DELIVERY FREE</Text>
                        </View>
                        <View style={[styles.rightDeliveryContainer, { backgroundColor: "#ffdbdb" }]}>
                            <View style={[styles.imageContainer, { backgroundColor: "#ff9b9b" }]}>
                                <IconF name="emoji-flirt" size={55} color="white" />
                            </View>

                            <View style={styles.selectStyle}>
                                <Text style={{ color: "white", fontSize: 10 }}>
                                    SELECT
                                    </Text>

                            </View>

                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ width: 300, alignSelf: "center", padding: 20 }}>
                    <Divider style={{ backgroundColor: 'black' }} />
                    <View style={{ alignSelf: "center", borderColor: "gray", borderWidth: 1, height: 30, width: 30, padding: 5, borderRadius: 15, top: -15, backgroundColor: "white", }}>
                        <Text style={{ fontSize: 12 }}>OR</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        if (Number(this.props.productSettings.HomeDeliveryMinimumOrderAmount) > Number(this.props.totalPaymentedValue)) {
                            Alert.alert("", `For Home Delivery Minimum Order Amount Rs. ${this.props.productSettings.HomeDeliveryMinimumOrderAmount}` )
                        } else {
                            this.props.navigation.navigate("SelectDeliveryAddress", { headerValue: "SELECT DELIVERY ADDRESS" })
                        }
                    }}
                >
                    <View style={[styles.deliveryContainer, { marginTop: -10 }]}>
                        <View style={styles.leftDeliveryContainer}>
                            <Text style={{ fontSize: 13, color: 'black' }}>HOME DELIVERY</Text>

                            <Text style={{ fontSize: 11, color: 'black' }}>You can also get your orders delivered to an address of your choice. Rs. 49.00 or 3.00% of value whichever is higer will be added to your order amount .</Text>
                            <Text style={{ fontSize: 13, color: '#0f4760' }}>DELIVERY CHARGES EXTRA</Text>

                        </View>
                        <View style={[styles.rightDeliveryContainer, { backgroundColor: "#d7dce5" }]}>
                            <View style={styles.imageContainer}>
                                <IconI name="ios-home-outline" size={55} color="white" />
                            </View>
                            <View style={[styles.selectStyle, { backgroundColor: "#548247" }]}>
                                <Text style={{ color: "white", fontSize: 10 }}>
                                    SELECT
                                    </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    upperContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
        backgroundColor: "#9cb7b5",
        paddingHorizontal: 10,
        alignItems: "center"
    },
    deliveryContainer: {
        height: 140,
        borderColor: "#e0e0e0",
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        flexDirection: "row",
    },
    lowerContainer: {
        justifyContent: "space-around",
        height: 90,
        backgroundColor: "#9cb7b5",
        paddingHorizontal: 10,
        paddingVertical: 5

    },
    leftDeliveryContainer: {
        flex: 5,
        padding: 10,
        justifyContent: "space-between",
    },
    rightDeliveryContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "space-around"
    },
    imageContainer: {
        backgroundColor: "#0f4760",
        justifyContent: "center",
        alignItems: "center",
        height: 90,
        width: 90,
        borderRadius: 50
    },
    selectStyle: {
        backgroundColor: "gray",
        width: "90%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    }

});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage } = state.register;
    const { productSettings } = state.productList;
    const { totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray } = state.userOrderAndDeliveryReducer;
    return {
        isLoading, login_failure, errorMessage, totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray,
        productSettings
    };
}

export default connect(mapStateToProps, { loginUser })(SelectDeliveryType);
