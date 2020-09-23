import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import Incrementer from './src/containers/incrementer';
import {PersistGate} from 'redux-persist/integration/react';
import Slider from './src/Slider/Slider';

const App = () => {
  return (
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <Slider />
      </PersistGate>
    </Provider>
  );
};

export default App;
