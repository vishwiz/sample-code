import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";
const { width } = Dimensions.get('window');

class AddToCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenWidth: Dimensions.get('window').width,
            screenheight: Dimensions.get('window').height,
            data: [],
            refresh: false


        }
    }

    componentDidMount = () => {
        let newObj = [

            {

                "productId": 1,

                "maxQuantity": 4,

                "name": "Boro Plus 10 RS",

                "productImageUrl": "https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg",

                "unit": "Gm",

                "discount": 0.5,

                "quantity": 0,

                "mrp": 10,

                "sellingPrice": 9.5,

                "isStock": true,

                "productOption": "10",

                "isVariantTrue": false,
                
                "isVisibile" : false,

                "productVariantList": [

                    {

                        "productId": 17,

                        "name": "Boro Plus 20",

                        "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",

                        "unit": "Gm",

                        "discount": 2,

                        "quantity": 0,

                        "mrp": 20,

                        "sellingPrice": 18,

                        "isStock": true,

                        "parentProductId": 1,

                        "supplierId": null,

                        "productOption": "20",

                        "maxQuantity": 4,

                        "istrue": false

                    },

                    {

                        "productId": 18,

                        "name": "Boro pus 50",

                        "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",

                        "unit": "Gm",

                        "discount": 4,

                        "quantity": 0,

                        "mrp": 50,

                        "sellingPrice": 46,

                        "isStock": true,

                        "parentProductId": 1,

                        "supplierId": null,

                        "productOption": "50",

                        "maxQuantity": 4,

                        "istrue": false

                    },

                    {

                        "productId": 19,

                        "name": "Boro Plus 100",

                        "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",

                        "unit": "Gm",

                        "discount": 8,

                        "quantity": 0,

                        "mrp": 100,

                        "sellingPrice": 92,

                        "isStock": true,

                        "parentProductId": 1,

                        "supplierId": null,

                        "productOption": "100",

                        "maxQuantity": 4,

                        "istrue": false

                    }

                ],


            }

        ]

        this.setState({ data: [...newObj] })
    }

    call = (item) => {
        return (
            <View style={styles.dropDownView}>
                <TouchableOpacity style={[styles.dropdownButton, {backgroundColor: item.isVariantTrue ? "transparent" : "#1D800E" } ]}
                    onPress={() => this.update(item)}
                >
                    <Text style={{color: item.isVariantTrue ? "#000" : "#fff"}}>{`${item.productOption} ${item.unit}`}</Text>
                </TouchableOpacity>
                {
                    item.productVariantList.length > 0 ?
                        // <TouchableOpacity style={styles.dropdownButton}>
                        //     <Text>{`${item.productVariantList.productOption} ${item.productVariantList.unit}`}</Text>
                        // </TouchableOpacity>
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

    updateDropdownModal=(index,isVisibile)=>{
        console.log("index,isVisibile ", index,isVisibile)
        let obj = [...this.state.data]
        // if(isVisibile){
            obj.forEach((element,value)=>{
                if(value == index && !isVisibile){
                    element.isVisibile = true
                }else{
                    element.isVisibile = false
                }
            })

            this.setState({data:[...obj]})
        // }
    }

    update = (item, index, ) => {
        console.log("item,index ", item, index)
        let obj = [...this.state.data]
        if (item.hasOwnProperty("isVariantTrue")) {

        }
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

        this.setState({ data: [...obj] })
    }

    renderDropDown = (item, index) => {
        // console.log("item ", item,index , main)
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
        console.log("item main major", item , index)
        let obj = {}
        if (item.productVariantList.length > 0 && item.isVariantTrue) {
            item.productVariantList.forEach(element => {
                console.log("isVariantTrue ", element.istrue);
                if (element.istrue) {
                    console.log("innnnnnn", element.mrp)
                    obj = { ...element }
                }
            })
        } else {
            obj = { ...item }
        }
        return (
            <View style={{ borderBottomColor: "#000", borderBottomWidth: 1, paddingVertical: 15 }}>
                <View style={styles.renderContainer}>
                    <Image style={styles.card} source={{ uri: item.productImageUrl }} />
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
                    paddingBottom: 10,
                }}>
                    <View style={{ width: "30%" }} />
                    <View style={styles.optionView}>
                        <View style={styles.quantityView}><Text>{`${obj.productOption} ${obj.unit}`}</Text></View>
                        <TouchableOpacity style={{ backgroundColor: "#1D800E" }}

                            onPress={()=>{
                                console.log("index ", index);
                                this.updateDropdownModal(index,item.isVisibile)}}
                        >
                            <Image style={{ width: 33, height: 37 }} source={require('../src/assests/Images/dropArrow11.png')} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.addToCart}>
                        <Text style={styles.textColor}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
                {item.isVisibile ? this.call(item) : null}
            </View>
        )
    }

    render() {
        console.log("this.state.data ", this.state.data);
        return (
            <View style={{ height: "100%", flex: 1 }}>
                <FlatList
                    data={this.state.data}
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

            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.34,
        height: width * 0.3,
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
        textDecorationStyle: 'solid'
    },
    textFormatDmart: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#1D800E",
    },
    textFormatSave: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#D05050",
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
        borderRadius: 3,
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
        fontWeight:"500",
        borderRadius:3,
        justifyContent: "center",
        alignItems: "center"
    },
    dropDownViewFlatlist: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 90,
        fontWeight:"500",
        borderRadius:3


    }
    // optionViewContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "space-between",
    //     paddingHorizontal: 10,
    //     paddingBottom: 10
    // }

})

// function mapStateToProps(state) {
//     const { productListDetails, isLoading, errorMessage } = state.productList
//     return {
//         productListDetails, isLoading, errorMessage
//     };
// }

// export default connect(mapStateToProps, { productListCall })(PRODUCTLIST);
export default AddToCart