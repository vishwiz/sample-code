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
import { placeOrderCall } from '../src/actions/productListAction';

class PaymentScreen extends Component {
    constructor(props) {
        super(props)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    placeOrderCall = () => {
        console.log("OrderSummaryItemArray ", this.props.loginDetails.userId)
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
            "DeliveryCharges": 0,
            "DeliveryTypeId": this.props.route.params.deliveryType == "PICKUP_DELIVERY" ? 2 : 1,
            "PaymentMode": 0,
            "TotalAmount": this.props.totalPaymentedValue,
            "TotalDiscount": this.props.totalSaving,
            "TotalPayble": 0,
            "TalukaId": 1,
            "SupplierId": 1,
            "OrderDate": new Date(),
            "OderMessage": "",
            "UserAddressId": 0,
            "CultureId": 1
        }

        console.log("params ", params)

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
                />
            </View>
            <TouchableOpacity
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#548247", height: 50, justifyContent: "center", alignItems: "center" }}
                onPress={this.placeOrderCall}
            >
                <Text style={{ color: "white", fontSize: 14 }}>PLACE ORDER</Text>
            </TouchableOpacity>
        </View>
    }
}
function mapStateToProps(state) {
    const { loginDetails } = state.register;
    const { isLoading, errorMessage, } = state.productList
    const { totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray } = state.userOrderAndDeliveryReducer;
    return {
        isLoading, errorMessage, totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray, loginDetails
    };
}
export default connect(mapStateToProps, { placeOrderCall })(PaymentScreen);
