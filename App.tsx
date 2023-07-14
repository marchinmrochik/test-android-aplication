/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store';

import ProductsList from './src/screens/ProductsList';
import ProductDetails from './src/screens/ProductDetails';
import AddProduct from './src/screens/AddProduct';

import { StackParamList } from "./src/types";

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProductsList">
          <Stack.Screen name="ProductsList" component={ProductsList} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;


