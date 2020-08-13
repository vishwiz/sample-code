
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

class DisplayAnImage extends Component {
  render() {
    console.log("loginDetails ", this.props.loginDetails);
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#fff', 'grey']} style={[styles.linearGradient]}>
          <Text style={styles.buttonText}>
            {`${this.props.isLogged ?` Hii, ${this.props.loginDetails.firstName} ${this.props.loginDetails.lastName}` : `Please sign in/sign up` }`}
           </Text>
           <Text style={styles.listData}>
            {`Product Categories (Coming soon)`}
           </Text>
           <Text style={styles.listData}>
            {`Online Payment (Coming soon)`}
           </Text>
           <Text style={[styles.listData]}>
            {`CONTACT US:   8770435618, 7631438307, 7350255090 `}
           </Text>
        </LinearGradient>
        

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

    height:"100%"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
    fontWeight:'bold'
  },
  listData: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    padding: 15,
    margin: 10,
    color: '#548247',
    fontWeight:'bold'
    // backgroundColor: 'transparent',
  }

});

function mapStateToProps(state) {
  const { loginDetails, isLogged } = state.register;
  return {
      loginDetails, isLogged
  };
}
export default connect(mapStateToProps)(DisplayAnImage);

// export default DisplayAnImage;
