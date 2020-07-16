import React, { Component } from "react";
import { Text, StyleSheet, View, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { counterIncrement } from '../src/actions';
import { counterDecrement } from '../src/actions';

import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <Text>{this.props.count}</Text>
                <Button
                    title="+"
                    onPress={this.props.counterIncrement}
                />
                <Button
                    title="-"
                    onPress={this.props.counterDecrement}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

function mapStateToProps(state) {
    return {
        count: state.counter
    }

}


export default connect(mapStateToProps, { counterIncrement, counterDecrement })(Counter);
