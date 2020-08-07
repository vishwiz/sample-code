import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import { Header, Divider } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Entypo';
import TextInputComponent from '../src/component/TextInputComponent';
import Spinner from 'react-native-loading-spinner-overlay';

//for redux
import { connect } from 'react-redux';
import { loginUser } from '../src/actions';

class SelectDeliveryType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullView: false

        };
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
                        text: this.props.route.params.headerValue,
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
                            <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>FREE!</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 12, color: 'black' }}>Amount Payable :</Text>
                            <Text style={{ fontSize: 12, color: 'black' }}>₹{this.props.totalPaymentedValue}.00</Text>
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
                    style={{ fontSize: 12, padding: 10, color: "black" }}
                >You Select : </Text>

                <View style={styles.bottomoContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.leftDeliveryContainer}>
                            <Text style={{ fontSize: 14, color: 'black' }}>SELF PICK UP</Text>
                            <View style={{ height: 25 }}>
                                <Text style={{ fontSize: 10, color: 'gray', fontStyle: 'italic' }}>{`(Our Recommendation)`}</Text>
                            </View>
                            <Text style={{ fontSize: 14, color: '#0f4760', paddingTop: 10 }}>DELIVERY FREE</Text>
                        </View>
                        <View style={[styles.rightDeliveryContainer, { backgroundColor: "#ffdbdb" }]}>
                            <View style={[styles.imageContainer, { backgroundColor: "#ff9b9b" }]}>
                                <IconF name="emoji-flirt" size={45} color="white" />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => this.props.navigation.navigate("PickUpPointList")}
                        activeOpacity={1}
                    >
                        <TextInputComponent
                            title={"Select Pick Up Location"}
                            keyboard_type={"default"}
                            onChangeText={this.onChangeTextphoneNumber}
                            value={!this.props.SavePickUpPointList?.name ? "Select pick up point" : `${this.props.SavePickUpPointList?.name}   ${this.props.SavePickUpPointList?.address}`}
                            phoneNumber={false}
                            isDisable={true}
                            marquee={true}
                        />
                        <View style={{ alignSelf: "flex-end", marginRight: 10, top: -70 }}>
                            <Text>
                                EDIT/CHANGE
                        </Text>
                        </View>

                    </TouchableOpacity>


                </View>

                <TouchableOpacity
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: !this.props.SavePickUpPointList?.name ? "gray" : "#548247", height: 50, justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                        !this.props.SavePickUpPointList?.name ?
                            () => { }
                            :
                            this.props.navigation.navigate("OrderSummary", { deliveryType: "PICKUP_DELIVERY" })
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
        height: 110,
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
        // height: "42%",
        // flex : 1,
        width: "95%",
        margin: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#ffdbdb"
    }


});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage } = state.register;
    const { totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray, SavePickUpPointList } = state.userOrderAndDeliveryReducer;
    return {
        isLoading, login_failure, errorMessage, totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray, SavePickUpPointList
    };
}

export default connect(mapStateToProps, { loginUser })(SelectDeliveryType);
