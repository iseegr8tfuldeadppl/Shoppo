// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import { DrawerActions } from '@react-navigation/native';
import CheckOut from '../components/CheckOut';
import CheckoutBar from '../components/CheckoutBar';
import CartItem from '../components/CartItem';
import SelectAllBar from '../components/SelectAllBar';
import CartTrashCan from '../components/CartTrashCan';
import OkayButton from '../components/OkayButton';
import Header from '../components/Header';
import Taboo from '../components/Taboo';
import ProductPreviewModal from '../components/ProductPreviewModal';
import { cartString, goToCategoriesString, cartEmptyString, categoriesString, mainMenuString, cartString, okString, selectProductAlertString, noProductsAlertString, oopsString, goToMainMenuString, checkoutString } from '../constants/strings';


const Cart = props => {

	const [allSelected, setAllSelected] = useState(true);

	BackHandler.addEventListener('hardwareBackPress', function() {
	    return true;
	});

    const doubleTabPress = () => {
		if(props.checkoutList){
			props.setCheckoutList();
			return;
		}
		if(props.productPreviewed){
			props.setProductPreviewed();
			return;
		}
    };

	const calculateTotal = () => {
		let total = 0.00;

		for(let i=0; i<props.cart.length; i++){
			if(props.cart[i].selected_in_cart){
				if(!isNaN(parseFloat(props.cart[i].quantity))){
					total += parseFloat(props.cart[i].data.cost) * parseFloat(props.cart[i].quantity);
				}
			}
		}

		return Math.round(total).toString();
	};

	const invalidQuantity = title => {
		Alert.alert(
			oopsString[props.language],
			enterQuantityAlertString[props.language] + ' ' + title + '!',
			[
				{text: okString[props.language], style: 'cancel'}
			],
			{ cancelable: true }
		);
	};

	const buyNow = () => {

		// check for valid quantities
		for(let i=0; i<props.cart.length; i++){
			if(props.cart[i].selected_in_cart){
				if(isNaN(parseFloat(props.cart[i].quantity))){
					invalidQuantity(props.cart[i].data.title);
					return;
				}
			}
		}


		let cartCopy = [];
		for(let i=0; i<props.cart.length; i++){
			if(props.cart[i].selected_in_cart){
				cartCopy = [...cartCopy, props.cart[i] ];
			}
		}

		if(cartCopy.length>0)
			props.setCheckoutList(cartCopy);
		else {
			Alert.alert(
				noProductsAlertString[props.language],
				selectProductAlertString[props.language],
				[
					{text: okString[props.language], style: 'cancel'}
				],
				{ cancelable: true }
			);
		}
	};

	const cartTitle = () => {
		if(props.cart.length>0)
			return cartString[props.language] + " (" + props.cart.length + ")";
		return cartString[props.language];
	};

	const Listpage = () => {
	  	if(props.productPreviewed && props.navigation.isFocused()){
		  	return(
			  <SafeAreaView style={{ flex: 1}} forceInset={{ bottom: 'never' }}>
				  <ProductPreviewModal
					  navigation={props.navigation}
  						language={props.language}
					  setRemoteOrdersOpen={props.setRemoteOrdersOpen}
					  checkoutList={props.checkoutList}
					  setCheckoutList={props.setCheckoutList}
					  adminList={props.adminList}
					  uid={props.uid}
					  userInfo={props.userInfo}
					  navigation={props.navigation}
					  addToCart={props.addToCart}
					  cart={props.cart}
					  updateCart={props.updateCart}
					  setProductPreviewed={props.setProductPreviewed}
					  productPreviewed={props.productPreviewed}/>
			  </SafeAreaView>
		  	);
		} else if(props.cart.length==0)
			return(
				<>
					<Header style={styles.header}>
						<TouchableOpacity
							onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
							<MaterialCommunityIcons name="menu" color={"white"} size={30} />
						</TouchableOpacity>

						<Text style={styles.headertitle}>{cartTitle()}</Text>

						<CartTrashCan
							cart={props.cart}
							language={props.language}
							updateCart={props.updateCart}/>
					</Header>

					<View style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
						}}>

						<MaterialCommunityIcons name="cart" color={Colors.Primary} size={65} />

						<Text style={{
							fontSize: 24,
							marginTop: 6,
							marginBottom: 30,
						}}>{cartEmptyString[props.language]}</Text>

						<OkayButton
							style={{
								minWidth:"70%",
							}}
							textStyle={{
								fontSize: 16,
							}}
							onClick={() => {
								props.navigation.navigate(mainMenuString[props.language]);
							}}
							text={goToMainMenuString[props.language]} />

						<OkayButton
							style={{
								marginTop: 10,
								minWidth:"70%",
							}}
							textStyle={{
								fontSize: 16,
							}}
							onClick={() => {
								props.navigation.navigate(categoriesString[props.language]);
							}}
							text={goToCategoriesString[props.language]} />
					</View>
				</>
				);
		else
			return(
				<>
				<Header style={styles.header}>
					<TouchableOpacity
						onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
						<MaterialCommunityIcons name="menu" color={"white"} size={30} />
					</TouchableOpacity>

					<Text style={styles.headertitle}>{cartTitle()}</Text>

					<CartTrashCan
						cart={props.cart}
						updateCart={props.updateCart}/>
				</Header>

				<View style={{flex:1, }} >
					<SelectAllBar
						allSelected={allSelected}
						setAllSelected={setAllSelected}
						updateCart={props.updateCart}
						cart={props.cart}/>

					<FlatList
						data={props.cart}
						renderItem={singleProductData =>
							<CartItem
								setProductPreviewed={props.setProductPreviewed}
								productPreviewed={props.productPreviewed}
								setAllSelected={setAllSelected}
								allSelected={allSelected}
								item={singleProductData.item}
								updateCart={props.updateCart}
								cart={props.cart}/>
						}
					/>

					<CheckoutBar
						text={checkoutString[props.language]}
	 				   	language={props.language}
						calculateTotal={calculateTotal}
						onClick={buyNow} />

				</View>
				</>
				);
	};

	const checkoutOrCart = () => {
		if(props.checkoutList){
			return(
				<CheckOut
                    navigation={props.navigation}
					language={props.language}
					setRemoteOrdersOpen={props.setRemoteOrdersOpen}
					sender={"Cart"}
					uid={props.uid}
					setProductPreviewed={props.setProductPreviewed}
					productPreviewed={props.productPreviewed}
				  	userInfo={props.userInfo}
					cart={props.cart}
					updateCart={props.updateCart}
					checkoutList={props.checkoutList}
					setCheckoutList={props.setCheckoutList}/>
			);
		}
		return(
			Listpage()
		);
	};

	return(
		<SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
			{checkoutOrCart()}
			<Taboo language={props.language} focus={cartString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header:{
		height: 70,
        paddingTop: 5,
	},
    headertitle: {
        fontSize: 23,
        color:"white",
        flex: 1,
        marginHorizontal: 11,
    },
});

export default Cart;
