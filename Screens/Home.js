import React, { Component } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconA from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { Header } from 'react-native-elements';

class App extends Component {

    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View
            >
                <Header
                    placement="left"
                    leftComponent={
                        <TouchableHighlight
                            activeOpacity={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <IconE name="menu" size={20} color="#1DB954" />
                        </TouchableHighlight>}
                    centerComponent={{ text: 'DMart', style: { color: '#1DB954', fontWeight: "bold", fontSize: 18 } }}
                    rightComponent={
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(true);
                            }}
                            style={{ padding: 10 }}
                        >
                            <IconI name="ellipsis-vertical" color="#1DB954" size={20} />
                        </TouchableHighlight>
                    }
                    containerStyle={{
                        backgroundColor: 'white'
                    }}
                />

                <Modal
                    isVisible={this.state.modalVisible}
                    animationIn={"fadeInRight"}
                    onBackdropPress={() => this.setState({ modalVisible: false })}>
                    <View style={styles.modalViewCode}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                activeOpacity={0.1}
                                onPress={() => {
                                    this.setState({ modalVisible: false }, () => {
                                        this.props.navigation.navigate('Counter')
                                    })
                                }}>
                                <View style={styles.userView} >
                                    <IconA name="login"
                                        color="green"
                                        size={25}
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
                                        size={25}
                                    />
                                    <Text style={styles.modalText}>REGISTER</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6e6e6e"
    },
    userView: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        textAlignVertical: "center",
        // borderColor:"red",
        // borderWidth:1,

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
        margin: 3
    }
});

export default App;
