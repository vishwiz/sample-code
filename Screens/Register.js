import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableHighlight, KeyboardAvoidingView ,Platform, ScrollView, Button} from "react-native";
import { Header } from 'react-native-elements';
import IconI from 'react-native-vector-icons/Ionicons';
import TextInputComponent from '../src/component/TextInputComponent'
class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View >
        <Header
          leftComponent={
            <TouchableHighlight
              activeOpacity={0}
              style={{ padding: 10 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <IconI name="chevron-back" size={25} color="#1DB954" />
            </TouchableHighlight>
          }
          centerComponent={{ text: 'REGISTER', style: { color: '#1DB954', fontWeight: "bold", fontSize: 18 } }}

          containerStyle={{
            backgroundColor: 'white'
          }}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 50}>
        
          <ScrollView>
            <TextInputComponent title={"NAME"} />
            <TextInputComponent title={"EMAIL"} />
            <TextInputComponent title={"PHONE NUMBER"} />
            <TextInputComponent title={"ADDRESS"} />
            <TextInputComponent title={"CITY"} />
            <TextInputComponent title={"COUNTRY"} />
            <TextInputComponent title={"PIN CODE"} />
            <TextInputComponent title={"STATE"} />
          <Text>sadasdasd</Text>
          </ScrollView>
        </KeyboardAvoidingView>


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
  },
  container: {
    margin: 20
  }
});

export default RegisterScreen;
