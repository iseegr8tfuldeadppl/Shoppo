// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //

//import 'react-native-gesture-handler';
import React from 'react';
import { Alert } from 'react-native';
import firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
	createDrawerNavigator
} from '@react-navigation/drawer';

import Tabs from './Tabs/TabsHolder';

const Drawer = createDrawerNavigator();


const logOut = props => {
	firebase.auth().signOut();

	// Check if logged 
	firebase.auth().onAuthStateChanged(function(user){
		if(!user){
			props.goHere(2);
		}
	});
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
        <Drawer.Screen name="Main Page">{propss => <Tabs.MainMenuPage {...props} uid={props.uid} />}</Drawer.Screen>
        <Drawer.Screen name="Categories" >{propss => <Tabs.CategoriesPage {...props} uid={props.uid} />}</Drawer.Screen>
        <Drawer.Screen name="Cart" >{propss => <Tabs.CartPage {...props} uid={props.uid} />}</Drawer.Screen>
        <Drawer.Screen name="Profile" >{propss => <Tabs.ProfilePage {...props} uid={props.uid} />}</Drawer.Screen>
  </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DashboardScreen;