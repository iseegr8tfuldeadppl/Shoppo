// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //

//import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { FlatList, TextInput, Image, Alert, View, TouchableOpacity, StyleSheet, Text, ActivityIndicator, BackHandler } from 'react-native';
import firebase from 'firebase';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainMenu from './Tabs/MainMenu';
import Categories from './Tabs/Categories';
import Cart from './Tabs/Cart';
import Colors from './constants/Colors';
import OkayButton from './components/OkayButton';
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

	const [searchText, setSearchText] = useState("");
	const [search, setSearch] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
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
	const [amount_of_notifications, set_amount_of_notifications] = useState(0);

	// admin stuff
	const [adminList, setAdminList] = useState([]);
	const [usersLatest, setUserLatest] = useState();

  	const notifyMessagesFromAdmins = (userInfoSnap) => {

		if(userInfoSnap){

			// notify if an order has changed state
			let new_amount_of_notifications = 0;
			if(userInfoSnap.orders){
  				let newOrdersKeys = Object.keys(userInfoSnap.orders);
  				let newOrderst = Object.values(userInfoSnap.orders);
  				for(let i=0; i<newOrderst.length; i++){
					if(!newOrderst[i].seen && newOrderst[i].state!=="pending"){
						// notify
						new_amount_of_notifications += 1;
					}
				}
			}

			if(userInfoSnap.messages){
				let messagest = Object.values(userInfoSnap.messages);
	                for(let i=0; i<messagest.length; i++){
					if(messagest[i].admin){
						// notify if the latest message is from an admin the notify
						new_amount_of_notifications += 1;
					}
				}
			}

			if(new_amount_of_notifications!==amount_of_notifications)
				set_amount_of_notifications(new_amount_of_notifications);
		}

  	};

    BackHandler.addEventListener('hardwareBackPress', function() {
		if(search)
			setSearch(false);

	    return true;
	});

	const pokeFirebase = () => {

		// Step 1: first things first load admin list from realtime firebase
		firebase.database().ref('/admins').on('value', adminListSnapshot => {
			let adminListData = adminListSnapshot.val() ? adminListSnapshot.val() : {};
			let admins = {...adminListData};
			let adminListTemp = Object.keys(admins);

			// Step 2.1: load all products from firebase
			firebase.database().ref('/categories').on('value', querySnapShot => {
				let productPreviewedIsPresent = false;
				let categoryPreviewedIsPresent = false;
				let categoryPreviewedIsPresent2 = false;
				let dataa = querySnapShot.val() ? querySnapShot.val() : {};
				let cateogoriesSnapshot = {...dataa};
				let categoriesList = [];
				let KeysOfCategories = Object.keys(cateogoriesSnapshot);

				// Step 2.2: loop over all product categories and add missing ones to an array
				for(var i=0; i<KeysOfCategories.length; i++){
					let invisibilityOfCategory = Object.values(cateogoriesSnapshot)[i].invisible;
					let nameOfCategory = Object.values(cateogoriesSnapshot)[i].name;
					let priorityOfCategory = Object.values(cateogoriesSnapshot)[i].priority;

					// Step 2.3: this is for the feature of viewing a category, if currently displayed category isn't deleted then keep it previewed
					if(categoryPreviewed){
						if(KeysOfCategories[i]===categoryPreviewed.key)
							categoryPreviewedIsPresent = true;
					}
					// Step 2.3: same thing just previewed from Categories tab
					if(categoryPreviewed2){
						if(KeysOfCategories[i]===categoryPreviewed2.key)
							categoryPreviewedIsPresent2 = true;
					}

					// Step 2.4: if category is made invisible by admin ignore it (unless the current user is an admin)
					if(!invisibilityOfCategory || adminListTemp.includes(props.uid)){
						let productList = [];
						let productsInCategory = Object.values(cateogoriesSnapshot)[i].products;

						// Step 2.5: if category contains products
						if(productsInCategory){
							let KeysOfproductsInCategory = Object.keys(productsInCategory);
							productsInCategory = Object.values(productsInCategory);
							for(var j=0; j<KeysOfproductsInCategory.length; j++){

								// Step 2.6: if product is made visible by admin then show it, only shows people products that are visible or shows the admins the product
								if(productsInCategory[j].data.visible || adminListTemp.includes(props.uid)){
									// Step 2.7: this little check is to hide currently previewed product if it was deleted from firebase
									if(productPreviewed)
										if(!productPreviewedIsPresent)
											if(KeysOfproductsInCategory[j]===productPreviewed.key)
												productPreviewedIsPresent = true;

									// Step 2.8: if it passed all checks then add it to products array
									productList.push({ showmore: false, key: KeysOfproductsInCategory[j], data: productsInCategory[j].data });
								}
							}
						}

						// Step 2.9: order products acoording to priority
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

						// Step 2.10: if there are any products in this category then add a show more button that opens the entire product list in another tab
						if(productList.length>0)
							productList.push({
								showmore: true,
								key: "0",
								data: {
									visible: true
								}
							});

						// Step 2.11: if this category contains products then add it to the category
						if((productList.length>0 && !productList[0].showmore) || adminListTemp.includes(props.uid))
							categoriesList.push({
								key: KeysOfCategories[i],
								category: nameOfCategory,
								priority: parseInt(priorityOfCategory),
								products: productList,
								invisible: invisibilityOfCategory
							});
					}
				}

				// Step 3: listen to contacts array to get phone numbers/emails ect
				firebase.database().ref('/contact').once('value', contactSnapshot => {
					let contactData = contactSnapshot.val() ? contactSnapshot.val() : {};
					setContact({...contactData});
				});

				// Step 4.1: get this client's data from firebase if any
				firebase.database().ref('/users/' + props.uid).on('value', userInfoSnapShot => {
					let dataaa = userInfoSnapShot.val() ? userInfoSnapShot.val() : {};
					let userInfoSnap = {...dataaa};

					// Step 4.2: Notify of any messages/order updates from support
					notifyMessagesFromAdmins(userInfoSnap)
					setUserInfo(userInfoSnap);
				});

				// admin stuff
				setAdminList(adminListTemp);

				if(!finishedLoadingFromFirebase)
					setFinishedLoadingFromFirebase(true);

				// if currently displayed categorydisappears from firebase then remove it from being displayed
				if(!categoryPreviewedIsPresent)
					setCategoryPreviewed();
				if(!categoryPreviewedIsPresent2)
					setCategoryPreviewed2();

				// if some products in cart were removed by admins then remove them from cart
				if(!productPreviewedIsPresent){
					let cartCopy = cart.slice();
					for(let i=0; i<cartCopy.length; i++){
						if(cartCopy[i].key===productPreviewed.key){
							cartCopy.splice(i, 1);
							break;
						}
					}
					updateCart(cartCopy);

					// close checkout if it was open
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

				// if there were categories found then displayem
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

					// remove loading screen overlay
					if(loading)
						setLoading(false);
				}

				// admin stuff
				// get list of users and their count of orders which allows not having to load every conversation but instead only the minimal possible
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
	};

	// If there's internet and has not alrdy ran this function and categories isnt already containing any data, run firebase listener
  	if(categories.length===0 && !finishedLoadingFromFirebase && props.connection)
	  	pokeFirebase();

	const logOut = async () => {

		try {
		    await GoogleSignin.revokeAccess();
		    await GoogleSignin.signOut();

			firebase.auth().signOut();
			// Check if logged
			firebase.auth().onAuthStateChanged(function(user){
				if(!user)
					props.goHere(2);
			});
	  	} catch (error) {
		    console.error(error);
	  	}
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
					<Text style={{color:"white", fontSize: 25, fontWeight:"bold"}}>{loadingString[props.language]}</Text>
                	<ActivityIndicator size={50}/>
				</View>
			);
		}
	};

	const searchTab = data => {

		// Step 1: check if search result is a category or a product
		return(
			<TouchableOpacity
				onPress={() => {

					if(data.item.category){
						setCategoryPreviewed2(data.item);
					} else {
						setProductPreviewed(data.item);
					}
					setSearch(false);
				}}
				style={{
					flexDirection:"row",
					width:"100%",
					alignItems:"center",
					justifyContent:"center",
					paddingHorizontal: 10,
					paddingVertical: 6,
				}}>
				<Image style={{width:50, height:50, borderRadius:100}} source={{uri:"https://www.wppit.com/wp-content/uploads/2018/05/%D8%A3%D9%87%D9%85-%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-%D8%A8%D9%86%D9%83-%D8%A8%D8%A7%D9%8A%D8%B3%D9%8A%D8%B1%D8%A7-paysera-%D9%88%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D9%81%D8%AA%D8%AD-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%A8%D9%87-min.jpg"}} />
				<Text style={{
					paddingHorizontal: 5,
					color:"black",
					flex:1,
					fontSize: 16,
				}}>{data.item.category? data.item.category: data.item.data.title}</Text>

					<OkayButton
					style={{paddingHorizontal: 0}}
						textStyle={{ fontSize: 16 }}
						text={data.item.iscategory? "Category" : "Product"} />
			</TouchableOpacity>
		);

	};

	const updateSearchResults = enteredText => {

		// Step 1: check if enteredText is not empty
		if(!enteredText){
			setSearchResults([]);
			return;
		}

		// Step 2: turn enteredText to lowercase
		enteredText = enteredText.toLowerCase();

		// Step 3: searching for results
		// Step 3.1: initialization
		let categoryResults = [];
		let productResults = [];

		// Step 3.2: looping over categories
		for(let i=0; i<categories.length; i++){

			// Step 3.2.1: checking if category name contains searched word
			if(categories[i].category.toLowerCase().includes(enteredText)){
				categoryResults.push({...{iscategory: true}, ...categories[i]});
			}

			// Step 3.3: looping over products
			for(let j=0; j<categories[i].products.length; j++){

				// Step 3.3.1: don't check showmore tags
				if(!categories[i].products[j].showmore){

					// Step 3.3.2: checking if product name contains searched word
					if(categories[i].products[j].data.title.toLowerCase().includes(enteredText)){
						productResults.push({...{iscategory: false}, ...categories[i].products[j]});
					}
				}
			}

		}

		// Step 4: update list if found results are over zero
		setSearchResults(productResults.concat(categoryResults));

	};

	const searchResultsCounterBar = () => {

		// Step 1: prepare text
		let indicator = "Type to search...";
		if(searchText)
			indicator = searchResults.length +  " search results...";

		// Step 2: display it
		return(
			<View style={{marginVertical: 6, backgroundColor:Colors.Accent, width:"100%", paddingHorizontal: 10, paddingVertical: 3}}>
				<Text style={{color:"white"}}>{indicator}</Text>
			</View>
		);
	};

	const page = () => {

		if(!props.connection)
			return(
				<View style={styles.screen}>
					<Text style={{color:"red", fontSize: 25, fontWeight:"bold"}}>{noInternetString[props.language]}</Text>
                	<MaterialCommunityIcons name="wifi-off" color={"red"} size={60} />
				</View>
			);

		if(search)
			return(
				<View style={{...styles.screen2, ...{backgroundColor:Colors.Dank}}}>
					<View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", paddingHorizontal: 5, paddingTop: 5,}}>
						<TouchableOpacity onPress={() => setSearch(false)}>
							<MaterialCommunityIcons name="arrow-left" color={Colors.Primary} size={30} />
						</TouchableOpacity>
						<TextInput
							style={styles.searchInput}
							autoCapitalize="none"
							placeholder={"Aa"}
							onChangeText={(enteredText) => {setSearchText(enteredText); updateSearchResults(enteredText);} }
							value={searchText} />
					</View>

					{searchResultsCounterBar()}

			        <FlatList
			            style={styles.screen2}
			            data={searchResults}
			            renderItem={searchTab}/>
				</View>
			);

		return(
				<View style={{flex: 1, width:"100%"}}>
					<NavigationContainer>
					<Drawer.Navigator initialRouteName="Main Page" drawerContent={propss => {
							return (
								<DrawerContentScrollView {...propss}>
								<DrawerItemList {...propss} />
								<DrawerItem label="Logout" onPress={() =>
									Alert.alert(
										logoutString[props.language],
										logoutAlertString[props.language],
										[{text: noString[props.language], style: 'cancel'},
											{text: yesString[props.language], style: 'destructive', onPress: () => logOut() }],
										{ cancelable: true }
									)} />
								</DrawerContentScrollView>
							)
					}}>

					<Drawer.Screen name="Main Menu">{propss =>
	  			  		<MainMenu {...propss}
							setSearch={setSearch}
							amount_of_notifications={amount_of_notifications}
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
	};

	useEffect(() => {
	   // androidClientId: 366313995332-mjbmbk7ff5ds0krfam6k7hhd5ek8o6va.apps.googleusercontent.com
	   GoogleSignin.configure({
		 	webClientId: "366313995332-d8u2f0t1ktp09578j2081l1d5e09tc3i.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
		 	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		 	iosClientId: "366313995332-fg9o2im3ntkbvsar20preei2g7p0s5gf.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
	   });
	 }, []);

	return(page());
}

export default DashboardScreen;

const styles = StyleSheet.create({
	screen:{
		flex: 1,
		width:"100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
	screen2:{
		flex: 1,
		width:"100%",
	},
	searchInput : {
		backgroundColor:Colors.Primary,
		borderRadius: 10,
		fontWeight: "bold",
		paddingHorizontal: 20,
		flex: 1,
		paddingVertical: 13,
		margin: 6,
		fontSize:16,
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
