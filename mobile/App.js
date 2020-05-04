import React from 'react';

import Main from './src/pages/Home'

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'


const Drawer = createDrawerNavigator()

export default function App() {
  return (

    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Inicio" component={Main} /> 
        </Drawer.Navigator>
    </NavigationContainer>

  );
}

