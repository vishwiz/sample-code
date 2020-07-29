import React, { useState } from "react";
import { Button, View, Text, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './RootNavigation';

import HomeDMartScreen from '../Screens/Home';
import RegisterScreen from '../Screens/Register'
import Counter from '../Screens/Counter';
import LoginScreen from '../Screens/Login';
import OTPVarification from '../Screens/OtpVarification';
import ForgetPassword from '../Screens/ForgetPassword';
import ChangePassword from '../Screens/ChangePassword';
import ViewCart from '../Screens/ViewCart';
import SelectDeliveryType from '../Screens/SelectDeliveryType';
import ThankYou from '../Screens/ThankYou';




import DrawerContent from './DrawerContainer';


const Stack = createStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeDMartScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Counter"
                component={Counter}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OptVarification"
                component={OTPVarification}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ViewCart"
                component={ViewCart}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SelectDeliveryType"
                component={SelectDeliveryType}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ThankYou"
                component={ThankYou}
                options={{ headerShown: false }}
            />
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


const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator
                initialRouteName="HomeStack"
                drawerContent={props => <DrawerContent  {...props} />}
            >
                <Drawer.Screen name="HomeStack" component={HomeStack} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
