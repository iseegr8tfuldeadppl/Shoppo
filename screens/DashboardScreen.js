// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //

//import 'react-native-gesture-handler';
import React, {useState} from 'react';
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


const DashboardScreen = props =>  {

	const [cart, updateCart] = useState([]);
	const [finishedLoadingFromFirebase, setFinishedLoadingFromFirebase] = useState(false);
	const [categories, setCategories] = useState([]);
	const [productPreviewed, setProductPreviewed] = useState();
	
	// admin stuff
	const [adminList, setAdminList] = useState([]);

	const pokeFirebase = () => {
	
		firebase.database().ref('/admins').on('value', adminListSnapshot => {
			let adminListData = adminListSnapshot.val() ? adminListSnapshot.val() : {};
			let admins = {...adminListData};
			let adminListTemp = Object.keys(admins);

			firebase.database().ref('/categories').on('value', querySnapShot => {
				let productPreviewedIsPresent = false;
				let dataa = querySnapShot.val() ? querySnapShot.val() : {};
				let cateogoriesSnapshot = {...dataa};
				let categoriesList = [];
				let KeysOfCategories = Object.keys(cateogoriesSnapshot);
				for(var i=0; i<KeysOfCategories.length; i++){
					let productList = [];
					let productsInCategory = Object.values(cateogoriesSnapshot)[i].products;
					if(productsInCategory){
						let KeysOfproductsInCategory = Object.keys(productsInCategory);
						productsInCategory = Object.values(productsInCategory);
						for(var j=0; j<KeysOfproductsInCategory.length; j++){

							// this little check is to hide currently previewed product if it was deleted from firebase
							if(productPreviewed)
								if(!currentlyDisplayedProductIsStillInFirebase)
									if(KeysOfproductsInCategory[j]===productPreviewed.key)
										currentlyDisplayedProductIsStillInFirebase = true;

							productList.push({ key: KeysOfproductsInCategory[j], data: JSON.parse(productsInCategory[j].data) });
						}
					}
			
					let nameOfCategory = Object.values(cateogoriesSnapshot)[i].name;
					if(productList.length>0 || adminListTemp.includes(props.uid))
						categoriesList.push({ key: KeysOfCategories[i], category: nameOfCategory, products: productList });
			}

			// admin stuff
			setAdminList(adminListTemp);

			if(!finishedLoadingFromFirebase){
				setFinishedLoadingFromFirebase(true);
			}

			if(productPreviewedIsPresent){
				let cartCopy = cart.slice();
				for(let i=0; i<cartCopy.length; i++){
					if(cartCopy[i].key===productPreviewed.key){
						cartCopy.splice(i, 1);
						break;
					}
				}
				updateCart();
				setProductPreviewed();
			}

			if(categoriesList.length>0)
				setCategories(categoriesList);

		});

		});
		
	};
	

  if(categories.length===0 && !finishedLoadingFromFirebase){
	  pokeFirebase();
  }


	const logOut = props => {
		firebase.auth().signOut();

		// Check if logged 
		firebase.auth().onAuthStateChanged(function(user){
			if(!user){
				props.goHere(2);
			}
		});
	}

	const addToCart = product => {
		product.selected_in_cart = true;
		updateCart(currentCart => [
			...currentCart, product
		]);

	};

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
		<Drawer.Screen name="Main Page">{propss => <Tabs.MainMenuPage {...props} 
														updateCart={updateCart}
														cart={cart}
														setProductPreviewed={setProductPreviewed}
														productPreviewed={productPreviewed}
														uid={props.uid} 
														categories={categories} 
														addToCart={addToCart} 
														adminList={adminList}  
														finishedLoadingFromFirebase={finishedLoadingFromFirebase}/>}
													</Drawer.Screen>
		<Drawer.Screen name="Categories" >{propss => <Tabs.CategoriesPage {...props} uid={props.uid} cart={cart} updateCart={updateCart} />}</Drawer.Screen>
		<Drawer.Screen name="Cart" >{propss => <Tabs.CartPage {...props} uid={props.uid} cart={cart} updateCart={updateCart} />}</Drawer.Screen>
		<Drawer.Screen name="Profile" >{propss => <Tabs.ProfilePage {...props} uid={props.uid} cart={cart} updateCart={updateCart} />}</Drawer.Screen>
	</Drawer.Navigator>
	</NavigationContainer>
	);
}

export default DashboardScreen;