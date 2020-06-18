import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image, Button, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import CheckOut from '../components/CheckOut';


const ProductPreviewModal = props => {

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
			props.setCheckoutList([props.productPreviewed]);
		}
	};

	const sender = () => {
		if(props.productPreviewed.data.title.length>19)
			return props.productPreviewed.data.title.substring(0, 18) + "...";
		else
			return props.productPreviewed.data.title;
	};

	const textInput = () =>{
		if(IsOriginallyCurrency()){
			return(
				<TextInput
					maxLength={10}
					style={styles.quantityInputCurrency}
					blurOnSubmit
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="number-pad"
					onChangeText={quantityUpdater}
					value={quantity} />
			);
		} else {
			return(
				<TextInput
					maxLength={10}
					style={styles.quantityInput}
					blurOnSubmit
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="number-pad"
					onChangeText={quantityUpdater}
					value={quantity} />
			);
		}
	};

	return(

		<Modal visible={props.productPreviewed!==undefined} animationType="slide"
			onRequestClose={() => { /* remove the effect of onbackpress closing this modal due to me not being able to contrl it myself */ }}>

			<CheckOut
				sender={sender()}
				uid={props.uid}
				userInfo={props.userInfo}
				setProductPreviewed={props.setProductPreviewed}
				cart={props.cart}
				updateCart={props.updateCart}
				checkoutList={props.checkoutList}
				setCheckoutList={props.setCheckoutList}/>

			<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
				<View style={styles.wholedamnting}>

					<Header
							style={styles.customHeader}>
						<TouchableOpacity
							onPress={() => {props.setProductPreviewed();} }>
							<MaterialCommunityIcons name="arrow-left" color={"white"} size={32} />
						</TouchableOpacity>
					</Header>

					<View style={{width:"100%", flex:1}}>
					<Image
						style={styles.banner}
						source={{
							uri:props.productPreviewed.data.banner, }} />
						<View style={styles.costHolder}>
							<Text numberOfLines={3} ellipsizeMode='tail' style={styles.cost}>{props.productPreviewed.data.cost} DA</Text>
						</View>

						<View style={styles.content}>
							<Text style={styles.title}>{props.productPreviewed.data.title}</Text>
							<Text style={styles.description}>{props.productPreviewed.data.description}</Text>
						</View>
					</View>

					<View style={styles.quantityOuterHolder}>
						<View style={styles.quantityInnerHolder}>
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
								style={styles.minus}>
								<MaterialCommunityIcons name="minus" color={"white"} size={23} />
							</TouchableOpacity>
							<View style={styles.centerMaster}>
								{textInput()}
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
								style={styles.plus}>
								<MaterialCommunityIcons name="plus" color={"white"} size={23} />
							</TouchableOpacity>
						</View>


						<View style={styles.button}>
							<Button title="Buy Now" color={Colors.Accent} onPress={buyNow} />
						</View>

						<View style={styles.button}>
							<Button title="Add To Cart" color={Colors.Accent} onPress={addToCart} />
						</View>
					</View>

				</View>
			</TouchableWithoutFeedback>

		</Modal>
	);
};

const styles = StyleSheet.create({
	wholedamnting: {
		flex:1,
		alignItems:'center',
	},
	content: {
		marginHorizontal:20,
		marginTop:10
	},
	banner: {
		width:"100%",
		height:200,
	},
	costHolder: {
		justifyContent:"flex-start",
		maxWidth:"100%",
		marginHorizontal:10,
		flexDirection:'row',
	},
	cost: {
		fontSize:23,
		flexWrap: 'wrap',
		fontWeight:"bold",
		maxWidth:"100%",
		paddingHorizontal:10,
		marginTop:-20,
		backgroundColor:Colors.lowPrimary,
		color:"white",
	},
	description: {
		fontSize:13,
		paddingHorizontal: 10
	},
	quantityOuterHolder: {
		paddingTop: 10,
		backgroundColor:"white",
		width:"100%",
		justifyContent:"center",
		alignItems:"center",
	},
	quantityInnerHolder: {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		marginBottom:11,
	},
	minus: {
		width:35,
		height:35,
		borderRadius:50,
		backgroundColor:Colors.Primary,
		alignItems:'center',
		justifyContent:'center',
	},
	centerMaster: {
		alignItems:'center',
		justifyContent:'center',
	},
	plus: {
		width:35,
		height:35,
		borderRadius:50,
		backgroundColor:Colors.Primary,
		alignItems:'center',
		justifyContent:'center',
	},
	title: {
		color: Colors.Accent,
		fontSize:18,
		fontWeight:"bold",
		marginBottom:10,
		marginTop: -7
	},
	customHeader: {
		paddingTop:18,
		paddingBottom:12
	},
	button:{
		width:"80%",
		marginBottom: 15,
	},
	quantityInput : {
		fontSize:16,
		textAlign:'center',
		marginHorizontal: 10,
	},
	quantityInputCurrency : {
		borderColor:Colors.Primary,
		borderRadius: 10,

		paddingVertical: 3,
		fontWeight: "bold",
		paddingHorizontal: 15,
		borderWidth: 2,
		fontSize:18,
		textAlign:'center',
		marginHorizontal: 10,
	},
});

export default ProductPreviewModal;
