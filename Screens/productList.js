import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    FlatList,
    Image
} from "react-native";
import { connect } from 'react-redux';
import { productListCall } from '../src/actions/productListAction';
import Spinner from 'react-native-loading-spinner-overlay';

class PRODUCTLIST extends Component {
        constructor(props) {
            super(props)
            this.state = {
                screenWidth: Dimensions.get('window').width,
                screenheight: Dimensions.get('window').height,
                DATA: [],
                isLoading: false,
            }
        }

        componentDidMount = () => {
            let params = {
                CultureId: 1,
                TalukaId: 1,
                SupplierId: 1
            }
            this.setState(function (state, props) { return { isLoading: true } });
            this.props.productListCall({
                endurl: '/GetCategoryList',
                requestData: params,
            })
        }

        static getDerivedStateFromProps(props, state) {
            if (!props.isLoading && props.productListDetails.length > 0) {
              return {
                isLoading: false,
                DATA : props.productListDetails
              };
            }
        
            return null;
          }

        // componentWillReceiveProps(nextrops){
        //     if (!nextrops.isLoading && nextrops.productListDetails.length > 0) {
        //        this.setState({
        //         isLoading: false,
        //         DATA : nextrops.productListDetails
        //        })
        //       }
          
        //       return null;
        //     }
    
        renderItem = (item) => {
            console.log("item ", item);
            return (<View style={styles.flatListContainer}>
                
                <View style={styles.productHeader}>
                    <Text style={styles.productListHeader}>{item.name}</Text>
                </View>
                <View style={styles.productImage}>
                    <Image
                        style={{ width: this.state.screenWidth, height: 140 }}
                        source={
                            // require('../src/assests/Images/React_Native_Logo.png')
                            {
                                uri: `${item.categoryImageUrl}`,
                                //   React_Native_Logo.png
                            }
                        }
                    />
                </View>

            </View>)
        }
        render() {
            console.log("isLoading ",this.state.isLoading)
            console.log("DATA ",this.state.DATA)
            return (
                <View style={{ height: "100%", flex:1 }}>
                   { this.state.isLoading ? <Spinner visible={this.state.isLoading} color="green" /> :
                    <FlatList
                        data={this.state.DATA}
                        renderItem={((item)=>this.renderItem(item.item))}
                        keyExtractor={(item, i) => i.toString()}
                        extraData={this.state}
                        horizontal={false}
                        contentContainerStyle={{
                            marginVertical: 5,
                        }}
                    />
                 }
                </View>
            )
        }
    }

const styles = StyleSheet.create({
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
    flatListContainer:{
        paddingBottom: 30
    }
})

function mapStateToProps(state) {
    const { productListDetails, isLoading } = state.productList
    return {
        productListDetails, isLoading
    };
}

export default connect(mapStateToProps, { productListCall })(PRODUCTLIST);
// export default PRODUCTLIST