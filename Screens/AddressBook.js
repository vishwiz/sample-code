import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Alert,
    FlatList,
    BackHandler
} from 'react-native';
import { Header, Divider } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

//for redux
import { connect } from 'react-redux';
import { selectAddress } from '../src/actions/deliveryAction';

class SelectDeliveryType extends Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            fullView: false

        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }


    renderItem = ({ item }) => {
        return (

            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                    this.props.navigation.goBack();
                    this.props.selectAddress({
                        selectedAddress: item,
                    });
                }}
            >
                <View style={{ padding: 10, borderColor: "gray", borderWidth: 1, borderRadius: 5, marginVertical: 8, backgroundColor: "white" }}>
                    <Text>{item.fullName}</Text>
                    <Text>{item.address}</Text>
                    <Text>{item.area}, {item.city}, {item.state}</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.pinCode}</Text>
                    <Text>Landmark : {item.landmark}</Text>

                </View >
            </TouchableOpacity>
        )

    }


    render() {

        console.log("this.props.addressDetailsValue : ", this.props.addressDetailsValue)


        return (
            <View>
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
                        text: 'ADDRESS BOOK',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />

                <View style={styles.containerStyle}>
                    <FlatList
                        data={this.props.addressDetailsValue}
                        renderItem={this.renderItem}
                        keyExtractor={(item, i) => i.toString()}
                        ListFooterComponent={
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => {
                                    this.props.navigation.navigate("AddNewAddress")
                                }}
                            >
                                <View style={styles.addNewAddress}>
                                    <Text style={{ color: "#548247" }}>ADD NEW ADDRESS</Text>
                                </View>
                            </TouchableOpacity>

                        }
                    />

                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "gray",
        marginBottom: 100,
        padding: 15
    },

    addNewAddress: {
        alignItems: "center",
        height: 40,
        borderColor: "#548247",
        borderWidth: 1,
        justifyContent: "center",
        width: "98%",
        backgroundColor: "white",
        borderRadius: 5
    }

});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage } = state.register;
    const { addressDetailsValue } = state.userOrderAndDeliveryReducer;
    return {
        isLoading, login_failure, errorMessage, addressDetailsValue
    };
}

export default connect(mapStateToProps, { selectAddress })(SelectDeliveryType);
