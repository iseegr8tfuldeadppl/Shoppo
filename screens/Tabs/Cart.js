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


const Cart = props => {

	const [allSelected, setAllSelected] = useState(true);

	BackHandler.addEventListener('hardwareBackPress', function() {
	    return true;
	});

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
			'Oops!',
			'Please write a valid quantity for ' + title + '!',
			[
				{text: 'Ok', style: 'cancel'}
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
				'No products selected in your cart!',
				'Check at least one product',
				[
					{text: 'Ok', style: 'cancel'}
				],
				{ cancelable: true }
			);
		}
	};

	const Listpage = () => {
		if(props.cart.length==0)
			return(
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
					}}>Your Cart is Empty</Text>

					<OkayButton
						textStyle={{
							fontSize: 16,
						}}
						onClick={() => {
							props.navigation.navigate("MainMenu");
						}}
						text={"Visit Product Page!"} />
				</View>
			);
		else
			return(
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
						text={"Checkout"}
						calculateTotal={calculateTotal}
						onClick={buyNow} />

				</View>
			);
	};

	return(
		<SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>

			<CheckOut
				sender={"Cart"}
				uid={props.uid}
				setProductPreviewed={props.setProductPreviewed}
				productPreviewed={props.productPreviewed}
			  	userInfo={props.userInfo}
				cart={props.cart}
				updateCart={props.updateCart}
				checkoutList={props.checkoutList}
				setCheckoutList={props.setCheckoutList}/>

			<Header style={styles.header}>
				<TouchableOpacity
					onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
					<MaterialCommunityIcons name="menu" color={"white"} size={30} />
				</TouchableOpacity>

				<Text style={styles.headertitle}>Cart</Text>

				<CartTrashCan
					cart={props.cart}
					updateCart={props.updateCart}/>
			</Header>

			{Listpage()}

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header:{
		height: 90,
	},
    headertitle: {
        fontSize: 23,
        color:"white",
        flex: 1,
        marginHorizontal: 11,
    },
});

export default Cart;
