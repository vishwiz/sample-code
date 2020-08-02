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
    Alert,
    TextInput,
    Keyboard,
} from "react-native";
// import IconI from 'react-native-vector-icons/Ionicons';
// import IconEv from 'react-native-vector-icons/EvilIcons';
// import IconA from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import IconF from 'react-native-vector-icons/FontAwesome'
import { addtoCartListCall, searchTextValue } from '../src/actions/productListAction';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: "",
        }
    }

    // static getDerivedStateFromProps(props) {
    //     if (props.addToCartListDetails.length === 0) {
    //         return {
    //             searchText: ""
    //         }
    //     }


    //     return null;
    // }

    searchApiCall = (searchText) => {
        let params = {
            "CultureId": 1,
            "TalukaId": 1,
            "SupplierId": 1,
            "ProductSerachName": searchText,
        }

        searchText.length > 3 ? this.props.addtoCartListCall({
            endurl: '/GetProductListByProductSearchName',
            requestData: params,
        }) : null
    }

    renderProductListData = (item) => {
        return <TouchableWithoutFeedback
            onPress={() => {
                this.setState({ searchText: "" })
                Keyboard.dismiss()
                this.props.searchTextValue({
                    name: item.name,
                    pathName: "search",
                })
                this.props.move()
            }}
            style={{ backgroundColor: "#fff", paddingHorizontal: 20, paddingBottom: 5 }}>
            <View style={{ padding: 15, justifyContent: "center", alignContent: "center" }}>
                <Text>{item.name}</Text>

            </View>
            <Divider style={{ backgroundColor: 'gray' }} />
        </TouchableWithoutFeedback>
    }

    onClickNavigation = () => {
        // Keyboard.dismiss()
        if (this.state.searchText.length > 0) {
            this.setState({ searchText: "" })
            this.props.searchTextValue({
                name: this.state.searchText,
                pathName: "search",
            })
            this.props.move()
        }
    }

    onChangeText = (text) => {
        this.searchApiCall(text)
        this.setState({ searchText: text })
    }
    render() {
        console.log("props ", this.props.addToCartListDetails)
        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={Keyboard.dismiss}
                        style={{ justifyContent: "center", alignItems: "center", width: "12%", height: 40, borderRightWidth: 1, borderRightColor: "grey" }}>
                        <IconF name="search"
                            color="green"
                            size={20}
                        />
                    </TouchableOpacity>
                    <TextInput
                        onSubmitEditing={this.onClickNavigation}
                        style={styles.textInputStyle}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.searchText}
                        placeholder={"Aapko Kya Chahiye"}
                    />
                    <TouchableOpacity style={{ width: "25%", justifyContent: "center", alignItems: "center", height: 40, backgroundColor: "green" }}
                        onPress={this.onClickNavigation}
                    >
                        <Text style={{ color: "#fff" }}>SEARCH</Text>
                    </TouchableOpacity>
                </View>
                {this.props.addToCartListDetails.length > 0 ? <FlatList
                    data={this.props.addToCartListDetails}
                    renderItem={((item) => this.renderProductListData(item.item, item.index))}
                    keyExtractor={(item, i) => i.toString()}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                    horizontal={false}
                    contentContainerStyle={{
                        marginVertical: 5,
                    }}
                /> : null
                }
            </View>
        )
    }
}
function mapStateToProps(state) {
    const { addToCartListDetails, isLoading, errorMessage, addToCartList_success, searchData } = state.productList
    return {
        addToCartListDetails, isLoading, errorMessage, addToCartList_success, searchData
    };
}

export default connect(mapStateToProps, { addtoCartListCall, searchTextValue })(Search);
// export default Search

const styles = StyleSheet.create({
    container: {
        // flex:1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "grey",
        paddingBottom: 1,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 10,
        elevation: 1,
        backgroundColor: 'white'
    },
    textInputStyle: {
        width: "60%",
        fontSize: 15,
        paddingLeft: 20
    }
})