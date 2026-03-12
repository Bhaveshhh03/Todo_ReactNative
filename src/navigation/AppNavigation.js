import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoItems from '../screens/TodoItems';
import AddTodo from '../screens/AddTodo';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodoItems"
        component={TodoItems}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTodo"
        component={AddTodo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
