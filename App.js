import {View} from 'react-native';
import React from 'react';
import GoogleAuth from './components/GoogleAuth';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      <GoogleAuth />
    </View>
  );
};

export default App;
