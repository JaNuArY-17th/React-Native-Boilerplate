import React, { forwardRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/features/home/screens/HomeScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = forwardRef<NavigationContainerRef<RootStackParamList>>(
  (_, ref) => null
);

const RootNavigator = forwardRef<NavigationContainerRef<RootStackParamList>>(
  (_, ref) => {
    return (
      <NavigationContainer ref={ref}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
);


