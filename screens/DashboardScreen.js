// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //

//import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Alert, View, StyleSheet, Text, ActivityIndicator, BackHandler } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainMenu from './Tabs/MainMenu';
import Categories from './Tabs/Categories';
import Cart from './Tabs/Cart';
import Profile from './Tabs/Profile';
import {
	noString,
	yesString,
	logoutAlertString,
	logoutString,
	noInternetString,
	loadingString
} from './constants/strings';
const Drawer = createDrawerNavigator();


const DashboardScreen = props =>  {

	// BackHandler.addEventListener('hardwareBackPress', function() {
	//     return true;
	// });

	const [remoteOrdersOpen, setRemoteOrdersOpen] = useState();
	const [cart, updateCart] = useState([]);
	const [finishedLoadingFromFirebase, setFinishedLoadingFromFirebase] = useState(false);
	const [categories, setCategories] = useState([]);
	const [productPreviewed, setProductPreviewed] = useState();
    const [categoryPreviewed, setCategoryPreviewed] = useState();
    const [categoryPreviewed2, setCategoryPreviewed2] = useState();
	const [userInfo, setUserInfo] = useState(userInfo);
	const [checkoutList, setCheckoutList] = useState();
	const [contact, setContact] = useState();
	const [loading, setLoading] = useState(true);
	const [focusedPage, setFocusedPage] = useState("Main");

	// admin stuff
	const [adminList, setAdminList] = useState([]);
	const [usersLatest, setUserLatest] = useState();

	const pokeFirebase = () => {

		firebase.database().ref('/admins').on('value', adminListSnapshot => {
			let adminListData = adminListSnapshot.val() ? adminListSnapshot.val() : {};
			let admins = {...adminListData};
			let adminListTemp = Object.keys(admins);

			firebase.database().ref('/categories').on('value', querySnapShot => {
				let productPreviewedIsPresent = false;
				let categoryPreviewedIsPresent = false;
				let categoryPreviewedIsPresent2 = false;
				let dataa = querySnapShot.val() ? querySnapShot.val() : {};
				let cateogoriesSnapshot = {...dataa};
				let categoriesList = [];
				let KeysOfCategories = Object.keys(cateogoriesSnapshot);
				for(var i=0; i<KeysOfCategories.length; i++){
					let visibilityOfCategory = Object.values(cateogoriesSnapshot)[i].invisible;
					let nameOfCategory = Object.values(cateogoriesSnapshot)[i].name;
					let priorityOfCategory = Object.values(cateogoriesSnapshot)[i].priority;

					// if currently displayed category shows up online then keep it visible, or else close the preview
					if(categoryPreviewed){
						if(KeysOfCategories[i]===categoryPreviewed.key)
							categoryPreviewedIsPresent = true;
					}
					if(categoryPreviewed2){
						if(KeysOfCategories[i]===categoryPreviewed2.key)
							categoryPreviewedIsPresent2 = true;
					}

					if(!visibilityOfCategory || adminListTemp.includes(props.uid)){
						let productList = [];
						let productsInCategory = Object.values(cateogoriesSnapshot)[i].products;
						if(productsInCategory){
							let KeysOfproductsInCategory = Object.keys(productsInCategory);
							productsInCategory = Object.values(productsInCategory);
							for(var j=0; j<KeysOfproductsInCategory.length; j++){

								// this only shows people products that are visible or shows the admins the product
								if(productsInCategory[j].data.visible || adminListTemp.includes(props.uid)){
									// this little check is to hide currently previewed product if it was deleted from firebase
									if(productPreviewed)
										if(!productPreviewedIsPresent)
											if(KeysOfproductsInCategory[j]===productPreviewed.key)
												productPreviewedIsPresent = true;

									productList.push({ showmore: false, key: KeysOfproductsInCategory[j], data: productsInCategory[j].data });
								}
							}
						}

						// order products acoording to priority
						for(let i=0;i<productList.length; i++){
							for(let j=0;j<productList.length; j++){
								if(productList.length===j+1)
									break;
								if(productList[j].priority<productList[j+1].priority){
									let temp = productList[j+1];
									productList[j+1] = productList[j];
									productList[j] = temp;
								}
							}
						}

						if(productList.length>0){
							productList.push({ showmore: true, key: "0", data: {visible: true} });
						}

						if((productList.length>0 && !productList[0].showmore) || adminListTemp.includes(props.uid))
							categoriesList.push({ key: KeysOfCategories[i], category: nameOfCategory, priority: parseInt(priorityOfCategory), products: productList, invisible: visibilityOfCategory });
					}
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

					// if currently displayed categorydisappears from firebase then remove it from being displayed
					if(!categoryPreviewedIsPresent){
						setCategoryPreviewed();
					}
					if(!categoryPreviewedIsPresent2){
						setCategoryPreviewed2();
					}

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

					if(categoriesList.length>0){

						// order categories acoording to priority
						for(let i=0;i<categoriesList.length; i++){
							for(let j=0;j<categoriesList.length; j++){
								if(categoriesList.length===j+1)
									break;
								if(categoriesList[j].priority<categoriesList[j+1].priority){
									let temp = categoriesList[j+1];
									categoriesList[j+1] = categoriesList[j];
									categoriesList[j] = temp;
								}
							}
						}

						setCategories(categoriesList);
						if(loading)
							setLoading(false);
					}

					// admin stuff
					if(adminListTemp.includes(props.uid)){
						firebase.database().ref('/userList').on('value', userLatestSnapshot => {
							let userLatestData = userLatestSnapshot.val() ? userLatestSnapshot.val() : {};
						    let usersLatesto = [];
						    let vals = Object.values({...userLatestData});
						    let index = -1;
						    for(var i in {...userLatestData}){
						        index ++;
				        		usersLatesto.push({key: i, n: vals[index].n, o: vals[index].o, f: vals[index].f});
						    }
							setUserLatest(usersLatesto);
						});
					}
				});

			});
		});
	};

  if(categories.length===0 && !finishedLoadingFromFirebase && props.connection){
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

	const loadingPage = () => {
		if(loading){
			return(
				<View style={styles.loadingh}>
					<Text style={{color:"white", fontSize: 25, fontWeight:"bold"}}>Loading..</Text>
                	<ActivityIndicator size={50}/>
				</View>
			);
		}
	};

	const page = () => {


		if(!props.connection){
			return(
				<View style={styles.screen}>
					<Text style={{color:"red", fontSize: 25, fontWeight:"bold"}}>No Internet</Text>
                	<MaterialCommunityIcons name="wifi-off" color={"red"} size={60} />
				</View>
			);
		} else {
			return(
				<View style={{flex: 1, width:"100%"}}>
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

					<Drawer.Screen name="Main Menu">{propss =>
	  			  		<MainMenu {...propss}
							language={props.language}
							setCategoryPreviewed={setCategoryPreviewed2}
							categoryPreviewed={categoryPreviewed2}
							setRemoteOrdersOpen={setRemoteOrdersOpen}
  						  	setFocusedPage={setFocusedPage}
  						  	focusedPage={focusedPage}
  						  	setCheckoutList={setCheckoutList}
  						  	checkoutList={checkoutList}
							userInfo={userInfo}
  							setProductPreviewed={setProductPreviewed}
  							productPreviewed={productPreviewed}
  							uid={props.uid}
  							updateCart={updateCart}
  							addToCart={addToCart}
  							cart={cart}
  							categories={categories}
  							adminList={adminList}
  							finishedLoadingFromFirebase={finishedLoadingFromFirebase}/>}
					</Drawer.Screen>

					<Drawer.Screen name="Categories" >{propss =>
						<Categories {...propss}
							language={props.language}
							updateCart={updateCart}
							uid={props.uid}
							setCategoryPreviewed={setCategoryPreviewed}
							categoryPreviewed={categoryPreviewed}
							userInfo={userInfo}
		  				  	checkoutList={checkoutList}
		  				  	adminList={adminList}
		  				  	addToCart={addToCart}
		  				  	cart={cart}
							setCheckoutList={setCheckoutList}
							setRemoteOrdersOpen={setRemoteOrdersOpen}
  						  	setFocusedPage={setFocusedPage}
  						  	focusedPage={focusedPage}
						  	categories={categories}
  						  	setProductPreviewed={setProductPreviewed}
  						  	productPreviewed={productPreviewed}/>}
					</Drawer.Screen>

					<Drawer.Screen name="Cart" >{propss =>
						<Cart {...propss}
							language={props.language}
							setRemoteOrdersOpen={setRemoteOrdersOpen}
  						  	setFocusedPage={setFocusedPage}
  						  	focusedPage={focusedPage}
  						  	setCheckoutList={setCheckoutList}
  						  	checkoutList={checkoutList}
							userInfo={userInfo}
  							updateCart={updateCart}
  							setProductPreviewed={setProductPreviewed}
  							productPreviewed={productPreviewed}
  							uid={props.uid}
  							cart={cart}
  							adminList={adminList}/>}
					</Drawer.Screen>

					<Drawer.Screen name="Profile" >{propss =>
						<Profile {...propss}
							language={props.language}
							setRemoteOrdersOpen={setRemoteOrdersOpen}
							remoteOrdersOpen={remoteOrdersOpen}
  						  	setFocusedPage={setFocusedPage}
  						  	focusedPage={focusedPage}
  				  			usersLatest={usersLatest}
  			  				categories={categories}
  			  				uid={props.uid}
  			  				adminList={adminList}
							contact={contact}
							userInfo={userInfo}/>}
					</Drawer.Screen>

					</Drawer.Navigator>
					</NavigationContainer>

					{loadingPage()}
				</View>
			);
		}
	};

	return(page());
}

export default DashboardScreen;

const styles = StyleSheet.create({
	screen:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingh:{
		flex: 1,
		position:"absolute",
		width:"100%",
		height:"100%",
		backgroundColor:"#55666666",
		justifyContent: 'center',
		alignItems: 'center',
	}
})
