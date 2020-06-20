// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //

//import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Alert } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import Tabs from './Tabs/TabsHolder';

const Drawer = createDrawerNavigator();


const DashboardScreen = props =>  {

	const [cart, updateCart] = useState([]);
	const [finishedLoadingFromFirebase, setFinishedLoadingFromFirebase] = useState(false);
	const [categories, setCategories] = useState([]);
	const [productPreviewed, setProductPreviewed] = useState();
	const [userInfo, setUserInfo] = useState(userInfo);
	const [checkoutList, setCheckoutList] = useState();
	const [contact, setContact] = useState();

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
								if(!productPreviewedIsPresent)
									if(KeysOfproductsInCategory[j]===productPreviewed.key)
										productPreviewedIsPresent = true;

							productList.push({ key: KeysOfproductsInCategory[j], data: JSON.parse(productsInCategory[j].data) });
						}
					}

					let nameOfCategory = Object.values(cateogoriesSnapshot)[i].name;
					if(productList.length>0 || adminListTemp.includes(props.uid))
						categoriesList.push({ key: KeysOfCategories[i], category: nameOfCategory, products: productList });
				}


				firebase.database().ref('/contact').once('value', contactSnapshot => {
					let contactData = contactSnapshot.val() ? contactSnapshot.val() : {};
					setContact({...contactData});
				});

				// Admin Stuff
				firebase.database().ref('/admins').on('value', adminListSnapshot => {
					let adminListData = adminListSnapshot.val() ? adminListSnapshot.val() : {};
					let admins = {...adminListData};
					let adminListTemp = Object.keys(admins);

					firebase.database().ref('/users/' + props.uid).on('value', userInfoSnapShot => {
						let dataaa = userInfoSnapShot.val() ? userInfoSnapShot.val() : {};
						let userInfoSnap = {...dataaa};
						setUserInfo(userInfoSnap);
					});

					// admin stuff
					setAdminList(adminListTemp);

					if(!finishedLoadingFromFirebase)
						setFinishedLoadingFromFirebase(true);

					if(!productPreviewedIsPresent){
						let cartCopy = cart.slice();
						for(let i=0; i<cartCopy.length; i++){
							if(cartCopy[i].key===productPreviewed.key){
								cartCopy.splice(i, 1);
								break;
							}
						}
						updateCart(cartCopy);

						if(checkoutList){
							let checkoutListCopy = checkoutList.slice();
							for(let i=0; i<checkoutListCopy.length; i++){
								if(checkoutListCopy[i].key===productPreviewed.key)
									checkoutListCopy.splice(i, 1);
							}
							if(checkoutListCopy.length===0)
								setCheckoutList();
							else
								setCheckoutList(checkoutListCopy);
						}

						setProductPreviewed();
						setCheckoutList();
					}

					if(categoriesList.length>0)
						setCategories(categoriesList);

				});

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

		<Drawer.Screen name="Main Page">{propss =>
			<Tabs.MainMenuPage {...props}
				contact={contact}
				setCheckoutList={setCheckoutList}
				checkoutList={checkoutList}
				userInfo={userInfo}
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

		<Drawer.Screen name="Categories" >{propss =>
			<Tabs.CategoriesPage {...props}
				contact={contact}
				setCheckoutList={setCheckoutList}
				checkoutList={checkoutList}
				userInfo={userInfo}
				uid={props.uid}
				cart={cart}
				updateCart={updateCart} />}
		</Drawer.Screen>

		<Drawer.Screen name="Cart" >{propss =>
			<Tabs.CartPage {...props}
				contact={contact}
				setCheckoutList={setCheckoutList}
				checkoutList={checkoutList}
				userInfo={userInfo}
				uid={props.uid}
				cart={cart}
				updateCart={updateCart} />}
		</Drawer.Screen>

		<Drawer.Screen name="Profile" >{propss =>
			<Tabs.ProfilePage {...props}
				contact={contact}
				setCheckoutList={setCheckoutList}
				checkoutList={checkoutList}
				uid={props.uid}
				userInfo={userInfo}
				cart={cart}
				updateCart={updateCart} />}
		</Drawer.Screen>

	</Drawer.Navigator>
	</NavigationContainer>
	);
}

export default DashboardScreen;
