import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
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
			  inactiveTintColor: "gray",
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
						  	setCheckoutList={props.setCheckoutList}
						  	checkoutList={props.checkoutList}
  							userInfo={props.userInfo}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							updateCart={props.updateCart}
							addToCart={props.addToCart}
							cart={props.cart}
							categories={props.categories}
							adminList={props.adminList}
							finishedLoadingFromFirebase={props.finishedLoadingFromFirebase}/>}
			  </Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			}} >
			{propss => <Categories {...propss}
						  setFocusedPage={props.setFocusedPage}
						  focusedPage={props.focusedPage}
						  categories={props.categories}
						  setProductPreviewed={props.setProductPreviewed}
						  productPreviewed={props.productPreviewed}/>}
			</Tab.Screen>
			<Tab.Screen
			  name="Cart"
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} >
			  {propss => <Cart {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
						  	setCheckoutList={props.setCheckoutList}
						  	checkoutList={props.checkoutList}
  							userInfo={props.userInfo}
							updateCart={props.updateCart}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							cart={props.cart}
							adminList={props.adminList}
							/>}
			  </Tab.Screen>
			<Tab.Screen
			  name="Profile"
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }} >
			  {propss => <Profile {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
				  			usersLatest={props.usersLatest}
			  				categories={props.categories}
			  				uid={props.uid}
			  				adminList={props.adminList}
  							contact={props.contact}
  							userInfo={props.userInfo}
							/>}
			  </Tab.Screen>
      </Tab.Navigator>
	);
}



const CategoriesPage = props => {
	return(
		<Tab.Navigator
			initialRouteName="Categories"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: "gray",
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
						  	setCheckoutList={props.setCheckoutList}
						  	checkoutList={props.checkoutList}
  							userInfo={props.userInfo}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							addToCart={props.addToCart}
							updateCart={props.updateCart}
							cart={props.cart}
							categories={props.categories}
							adminList={props.adminList}
							finishedLoadingFromFirebase={props.finishedLoadingFromFirebase}/>}
			</Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			  }} >
  			{propss => <Categories {...propss}
						  setFocusedPage={props.setFocusedPage}
						  focusedPage={props.focusedPage}
  						  categories={props.categories}
						  setProductPreviewed={props.setProductPreviewed}
						  productPreviewed={props.productPreviewed}/>}

			</Tab.Screen>
			<Tab.Screen
			  name="Cart"
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} >
			  {propss => <Cart {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
						  	setCheckoutList={props.setCheckoutList}
						  	checkoutList={props.checkoutList}
  							userInfo={props.userInfo}
							updateCart={props.updateCart}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							cart={props.cart}
							adminList={props.adminList}
							/>}
  			</Tab.Screen>

			<Tab.Screen
			  name="Profile"
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }} >
			  {propss => <Profile {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
				  			usersLatest={props.usersLatest}
			  				categories={props.categories}
			  				uid={props.uid}
			  				adminList={props.adminList}
  							contact={props.contact}
  							userInfo={props.userInfo}
							/>}
			</Tab.Screen>

      </Tab.Navigator>
	);
}



const CartPage = props => {
	return(
		<Tab.Navigator
			initialRouteName="Cart"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: "gray",
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
						  	setCheckoutList={props.setCheckoutList}
						  	checkoutList={props.checkoutList}
  							userInfo={props.userInfo}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							cart={props.cart}
							addToCart={props.addToCart}
							categories={props.categories}
							updateCart={props.updateCart}
							adminList={props.adminList}
							finishedLoadingFromFirebase={props.finishedLoadingFromFirebase}/>}
			</Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			  }} >
  			{propss => <Categories {...propss}
						  setFocusedPage={props.setFocusedPage}
						  focusedPage={props.focusedPage}
  						  categories={props.categories}
						  setProductPreviewed={props.setProductPreviewed}
						  productPreviewed={props.productPreviewed}/>}
			</Tab.Screen>
			<Tab.Screen
			  name="Cart"
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} >
			  {propss => <Cart {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
						  	setCheckoutList={props.setCheckoutList}
						  	checkoutList={props.checkoutList}
  							userInfo={props.userInfo}
							updateCart={props.updateCart}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							cart={props.cart}
							adminList={props.adminList}
							/>}
			  </Tab.Screen>
			<Tab.Screen
			  name="Profile"
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }}  >
			  {propss => <Profile {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
				  			usersLatest={props.usersLatest}
			  				categories={props.categories}
			  				uid={props.uid}
			  				adminList={props.adminList}
  							contact={props.contact}
  							userInfo={props.userInfo}
							/>}
			</Tab.Screen>
      </Tab.Navigator>
	);
}

const ProfilePage = props => {
	return(
		<Tab.Navigator
			initialRouteName="Profile"
			tabBarOptions={{
			  activeTintColor: Colors.Primary,
			  inactiveTintColor: "gray",
			}}>
			<Tab.Screen
			  name="MainMenu"
			  options={{
				tabBarLabel: 'Main Menu',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="home" color={color} size={size} />
				),
			  }} >
			  {propss => <MainMenu {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
						  	setCheckoutList={props.setCheckoutList}
						  	checkoutList={props.checkoutList}
  							userInfo={props.userInfo}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							cart={props.cart}
							updateCart={props.updateCart}
							addToCart={props.addToCart}
							categories={props.categories}
							adminList={props.adminList}
							finishedLoadingFromFirebase={props.finishedLoadingFromFirebase}/>}
			</Tab.Screen>
			<Tab.Screen
			  name="Categories"
			  options={{
				tabBarLabel: 'Categories',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="menu" color={color} size={size} />
				),
			  }} >
  			{propss => <Categories {...propss}
						  setFocusedPage={props.setFocusedPage}
						  focusedPage={props.focusedPage}
  						  categories={props.categories}
						  setProductPreviewed={props.setProductPreviewed}
						  productPreviewed={props.productPreviewed}/>}
			</Tab.Screen>
			<Tab.Screen
			  name="Cart"
			  options={{
				tabBarLabel: 'Cart',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="cart" color={color} size={size} />
				),
			  }} >
			  {propss => <Cart {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
  							userInfo={props.userInfo}
							setCheckoutList={props.setCheckoutList}
							checkoutList={props.checkoutList}
							updateCart={props.updateCart}
							setProductPreviewed={props.setProductPreviewed}
							productPreviewed={props.productPreviewed}
							uid={props.uid}
							cart={props.cart}
							adminList={props.adminList}
							/>}
			  </Tab.Screen>
			<Tab.Screen
			  name="Profile"
			  options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => (
				  <MaterialCommunityIcons name="account" color={color} size={size} />
				),
			  }}  >
			  {propss => <Profile {...propss}
						  	setFocusedPage={props.setFocusedPage}
						  	focusedPage={props.focusedPage}
				  			usersLatest={props.usersLatest}
			  				categories={props.categories}
			  				uid={props.uid}
			  				adminList={props.adminList}
  							contact={props.contact}
  							userInfo={props.userInfo}
							/>}
			</Tab.Screen>
      </Tab.Navigator>
	);
}


export default {MainMenuPage, CategoriesPage, CartPage, ProfilePage};
