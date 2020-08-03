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
    Alert
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

    componentDidMount = () => {

        // let newObj = [

        //     {

        //         "productId": 1,

        //         "maxQuantity": 4,

        //         "name": "Boro Plus 10 RS",

        //         "productImageUrl": "https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg",

        //         "unit": "Gm",

        //         "discount": 0.5,

        //         "quantity": 0,

        //         "mrp": 10,

        //         "sellingPrice": 9.5,

        //         "isStock": true,

        //         "productOption": "10",

        //         "isVariantTrue": false,

        //         "isVisible": false,

        //         "quantity": 0,

        //         "productVariantList": [

        //             {

        //                 "productId": 17,

        //                 "name": "Boro Plus 20",

        //                 "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",

        //                 "unit": "Gm",

        //                 "discount": 2,

        //                 "quantity": 0,

        //                 "mrp": 20,

        //                 "sellingPrice": 18,

        //                 "isStock": true,

        //                 "parentProductId": 1,

        //                 "supplierId": null,

        //                 "productOption": "20",

        //                 "maxQuantity": 4,

        //                 "istrue": false,

        //                 "quantity": 0,

        //             },

        //             {

        //                 "productId": 18,

        //                 "name": "Boro pus 50",

        //                 "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",

        //                 "unit": "Gm",

        //                 "discount": 4,

        //                 "quantity": 0,

        //                 "mrp": 50,

        //                 "sellingPrice": 46,

        //                 "isStock": true,

        //                 "parentProductId": 1,

        //                 "supplierId": null,

        //                 "productOption": "50",

        //                 "maxQuantity": 4,

        //                 "istrue": false,

        //                 "quantity": 0,

        //             },

        //             {

        //                 "productId": 19,

        //                 "name": "Boro Plus 100",

        //                 "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",

        //                 "unit": "Gm",

        //                 "discount": 8,

        //                 "quantity": 0,

        //                 "mrp": 100,

        //                 "sellingPrice": 92,

        //                 "isStock": true,

        //                 "parentProductId": 1,

        //                 "supplierId": null,

        //                 "productOption": "100",

        //                 "maxQuantity": 4,

        //                 "istrue": false,

        //                 "quantity": 0,

        //             }

        //         ],


        //     }

        // ]

        // this.onAddToCartListSuccess(newObj)

        // this.setState({ data: [...newObj] })
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
                            horizontal={false}
                            numColumns={4}
                            contentContainerStyle={{
                                marginVertical: 5,
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
                                insideElement.totalSavingAmmount = insideElement.quantity * insideElement.discount;
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
                        element.totalSavingAmmount = element.quantity * element.discount;
                        obj.quantity = element.quantity;
                        obj.totalSelllingPriceWithQuantity = element.totalSelllingPriceWithQuantity;
                        obj.totalSavingAmmount = element.totalSavingAmmount;
                    }
                })
            }

            if (createViewCart.some(item => item.productId === obj.productId)) {
                createViewCart.forEach(elementRedux => {

                    if (elementRedux.productId === obj.productId) {
                        elementRedux.quantity = obj.quantity
                        elementRedux.totalSelllingPriceWithQuantity = obj.totalSelllingPriceWithQuantity
                        elementRedux.totalSavingAmmount = obj.totalSavingAmmount
                    }
                    totalProducts += elementRedux.quantity
                    totalAmount += elementRedux.totalSelllingPriceWithQuantity
                })
            } else {
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

            // this.props.addtoCartListCompleteData(createViewCart)
            
            this.props.incrementDecrementValue({ data: createViewCart, totalPaymentedValue: totalAmount, totalItem: totalProducts })
            this.setState({ addToCartListData: [...objState],})
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
                                    <ImageBackground style={styles.cardInside} source={require('../src/assests/Images/depositphotos_323434424-stock-video-green-shopping-cart-neon-blink.jpg')} >
                                        <View style={styles.innerImageView}>
                                            <Text style={styles.innerImageText}>{obj.quantity}</Text>
                                        </View>
                                    </ImageBackground> : null : <ImageBackground style={styles.cardInside} source={require('../src/assests/Images/depositphotos_323434424-stock-video-green-shopping-cart-neon-blink.jpg')} >
                                    <View style={styles.innerImageView}>
                                        <Text style={styles.innerImageText}>Not in Stocks</Text>
                                    </View>
                                </ImageBackground>}
                    </ImageBackground>
                    <View style={{ flex: 1, height: "100%", }}>
                        <View style={{ justifyContent: "flex-start", alignContent: "flex-start" }}>
                            <Text style={styles.textFormatHeader}>{obj.name}</Text>
                        </View>
                        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", paddingTop: 5 }}>
                            <Text style={styles.textFormatMrp}>{obj.quantity > 0 ? null : `MRP ${'\u20B9'} ${obj.mrp}.00`}</Text>
                            <Text style={styles.textFormatDmart}>{`${obj.quantity > 0 ? "You Pay" : "DMART"} ${'\u20B9'} ${obj.quantity > 0 ? obj.totalSelllingPriceWithQuantity : obj.sellingPrice}.00`}</Text>
                            <Text style={styles.textFormatSave}>{`${obj.quantity > 0 ? "You Save" : "Save"} ${'\u20B9'} ${obj.quantity > 0 ? obj.totalSavingAmmount : obj.discount}.00`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    paddingBottom: 10,
                }}>
                    <View style={{ width: "30%", padding: 8 }} />
                    <View style={styles.optionView}>
                        <View style={styles.quantityView}><Text>{`${obj.productOption} ${obj.unit}`}</Text></View>
                        {
                            item.productVariantList.length > 0 ?
                                <TouchableOpacity style={{
                                    backgroundColor: "#1D800E", borderTopRightRadius: 5,
                                    borderBottomRightRadius: 5
                                }}

                                    onPress={() => {
                                        this.updateDropdownModal(index, item.isVisible)
                                    }}
                                >
                                    <Image style={{ width: 30, height: 34 }} source={require('../src/assests/Images/dropArrow11.png')} />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                    {obj.quantity === 0 ? <TouchableOpacity style={styles.addToCart}
                        onPress={() => this.addToCartFunction(obj, "add")}
                    >
                        <Text style={styles.textColor}>ADD TO CART</Text>
                    </TouchableOpacity>
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
                                <IconI name="ellipsis-vertical" color="#548247" size={20} />
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
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center"
    },
    innerImageView: {
        left: 20, top: -15, justifyContent: "center", alignSelf: "center", backgroundColor: "#fff", borderRadius: 20, width: 22
    },
    innerImageText: {
        justifyContent: "center", alignSelf: "center", fontSize: 15,
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
        borderColor: "#1D800E",
        // height: 40,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignContent: "flex-end",
    },
    addToCart: {
        width: "27%",
        backgroundColor: "#1D800E",
        padding: 8,
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
        alignItems: "center"
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

export default connect(mapStateToProps, { addtoCartListCall, addtoCartListCompleteData, clearListData, incrementDecrementValue })(AddToCart);
// export default AddToCart