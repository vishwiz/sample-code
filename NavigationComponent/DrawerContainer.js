
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

class DisplayAnImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['black', 'white']} style={[styles.linearGradient]}>
          <Text style={styles.buttonText}>
            Sign in with Facebook
           </Text>
        </LinearGradient>
        <Text>adsadasdsa</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
    // backgroundColor:"green",
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,

    height: 200
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

});



export default DisplayAnImage;
