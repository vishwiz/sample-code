import React, { Component } from "react";
import { Alert, StyleSheet, View, TouchableHighlight, Text, FlatList, Platform, Image, TouchableOpacity } from "react-native";
import { Header, Button } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';

import Spinner from 'react-native-loading-spinner-overlay';
import ToastMessage from "../src/component/ToastMessage";

import { connect } from 'react-redux';
import { pickUpPointList, savePickUpPointList } from '../src/actions/deliveryAction';

class PickUpPointList extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isLoading: false
        };
    }

    componentDidMount() {

        this.setState({ isLoading: true })
        this.props.pickUpPointList({
            endurl: '/GetPickUpPointList',
            requestData: {
                "TalukaId": 1,
                "CultureId": 1,
                "SupplierId": 1
            }
        });

    }



    static getDerivedStateFromProps(props, state) {
        if (!props.isLoading) {
            return {
                isLoading: false,
            };
        }
        return null;
    }

    _renderFlatList = (item) => {

        console.log(item.item)

        item.item.name = "Shop No. 21, Sicily Park CHSL, Plot No. 54, Sector No. 12-B, Koperkhairane, Navi Mumbai Maharashtra 400709";
        item.item.address  = `Navi Mumbai Maharashtra 400709`;


        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.savePickUpPointList(item.item)
                    this.props.navigation.goBack();
                }}
            >
                <View style={styles.flatListRender}>
                    <Text style={styles.textValue}>
                        {`Shop No. 21, Sicily Park CHSL, Plot No. 54, Sector No. 12-B, Koperkhairane, Navi Mumbai Maharashtra 400709`}
                    </Text>
                    <Text style={styles.textValue}>
                        {`Navi Mumbai Maharashtra 400709`}
                    </Text>
                </View>
            </TouchableOpacity>

        )
    }




    render() {

        return (
            <View >
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{ text: 'PICK UP POINT LIST', style: { color: '#548247', fontWeight: "bold", fontSize: 18 } }}

                    containerStyle={{
                        backgroundColor: 'white'
                    }}
                />

                <Spinner visible={this.state.isLoading} color="green" />
                {
                    this.props.pickUpPointList_failure ? <ToastMessage message={this.props.errorMessage} /> : null
                }

                <FlatList
                    data={this.props.pickUpPointListArray}
                    renderItem={(item, index) => this._renderFlatList(item, index)}
                    keyExtractor={item => item.pickUpPointId.toString()}
                />



            </View>
        );
    }
}

const styles = StyleSheet.create({

    flatListRender: {
        flex: 1,
        backgroundColor: "white",
        width: "95%",
        alignSelf: "center",
        padding: 15,
        margin: 10,
        borderColor: "#dddbdb",
        borderWidth: 1,
        borderRadius: 5,
        height: 100,
        justifyContent: "space-between"
    },
    textValue: {

        fontSize: 14,
        color: "black"

    }

});

function mapStateToProps(state) {

    const { isLoading, pickUpPointListArray, pickUpPointList_failure, errorMessage } = state.userOrderAndDeliveryReducer;
    return {
        pickUpPointListArray,
        isLoading,
        pickUpPointList_failure,
        errorMessage

    }
}

export default connect(mapStateToProps, { pickUpPointList, savePickUpPointList })(PickUpPointList);
