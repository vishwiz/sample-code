import React, { Component } from "react";
import {
    Alert,
    Modal,
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


class App extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "DMart",
            headerRight: () => (
                <TouchableHighlight style={{ paddingRight: 10 }}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <IconI
                        name="ellipsis-vertical"
                        color="green"
                        size={25}
                    />
                </TouchableHighlight>
            ),
            headerLeft: () => (
                <TouchableHighlight
                    activeOpacity={.6}
                    style={{ padding: 10 }}
                    onPress={() => navigation.openDrawer()}
                >
                    <IconE name="menu" size={25} color="green" />
                </TouchableHighlight>
            ),
        };
    };

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
                style={styles.centeredView}
            >

                <TouchableWithoutFeedback
                    onPress={() => this.setState({ modalVisible: false })}
                >
                    <Modal
                        animationType="fade"
                        transparent={true}
                        closeOnClick={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
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


                </TouchableWithoutFeedback>

                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableHighlight>
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 15,
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
