import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    FlatList,
    Alert
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

class ViewCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [

                {
                    "id": 1,
                    "maxQuantity": 4,
                    "name": "Ghadi Pawder 190 grams",
                    "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
                    "unit": "Gm",
                    "discount": 1,
                    "quantity": 1,
                    "mrp": 10,
                    "sellingPrice": 9,
                    "totalSelllingPriceWithQuantity": 9,
                    "totalSavingAmmount": 1
                }, {
                    "id": 2,
                    "maxQuantity": 3,
                    "name": "Ghadi sadsadas 190 grams",
                    "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4tvpkxadm.jpeg?q=50",
                    "unit": "Gm",
                    "discount": 30,
                    "quantity": 2,
                    "mrp": 100,
                    "sellingPrice": 70,
                    "totalSelllingPriceWithQuantity": 140,
                    "totalSavingAmmount": 60

                },
                {
                    "id": 3,
                    "maxQuantity": 4,
                    "name": "Ghadi Pawder 190 grams",
                    "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4bfdxyqhg.jpeg?q=50",
                    "unit": "Gm",
                    "discount": 1,
                    "quantity": 1,
                    "mrp": 10,
                    "sellingPrice": 9,
                    "totalSelllingPriceWithQuantity": 9,
                    "totalSavingAmmount": 1
                },
                //  {
                //     "id": 4,
                //     "maxQuantity": 3,
                //     "name": "Ghadi sadsadas 190 grams",
                //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
                //     "unit": "Gm",
                //     "discount": 30,
                //     "quantity": 2,
                //     "mrp": 100,
                //     "sellingPrice": 70,
                //     "totalSelllingPriceWithQuantity": 140,
                //     "totalSavingAmmount": 60

                // },{
                //     "id": 5,
                //     "maxQuantity": 4,
                //     "name": "Ghadi Pawder 190 grams",
                //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
                //     "unit": "Gm",
                //     "discount": 1,
                //     "quantity": 1,
                //     "mrp": 10,
                //     "sellingPrice": 9,
                //     "totalSelllingPriceWithQuantity": 9,
                //     "totalSavingAmmount": 1
                // }, {
                //     "id": 6,
                //     "maxQuantity": 3,
                //     "name": "Ghadi sadsadas 190 grams",
                //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
                //     "unit": "Gm",
                //     "discount": 30,
                //     "quantity": 2,
                //     "mrp": 100,
                //     "sellingPrice": 70,
                //     "totalSelllingPriceWithQuantity": 140,
                //     "totalSavingAmmount": 60

                // },{
                //     "id": 7,
                //     "maxQuantity": 4,
                //     "name": "Ghadi Pawder 190 grams",
                //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
                //     "unit": "Gm",
                //     "discount": 1,
                //     "quantity": 1,
                //     "mrp": 10,
                //     "sellingPrice": 9,
                //     "totalSelllingPriceWithQuantity": 9,
                //     "totalSavingAmmount": 1
                // }, {
                //     "id": 8,
                //     "maxQuantity": 3,
                //     "name": "Ghadi sadsadas 190 grams",
                //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
                //     "unit": "Gm",
                //     "discount": 30,
                //     "quantity": 2,
                //     "mrp": 100,
                //     "sellingPrice": 70,
                //     "totalSelllingPriceWithQuantity": 140,
                //     "totalSavingAmmount": 60

                // },
            ],
            totalItem: 0,
            totalPaymentedValue: 0,
            totalSaving: 0
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

    counterIncrementAndDecrement = (index, value) => {

        let changedValue = this.state.data;
        let t = this.state.totalPaymentedValue;
        let st = this.state.totalSaving;
        let it = this.state.totalItem;


        if (changedValue[index].quantity + value > changedValue[index].maxQuantity) {

            Alert.alert("You have already added the maximum allowed quantity for this item.")

        } else {

            changedValue[index].totalSelllingPriceWithQuantity += value * changedValue[index].sellingPrice;
            changedValue[index].totalSavingAmmount += value * changedValue[index].discount;
            changedValue[index].quantity += value;

            t += value * changedValue[index].sellingPrice;
            st += value * changedValue[index].discount;
            it += value

        }

        if (changedValue[index].quantity === 0) {
            changedValue.splice(index, 1)
        }



        this.setState({ data: changedValue, totalPaymentedValue: t, totalSaving: st, totalItem: it })

    }

    removeAll = () => {

        this.setState({ data: [], totalPaymentedValue: 0, totalItem: 0 })
    }

    remove = (index) => {

        let changedValue = this.state.data;

        let t = this.state.totalPaymentedValue - changedValue[index].totalSelllingPriceWithQuantity;
        let st = this.state.totalSaving - changedValue[index].totalSavingAmmount;
        let it = this.state.totalItem - changedValue[index].quantity;

        changedValue.splice(index, 1)

        this.setState({
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
        this.state.data.forEach(element => {
            t += element.totalSelllingPriceWithQuantity;
            st += element.quantity * element.discount;
            it += element.quantity;

        });

        this.setState({ totalItem: it, totalPaymentedValue: t, totalSaving: st })
    }

    calculateTotalPrice = () => {


    }



    numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);

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
                        text: 'VIEW CART',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}

                    rightComponent={

                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            <TouchableOpacity
                                onPress={() => {
                                    // this.props.navigation.navigate("ViewCart")
                                }}
                                style={{ padding: 10 }}
                            >
                                <View>
                                    <IconEv name="search" color="#548247" size={25} />
                                </View>
                            </TouchableOpacity>


                            {this.state.totalItem ? <TouchableOpacity
                                onPress={() => {
                                    // this.props.navigation.navigate("ViewCart")
                                }}
                                style={{ padding: 10 }}
                            >
                                <View>
                                    <IconEv name="cart" color="#548247" size={30} />

                                    <Badge
                                        status="success"
                                        value={this.state.totalItem}
                                        containerStyle={{ position: 'absolute', top: -10, right: -4 }}
                                    />
                                    <Text style={{ fontSize: 10, color: "red", position: 'absolute', top: 25, left: -5, width: 100 }}>
                                        ₹ {this.state.totalPaymentedValue}.00
                                    </Text>
                                </View>
                            </TouchableOpacity>

                                :
                                null
                            }


                            <TouchableOpacity
                                onPress={() => {

                                    // this.props.isLogged ?
                                    //     Alert.alert("User Logged ..!!!")
                                    //     :
                                    //     this.setModalVisible(true)

                                }}
                                style={{ padding: 10 }}
                            >
                                <IconI name="ellipsis-vertical" color="#548247" size={20} />
                            </TouchableOpacity>

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

                {!this.state.data.length ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <IconEv name="cart" color="#548247" size={28} />
                        <Text>Your Shopping Cart is empty!</Text>
                        <Text>Start Shopping Now</Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={styles.upperContainer}>
                            <View style={styles.leftUpperContainer}>
                                <Text style={{ fontSize: 13, fontWeight: "bold" }}>{this.state.totalItem} Items(s) in cart</Text>
                                <Text style={{ fontSize: 9, color: 'red' }}>TOTAL SAVINGS {this.state.totalSaving}.00</Text>
                            </View>

                            <View style={styles.rightUpperContainer}>
                                <Text style={{ color: "green", paddingRight: 24, fontWeight: "bold", fontSize: 15 }}>TOTAL PRICE {this.state.totalPaymentedValue}.00</Text>
                            </View>
                        </View>

                        <FlatList
                            data={this.state.data}
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
                            keyExtractor={item => item.id.toString() }
                        />


                        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#548247", height: 50, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("SelectDeliveryType")}
                            >
                                <Text style={{ color: "white", fontSize: 14 }}>PROCEED TO CHECKOUT</Text>
                            </TouchableOpacity>
                        </View>


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
    },
    leftUpperContainer: {

    },
    rightUpperContainer: {

    },
});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage } = state.register;
    return {
        isLoading, login_failure, errorMessage
    };
}

export default connect(mapStateToProps, { loginUser })(ViewCart);
