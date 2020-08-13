import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Alert,
    BackHandler
} from "react-native";
import IconI from 'react-native-vector-icons/Ionicons';
import IconEv from 'react-native-vector-icons/EvilIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";
import { Header, Badge, Divider } from 'react-native-elements';
import { addtoCartListCall, addtoCartListCompleteData, clearListData } from '../src/actions/productListAction';
import { incrementDecrementValue } from '../src/actions/deliveryAction';
const { width } = Dimensions.get('window');

class AddToCart extends Component {
    constructor(props) {
        super(props)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            screenWidth: Dimensions.get('window').width,
            screenheight: Dimensions.get('window').height,
            addToCartListData: [],
            maximumNumberAlert: false,
            totalItem: 0,
            totalPaymentedValue: 0,
        }
        this.addtoCartListCall = false
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.clearListData()
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount = () => {
        let params = {
            "CultureId": 1,
            "TalukaId": 1,
            "SupplierId": 1,
        }
        this.props.searchData.pathName === "promotion" ? params.ProMotionId = this.props.searchData.id : this.props.searchData.pathName === "brand" ? params.BrandId = this.props.searchData.id : params.ProductSerachName = this.props.searchData.name
        let url = this.props.searchData.pathName === "promotion" ? '/GetProductListByPromotionId' : this.props.searchData.pathName === "brand" ? '/GetProductListByBrandId' : '/GetProductListByProductSearchName'
        this.setState(function (state, props) { return { isLoading: true } });
        this.addtoCartListCall = true
        this.props.addtoCartListCall({
            endurl: url,
            requestData: params,
        })
    }

    componentWillReceiveProps(props) {
        if (this.addtoCartListCall && !props.isLoading && props.addToCartList_success) {
            this.addtoCartListCall = false
            this.setState({
                isLoading: false,
            }, () => this.onAddToCartListSuccess(props.addToCartListDetails))
        }

        if (this.addtoCartListCall && props.errorMessage !== "") {
            this.addtoCartListCall = false
            this.setState({ isLoading: false })
        }

        return null;
    }

    onAddToCartListSuccess = (addToCartListDetails) => {
        let viewCartData = this.props.OrderSummaryItemArray
        let newData = [...addToCartListDetails]
        let totalProducts = 0
        let totalAmount = 0
        newData.forEach(element => {
            element.isVisible = false
            element.quantity = 0
            element.isVariantTrue = false
            element.totalSelllingPriceWithQuantity = 0
            element.totalSavingAmmount = 0
            element.productVariantList.length > 0 ?
                element.productVariantList.forEach(insideElement => {
                    insideElement.istrue = false
                    insideElement.quantity = 0
                    insideElement.totalSelllingPriceWithQuantity = 0
                    insideElement.totalSavingAmmount = 0
                }) : null
        })
        if (newData.length > 0) {
            if (viewCartData.length > 0) {
                viewCartData.forEach(element => {
                    totalProducts += element.quantity
                    totalAmount += element.quantity * element.sellingPrice
                    newData.forEach(newDataElement => {
                        if (newDataElement.productId === element.productId) {
                            newDataElement.quantity = element.quantity
                            newDataElement.totalSelllingPriceWithQuantity = element.totalSelllingPriceWithQuantity
                            newDataElement.totalSavingAmmount = element.totalSavingAmmount
                        }
                        newDataElement.productVariantList.length > 0 ? newDataElement.productVariantList.forEach(innerElement => {
                            if (innerElement.productId === element.productId) {
                                innerElement.quantity = element.quantity
                                innerElement.totalSelllingPriceWithQuantity = element.totalSelllingPriceWithQuantity
                                innerElement.totalSavingAmmount = element.totalSavingAmmount
                            }
                        }) : null
                    })
                })
            }
            this.setState({ addToCartListData: [...newData], totalItem: totalProducts, totalPaymentedValue: totalAmount })

        }
    }


    call = (item) => {
        return (
            <View style={styles.dropDownView}>
                <TouchableOpacity style={[styles.dropdownButton, { backgroundColor: item.isVariantTrue ? "transparent" : "#1D800E" }]}
                    onPress={() => this.update(item)}
                >
                    <Text style={{ color: item.isVariantTrue ? "#000" : "#fff" }}>{`${item.productOption} ${item.unit}`}</Text>
                </TouchableOpacity>
                {
                    item.productVariantList.length > 0 ?
                        <FlatList
                            data={item.productVariantList}
                            renderItem={(item) => this.renderDropDown(item.item, item.index)}
                            keyExtractor={(item, i) => i.toString()}
                            // extraData={this.state}
                            horizontal={true}
                            // numColumns={4}
                            contentContainerStyle={{
                                // marginVertical: 5,
                            }}
                        />
                        :
                        null
                }
            </View>
        )
    }

    addToCartFunction = (obj, process) => {
        delete obj.productVariantList
        delete obj.isVisible
        delete obj.isVariantTrue
        delete obj.istrue
        let objState = [...this.state.addToCartListData]
        let createViewCart = this.props.OrderSummaryItemArray
        let totalProducts = 0
        let totalAmount = 0
        if (obj.quantity === obj.maxQuantity && process === "add") {
            Alert.alert("You have already added the maximum allowed quantity for this item.")
        }
        else {
            if (obj.hasOwnProperty("parentProductId")) {
                objState.forEach(element => {
                    if (element.productId === obj.parentProductId) {
                        element.productVariantList.forEach(insideElement => {
                            if (insideElement.productId == obj.productId) {
                                if (process == "add") {
                                    insideElement.maxQuantity <= insideElement.quantity ? null : insideElement.quantity += 1
                                } else {
                                    insideElement.quantity -= 1
                                }
                                insideElement.totalSelllingPriceWithQuantity = insideElement.quantity * insideElement.sellingPrice;
                                insideElement.totalSavingAmmount = insideElement.quantity * insideElement.discountPer;
                                obj.quantity = insideElement.quantity;
                                obj.totalSelllingPriceWithQuantity = insideElement.totalSelllingPriceWithQuantity;
                                obj.totalSavingAmmount = insideElement.totalSavingAmmount;
                            }
                        })
                    }
                })
            } else {
                objState.forEach(element => {
                    if (element.productId === obj.productId) {
                        if (process == "add") {
                            element.maxQuantity <= element.quantity ? () => null : element.quantity += 1
                        } else {
                            element.quantity -= 1
                        }
                        element.totalSelllingPriceWithQuantity = element.quantity * element.sellingPrice;
                        element.totalSavingAmmount = element.quantity * element.discountPer;
                        obj.quantity = element.quantity;
                        obj.totalSelllingPriceWithQuantity = element.totalSelllingPriceWithQuantity;
                        obj.totalSavingAmmount = element.totalSavingAmmount;
                    }
                })
            }

            if (createViewCart.some(item => item.productId === obj.productId)) {
                let indexRemoval = ""
                createViewCart.forEach((elementRedux, index) => {
                    if (elementRedux.productId === obj.productId) {
                        if (obj.quantity == 0) {
                            indexRemoval = index
                        }
                        elementRedux.quantity = obj.quantity
                        elementRedux.totalSelllingPriceWithQuantity = obj.totalSelllingPriceWithQuantity
                        elementRedux.totalSavingAmmount = obj.totalSavingAmmount
                    }
                    console.log("checking ", elementRedux.quantity, elementRedux.totalSelllingPriceWithQuantity)
                    totalProducts += elementRedux.quantity
                    totalAmount += elementRedux.totalSelllingPriceWithQuantity

                })
                console.log("indexRemoval ", indexRemoval, indexRemoval !== "" ? createViewCart.splice(indexRemoval, 1) : null);
                indexRemoval !== "" ? createViewCart.splice(indexRemoval, 1) : null
            } else {
                console.log("checking 2")
                if (obj.quantity > 0) {
                    createViewCart.push(obj)
                    if (createViewCart.length > 0) {
                        createViewCart.forEach(elementRedux => {
                            totalProducts += elementRedux.quantity
                            totalAmount += elementRedux.totalSelllingPriceWithQuantity
                        })
                    } else {
                        totalProducts += obj.quantity
                        totalAmount += obj.totalSelllingPriceWithQuantity
                    }
                }

            }

            // this.props.addtoCartListCompleteData(createViewCart)

            this.props.incrementDecrementValue({ data: createViewCart, totalPaymentedValue: totalAmount, totalItem: totalProducts })
            this.setState({ addToCartListData: [...objState], })
            //  totalItem: totalProducts, totalPaymentedValue: totalAmount 
        }
    }

    updateDropdownModal = (index, isVisible) => {
        let obj = [...this.state.addToCartListData]
        obj.forEach((element, value) => {
            if (value == index && !isVisible) {
                element.isVisible = true
            } else {
                element.isVisible = false
            }
        })
        this.setState({ addToCartListData: [...obj] })
    }

    update = (item, index,) => {
        let obj = [...this.state.addToCartListData]
        obj.forEach(element => {
            if (item.hasOwnProperty("isVariantTrue")) {
                element.isVariantTrue = false
                element.productVariantList.forEach((elementInside, value) => {

                    elementInside.istrue = false

                })
            }
            else if (item.parentProductId == element.productId) {
                element.isVariantTrue = true

                element.productVariantList.forEach((elementInside, value) => {
                    if (value == index) {
                        elementInside.istrue = true
                    } else {
                        elementInside.istrue = false
                    }
                })
            }
        })
        this.setState({ addToCartListData: [...obj] })
    }

    renderDropDown = (item, index) => {
        return (
            <TouchableOpacity style={{
                paddingBottom: 10,
                paddingLeft: 10
            }}
                onPress={() => this.update(item, index,)}
            >
                <View style={[styles.dropDownViewFlatlist, { backgroundColor: item.istrue ? "#1D800E" : "transparent" }]}>
                    <Text style={{ color: item.istrue ? "#fff" : "#000" }}>{`${item.productOption} ${item.unit}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderProductListData = (item, index) => {
        let obj = {}
        if (item.productVariantList.length > 0 && item.isVariantTrue) {
            item.productVariantList.forEach(element => {
                if (element.istrue) {
                    obj = { ...element }
                }
            })
        } else {
            obj = { ...item }
        }
        return (
            <View style={{ borderBottomColor: "#000", backgroundColor: "#fff", paddingBottom: 10 }}>
                <View style={styles.renderContainer}>
                    <ImageBackground style={styles.card} source={{ uri: obj.productImageUrl }} >
                        {
                            obj.isStock ?
                                obj.quantity > 0 ?
                                    <ImageBackground style={styles.cardInside} source={require('../src/assests/Images/cart.png')} >
                                        <View style={styles.innerImageView}>
                                            <Text style={styles.innerImageText}>{obj.quantity}</Text>
                                        </View>
                                    </ImageBackground> : null :
                                // <ImageBackground style={styles.cardInside} source={require('../src/assests/Images/depositphotos_323434424-stock-video-green-shopping-cart-neon-blink.jpg')} >
                                <View style={[styles.cardInside, { backgroundColor: "grey" }]}>
                                    <Text style={{ color: "#fff" }}>Not in Stocks</Text>
                                </View>
                            // </ImageBackground>
                        }
                    </ImageBackground>
                    <View style={{ flex: 1, height: "100%", }}>
                        <View style={{ justifyContent: "flex-start", alignContent: "flex-start" }}>
                            <Text style={styles.textFormatHeader}>{obj.name}</Text>
                        </View>
                        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", paddingTop: 5 }}>
                            <Text style={styles.textFormatMrp}>{obj.quantity > 0 ? null : `MRP ${'\u20B9'} ${obj.mrp}.00`}</Text>
                            <Text style={styles.textFormatDmart}>{`${obj.quantity > 0 ? "You Pay" : "FeelFuL"} ${'\u20B9'} ${obj.quantity > 0 ? obj.totalSelllingPriceWithQuantity : obj.sellingPrice}.00`}</Text>
                            <Text style={styles.textFormatSave}>{`${obj.quantity > 0 ? "You Save" : "Save"} ${'\u20B9'} ${obj.quantity > 0 ? obj.totalSavingAmmount : obj.discountPer}.00`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    paddingHorizontal: 10,
                    // paddingVertical: 10,
                    paddingBottom: 10,
                }}>

                    <View style={[styles.optionView, { borderColor: obj.isStock ? "#1D800E" : "grey", }]}>
                        <View style={styles.quantityView}><Text>{`${obj.productOption} ${obj.unit}`}</Text></View>
                        {
                            item.productVariantList.length > 0 ?
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        backgroundColor: obj.isStock ? "#1D800E" : "grey", borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5
                                    }}

                                    onPress={() => {
                                        // obj.isStock ?
                                         this.updateDropdownModal(index, item.isVisible) 
                                        //  : null
                                    }}
                                >
                                    <Image style={{ width: 30, height: 34 }} source={require('../src/assests/Images/dropArrow11.png')} />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                    {/* <View style={{ padding: 5 }} /> */}
                    {obj.quantity === 0 ?
                        <View style={[styles.addToCart, { backgroundColor: obj.isStock ? "#1D800E" : "grey" }]}>
                            <TouchableOpacity
                                activeOpacity={1}

                                onPress={() => obj.isStock ? this.addToCartFunction(obj, "add") : null}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center", padding: 8, paddingHorizontal: 15 }}>
                                    <Text style={[styles.textColor]}>ADD TO CART</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flexDirection: "row", width: "30%", borderRadius: 3 }}>
                            <TouchableOpacity style={styles.deduct}
                                onPress={() => this.addToCartFunction(obj, "subs")}
                            >
                                <IconA name="minus" size={15} color="#548247" />
                            </TouchableOpacity>
                            <View style={[styles.addAndDeduct, { backgroundColor: "transparent" }]}>
                                <Text>{obj.quantity}</Text>
                            </View>
                            <TouchableOpacity style={styles.add}
                                onPress={() => this.addToCartFunction(obj, "add")}
                            >
                                <IconA name="plus" size={15} color="#548247" />
                            </TouchableOpacity>
                        </View>}
                </View>
                {item.isVisible ? this.call(item) : null}
                <Divider style={{ backgroundColor: 'gray' }} />
            </View>
        )
    }

    render() {
        console.log("OrderSummaryItemArray ", this.props.OrderSummaryItemArray);
        return (
            <View style={{ height: "100%", flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => {
                                this.props.clearListData()
                                this.props.navigation.goBack()
                            }}>
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{
                        text: this.props.searchData?.name,
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}

                    rightComponent={

                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            {this.props.totalItem ? <TouchableOpacity
                                onPress={() => {
                                    // this.props.incrementDecrementValue({ data: this.props.addToCartListData  })
                                    this.props.navigation.navigate("ViewCart")
                                    this.props.clearListData()

                                }}
                                style={{ padding: 10 }}
                            >
                                <View>
                                    <IconEv name="cart" color="#548247" size={30} />

                                    <Badge
                                        status="success"
                                        value={this.props.totalItem}
                                        containerStyle={{ position: 'absolute', top: -10, right: -4 }}
                                    />
                                    <Text style={{ fontSize: 10, color: "red", position: 'absolute', top: 25, left: -5, width: 100 }}>
                                        ₹ {this.props.totalPaymentedValue}.00
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
                                {/* <IconI name="ellipsis-vertical" color="#548247" size={20} /> */}
                            </TouchableOpacity>

                        </View>
                    }
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                {this.state.isLoading ? <Spinner visible={this.state.isLoading} color="green" /> :
                    <FlatList
                        data={this.state.addToCartListData}
                        renderItem={((item) => this.renderProductListData(item.item, item.index))}
                        keyExtractor={(item, i) => i.toString()}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={false}
                        horizontal={false}
                        contentContainerStyle={{
                            marginVertical: 5,
                        }}
                    />
                }
                {this.props.errorMessage ? <ToastMessage message={this.props.errorMessage} /> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.32,
        height: width * 0.3,
    },
    cardInside: {
        width: width * 0.32,
        height: width * 0.3,
        opacity: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    innerImageView: {
        left: 30, top: -30, justifyContent: "center", alignSelf: "center", backgroundColor: "#A82828", borderRadius: 20, width: 22
    },
    innerImageText: {
        justifyContent: "center", alignSelf: "center", fontSize: 15, color: "#fff"
    },
    renderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 10,
        paddingHorizontal: 10
    },
    textFormatMrp: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#C0C0C0",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        paddingVertical: 1
    },
    textFormatDmart: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#1D800E",
        paddingVertical: 1
    },
    textFormatSave: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#D05050",
        paddingVertical: 1
    },

    textFormatHeader: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black",
        paddingLeft: 20
    },
    optionView: {
        width: "30%",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        // height: 40,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignContent: "flex-end",
        marginRight: 7
    },
    addToCart: {
        // width: "30%",
        // fontSize: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    textColor: {
        color: "#fff"
    },
    quantityView: {
        flex: 1, justifyContent: "center", alignItems: "center", padding: 7
    },
    dropDownView: {
        // height: 50,
        // backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 10,
    },
    dropdownButton: {
        borderWidth: 1,
        height: 40,
        width: 90,
        fontWeight: "500",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    dropDownViewFlatlist: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 90,
        fontWeight: "500",
        borderRadius: 5


    },
    addAndDeduct: {
        width: "33%",
        justifyContent: "center",
        alignItems: "center",
    },
    add: {
        width: "33%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "#e0e0e0",
        borderLeftWidth: 1,
        backgroundColor: "#e0e0e0",
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5
    },
    deduct: {
        width: "33%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "#e0e0e0",
        borderRightWidth: 1,
        backgroundColor: "#e0e0e0",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    }

})

function mapStateToProps(state) {
    const { addToCartListDetails, isLoading, errorMessage, addToCartList_success, searchData } = state.productList
    const { totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray } = state.userOrderAndDeliveryReducer;
    return {
        addToCartListDetails, isLoading, errorMessage, addToCartList_success, searchData, totalItem, totalPaymentedValue, totalSaving, OrderSummaryItemArray
    };
}

export default connect(mapStateToProps, { addtoCartListCall, clearListData, incrementDecrementValue })(AddToCart);
// export default AddToCart