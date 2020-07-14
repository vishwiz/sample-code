import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <View style={styles.container}>
         <Text>
             Welcome to DMart Ready! 

         </Text>


     </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default RegisterScreen;
