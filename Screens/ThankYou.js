import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    BackHandler
} from 'react-native';
import { Header } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
//for redux
import { connect } from 'react-redux';
import { loginUser } from '../src/actions';
import LottieView from 'lottie-react-native';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.state = {

        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.navigate("Home")
        return true;
    }



    componentDidMount() {
        this.animation.play();
    }


    render() {

        return (
            <View>
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={_ => this.props.navigation.navigate("Home")}>
                            <IconI name="chevron-back" size={25} color="#548247" />
                        </TouchableHighlight>
                    }
                    centerComponent={{
                        text: 'THANK YOU',
                        style: { color: '#548247', fontWeight: 'bold', fontSize: 18 },
                    }}
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                <View style={{ height: "15%", justifyContent: "center", alignItems: "center" }}>
                    <Text>
                        Thank you for registering with ANNAPURNA.
                    </Text>
                    <Text>
                        You can now Start Shopping.
                    </Text>

                </View>
                <View style={{ height: "50%" }}>
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../src/assests/animation/cart.json')}
                    />

                </View>
                <TouchableOpacity
                    style={{ height: "20%", alignItems: "center" }}
                    onPress={_ => this.props.navigation.navigate("Home")}
                >
                    <View style={{ width: "75%", backgroundColor: "#548247", height: 40, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>START SHOPPING</Text>
                    </View>
                </TouchableOpacity>


            </View>
        );
    }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {

    const { isLoading, login_failure, errorMessage } = state.register;
    return {
        isLoading, login_failure, errorMessage
    };
}

export default connect(mapStateToProps, { loginUser })(LoginScreen);
