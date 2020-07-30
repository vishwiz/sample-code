import React, { useEffect } from "react";
import { View, ToastAndroid } from "react-native";

const App = (props) => {
    useEffect(() => {
        ToastAndroid.showWithGravity(
            props.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    }, [])
    return (
        <View >
        </View>
    );
};

export default App;
