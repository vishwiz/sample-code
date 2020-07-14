import React, { useState } from "react";
import { Button, View, Text, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';


import HomeDMartScreen from '../Screens/Home';
import RegisterScreen from '../Screens/Register'
import Counter from '../Screens/Counter';


const Stack = createStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeDMartScreen}
                options={{
                    title: "DMart",
                    headerStyle: {
                        backgroundColor: '#191414',
                    },
                    headerTintColor: '#1DB954',
                    headerTitleStyle: {
                        // fontWeight: 'bold',
                    },
                    headerRight: () => (
                        <TouchableHighlight style={{ paddingRight: 10 }}
                            onPress={() => navigation.navigate("Register")}
                        >
                            <IconI
                                name="ellipsis-vertical"
                                color="#1DB954"
                                size={25}
                            />
                        </TouchableHighlight>
                    ),
                    headerLeft: () => (
                        <TouchableHighlight
                            activeOpacity={1}
                            style={{ padding: 10 }}
                            onPress={() => navigation.openDrawer()}
                        >
                            <IconE name="menu" size={25} color="#1DB954" />
                        </TouchableHighlight>
                    ),
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: "REGISTER",
                    headerStyle: {
                        backgroundColor: '#191414',
                    },
                    headerTintColor: '#1DB954',
                    headerLeft: () => (
                        <TouchableHighlight
                            activeOpacity={1}
                            style={{ padding: 10 }}
                            onPress={() => navigation.goBack()}
                        >
                            <IconI name="chevron-back" size={25} color="#1DB954" />
                        </TouchableHighlight>
                    ),
                }} />

            <Stack.Screen
                name="Counter"
                component={Counter}
                options={{
                    title: "COUNTER",
                    headerStyle: {
                        backgroundColor: '#191414',
                    },
                    headerTintColor: '#1DB954',
                    headerLeft: () => (
                        <TouchableHighlight
                            activeOpacity={1}
                            style={{ padding: 10 }}
                            onPress={() => navigation.goBack()}
                        >
                            <IconI name="chevron-back" size={25} color="#1DB954" />
                        </TouchableHighlight>
                    ),
                }} />
        </Stack.Navigator>
    );
}


function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}
function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}



const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="HomeStack">
                <Drawer.Screen name="HomeStack" component={HomeStack} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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
        marginBottom: 15,
        textAlign: "center"
    }
});