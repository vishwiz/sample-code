import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    TouchableHighlight,
    ToastAndroid,
    KeyboardAvoidingView,
    Platform,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { Header, CheckBox } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import TextInputComponent from '../src/component/TextInputComponent';
import ErrorComponent from '../src/component/ErrorComponent';
import ToastMessage from "../src/component/ToastMessage";
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { pincodeCall, addAddress } from '../src/actions/deliveryAction';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {
            fullName: '',
            address: '',
            landmark: '',
            pinCode: '',
            area: '',
            city: '',
            state: '',
            mobileNo: '',
            homeAddressCheck: true,
            officeAddressCheck: false,
            defaultAddressCheck: false,
            flagName: false,
            flagAddress: false,
            flagPinCode: false,
            flagMobile: false,
            checked: false,
            isLoading: false,
        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }


    onChangeTextName = (value) => {
        this.setState({ fullName: value });
    };
    onChangeTextAddress = (value) => {
        this.setState({ address: value });
    };
    onChangeTextLandmark = (value) => {
        this.setState({ landmark: value });
    };
    onChangeTextMobileNO = (value) => {
        this.setState({ mobileNo: value });
    };
    onChangeTextPinCode = (value) => {
        if (value.length <= 6) {
            this.setState({ pinCode: value });
            if (value.length === 6) {
                this.props.pincodeCall({
                    endurl: 'https://pincode.saratchandra.in/api/pincode/' + value,
                });
            }
        }
    };

    _validation = () => {
        // var f = this.state.fullName.length > 3;
        var l = this.state.address.length > 0;
        // var m = this.state.mobileNo.length == 10;
        var p = this.state.pinCode.length == 6;

        this.setState(
            {
                // flagName: !f,
                flagAddress: !l,
                flagPinCode: !p,
                // flagMobile: !m,
            },
            () => {
                if (l & p) {
                    let addressType;
                    if (this.state.officeAddressCheck) {
                        addressType = "Office Address";

                    } else {
                        addressType = "Home Address";
                    }

                    this.setState({ isLoading: true })

                    this.props.addAddress({
                        endurl: '/SaveUserAddress',
                        requestData: {
                            "addressId": 7,
                            "addressType": addressType,
                            "address": `${this.state.address} ${this.state.pinCode} ${this.props.pinCodeDetails?.office_name} ${this.props.pinCodeDetails?.district} ${this.props.pinCodeDetails?.state_name} `,
                            "landMark": this.state.landmark,
                            "isDeleted": true,
                            "userId": this.props.loginDetails?.userId,
                            "isDefault": this.state.defaultAddressCheck
                        },
                    });

                }
            },
        );
    };

    static getDerivedStateFromProps(props) {

        console.log("props : ", props.isLoading, props.errorMessage);
        if (!props.isLoading) {
            return {
                isLoading: false,
            };
        }

        return null;
    }

    render() {
        const {
            fullName,
            address,
            landmark,
            pinCode,
            area,
            city,
            state,
            mobileNo,
            flagName,
            flagAddress,
            flagPinCode
        } = this.state;
        return (
            <View style={{ flex: 1 }}>
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
                        text: 'ADD NEW ADDRESS',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />
                <Spinner visible={this.state.isLoading} color="green" />

                {
                    (this.props.addAddress_failure) ? <ToastMessage message={this.props.errorMessage} /> : null
                }
                <View >

                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                        <ScrollView showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'handled'}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <CheckBox
                                    title="Home Address"
                                    checkedColor="#548247"
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        marginLeft: -5,
                                    }}
                                    checked={this.state.homeAddressCheck}
                                    onPress={() => this.setState({ homeAddressCheck: !this.state.homeAddressCheck, officeAddressCheck: !this.state.officeAddressCheck })}
                                />
                                <CheckBox
                                    title="Office Address"
                                    checkedColor="#548247"
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        marginLeft: -5,
                                    }}
                                    checked={this.state.officeAddressCheck}
                                    onPress={() => this.setState({ officeAddressCheck: !this.state.officeAddressCheck, homeAddressCheck: !this.state.homeAddressCheck })}
                                />
                            </View>


                            {/* <TextInputComponent
                                title={'ENTER FULL NAME*'}
                                keyboard_type={'default'}
                                onChangeText={this.onChangeTextName}
                                value={fullName}
                                isDisable={false}
                            />
                            {flagName ? (
                                <ErrorComponent title={'Enter at least 3 characters'} />
                            ) : null} */}
                            <TextInputComponent
                                title={'ADDRESS*'}
                                keyboard_type={'default'}
                                onChangeText={this.onChangeTextAddress}
                                value={address}
                                isDisable={false}
                            />
                            {flagAddress ? (
                                <ErrorComponent title={'Address cannot be empty'} />
                            ) : null}
                            <TextInputComponent
                                title={'LANKMARK (optional)'}
                                keyboard_type={'default'}
                                onChangeText={this.onChangeTextLandmark}
                                value={landmark}
                                isDisable={false}
                            />
                            <TextInputComponent
                                title={'PIN CODE*'}
                                keyboard_type={'number-pad'}
                                onChangeText={this.onChangeTextPinCode}
                                value={pinCode}
                                phoneNumber={false}
                                isDisable={false}
                            />
                            {flagPinCode ? (
                                <ErrorComponent title={'Enter enter 6 digit pincode'} />
                            ) : null}
                            <TextInputComponent
                                title={'AREA'}
                                keyboard_type={'default'}
                                onChangeText={this.onChangeTextemail}
                                value={this.props.pinCodeDetails?.office_name}
                                isDisable={true}
                            />
                            <TextInputComponent
                                title={'CITY*'}
                                keyboard_type={'default'}
                                onChangeText={this.onChangeTextemail}
                                value={this.props.pinCodeDetails?.district}
                                isDisable={true}
                            />
                            <TextInputComponent
                                title={'STATE*'}
                                keyboard_type={'default'}
                                onChangeText={this.onChangeTextemail}
                                value={this.props.pinCodeDetails?.state_name}
                                isDisable={true}
                            />
                            {/* <TextInputComponent
                                title={'YOUR MOBILE NUMBER*'}
                                keyboard_type={'number-pad'}
                                onChangeText={this.onChangeTextMobileNO}
                                value={mobileNo}
                                isDisable={false}
                                phoneNumber={true}

                            /> */}
                            <CheckBox
                                title="Default Address"
                                checkedColor="#548247"
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    marginLeft: -5,
                                }}
                                checked={this.state.defaultAddressCheck}
                                onPress={() => this.setState({ defaultAddressCheck: !this.state.defaultAddressCheck })}
                            />

                            <TouchableOpacity
                                style={{ marginTop: 20, backgroundColor: "#548247", height: 50, justifyContent: "center", alignItems: "center" }}
                                onPress={() => {
                                    this._validation()
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 14 }}>SAVE TO ADDRESS BOOK</Text>
                            </TouchableOpacity>
                            <View style={{ height: 100 }}>

                            </View>
                        </ScrollView>


                    </KeyboardAvoidingView>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        margin: 10,
    },
    imageStyle: {
        width: '50%',
        height: 50,
        alignSelf: 'center',
        paddingBottom: 50,
    },
});

function mapStateToProps(state) {
    const { loginDetails } = state.register;
    const { pinCodeDetails, addressDetailsValue, isLoading, addAddress_failure, errorMessage } = state.userOrderAndDeliveryReducer;
    return {
        pinCodeDetails, addressDetailsValue, loginDetails, isLoading, addAddress_failure, errorMessage
    };
}

export default connect(mapStateToProps, { pincodeCall, addAddress })(RegisterScreen);
