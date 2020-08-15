import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    FlatList,
    Image,
    ScrollView,
    BackHandler
} from 'react-native';
import { Header, Badge, Divider } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import TextInputComponent from '../src/component/TextInputComponent';
import { placeOrderCall } from '../src/actions/deliveryAction';
import ToastMessage from "../src/component/ToastMessage";

class PaymentScreen extends Component {
    constructor(props) {
        super(props)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            isLoading: false,
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading) {
            return {
                isLoading: false,
            };
        }

        if (props.errorMessage !== "") {
            return {
                isLoading: false,
            }
        }

        return null;
    }


    placeOrderCall = () => {
        let paramsArrayList = []
        this.props.OrderSummaryItemArray.forEach(element => {
            let obj = {
                "OrderItemId": 0,
                "OrderId": 0,
                "ProductId": 0,
                "Quantity": 0,
                "Name": "string",
                "Unit": "string",
                "Discount": 0,
                "MRP": 0,
                "SellingPrice": 0,
                "ProductOption": "string",
                "DiscountPer": 0
            }
            obj.ProductId = element.productId
            obj.Quantity = element.quantity
            obj.Name = element.name
            obj.Unit = element.unit
            obj.Discount = element.totalSavingAmmount
            obj.MRP = element.mrp
            obj.SellingPrice = element.sellingPrice
            obj.ProductOption = element.productOption
            obj.DiscountPer = element.discountPer
            paramsArrayList.push(obj)

        })

        let params = {
            "OrderItemList": [...paramsArrayList],
            "OrderId": 0,
            "UserId": this.props.loginDetails.userId,
            "OrderStatus": 0,
            "DeliveryCharges": this.props.route.params.deliveryCharges,
            "DeliveryTypeId": this.props.route.params.deliveryType == "PICKUP_DELIVERY" ? 1 : 2,
            "PaymentMode": 0,
            "TotalAmount": this.props.totalPaymentedValue,
            "TotalDiscount": this.props.totalSaving,
            "TotalPayble": this.props.totalPaymentedValue + Number(this.props.route.params.deliveryCharges),
            "TalukaId": 1,
            "SupplierId": 1,
            "OrderDate": new Date(),
            "OderMessage": "",
            "UserAddressId": this.props.route.params.deliveryType == "PICKUP_DELIVERY" ? this.props.SavePickUpPointList?.pickUpPointId : this.props.selectedAddress?.addressId,
            "CultureId": 1
        }
        this.setState(function (state, props) { return { isLoading: true } });
        this.props.placeOrderCall({
            endurl: '/PlaceOrder',
            requestData: params,
        })
    }

    render() {
        return <View style={{ flex: 1 }}>
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
                    text: 'Make Payement',
                    style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                }}

                containerStyle={{
                    backgroundColor: 'white',
                }}
            />
            <View style={{ padding: 20, height: "100%" }}>
                <TextInputComponent
                    title={'Payment Mode'}
                    value={"Cash on Delivery"}
                    isDisable={true}
                    personalStyle={{ color: "black" }}

                // style={{ color: "black" ,backgroundColor:"red" }}
                // inputStyle={{color: 'red'}} 
                />
            </View>
            <TouchableOpacity
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#548247", height: 50, justifyContent: "center", alignItems: "center" }}
                onPress={this.placeOrderCall}
            >
                <Text style={{ color: "white", fontSize: 14 }}>PLACE ORDER</Text>
            </TouchableOpacity>
            {this.props.placeOrder_failure ? <ToastMessage message={this.props.errorMessage} /> : null}
        </View>
    }
}
function mapStateToProps(state) {
    const { loginDetails } = state.register;
    // const { isLoading, errorMessage, } = state.productList
    const { isLoading, errorMessage, totalItem, placeOrder_failure, totalPaymentedValue, totalSaving, OrderSummaryItemArray, SavePickUpPointList, addressDetailsValue, selectedAddress } = state.userOrderAndDeliveryReducer;
    return {
        isLoading, errorMessage, totalItem, totalPaymentedValue, placeOrder_failure, totalSaving, OrderSummaryItemArray, loginDetails, SavePickUpPointList, addressDetailsValue, selectedAddress
    };
}
export default connect(mapStateToProps, { placeOrderCall })(PaymentScreen);
