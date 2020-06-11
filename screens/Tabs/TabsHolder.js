
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainMenu from './MainMenu';
import Cart from './Cart';
import Profile from './Profile';
import Categories from './Categories';

const Tab = createBottomTabNavigator();

const MainMenuPage = props => {
	return(
		<Tab.Navigator
			initialRouteName="MainMenu"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: Colors.Accent,
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss} uid={props.uid} />}
			  </Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  component={Categories}
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Cart"
			  component={Cart}
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Profile"
			  component={Profile}
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }} />
      </Tab.Navigator>
	);
}



const CategoriesPage = props => {
	return(
		<Tab.Navigator
			initialRouteName="Categories"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: Colors.Accent,
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss} uid={props.uid} />}
			  </Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  component={Categories}
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Cart"
			  component={Cart}
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Profile"
			  component={Profile}
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }} />
      </Tab.Navigator>
	);
}



const CartPage = props => {
	return(
		<Tab.Navigator
			initialRouteName="Cart"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: Colors.Accent,
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss} uid={props.uid} />}
			  </Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  component={Categories}
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Cart"
			  component={Cart}
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Profile"
			  component={Profile}
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }} />
      </Tab.Navigator>
	);
}

const ProfilePage = props => {
	return(
		<Tab.Navigator
			initialRouteName="Profile"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: Colors.Accent,
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss} uid={props.uid} />}
			  </Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  component={Categories}
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Cart"
			  component={Cart}
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} />
			<Tab.Screen
			  name="Profile"
			  component={Profile}
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }} />
      </Tab.Navigator>
	);
}


export default {MainMenuPage, CategoriesPage, CartPage, ProfilePage};
