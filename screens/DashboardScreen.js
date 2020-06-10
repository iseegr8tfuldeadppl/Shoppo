// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //

//import 'react-native-gesture-handler';
import React from 'react';
import { Button, View, Text, TouchableOpacity, Image, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
	createDrawerNavigator
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainMenu from './Tabs/MainMenu';
import Cart from './Tabs/Cart';
import Profile from './Tabs/Profile';
import Categories from './Tabs/Categories';

import Colors from './constants/colors';

import firebase from 'firebase';



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function logOut(props){
	firebase.auth().signOut();

	// Check if logged 
	firebase.auth().onAuthStateChanged(function(user){
		if(!user){
			props.goHere(2);
		}
	});
}

function MainMenuPage(){
	return(
		<Tab.Navigator
			initialRouteName="MainMenu"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: Colors.Accent,
			}}>
			<Tab.Screen
			  name="MainMenu"
			  component={MainMenu}
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} />
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

function CategoriesPage(){
	return(
		<Tab.Navigator
			initialRouteName="Categories"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: Colors.Accent,
			}}>
			<Tab.Screen
			  name="MainMenu"
			  component={MainMenu}
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} />
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
function CartPage(){
	return(
		<Tab.Navigator
			initialRouteName="Cart"
			tabBarOptions={{
				  activeTintColor: Colors.Primary,
				  inactiveTintColor: Colors.Accent,
			}}>
        <Tab.Screen
          name="MainMenu"
			  component={MainMenu}
          options={{
            tabBarLabel: 'Main Menu',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} />
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
function ProfilePage(){
	return(
		<Tab.Navigator
        initialRouteName="Profile"
        tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: Colors.Accent,
        }}>
        <Tab.Screen
          name="MainMenu"
			  component={MainMenu}
          options={{
            tabBarLabel: 'Main Menu',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} />
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

const DashboardScreen = props =>  {
  return (
    <NavigationContainer>
	<Drawer.Navigator initialRouteName="Main Page" drawerContent={propss => {
			return (
			  <DrawerContentScrollView {...propss}>
				<DrawerItemList {...propss} />
				<DrawerItem label="Logout" onPress={() => 
					Alert.alert(
						'Logout', 
						'Are you sure you want to log out?', 
						[{text: 'No', style: 'cancel'},
						 {text: 'Yes', style: 'destructive', onPress: () => logOut(props) }],
						{ cancelable: true }
					)} />
			  </DrawerContentScrollView>
			)
		}}>
        <Drawer.Screen name="Main Page" component={MainMenuPage} />
        <Drawer.Screen name="Categories" component={CategoriesPage} />
        <Drawer.Screen name="Cart" component={CartPage} />
        <Drawer.Screen name="Profile" component={ProfilePage} />
  </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default DashboardScreen;