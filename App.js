
import React from 'react';
import {
  StatusBar
} from 'react-native';
import Navigation from './NavigationComponent/Navigation'

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content"  />  
      <Navigation />     
    </>
  );
};

export default App;
