
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
		<Stack.Navigator initialRouteName='LoadingScreen'>
			<Stack.Screen 
				name='LoadingScreen'  
				options={{headerShown: false}} 
				component={LoadingScreen} />
			<Stack.Screen 
				name='LoginScreen'
				component={LoginScreen} 
				options={{headerShown: false}} />
			<Stack.Screen 
				name='DashboardScreen'
				component={DashboardScreen} 
				options={{ title: '' }} />
		</Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator