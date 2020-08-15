import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    FlatList,
    Alert,
    BackHandler
} from 'react-native';
import { Header, Badge, Divider } from 'react-native-elements';

import IconI from 'react-native-vector-icons/Ionicons';
import IconEv from 'react-native-vector-icons/EvilIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";
import ItemCardComponent from '../src/component/ItemCardComponent';
//for redux
import { connect } from 'react-redux';
import { loginUser } from '../src/actions';
import { CommonActions } from '@react-navigation/native';

import { removeAll, removeIndexElement, incrementDecrementValue, initializeViewCartData } from '../src/actions/deliveryAction';

class ViewCart extends Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            isLoading: false,
            data: this.props.OrderSummaryItemArray,
            totalItem: 0,
            totalPaymentedValue: 0,
            totalSaving: 0
        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.route.params?.cart === 'addToCart' ? this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'AddToCart' },
                    // {
                    //   name: 'ViewCart',
                    // //   params: { user: 'jane' },
                    // },
                ],
            })
        ) : this.props.navigation.goBack();
        // return true;
    }



    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading) {
            return {
                isLoading: false,
            };
        }
        return null;
    }

    counterIncrementAndDecrement = (index, value) => {

        let changedValue = this.props.OrderSummaryItemArray;
        let t = this.props.totalPaymentedValue;
        let st = this.props.totalSaving;
        let it = this.props.totalItem;


        if (changedValue[index].quantity + value > changedValue[index].maxQuantity) {
            Alert.alert("", "You have already added the maximum allowed quantity for this item.")
        } else {

            changedValue[index].totalSelllingPriceWithQuantity += value * changedValue[index].sellingPrice;
            changedValue[index].totalSavingAmmount += value * changedValue[index].discountPer;
            changedValue[index].quantity += value;

            t += value * changedValue[index].sellingPrice;
            st += value * changedValue[index].discountPer;
            it += value

        }

        if (changedValue[index].quantity === 0) {
            changedValue.splice(index, 1)
        }
        this.props.incrementDecrementValue({ data: changedValue, totalPaymentedValue: t, totalSaving: st, totalItem: it })

    }

    removeAll = () => {
        this.props.removeAll();
    }

    remove = (index) => {

        let changedValue = this.props.OrderSummaryItemArray;
        let t = this.props.totalPaymentedValue - changedValue[index].totalSelllingPriceWithQuantity;
        let st = this.props.totalSaving - changedValue[index].totalSavingAmmount;
        let it = this.props.totalItem - changedValue[index].quantity;

        changedValue.splice(index, 1)


        this.props.removeIndexElement({
            data: changedValue, totalItem: changedValue.length,
            totalPaymentedValue: t,
            totalSaving: st,
            totalItem: it
        })

    }

    componentDidMount() {

        let t = 0;
        let st = 0;
        let it = 0;
        this.props.OrderSummaryItemArray.forEach(element => {
            t += element.totalSelllingPriceWithQuantity;
            st += element.quantity * element.discountPer;
            it += element.quantity;

        });

        this.props.initializeViewCartData({ totalItem: it, totalPaymentedValue: t, totalSaving: st })
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
                            onPress={() => this.props.route.params?.cart === 'addToCart' ? this.props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        { name: 'Home' },
                                        { name: 'AddToCart' }
                                    ],
                                })
                            ) : this.props.navigation.goBack()
                            }>
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{
                        text: 'VIEW CART',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}

                    rightComponent={

                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => { }}
                                style={{ padding: 10 }}
                            >
                                <View>
                                    <IconEv name="cart" color="#548247" size={30} />
                                    {this.props.totalItem ?
                                        <>
                                            <Badge
                                                status="success"
                                                value={this.props.totalItem}
                                                containerStyle={{ position: 'absolute', top: -10, right: -4 }}
                                            />
                                            <Text style={{ fontSize: 10, color: "red", position: 'absolute', top: 25, left: -8, width: 100 }}>
                                                ₹ {this.props.totalPaymentedValue}.00
                                            </Text>
                                        </> :
                                        null
                                    }
                                </View>
                            </TouchableOpacity>


                            {/* <TouchableOpacity
                                onPress={() => { }}
                                style={{ padding: 10 }}
                            >
                                <IconI name="ellipsis-vertical" color="#548247" size={20} />
                            </TouchableOpacity> */}

                        </View>
                    }
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />
                {
                    this.props.login_failure ? <ToastMessage message={this.props.errorMessage} /> : null
                }

                {!this.props.OrderSummaryItemArray.length ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <IconEv name="cart" color="#548247" size={28} />
                        <Text>Your Shopping Cart is empty!</Text>
                        <Text>Start Shopping Now</Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={styles.upperContainer}>
                            <View style={styles.leftUpperContainer}>
                                <Text style={{ fontSize: 13, fontWeight: "bold" }}>{this.props.totalItem} Items(s) in cart</Text>
                                <Text style={{ fontSize: 9, color: 'red' }}>TOTAL SAVINGS {this.props.totalSaving}.00</Text>
                            </View>

                            <View style={styles.rightUpperContainer}>
                                <Text style={{ color: "green", paddingRight: 24, fontWeight: "bold", fontSize: 15 }}>TOTAL PRICE {this.props.totalPaymentedValue}.00</Text>
                            </View>
                        </View>

                        <FlatList
                            data={this.props.OrderSummaryItemArray}
                            ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'gray' }} />}
                            ListFooterComponent={() => <View style={{ height: 50, marginBottom: 50, backgroundColor: "white" }}>
                                <Divider style={{ backgroundColor: 'gray' }} />

                                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 8 }}>
                                    <TouchableOpacity
                                        style={{ borderColor: "#548247", borderWidth: 1, borderRadius: 5, padding: 8 }}
                                        onPress={this.removeAll}
                                    >
                                        <Text style={{ fontSize: 12, color: "#548247" }}>REMOVE ALL</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ borderColor: "#548247", borderWidth: 1, borderRadius: 5, padding: 8 }}
                                        onPress={() => this.props.navigation.goBack()}
                                    >
                                        <Text style={{ fontSize: 12, color: "#548247" }}>CONTINUE SHOPPING</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                            ListHeaderComponent={() => <View >
                                <Text style={{ padding: 10, backgroundColor: "white", color: "black", fontSize: 15 }}>My Cart Items</Text>
                                <Divider style={{ backgroundColor: 'gray' }} />
                            </View>}
                            renderItem={(item, index) => <ItemCardComponent
                                itemData={item}
                                index={index}
                                counterIncrementAndDecrement={(index, value) => this.counterIncrementAndDecrement(index, value)}
                                remove={(index) => this.remove(index)}
                            />}
                            keyExtractor={(item, i) => i.toString()}
                        />


                        <TouchableOpacity
                            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#548247", height: 50, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                if (this.props.isLogged) {
                                    this.props.navigation.navigate("SelectDeliveryType")
                                } else {
                                    this.props.navigation.navigate("Login", { register: true })
                                }
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 14 }}>PROCEED TO CHECKOUT</Text>
                        </TouchableOpacity>


                    </View>




                }
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
    }
});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage, isLogged } = state.register;
    const { totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray } = state.userOrderAndDeliveryReducer;
    return {
        isLoading, login_failure, errorMessage, totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray, isLogged
    };
}

export default connect(mapStateToProps, { loginUser, removeAll, removeIndexElement, incrementDecrementValue, initializeViewCartData })(ViewCart);
