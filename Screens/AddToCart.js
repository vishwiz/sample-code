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
            data: [

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

                            "maxQuantity": 4

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

                            "maxQuantity": 4

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

                            "maxQuantity": 4

                        }

                    ]

                }

            ]


        }
    }

    // componentDidMount = () => {
    // }

    renderProductListData = (item) => {
        console.log("item ", item)
        return (
            <View>
                <View style={styles.renderContainer}>
                    <Image style={styles.card} source={{ uri: item.productImageUrl }} />
                    <View style={{ flex: 1, height: "100%",  }}>
                        <View style={{ justifyContent: "flex-start", alignContent: "flex-start" }}>
                            <Text style={styles.textFormatHeader}>{item.name}</Text>
                        </View>
                        <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Text style={styles.textFormatMrp}>MRP {'\u20B9'} {item.mrp}.00</Text>
                            <Text style={styles.textFormatDmart}>DMART {'\u20B9'} {item.sellingPrice}.00</Text>
                            <Text style={styles.textFormatSave}>Save {'\u20B9'} {item.discount}.00</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex:1,flexDirection:"row", justifyContent: "space-between", alignItems: "space-between",
                // backgroundColor: "#9FFFFF",
                 paddingHorizontal:10 }}>
                {/* <TouchableOpacity style={styles.optionView}>
                        <Text>4</Text>
                    </TouchableOpacity> */}
                    <View style={{width:"30%"}} />
                    <View style={styles.optionView}>
                <Text>{`${item.productOption} ${item.unit}`}</Text>
                        <TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.addToCart}>
                        <Text style={styles.textColor}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{backgroundColor:"#9FFFFF"}}>
                    <Text>welcome my friend ,..... welcome</Text>
                </View> */}
            </View>
        )
    }

    render() {
        console.log("welcome my friend ,..... welcome ", this.state.data[0].productImageUrl);
        return (
            <View style={{ height: "100%", flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={((item) => this.renderProductListData(item.item))}
                    keyExtractor={(item, i) => i.toString()}
                    extraData={this.state}
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
        // backgroundColor: "red",
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
        color: "#32B232",
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
    optionView:{
        width:"30%",
        backgroundColor:"transparent",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:3,
        height:40,
        borderWidth:1

    },
    addToCart:{
        width:"35%",
        backgroundColor:"#32B232",
        height:40,
        fontSize: 10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:3,
       
    },
    textColor:{
       color:"#fff"
    }

})

// function mapStateToProps(state) {
//     const { productListDetails, isLoading, errorMessage } = state.productList
//     return {
//         productListDetails, isLoading, errorMessage
//     };
// }

// export default connect(mapStateToProps, { productListCall })(PRODUCTLIST);
export default AddToCart