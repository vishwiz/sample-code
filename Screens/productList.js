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
import { productListCall, carouselDataCall, searchTextValue } from '../src/actions/productListAction';
import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";
import Carousel, { PaginationLight } from 'react-native-x-carousel';
const { width } = Dimensions.get('window');

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenWidth: Dimensions.get('window').width,
            screenheight: Dimensions.get('window').height,
            productListData: [],
            isLoading: false,
            promotionData: [{
                coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg',
                cornerLabelColor: '#FFD300',
                cornerLabelText: 'GOTY',
            },
            {
                coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920358-336f9600-4900-11ea-8eec-cc919b991e90.jpg',
                cornerLabelColor: '#0080ff',
                cornerLabelText: 'NEW',
            },
            {
                coverImageUri: 'https://user-images.githubusercontent.com/6414178/73927874-25744200-490d-11ea-940f-db3e5dbd8b2b.jpg',
                cornerLabelColor: '#2ECC40',
                cornerLabelText: '-75%',
            },
            {
                coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920399-45e9cf80-4900-11ea-9d5b-743fe5e8b9a4.jpg',
                cornerLabelColor: '#2ECC40',
                cornerLabelText: '-20%',
            },]

        }
    }

    componentDidMount = () => {
        // let params = {
        //     CultureId: 1,
        //     TalukaId: 1,
        //     SupplierId: 1
        // }
        // this.setState(function (state, props) { return { isLoading: true } });
        // this.props.productListCall({
        //     endurl: '/GetCategoryList',
        //     requestData: params,
        // })
        // this.props.carouselDataCall({
        //     endurl: '/GetpromotionList',
        //     requestData: params,
        // })
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading && props.productList_success && props.carouselData_success) {
            return {
                isLoading: false,
                productListData: props.productListDetails,
                promotionData: props.carouselDataDetails

            };
        }

        if (props.errorMessage !== "") {
            return {
                isLoading: false,
            }
        }

        return null;
    }

    renderPromotionData = (data) => (
        <TouchableOpacity onPress={() => {
            // this.props.searchTextValue(data.name)
            this.props.move()
        }}
            key={data.coverImageUri}
        >

            <Image
                style={styles.card}
                source={{ uri: data.coverImageUri }}
            />
        </TouchableOpacity>
    );

    renderProductListData = (item, index) => {
        return (<View style={styles.flatListContainer}>
            {
                index === 0 ?
                    <Carousel
                        pagination={PaginationLight}
                        renderItem={this.renderPromotionData}
                        data={this.state.promotionData}
                        loop
                        autoplay
                    /> : null
            }
            <View style={styles.productHeader}>
                <Text style={styles.productListHeader}>{item.name}</Text>
            </View>
            <View style={styles.productImage}>
                <Image
                    style={{ width: this.state.screenWidth, height: 140 }}
                    source={
                        {
                            uri: `${item.categoryImageUrl}`,
                        }
                    }
                />
            </View>

        </View>)
    }
    render() {
        return (
            <View style={{ height: "100%", flex: 1 }}>

                <Carousel
                    pagination={PaginationLight}
                    renderItem={this.renderPromotionData}
                    data={this.state.promotionData}
                    loop
                    autoplay
                />
                {/* {this.state.isLoading ? <Spinner visible={this.state.isLoading} color="green" /> :
                    <FlatList
                        data={this.state.productListData}
                        renderItem={((item) => this.renderProductListData(item.item, item.index))}
                        keyExtractor={(item, i) => i.toString()}
                        extraData={this.state}
                        horizontal={false}
                        contentContainerStyle={{
                            marginVertical: 5,
                        }}
                    />
                }
                {this.props.errorMessage ? <ToastMessage message={this.props.errorMessage} /> : null} */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 375,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    productHeader: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    productListHeader: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
    productImage: {
        resizeMode: "cover",
        height: 190,

    },
    flatListContainer: {
        paddingBottom: 30
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    cardWrapper: {
        // borderRadius: 8,
        overflow: 'hidden',
    },
    card: {
        width: width,
        height: width * 0.5,
    },
    cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
})

function mapStateToProps(state) {
    const { productListDetails, isLoading, errorMessage, carouselDataDetails, carouselData_success, productList_success } = state.productList
    return {
        productListDetails, isLoading, errorMessage, carouselDataDetails, carouselData_success, productList_success
    };
}

export default connect(mapStateToProps, { productListCall, carouselDataCall, searchTextValue })(ProductList);
// export default PRODUCTLIST