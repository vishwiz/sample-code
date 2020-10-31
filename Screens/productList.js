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
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenWidth: Dimensions.get('window').width,
            screenheight: Dimensions.get('window').height,
            productListData: [],
            isLoading: false,
            promotionData: [],
            isError: false

        }
    }

    componentDidMount = () => {
        this.functionCall()
    }

    functionCall = () => {
        let params = {
            CultureId: 1,
            TalukaId: 1,
            SupplierId: 1
        }
        this.setState(function (state, props) { return { isLoading: true, productListData: [], promotionData: [], isError: true } });
        this.props.productListCall({
            endurl: '/BrandDetailList',
            requestData: params,
        })
        this.props.carouselDataCall({
            endurl: '/GetpromotionList',
            requestData: params,
        })
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
            this.props.searchTextValue({
                name: data.name,
                pathName: "promotion",
                id: data.promotionId
            })
            this.props.move()
        }}
            key={data.promotionId}
        >

            <Image
                style={styles.card}
                resizeMode={'stretch'}
                source={{ uri: data.promtionImageUrl }}
            />
        </TouchableOpacity>

    );

    renderProductListData = (item, index) => {
        return (<View style={styles.flatListContainer}>
            {
                index === 0 ?
                    <View style={{ paddingBottom: 20, }}>
                        <Carousel
                            // pagination={PaginationLight}
                            renderItem={this.renderPromotionData}
                            data={this.state.promotionData}
                            loop
                            autoplay
                        />
                         <LinearGradient colors={['#fff', '#FFCC00']} style={[styles.linearGradient]}>
                        <View style={[styles.productHeader,{ paddingTop: 20, }]}>
                            <Text style={[styles.productListHeader]}>Shop By Category</Text>
                        </View>
                        </LinearGradient>
                    </View> 
                    : null
            }
            <View style={styles.productHeader}>
                <Text style={styles.productListHeader}>{item.name}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    this.props.searchTextValue({
                        name: item.name,
                        pathName: "brand",
                        id: item.brandDetailId
                    })
                    this.props.move()
                }}
                style={styles.productImage}>
                <Image
                    style={{ width: this.state.screenWidth, height: 190 }}
                    source={
                        {
                            uri: `${item.brandDetailImageUrl}`,
                        }
                    }
                />
            </TouchableOpacity>

        </View>)
    }
    render() {
        return (
            <View style={{ height: "100%", flex: 1 }}>

                {this.state.isLoading ? <Spinner visible={this.state.isLoading} color="green" /> :
                    <FlatList
                        data={this.state.productListData}
                        renderItem={((item) => this.renderProductListData(item.item, item.index))}
                        keyExtractor={(item, i) => i.toString()}
                        extraData={this.state}
                        horizontal={false}
                        onRefresh={this.functionCall}
                        refreshing={this.state.isLoading}
                        contentContainerStyle={{
                            marginVertical: 5,
                        }}
                    />
                }
                {(this.state.isError && this.props.errorMessage) ? <ToastMessage message={this.props.errorMessage} /> : null}
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
        paddingBottom: 5
    },
    productListHeader: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
    productImage: {
        resizeMode: "cover",
        // height: 190,

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