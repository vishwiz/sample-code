import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const App = () => (
    <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff00" />
    </View>
);

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default App;