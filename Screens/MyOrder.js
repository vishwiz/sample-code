import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    BackHandler,
    FlatList
} from 'react-native';
import { Header, Badge, Divider } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import { myOrdersCall } from '../src/actions/productListAction';
import { connect } from 'react-redux';

class MyOrders extends Component {
    constructor(props) {
        super(props)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            isLoading: false,
            myOrders : []
        }
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount = ()=>{
        this.apiFunctionCall()
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading && props.myOrders_success) {
            return {
                isLoading: false,
                myOrders: props.myOrdersDetails
            };
        }

        if (props.errorMessage !== "") {
            return {
                isLoading: false,
            }
        }

        return null;
    }


    apiFunctionCall = ()=>{
        let params = {
            "UserId": 1,
            "TalukaId": 1,
            "CultureId": 1,
            "SupplierId": 1
        }
        this.setState(function (state, props) { return { isLoading: true, myOrders: []} });
        this.props.myOrdersCall({
            endurl: '/GetOrders',
            requestData: params,
        })
    }

    renderProductListData = (item) => {
        console.log("item ", item);
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "space-between", paddingBottom: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "black", paddingHorizontal: 10, paddingBottom: 10, fontSize: 15 }}>ORDER ID</Text>
                        <Text style={{ color: "black", fontWeight: "700", fontSize: 15 }}>{item.orderId}</Text>
                    </View>
                    <View style={{ backgroundColor: "#d1801d", justifyContent: "center", alignItems: "center", borderRadius: 5, paddingLeft: 5, paddingRight: 5, marginRight: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>CASH ON DELIVERY</Text>
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <View>
                        <Text style={{ color: "black", fontSize: 15 }}>ORDER TOTAL</Text>
                        <Text style={{ color: "grey", fontSize: 15 }}>{'\u20B9' + item.totalAmount}</Text>
                    </View>
                    <View>
                        <Text style={{ color: "black", fontSize: 15 }}>DELIVERY TYPE</Text>
                        <Text style={{ color: "grey", fontSize: 15 }}>{item.deliveryTypeId == 2 ? "Store collect" : "Home Delivery"}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.log("/api/GetOrders ", this.props.myOrdersDetails , this.state.myOrders);
        return <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                placement="left"
                leftComponent={
                    <TouchableHighlight
                        activeOpacity={0}
                        style={{ padding: 10 }}
                        onPress={() => {
                            // this.props.clearListData()
                            this.props.navigation.goBack()
                        }}>
                        <IconI name="chevron-back" size={25} color="#548247" />
                    </TouchableHighlight>
                }
                centerComponent={{
                    text: "MY ORDERS",
                    style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                }}
                containerStyle={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: "grey"
                }}
            />
            <FlatList
                data={this.state.myOrders}
                renderItem={((item) => this.renderProductListData(item.item))}
                keyExtractor={(item, i) => i.toString()}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                horizontal={false}
                onRefresh={this.apiFunctionCall}
                refreshing={this.state.isLoading}
                contentContainerStyle={{
                    marginVertical: 5,
                }}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 15,
        borderColor: "grey",
        paddingTop: 5,
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "space-between",
        paddingHorizontal: 10, paddingBottom: 10
    }
})

function mapStateToProps(state) {
    const {  isLoading, errorMessage, myOrdersDetails, myOrders_success } = state.productList
    return {
         isLoading, errorMessage, myOrdersDetails, myOrders_success
    };
}

export default connect(mapStateToProps, {myOrdersCall})(MyOrders);
// export default MyOrders

