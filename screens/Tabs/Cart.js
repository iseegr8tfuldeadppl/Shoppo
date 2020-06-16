// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image, CheckBox, TextInput, Alert } from 'react-native';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import { DrawerActions } from '@react-navigation/native';
import CheckOut from '../components/CheckOut';


const Cart = props => {

	const [allSelected, setAllSelected] = useState(true);
	const [checkoutList, setCheckoutList] = useState();

	const update = key => {
	
		let cartCopy = props.cart.slice();
		for(let i=0; i<cartCopy.length; i++){
			if(cartCopy[i].key===key){
				cartCopy[i].selected_in_cart = ! cartCopy[i].selected_in_cart;
				break;
			}
		}
		props.updateCart(cartCopy);
	};

	const areTheyAllSelected = () => {
		for(let i=0; i<props.cart.length; i++){
			if(!props.cart[i].selected_in_cart){
				return false;
			}
		}
		
		return true;
	};

	const toggleAllSelected = () => {

		let allSelectedInverse = !areTheyAllSelected();

		let cartCopy = props.cart.slice();
		for(let i=0; i<props.cart.length; i++){
			props.cart[i].selected_in_cart = allSelectedInverse;
		}

		console.log(cartCopy);
		
		props.updateCart(cartCopy);
		setAllSelected(allSelectedInverse);
	};

	const calculateTotal = () => {
		let total = 0.00;

		for(let i=0; i<props.cart.length; i++){
			if(props.cart[i].selected_in_cart){
				total += parseFloat(props.cart[i].data.cost) * parseFloat(props.cart[i].quantity);
			}
		}

		return Math.round(total).toString();
	};

	const toggleSelectAll = () => {
	
		let cartCopy = props.cart.slice();
		for(let i=0; i<cartCopy.length; i++){
			cartCopy[i].selected_in_cart = ! selectAll;
		}
		props.updateCart(cartCopy);
		setSelectAll(!selectAll);
	};
	
	const IsOriginallyCurrency = originaltype => {
		return originaltype==="currency" || originaltype==="account-charging";
	};

	const updateQuantity = (key, quantity, update_original) => {
		let cartCopy = props.cart.slice();
		for(let i=0; i<cartCopy.length; i++){
			if(cartCopy[i].key===key){
				cartCopy[i].quantity = quantity;
				if(update_original)
					cartCopy[i].original_quantity = quantity;
				props.updateCart(cartCopy);
				return;
			}
		}
	};

	const deleteSelectedOnes = () => {

		let cartCopy = props.cart.slice();
		let allClean = false;
		while(!allClean){
			allClean = true;
			for(let i=0; i<cartCopy.length; i++){
				if(cartCopy[i].selected_in_cart){
					allClean = false;
					cartCopy.splice(i, 1);
					break;
				}
			}
		}

		console.log(cartCopy);
		props.updateCart(cartCopy);
	};

	const deleteSelectedOnesConfirmation = () =>{
		Alert.alert(
			'Are you sure?', 
			'You\'re about to remove the selected products from your shopping cart.', 
			[
				{text: 'No', style: 'cancel'},
				{text: 'Yes', style: 'destructive',
					onPress: deleteSelectedOnes
				}
			],
			{ cancelable: true }
		);
	};

	const trashCan = () => {
	
		for(let i=0; i<props.cart.length; i++){
			if(props.cart[i].selected_in_cart){
			
				return (
					<TouchableOpacity
						onPress={deleteSelectedOnesConfirmation}>
						<MaterialCommunityIcons name="trash-can-outline" color={"red"} size={34} />
					</TouchableOpacity>
				);

				return;
			}
		}
		
		return (null);
	};
	
	const cleanQuantity = (operand, enteredText, update_original) => {
		if(isNaN(parseFloat(enteredText))){
			updateQuantity(operand.key, operand.original_quantity);
			return;
		}
		if(!IsOriginallyCurrency(operand.data.originaltype)){
			enteredText = enteredText.replace(",", "");
			enteredText = enteredText.replace(".", "");
		}
		enteredText = enteredText.replace("-", "");
		enteredText = enteredText.replace(/\s/g, "");
		
		if(IsOriginallyCurrency(operand.data.originaltype))
			enteredText = parseFloat(enteredText).toFixed(2).toString();
		else
			enteredText = Math.round(parseFloat(enteredText)).toString();

		updateQuantity(operand.key, enteredText, update_original);
	};

	const buyNow = () => {
		let cartCopy = [];
		for(let i=0; i<props.cart.length; i++){
			if(props.cart[i].selected_in_cart){
				cartCopy = [...cartCopy, props.cart[i] ];
			}
		}

		if(cartCopy.length>0){
			setCheckoutList(cartCopy);
		} else {
			Alert.alert(
				'You have no products in your cart!', 
				'You should go check out products first!', 
				[
					
					{text: 'Check out Products', style: 'destructive',
						onPress: () => { props.navigation.navigate("MainMenu"); }
					},
					{text: 'Ok', style: 'cancel'}
				],
				{ cancelable: true }
			);
		}
	};

	const display_quantity = (operand) => {
		return( <View style={{flexDirection:'row', justifyContent:"flex-end", marginHorizontal:19, marginTop:-10, }}>
					<TouchableOpacity
						onPress={() => { 
							if(parseFloat(operand.quantity)>1) {
								if(IsOriginallyCurrency(operand.data.originaltype))
									cleanQuantity(operand, (parseFloat(operand.quantity)-1).toFixed(2).toString(), true);
								else
									cleanQuantity(operand, Math.round(parseFloat(operand.quantity)-1).toString(), true);
							}
						}}
						style={{
							width:35, 
							height:35, 
							borderRadius:50, 
							backgroundColor:Colors.Primary, 
							alignItems:'center', 
							justifyContent:'center',}}>
						<MaterialCommunityIcons name="minus" color={"white"} size={23} />
					</TouchableOpacity>
					<View style={{alignItems:'center', justifyContent:'center', }}>
						<TextInput
							maxLength={10}
							style={styles.quantityInput}
							blurOnSubmit
							autoCapitalize="none" 
							autoCorrect={false}  
							keyboardType="number-pad" 
							onChangeText={ (enteredText) => {cleanQuantity(operand, enteredText, false);} }
							value={operand.quantity} />
					</View>
					<TouchableOpacity 
						onPress={() => { 
							if(IsOriginallyCurrency(operand.data.originaltype))
								cleanQuantity(operand, (parseFloat(operand.quantity)+1).toFixed(2).toString(), true);
							else
								cleanQuantity(operand, Math.round(parseFloat(operand.quantity)+1).toString(), true);
						}}
						style={{
							width:35, 
							height:35, 
							borderRadius:50, 
							backgroundColor:Colors.Primary, 
							alignItems:'center', 
							justifyContent:'center',}}>
						<MaterialCommunityIcons name="plus" color={"white"} size={23} />
					</TouchableOpacity>
				</View> );
	};

	const selectAllBar = () => {
	
		if(props.cart.length==0)
			return(null);
		return(
			<View style={{width:"100%", flexDirection:"row",alignItems:"center", backgroundColor:Colors.Primary, paddingHorizontal:5, paddingVertical:10, }}>
				<CheckBox
					value={allSelected}
					onValueChange={toggleAllSelected}
				/>
				<Text style={{flex:1, paddingHorizontal:20, fontSize:15, color:"white", }}>Select all</Text>
			</View>
		);
	};

	const flatList = () => {
		if(props.cart.length==0)
			return(null);
		else
			return(
			<FlatList 
				data={props.cart} 
				renderItem={singleProductData => 
			
				<View 
					style={{
						width:"100%",
						paddingTop:15,
						paddingHorizontal:5,
						flex:1,
					}}>
					<View 
						style={{
							alignItems:"center", 
							flexDirection:"row", 
						}}>
						<CheckBox
							value={singleProductData.item.selected_in_cart}
							onValueChange={() => {
								update(singleProductData.item.key);
								setAllSelected(areTheyAllSelected());
							}} />
						<TouchableOpacity>
							<View 
								style={{
									alignItems:"center", 
									flexDirection:"row", 
								}}>
								<Image 
									style={{
										width:100, 
										height:50, 
										borderRadius:1,
										marginStart:5,
									}}
									source={{
										uri:singleProductData.item.data.banner, 
									}} />
								<Text 
									numberOfLines={1} 
									ellipsizeMode='tail'
									style={{
										marginStart: 10, 
										fontSize: 14,
									}}>
									{singleProductData.item.data.title}</Text>
							</View>
						</TouchableOpacity>
				
					</View>

					{display_quantity(singleProductData.item)}
				</View>
				}
			/>
			);
	};

	const checkoutBar = () => {
		if(props.cart.length==0)
			return(null);
		else
			return(
				<View style={{ width:"100%", paddingBottom:8, paddingHorizontal:20, backgroundColor:Colors.Dank, }}>
					<View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", }}>
						<Text style={{flex:1, textAlign:"right", fontSize:16, paddingHorizontal:30}}>Total: {calculateTotal()} DA</Text>
			
						<TouchableOpacity 
							onPress={buyNow}
							style={{
								backgroundColor: Colors.Accent, 
								padding:10, 
								borderRadius:5,
							}}>
							<Text style={{ color:"white", paddingHorizontal:10, paddingVertical:1}}>Checkout</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
	};


	return(
		<SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
	
			<CheckOut 
				cart={props.cart}
				updateCart={props.updateCart}
				checkoutList={checkoutList}
				setCheckoutList={setCheckoutList}/>

			<Header style={{height: 90, justifyContent:"space-between", }}>
				<TouchableOpacity
					onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
					<MaterialCommunityIcons name="menu" color={"white"} size={30} />
				</TouchableOpacity>
			
				{trashCan()}
			</Header>

			{selectAllBar()}

			{flatList()}

			{checkoutBar()}

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		width: 300,
		marginTop: 16,
	},
	quantityInput : {
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:30,
		textAlign:'center',
		marginHorizontal: 5,
	},
});
export default Cart;