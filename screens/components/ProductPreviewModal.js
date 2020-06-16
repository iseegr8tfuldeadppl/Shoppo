import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image, Button, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import CheckOut from '../components/CheckOut';

const ProductPreviewModal = props => {

	const [checkoutList, setCheckoutList] = useState();

	const IsOriginallyCurrency = () => {
		return props.productPreviewed.data.originaltype==="currency" || props.productPreviewed.data.originaltype==="account-charging";
	};
	
	const [quantity, setQuantity] = useState(IsOriginallyCurrency() ? "1.00"  : "1");
	let page;

	const cleanQuantity = enteredText => {
		if(!IsOriginallyCurrency()){
			enteredText = enteredText.replace(",", "");
			enteredText = enteredText.replace(".", "");
		}
		enteredText = enteredText.replace("-", "");
		enteredText = enteredText.replace(/\s/g, "");

		return enteredText;
	};

	const quantityUpdater = enteredText => {
		setQuantity(cleanQuantity(enteredText));
	};

	const addToCart = () => {

		if(isNaN(parseFloat(quantity))) {
			invalidQuantity();
		} else {

			let cartCopy = props.cart.slice();
			for(let i=0; i<cartCopy.length; i++){
				if(cartCopy[i].key===props.productPreviewed.key){
				
					if(IsOriginallyCurrency()){
						cartCopy[i].quantity = ( parseFloat(cartCopy[i].quantity) + parseFloat(quantity)).toFixed(2).toString();
						cartCopy[i].original_quantity = cartCopy[i].quantity;
					} else {
						cartCopy[i].quantity = (parseInt(cartCopy[i].quantity) + parseInt(quantity)).toString();
						cartCopy[i].original_quantity = cartCopy[i].quantity;
					}

					Alert.alert(
						'Added To Cart!', 
						'You now have ' + cartCopy[i].quantity + ' '  + props.productPreviewed.data.title + ' in your cart!', 
						[
							{text: 'Go To Cart', style: 'destructive', onPress: () => { props.setProductPreviewed(); props.navigation.navigate("Cart"); } },
							{text: 'Ok', style: 'cancel'}],
						{ cancelable: true }
					);

					props.updateCart(cartCopy);
					return;
				}
			}

			Alert.alert(
				'Added To Cart!', 
				'You have added ' + quantity + ' ' + props.productPreviewed.data.title + ' to your cart!', 
				[
					{text: 'Go To Cart', style: 'destructive', onPress: () => { props.setProductPreviewed(); props.navigation.navigate('Cart'); } },
					{text: 'Ok', style: 'cancel'}],
				{ cancelable: true }
			);
			props.productPreviewed.quantity = quantity;
			props.productPreviewed.original_quantity = props.productPreviewed.quantity;
			props.addToCart(props.productPreviewed);
		}
	};

	const invalidQuantity = () => {
		Alert.alert(
			'Oops!', 
			'Please write a valid quanity!', 
			[
				{text: 'Ok', style: 'cancel'}
			],
			{ cancelable: true }
		);
	};

	const buyNow = () => {
	
		if(isNaN(parseFloat(quantity))) {
			invalidQuantity();
		} else {
			props.productPreviewed.quantity = quantity;
			props.productPreviewed.selected_in_cart = true;
			setCheckoutList([props.productPreviewed]);
		}
	};

	return(

		<Modal visible={props.productPreviewed!==undefined} animationType="slide">
			
			<CheckOut 
				setProductPreviewed={props.setProductPreviewed}
				cart={props.cart}
				updateCart={props.updateCart}
				checkoutList={checkoutList}
				setCheckoutList={setCheckoutList}/>

			<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
				<View style={{flex:1, alignItems:'center',}}>

					<Header
							style={{ paddingTop:18, paddingBottom:12,  }}>
						<TouchableOpacity
							onPress={() => {props.setProductPreviewed();} }>
							<MaterialCommunityIcons name="arrow-left" color={"white"} size={32} />
						</TouchableOpacity>
					</Header>
					
					<View style={{width:"100%", flex:1}}>
					<Image 
						style={{width:"100%", height:250, }}
						source={{
							uri:props.productPreviewed.data.banner, }} />
						<View style={{justifyContent:"flex-start", maxWidth:"100%", marginHorizontal:10, flexDirection:'row'}}>
							<Text numberOfLines={3} ellipsizeMode='tail' style={{fontSize:23, flexWrap: 'wrap', maxWidth:"100%", paddingHorizontal:5, marginTop:-20, backgroundColor:Colors.lowPrimary, color:"white",  }}>{props.productPreviewed.data.title}</Text>
						</View>

						<View style={{marginHorizontal:20, marginTop:10}}>
							<Text style={{fontSize:13, }}>{props.productPreviewed.data.description}</Text>
						</View>
					</View>
					
					<View style={{backgroundColor:"white", width:"100%", justifyContent:"center", alignItems:"center", }}>
						<Text style={{fontSize:15, marginBottom:6}}>Quantity</Text>
						<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', marginBottom:11,}}>
							<TouchableOpacity
								onPress={() => { 
									if(isNaN(parseFloat(quantity))) 
										setQuantity("1"); 
									else if(parseFloat(quantity)>1) {
										if(IsOriginallyCurrency())
											setQuantity((parseFloat(quantity)-1).toFixed(2).toString());
										else
											setQuantity(Math.round(parseFloat(quantity)-1).toString());
									}
								}}
								style={{
									width:35, 
									height:35, 
									borderRadius:50, 
									backgroundColor:Colors.Primary, 
									alignItems:'center', 
									justifyContent:'center',
								}}>
								<MaterialCommunityIcons name="minus" color={"white"} size={23} />
							</TouchableOpacity>
							<View style={{alignItems:'center', justifyContent:'center',}}>
								<TextInput
									maxLength={10}
									style={styles.quantityInput}
									blurOnSubmit 
									autoCapitalize="none" 
									autoCorrect={false}  
									keyboardType="number-pad" 
									onChangeText={quantityUpdater}
									value={quantity} />
							</View>
							<TouchableOpacity 
								onPress={() => { 
									if(isNaN(parseFloat(quantity))) 
										setQuantity("1"); 
									else {
										if(IsOriginallyCurrency())
											setQuantity((parseFloat(quantity)+1).toFixed(2).toString());
										else
											setQuantity(Math.round(parseFloat(quantity)+1).toString());
									}
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
						</View>


						<View style={styles.button}>
							<Button title="Buy Now" color={Colors.Accent} onPress={buyNow} />
						</View>

						<View style={{...styles.button, ...{marginBottom:20}}}>
							<Button title="Add To Cart" color={Colors.Accent} onPress={addToCart} />
						</View>
					</View>
					
				</View>
			</TouchableWithoutFeedback>
					
		</Modal>
	);
};

const styles = StyleSheet.create({
	button:{
		width:"80%",
		marginBottom:15,
	},
	quantityInput : {
		borderColor:Colors.Primary,
		fontSize:16,
		textAlign:'center',
		marginHorizontal: 10,
	},
});

export default ProductPreviewModal;