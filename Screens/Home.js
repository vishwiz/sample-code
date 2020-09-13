import React, { Component } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconEv from 'react-native-vector-icons/EvilIcons';
import IconAF from 'react-native-vector-icons/FontAwesome5';

import Modal from 'react-native-modal';
import { Header, Badge } from 'react-native-elements';
import { connect } from "react-redux";
import { addtoCartListCall, addtoCartListCompleteData, clearListData } from '../src/actions/productListAction';
import { resetUserData, productSettings, logOutUser } from "../src/actions";
import ProductList from "./productList"
import Search from "./search"


class App extends Component {

    state = {
        modalVisible: false,
        orderMessage : false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    componentDidMount() {
        this.props.clearListData()
        this.props.productSettings({
            endurl: '/GetProductSetting',
            requestData: {
                "TalukaId": 1,
                "CultureId": 1,
                "SupplierId": 1
            }
        });
    }

    
    // static getDerivedStateFromProps(props, state) {
    //     if(props.sucessMessageOrder){
    //         return {
    //             orderMessage : true
    //         }
    //     }
    // }

    componentDidUpdate(){
        if(this.props.route.params?.sucessMessageOrder && !this.state.orderMessage){
            Alert.alert(this.props.route.params?.sucessMessageOrder)
            this.setState({orderMessage:true})
        }
    }

    render() {
        return (
            <View style={styles.centeredView}>
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <IconE name="menu" size={20} color="#548247" />
                        </TouchableHighlight>}
                    centerComponent={
                        // { text: 'DMart', style: { color: '#548247', fontWeight: "bold", fontSize: 18 } }
                        <Image
                            style={styles.imageStyle}
                            // resizeMode={'contain'}
                            source={require('../src/assests/Images/feelful_logo.png')}
                        />
                    }
                    rightComponent={

                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            <TouchableHighlight
                                onPress={() => {
                                    this.props.navigation.navigate("ViewCart")
                                }}
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
                                                ₹ {this.props.totalPaymentedValue}
                                            </Text>
                                        </> :
                                        null
                                    }


                                </View>
                            </TouchableHighlight>


                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(true)
                                }}
                                style={{ padding: 10 }}
                            >
                                <IconI name="ellipsis-vertical" color="#548247" size={20} />
                            </TouchableHighlight>

                        </View>
                    }
                    containerStyle={{
                        backgroundColor: 'white'
                    }}
                />



                <Modal
                    isVisible={this.state.modalVisible}
                    animationIn={"fadeInRight"}
                    animationOut={"fadeOutRight"}
                    onBackdropPress={() => this.setState({ modalVisible: false })}>
                    <View style={styles.modalViewCode}>

                        {
                            this.props.isLogged ?
                                <View style={styles.modalView}>
                                    <TouchableOpacity
                                        activeOpacity={0.1}
                                        onPress={() => {
                                            this.setState({ modalVisible: false }, () => {
                                                this.props.navigation.navigate('MyOrders')
                                            })
                                        }}>
                                        <View style={styles.userView} >
                                            <IconAF name="box-open"
                                                color="green"
                                                size={15}
                                            />
                                            <Text style={styles.modalText}>MY ORDERS</Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.1}
                                        onPress={() => {
                                            this.setState({ modalVisible: false }, () => {
                                                this.props.logOutUser();
                                            })
                                            this.forceUpdate();
                                        }}>
                                        <View style={styles.userView} >
                                            <IconA name="logout"
                                                color="green"
                                                size={20}
                                            />
                                            <Text style={styles.modalText}>SIGN OUT</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.modalView}>
                                    <TouchableOpacity
                                        activeOpacity={0.1}
                                        onPress={() => {
                                            this.setState({ modalVisible: false }, () => {
                                                this.props.navigation.navigate('Login', { register: false })
                                            })
                                        }}>
                                        <View style={styles.userView} >
                                            <IconA name="login"
                                                color="green"
                                                size={20}
                                            />
                                            <Text style={styles.modalText}>SIGN IN</Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.1}
                                        onPress={() => {
                                            this.setState({ modalVisible: false }, () => {
                                                this.props.navigation.navigate('Register')
                                            })
                                        }}>
                                        <View style={styles.userView}>
                                            <IconA name="adduser"
                                                color="green"
                                                size={20}
                                            />
                                            <Text style={styles.modalText}>REGISTER</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                        }

                    </View>
                </Modal>
                <Search
                    move={() => this.props.navigation.navigate('AddToCart')}
                />
                <ProductList
                    move={() => this.props.navigation.navigate('AddToCart')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1
    },
    imageStyle: {
        width: 40,
        height: 60,
    },
    userView: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        textAlignVertical: "center"
    },
    modalViewCode: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        marginHorizontal: 20,
    }
});


function mapStateToProps(state) {
    const { isLogged } = state.register;
    const { totalItem, totalPaymentedValue, OrderSummaryItemArray } = state.userOrderAndDeliveryReducer;


    return {
        isLogged, totalItem, totalPaymentedValue, OrderSummaryItemArray
    }

}

export default connect(mapStateToProps, { resetUserData, productSettings, logOutUser, clearListData })(App);