
import React from 'react';
import {
  StatusBar
} from 'react-native';
import Navigation from './NavigationComponent/Navigation'


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#191414" />  
      <Navigation />     
    </>
  );
};

export default App;
