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
import TextInputComponent from '../src/component/TextInputComponent';
import Spinner from 'react-native-loading-spinner-overlay';

//for redux
import { connect } from 'react-redux';
import { loginUser, getAddress } from '../src/actions';

class SelectDeliveryType extends Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            fullView: false,
            deliveryCharges: this._deliveryCharges()

        };
    }

    _deliveryCharges = () => {
        let deliveryCharges;

        if (Number(this.props.totalPaymentedValue) <= 100) {
            deliveryCharges = this.props.productSettings.DeliveryChargeUPTo100;
        } else if (Number(this.props.totalPaymentedValue) <= 200) {
            deliveryCharges = this.props.productSettings.DeliveryChargeUpTo200;

        } else if (Number(this.props.totalPaymentedValue) <= 500) {
            deliveryCharges = this.props.productSettings.DeliveryChargeUpTo500;

        } else if (Number(this.props.totalPaymentedValue) <= 1000) {
            deliveryCharges = this.props.productSettings.DeliveryChargeUpTo1000;

        } else if (Number(this.props.totalPaymentedValue) <= 2000) {
            deliveryCharges = this.props.productSettings.DeliveryChargeUpTo2000;

        } else if (Number(this.props.totalPaymentedValue) <= 5000) {
            deliveryCharges = this.props.productSettings.DeliveryChargeUpTo5000;

        } else {
            deliveryCharges = "0";
        }
        return deliveryCharges;
    }
    componentDidMount() {
        this.props.getAddress({
            endurl: '/GetUserAddress',
            requestData: {
                "UserId": this.props.loginDetails?.userId
            },
        })


    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
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
                        text: 'SELECT DELIVERY ADDRESS',
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
                            <Text style={{ fontSize: 12, color: 'black' }}>₹{this.props.totalPaymentedValue}</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 12, color: 'black' }}>Delivery Charges :</Text>
                            <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>VIEW</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            {/* <Text style={{ fontSize: 12, color: 'black' }}>Your Charges :</Text>
                            <Text style={{ fontSize: 12, color: 'black' }}>₹{this.state.deliveryCharges}</Text> */}
                        </View>
                        <View>
                            {/* <Text style={{ fontSize: 10, fontStyle: "italic", color: 'black' }}>
                                Tax of 206.53 included in total amount
                                </Text> */}
                        </View>

                    </View>
                        :
                        null
                }

                <Text
                    style={{ fontSize: 12, padding: 10, color: "#494949" }}
                >You Select : </Text>

                <View style={styles.bottomoContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.leftDeliveryContainer}>
                            <Text style={{ fontSize: 14, color: 'black' }}>HOME DELIVERY</Text>
                            <View style={{ height: 25 }}>
                                <Text style={{ fontSize: 10, color: 'gray', fontStyle: 'italic' }}>{`(Our Recommendation)`}</Text>
                            </View>
                            <Text style={{ fontSize: 14, color: '#0f4760', paddingTop: 10 }}>DELIVERY CHARGES ₹{this.state.deliveryCharges}</Text>
                        </View>
                        <View style={[styles.rightDeliveryContainer, { backgroundColor: "#d7dce5" }]}>
                            <View style={[styles.imageContainer, { backgroundColor: "#0f4760" }]}>
                                <IconI name="ios-home-outline" size={55} color="white" />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => this.props.navigation.navigate("AddressBook")}
                        activeOpacity={1}
                    >
                        <TextInputComponent title={"Select Home Address"} keyboard_type={"default"} onChangeText={this.onChangeTextphoneNumber}
                            value={!this.props.selectedAddress?.addressId ? "Tap to add an address" : `${this.props.selectedAddress?.address} `}
                            phoneNumber={false} isDisable={true} marquee={true}
                        />

                        <View style={{ alignSelf: "flex-end", marginRight: 10, top: -70 }}>
                            <Text>
                                EDIT/CHANGE
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: !this.props.selectedAddress?.userId ? "gray" : "#548247", height: 50, justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                        !this.props.selectedAddress?.userId ?
                            () => { }
                            :
                            this.props.navigation.navigate("OrderSummary", { deliveryType: "HOME_DELIVERY" })
                    }}
                >
                    <Text style={{ color: "white", fontSize: 14 }}>VIEW ORDER SUMMARY</Text>
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
        height: 80,
        width: 80,
        borderRadius: 50
    },
    selectStyle: {
        backgroundColor: "gray",
        width: "90%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },
    bottomoContainer: {
        width: "95%",
        margin: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#d7dce5"
    }


});

function mapStateToProps(state) {

    const { totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray, SavePickUpPointList, selectedAddress } = state.userOrderAndDeliveryReducer;
    const { loginDetails } = state.register;
    const { productSettings } = state.productList;

    return {
        selectedAddress, productSettings, totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray, SavePickUpPointList, loginDetails
    };
}

export default connect(mapStateToProps, { loginUser, getAddress })(SelectDeliveryType);
