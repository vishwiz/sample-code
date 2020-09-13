
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

class DisplayAnImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#fff', '#FFCC00']} style={[styles.linearGradient]}>
          <Text style={styles.buttonText}>
            {`${this.props.isLogged ? ` Hii, ${this.props.loginDetails?.firstName?.toUpperCase()} ${this.props.loginDetails?.lastName?.toUpperCase()}` : `Please sign in/sign up`}`}
          </Text>
          <View style={styles.listDataTemp}>
            <Text style={{
              color: '#548247',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
              {`Product Categories `}
            </Text>
            <Text>{`(Coming soon)`}</Text>
          </View>
          <View style={styles.listDataTemp}>
            <Text style={{
              color: '#548247',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
              {`Online Payment`}
            </Text>
            <Text>{`(Coming soon)`}</Text>
          </View>
          <View style={styles.listDataTemp}>
            <Text style={{
              color: '#548247',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
              {`CONTACT US:`}
            </Text>
            
            <Text>{`(8770435618, 7631438307, 7350255090)`}</Text>
          </View>
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

    height: "100%"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  listData: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    padding: 15,
    margin: 10,
    color: '#548247',
    fontWeight: 'bold',

    // backgroundColor: 'transparent',
  },
  listDataTemp: {
    fontFamily: 'Gill Sans',
    padding: 15,
    margin: 10,

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
