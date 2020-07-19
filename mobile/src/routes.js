import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/main';
import Product from './pages/product';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="JSHunt"
          component={Main}
          options={{
            title: 'JSHunt',
            headerStyle: {
              backgroundColor: '#da552f',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={({ route }) => ({
            title: route.params.product.title,
            headerStyle: {
              backgroundColor: '#da552f',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
