import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";
import { addtoCartListCall, addtoCartListCompleteData } from '../src/actions/productListAction';
const { width } = Dimensions.get('window');

class AddToCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenWidth: Dimensions.get('window').width,
            screenheight: Dimensions.get('window').height,
            addToCartListData: [],
            refresh: false,
            maximumNumberAlert: false



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

        //         "addedQuantity": 0,

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

        //                 "addedQuantity": 0,

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

        //                 "addedQuantity": 0,

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

        //                 "addedQuantity": 0,

        //             }

        //         ],


        //     }

        // ]

        // this.setState({ data: [...newObj] })
        let params = {
            "CultureId": 1,
            "TalukaId": 1,
            "SupplierId": 1,
            "ProductSerachName": this.props.searchText,
            "SubCategoryId": 0
        }
        this.setState(function (state, props) { return { isLoading: true } });
        this.addtoCartListCall = true
        this.props.addtoCartListCall({
            endurl: '/GetProductListWithProductSearchName',
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
        let newData = this.props.addToCartListData
        addToCartListDetails.forEach(element => {
            element.isVisible = false
            element.addedQuantity = 0
            element.isVariantTrue = false
            element.productVariantList.length > 0 ?
                element.productVariantList.forEach(insideElement => {
                    insideElement.istrue = false
                    insideElement.addedQuantity = 0
                }) : null
        })

        if (newData.length === 0) {
            newData = [...addToCartListDetails]
        } else {
            let newTempData = [...addToCartListDetails]
            newData.forEach(newDataElement => {
                newDataElement.isVisible = false
                newDataElement.isVariantTrue = false
                newDataElement.productVariantList.length > 0 ?
                    newDataElement.productVariantList.forEach(insideElement => {
                        insideElement.istrue = false
                        // insideElement.addedQuantity = 0
                    }) : null
                newTempData.forEach((element, index) => {
                    if (newDataElement.productId == element.productId) {
                        newTempData.splice(index, 1)
                    }
                })
            })
            newData = [...newData, ...newTempData]
        }
        this.props.addtoCartListCompleteData(newData)
        this.setState({ addToCartListData: [...newData] })


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
        let objState = [...this.state.addToCartListData]
        if (obj.addedQuantity === obj.maxQuantity && process === "add") {
            this.setState({ maximumNumberAlert: !this.state.maximumNumberAlert })
        }
        else {
            if (obj.hasOwnProperty("parentProductId")) {
                objState.forEach(element => {
                    if (element.productId === obj.parentProductId) {
                        element.productVariantList.forEach(insideElement => {
                            if (insideElement.productId == obj.productId) {
                                if (process == "add") {
                                    insideElement.maxQuantity <= insideElement.addedQuantity ? <ToastMessage message={"this.props.errorMessage"} /> : insideElement.addedQuantity += 1
                                } else {
                                    insideElement.addedQuantity -= 1
                                }
                            }
                        })
                    }
                })
            } else {
                objState.forEach(element => {
                    if (element.productId === obj.productId) {
                        if (process == "add") {
                            element.maxQuantity <= element.addedQuantity ? () => <ToastMessage message={"this.props.errorMessage"} /> : element.addedQuantity += 1
                        } else {
                            element.addedQuantity -= 1
                        }
                    }
                })
            }
            this.props.addtoCartListCompleteData(objState)
            this.setState({ addToCartListData: [...objState] })
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
            <View style={{ borderBottomColor: "#000", borderBottomWidth: 1, paddingVertical: 15 }}>
                <View style={styles.renderContainer}>
                    <ImageBackground style={styles.card} source={{ uri: obj.productImageUrl }} >
                        {
                            obj.isStock ?
                                obj.addedQuantity > 0 ?
                                    <ImageBackground style={styles.cardInside} source={require('../src/assests/Images/depositphotos_323434424-stock-video-green-shopping-cart-neon-blink.jpg')} >
                                        <View style={styles.innerImageView}>
                                            <Text style={styles.innerImageText}>{obj.addedQuantity}</Text>
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
                        <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Text style={styles.textFormatMrp}>MRP {'\u20B9'} {obj.mrp}.00</Text>
                            <Text style={styles.textFormatDmart}>DMART {'\u20B9'} {obj.sellingPrice}.00</Text>
                            <Text style={styles.textFormatSave}>Save {'\u20B9'} {obj.discount}.00</Text>
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
                    <View style={{ width: "30%" }} />
                    <View style={styles.optionView}>
                        <View style={styles.quantityView}><Text>{`${obj.productOption} ${obj.unit}`}</Text></View>
                        {
                            item.productVariantList.length > 0 ?
                                <TouchableOpacity style={{ backgroundColor: "#1D800E" }}

                                    onPress={() => {
                                        this.updateDropdownModal(index, item.isVisible)
                                    }}
                                >
                                    <Image style={{ width: 33, height: 37 }} source={require('../src/assests/Images/dropArrow11.png')} />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                    {obj.addedQuantity === 0 ? <TouchableOpacity style={styles.addToCart}
                        onPress={() => this.addToCartFunction(obj, "add")}
                    >
                        <Text style={styles.textColor}>ADD TO CART</Text>
                    </TouchableOpacity>
                        :
                        <View style={{ flexDirection: "row", width: "35%", borderRadius: 3 }}>
                            <TouchableOpacity style={styles.addAndDeduct}
                                onPress={() => this.addToCartFunction(obj, "subs")}
                            >
                                <Text style={{ color: "grey", }}>-</Text>
                            </TouchableOpacity>
                            <View style={[styles.addAndDeduct, { backgroundColor: "transparent" }]}>
                                <Text>{obj.addedQuantity}</Text>
                            </View>
                            <TouchableOpacity style={styles.addAndDeduct}
                                onPress={() => this.addToCartFunction(obj, "add")}
                            >
                                <Text style={{ color: "grey" }}>+</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
                {item.isVisible ? this.call(item) : null}
            </View>
        )
    }

    render() {
        console.log("process ", this.state.maximumNumberAlert);
        return (
            <View style={{ height: "100%", flex: 1 }}>
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
                {this.state.maximumNumberAlert || this.props.errorMessage ? <ToastMessage message={this.state.maximumNumberAlert ? "exceded maximum number of limit" : this.props.errorMessage} /> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.34,
        height: width * 0.3,
    },
    cardInside: {
        width: width * 0.34,
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
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    textFormatMrp: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#C0C0C0",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        paddingVertical: 5
    },
    textFormatDmart: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#1D800E",
        paddingVertical: 5
    },
    textFormatSave: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#D05050",
        paddingVertical: 5
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
        borderRadius: 3,
        borderColor: "#1D800E",
        height: 40,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignContent: "flex-end",
    },
    addToCart: {
        width: "35%",
        backgroundColor: "#1D800E",
        height: 40,
        fontSize: 10,
        justifyContent: "center",
        alignItems: "center",
        // borderRadius: 3,
    },
    textColor: {
        color: "#fff"
    },
    quantityView: {
        flex: 1, justifyContent: "center", alignItems: "center"
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
        height: 50,
        width: 90,
        fontWeight: "500",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    dropDownViewFlatlist: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 90,
        fontWeight: "500",
        borderRadius: 3


    },
    addAndDeduct: {
        width: "33.5%",
        backgroundColor: "#DCDCDC",
        height: 40,
        fontSize: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})

function mapStateToProps(state) {
    const { addToCartListDetails, isLoading, errorMessage, addToCartListData, addToCartList_success, searchText } = state.productList
    return {
        addToCartListDetails, isLoading, errorMessage, addToCartListData, addToCartList_success, searchText
    };
}

export default connect(mapStateToProps, { addtoCartListCall, addtoCartListCompleteData })(AddToCart);
// export default AddToCart