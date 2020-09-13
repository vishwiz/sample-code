import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
    TouchableOpacity,
    Text,
    BackHandler,
    FlatList
} from 'react-native';
import { Header, Badge, Divider } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import { myOrdersCall } from '../src/actions/productListAction';
import { cancelOrderCall } from '../src/actions/deliveryAction'
import { connect } from 'react-redux';
import ToastMessage from "../src/component/ToastMessage";
import moment from "moment";
import IconAF from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';

let myEnum = {
    0: "Ordered",
    1: "Accepted",
    2: "Cancel",
    3: "Dispatch",
    4: "Delivered",
    5: "CancelBySupplier"
}
let CallHandling = false
let CallHandlingMyorders = false
class MyOrders extends Component {
    constructor(props) {
        super(props)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            isLoading: false,
            myOrders: [],
            refreshCall: false,
            isError: false,
            isCancelError: false
        }
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount = () => {
        this.apiFunctionCall()
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.isLoadingCancelOrder && props.cancelAddress_success && CallHandling) {
            CallHandling = false
            return {
                refreshCall: true,
                isLoading: false,
            }
        }


        else if (!props.isLoading && CallHandlingMyorders) {
            CallHandlingMyorders = false
            return {
                isLoading: false,
                myOrders: props.myOrdersDetails
            };
        }

        if (props.errorMessage !== "" && CallHandlingMyorders) {
            CallHandlingMyorders = false
            return {
                isLoading: false
            }
        }
        else if (props.errorMessageCancelOrder !== "" && props.cancelAddress_failure && CallHandling) {
            CallHandling = false
            return {
                isLoading: false
            }
        }

        return null;
    }


    alretCall = () => {
        Alert.alert(
            "Cancel Order",
            this.props.cancelAddressDetails?.errorMessage,
            [

                {
                    text: "OK", onPress: () => {
                        // CallHandling = false
                        this.setState({ refreshCall: false },()=> this.apiFunctionCall())
                       
                    }
                }
            ],
        )

    }
    // componentWillReceiveProps(props, state) {
    //     if (!props.isLoading && props.myOrders_success) {
    //         this.setState({
    //             isLoading: false,
    //             myOrders: props.myOrdersDetails
    //         })
    //     }
    //     if (!props.isLoadingCancelOrder && props.cancelAddress_success && CallHandling) {
    //         this.setState({
    //             isLoading: false,
    //             refreshCall: true,
    //         }, () => {
    //             Alert.alert(
    //                 "Cancel Order",
    //                 this.props.cancelAddressDetails?.errorMessage,
    //                 [

    //                     {
    //                         text: "OK", onPress: () => {
    //                             CallHandling = false
    //                             this.setState({ refreshCall: false })
    //                             this.apiFunctionCall()
    //                         }
    //                     }
    //                 ],
    //             )
    //         })
    //     }

    // if (props.errorMessage !== "") {
    //     this.setState({
    //         isLoading: false,
    //     })
    // }

    //     return null;
    // }

    apiFunctionCall = () => {
        let params = {
            "UserId": this.props.loginDetails.userId,
            "TalukaId": 1,
            "CultureId": 1,
            "SupplierId": 1
        }
        CallHandlingMyorders = true
        this.setState(function (state, props) { return { isLoading: true, myOrders: [], isError: true } });
        this.props.myOrdersCall({
            endurl: '/GetOrders',
            requestData: params,
        })
    }

    cancelOrderCall = (id) => {
        CallHandling = true
        this.setState(function (state, props) { return { isLoading: true, isCancelError: true } });
        let params = {

            "UserId": this.props.loginDetails.userId,
            "OrderId": id,
            "OrderStatus": 2,
            "TalukaId": 1,
            "CultureId": 1,
            "SupplierId": 1

        }

        this.props.cancelOrderCall({
            endurl: '/ChangeOrderStatus',
            requestData: params,
        })
    }

    renderProductListData = (item) => {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "space-between", paddingBottom: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "black", paddingHorizontal: 10, paddingBottom: 10, fontSize: 15 }}>ORDER ID</Text>
                        <Text style={{ color: "black", fontWeight: "700", fontSize: 15 }}>{item.orderId}</Text>
                    </View>
                    <View style={{ backgroundColor: "#d1801d", justifyContent: "center", alignItems: "center", borderRadius: 5, paddingLeft: 5, paddingRight: 5, marginRight: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
                            {myEnum[`${item.orderStatus}`]}</Text>
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <View>
                        <Text style={{ color: "black", fontSize: 15 }}>ORDER TOTAL</Text>
                        <Text style={{ color: "grey", fontSize: 15 }}>{'\u20B9' + item.totalAmount}</Text>
                    </View>
                    <View>
                        <Text style={{ color: "black", fontSize: 15 }}>DELIVERY TYPE</Text>
                        <Text style={{ color: "grey", fontSize: 15 }}>{item.deliveryTypeId == 1 ? "Store collect" : "Home Delivery"}</Text>
                    </View>
                </View>
                <View style={styles.innerContainer}>

                    <Text style={{ color: "grey", fontSize: 15 }}>{moment(item.orderDate).format('lll')}</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: item.orderStatus == 2 ? "grey" : "#548247", borderRadius: 5, padding: 5 }}
                        onPress={() => item.orderStatus == 2 ? null : this.cancelOrderCall(item.orderId)}
                    >
                        <Text style={{ color: "#fff", fontSize: 13, }}>CANCEL ORDER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                placement="left"
                leftComponent={
                    <TouchableHighlight
                        activeOpacity={0}
                        style={{ padding: 10 }}
                        onPress={() => {
                            // this.props.clearListData()
                            this.props.navigation.goBack()
                        }}>
                        <IconI name="chevron-back" size={25} color="#548247" />
                    </TouchableHighlight>
                }
                centerComponent={{
                    text: "MY ORDERS",
                    style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                }}
                containerStyle={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: "grey"
                }}
            />
            {this.state.isLoading ? <Spinner visible={this.state.isLoading} color="green" />
                :

                this.state.myOrders.length > 0 ? <FlatList
                    data={this.state.myOrders}
                    renderItem={((item) => this.renderProductListData(item.item))}
                    keyExtractor={(item, i) => i.toString()}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                    horizontal={false}
                    onRefresh={this.apiFunctionCall}
                    refreshing={this.state.isLoading}
                    contentContainerStyle={{
                        marginVertical: 5,
                    }}
                /> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {/* <IconEv name="cart" color="#548247" size={28} /> */}
                        <IconAF name="box-open"
                            color="green"
                            size={28}
                        />
                        <Text>Your Have No Order Now</Text>
                        <Text>Start Shopping Now</Text>
                    </View>

            }
            {(this.state.isError && this.props.myOrders_failure) ? <ToastMessage message={this.props.errorMessage} /> : null}
            {this.state.isCancelError && this.props.cancelAddress_failure ? <ToastMessage message={this.props.errorMessageCancelOrder} /> : null}

            {this.state.refreshCall ? this.alretCall() : null}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 15,
        borderColor: "grey",
        paddingTop: 5,
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "space-between",
        paddingHorizontal: 10, paddingBottom: 10
    }
})

function mapStateToProps(state) {
    const { loginDetails } = state.register;
    const { isLoading, errorMessage, myOrdersDetails, myOrders_success, myOrders_failure } = state.productList
    const { cancelAddress_success, isLoadingCancelOrder, cancelAddressDetails, errorMessageCancelOrder, cancelAddress_failure } = state.userOrderAndDeliveryReducer
    return {
        errorMessageCancelOrder, isLoading, errorMessage, myOrdersDetails, myOrders_success, loginDetails, cancelAddress_success, isLoadingCancelOrder, cancelAddressDetails, myOrders_failure, cancelAddress_failure
    };
}

export default connect(mapStateToProps, { myOrdersCall, cancelOrderCall })(MyOrders);
// export default MyOrders

