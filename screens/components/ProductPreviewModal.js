import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image, Alert, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Colors from '../constants/Colors';
import CheckOut from './CheckOut';
import possibleRequirements from '../constants/possibleRequirements';
import OkayButton from './OkayButton';
import firebase from 'firebase';
//admin stuff
import EditProduct from './Admins/Product/EditProduct';
import Banner from './Banner';



const ProductPreviewModal = props => {

	BackHandler.addEventListener('hardwareBackPress', function() {
		back();
	    return true;
	});

    const [preview, setPreview] = useState(false);

	const IsOriginallyCurrency = () => {
		return props.productPreviewed.data.type==="currency" || props.productPreviewed.data.type==="account-charging";
	};

	const back = () => {
		if(isNaN(index)){
			reset();
			props.setProductPreviewed();
		} else {
			if(index>0)
				setIndex(index-1);
			else
				setIndex("nigger");
		}
	};

	const stuff = () => {
		let required = props.productPreviewed.data.submittable_requirements.split(",");
		if(required.length>1)
			required.splice(required.length-1, 1);
		let withslots = [];
		for(let i=0; i<required.length; i++){
			for(let j=0; j<possibleRequirements.length; j++){
				if(required[i]===possibleRequirements[j].tag){
					withslots.push({slot: "", tag: required[i], title: possibleRequirements[j].title});
					break;
				}
			}
		}
		return withslots;
	};

	const resetRequirements = () => {
		setRequirements(stuff());
	}

	const [addToCartClicked, setAddToCartClicked] = useState(false);
	const [buyNowClicked, setBuyNowClicked] = useState(false);
	const [quantity, setQuantity] = useState(IsOriginallyCurrency() ? "1.00"  : "1");
	const [requirements, setRequirements] = useState(stuff());
	const [index, setIndex] = useState("nigger");

	const cleanQuantity = enteredText => {
		if(!IsOriginallyCurrency()){
			enteredText = enteredText.replace(",", "");
			enteredText = enteredText.replace(".", "");
		}
		enteredText = enteredText.replace(",", ".");
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
			return;
		}
		if(props.productPreviewed.data.stock){
			if(parseFloat(quantity)>parseFloat(props.productPreviewed.data.stock)){
				setQuantity(props.productPreviewed.data.stock);
				Alert.alert(
					'Stock Is Limited!',
					'There is only ' + props.productPreviewed.data.stock + ' ' + props.productPreviewed.data.title + ' left in stock.',
					[
						{text: "Ok", style: 'cancel'}
					],
					{ cancelable: true }
				);
				return;
			}
		}

		let cartCopy = props.cart.slice();
		for(let i=0; i<cartCopy.length; i++){
			if(cartCopy[i].key===props.productPreviewed.key){

				if(IsOriginallyCurrency()){

					if(props.productPreviewed.data.stock){
						if((parseFloat(cartCopy[i].quantity) + parseFloat(quantity)).toFixed(2)> parseFloat(props.productPreviewed.data.stock) ){
							setQuantity((parseFloat(props.productPreviewed.data.stock) - parseFloat(cartCopy[i].quantity) ).toString());
							Alert.alert(
								'Stock Is Limited!',
								'There is only ' + (parseFloat(props.productPreviewed.data.stock) - parseFloat(cartCopy[i].quantity) ).toString() + ' ' + props.productPreviewed.data.title + ' left in stock.',
								[
									{text: "Ok", style: 'cancel'}
								],
								{ cancelable: true }
							);
							return;
						}
					}

					cartCopy[i].quantity = ( parseFloat(cartCopy[i].quantity) + parseFloat(quantity)).toFixed(2).toString();
					cartCopy[i].original_quantity = cartCopy[i].quantity;
				} else {

					if(props.productPreviewed.data.stock){
						if((parseFloat(cartCopy[i].quantity) + parseInt(quantity)).toFixed(2) > parseFloat(props.productPreviewed.data.stock) ){
							setQuantity((parseFloat(props.productPreviewed.data.stock) - parseFloat(cartCopy[i].quantity) ).toString());
							Alert.alert(
								'Stock Is Limited!',
								'There is only ' + props.productPreviewed.data.stock + ' ' + props.productPreviewed.data.title + ' left in stock.',
								[
									{text: "Ok", style: 'cancel'}
								],
								{ cancelable: true }
							);
							return;
						}
					}

					cartCopy[i].quantity = (parseInt(cartCopy[i].quantity) + parseInt(quantity)).toString();
					cartCopy[i].original_quantity = cartCopy[i].quantity;
				}
				cartCopy[i].quantity.requirements = requirements;
				props.updateCart(cartCopy);

				Alert.alert(
					'Added To Cart!',
					'You now have ' + cartCopy[i].quantity + ' '  + props.productPreviewed.data.title + ' in your cart!',
					[
						{text: 'Go To Cart', style: 'destructive', onPress: () => { props.setProductPreviewed(); props.navigation.navigate("Cart"); } },
						{text: 'Ok', style: 'cancel'}],
					{ cancelable: true }
				);

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
		props.productPreviewed.requirements = requirements;
		props.addToCart(props.productPreviewed);
	};

	const invalidQuantity = () => {
		Alert.alert(
			'Oops!',
			'Please write a valid quantity!',
			[
				{text: 'Ok', style: 'cancel'}
			],
			{ cancelable: true }
		);
	};

	const buyNow = () => {

		if(isNaN(parseFloat(quantity))) {
			invalidQuantity();
			return;
		}

		if(props.productPreviewed.data.stock){
			if(parseFloat(quantity)>parseFloat(props.productPreviewed.data.stock)){
				setQuantity(props.productPreviewed.data.stock);
				Alert.alert(
					'Stock Is Limited!',
					'There is only ' + props.productPreviewed.data.stock + ' ' + props.productPreviewed.data.title + ' left in stock.',
					[
						{text: "Ok", style: 'cancel'}
					],
					{ cancelable: true }
				);
				return;
			}
		}

		props.productPreviewed.quantity = quantity;
		props.productPreviewed.selected_in_cart = true;
		props.productPreviewed.requirements = requirements;
		props.setCheckoutList([props.productPreviewed]);
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

	const check = (buyNoww, addToCartt) => {
		for(let i=0; i<requirements.length; i++){
			if(requirements[i].slot==="")
				return i;
		}
		if(buyNoww)
			buyNow();
		else if(addToCartt)
			addToCart();
		else if(buyNowClicked)
			buyNow();
		else if(addToCartClicked)
			addToCart();
		return "nigger";
	};

	const updateRequirements = (index, enteredText) => {
		let requirementsTemp = requirements.slice();
		requirementsTemp[index].slot = enteredText;
		setRequirements(requirementsTemp);
	};

	const page = () => {
		if(addToCartClicked || buyNowClicked){
			if(!isNaN(index)){
				return(
					<View style={styles.letout}>
						<Text style={styles.requirementTitle}>Please enter {requirements[index].title} for {props.productPreviewed.data.title}</Text>
						<TextInput
							style={styles.requirementInput}
							blurOnSubmit
							placeholder={requirements[index].title + " for " + props.productPreviewed.data.title}
							onChangeText={(enteredText) => {updateRequirements(index, enteredText);}}
							value={requirements[index].slot} />

		              	<OkayButton
		                  	style={{ marginBottom:10, marginTop: 30, width: "80%" }}
		                  	textStyle={{ fontSize: 16 }}
		                  	onClick={() => {setIndex(check(false, false)); }}
		                  	text={"Next"} />
					</View>
				);
			}
		}

		return(
			<View style={styles.flexer}>
				<View
					style={styles.holder}>
					<View style={styles.banner}>
						<Banner
							preview={preview}
							setPreview={setPreview}
							showThumbnail={true}
							style={styles.banner}
							images={[props.productPreviewed.data.banner]} />
					</View>

				<View style={styles.costHolder}>
					<Text numberOfLines={1} ellipsizeMode='tail' style={styles.cost}>{props.productPreviewed.data.cost} DA</Text>
				</View>
				<Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{props.productPreviewed.data.title}</Text>
				<Text style={styles.description}>{props.productPreviewed.data.description}</Text>
			</View>
			<View style={styles.quantityOuterHolder}>
			<Text style={{fontSize: 18,marginBottom: 7, fontWeight:"bold"}}>Stock: {props.productPreviewed.data.stock}</Text>
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
						<MaterialCommunityIcons name={"minus"} color={"white"} size={20} />
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
						<MaterialCommunityIcons name={"plus"} color={"white"} size={20} />
					</TouchableOpacity>
				</View>
				<View style={{flexDirection:"row", marginBottom: 10, paddingHorizontal: 8,}}>
				  <OkayButton
					  style={{ marginTop:10, flex: 1, paddingVertical: 8, marginEnd:4, }}
					  textStyle={{ fontSize: 16, textAlign:"center" }}
					  onClick={() => {setBuyNowClicked(true);setIndex(check(true, false)); }}
					  text={"Buy Now"} />
				  <OkayButton
					  style={{ marginTop:10, flex: 1, paddingVertical: 8, marginStart:4, }}
					  textStyle={{ fontSize: 16, textAlign:"center" }}
					  onClick={() => {setAddToCartClicked(true);setIndex(check(false, true)); }}
					  text={"Add To Cart"} />
				</View>
			</View>
		</View>
		);
	};

	const CheckoutOrPreview = () => {
		if(props.checkoutList){
			return(
				<CheckOut
					navigation={props.navigation}
					language={props.language}
                    setRemoteOrdersOpen={props.setRemoteOrdersOpen}
					resetRequirements={resetRequirements}
					sender={sender()}
					uid={props.uid}
					userInfo={props.userInfo}
					productPreviewed={props.productPreviewed}
					setProductPreviewed={props.setProductPreviewed}
					cart={props.cart}
					updateCart={props.updateCart}
					checkoutList={props.checkoutList}
					setCheckoutList={props.setCheckoutList}/>
			);
		}
		return(
			<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
				<View style={styles.wholedamnting}>

					<Header
						style={styles.customHeader}>
						<TouchableOpacity
							onPress={() => {back();} }>
							<MaterialCommunityIcons name={"arrow-left"} color={"white"} size={32} />
						</TouchableOpacity>
						{adminControls()}
					</Header>

					<View style={{width:"100%", flex:1}}>
						{page()}
					</View>

				</View>
			</TouchableWithoutFeedback>
		);
	};

	// admins tuff
	const editmodo = () => {
		if(editMode){
			return(
				<EditProduct
					setProductPreviewed={props.setProductPreviewed}
					productPreviewed={props.productPreviewed}
					setEditMode={setEditMode}
					productPreviewed={props.productPreviewed}/>
			);
		}

		if(preview){
			return(
				<View style={styles.letout}>
					<Banner
						preview={preview}
						setPreview={setPreview}
						showThumbnail={true}
						style={styles.banner}
						images={[props.productPreviewed.data.banner]} />
				</View>
			);
		}

		return(
			CheckoutOrPreview()
		);
	};

	const reset = () => {
		//if(requirements)
		//	setRequirements();
		if(!isNaN(index))
			setIndex("nigger");
		if(buyNowClicked)
			setBuyNowClicked(false);
		else if(addToCartClicked)
			setAddToCartClicked(false)
	}

	//admin stuff
	const deleteConfirmation = () => {
		Alert.alert(
			'Delete this product',
			'Are you sure you want to delete this product from the store?',
			[
				{text: "No Don't Delete it", style: 'cancel'},
				{text: 'Yes Delete It', style: 'destructive',
					onPress: () => {
						props.setProductPreviewed();
						let key = props.productPreviewed.key;
						let category_key = props.productPreviewed.category.key;
						let ref = firebase.database().ref("/categories/" + category_key + "/products")
						.child(key).remove().then(function(snapshot) {
							Alert.alert('Success', 'Product was deleted', [{text: "Ok", style: 'cancel'}], { cancelable: true });
						});
					}
				}],
			{ cancelable: true }
		);
	};
	const toggleVisibilityConfirmation = () => {
		if(props.productPreviewed.data.visible){
			Alert.alert(
				'Hide this product',
				'Are you sure you want to hide this product in the store?',
				[
					{text: "No", style: 'cancel'},
					{text: 'Yes', style: 'destructive',
						onPress: () => {
							let key = props.productPreviewed.key;
							let category_key = props.productPreviewed.category.key;
							let ref = firebase.database().ref("/categories/" + category_key + "/products")
							.child(key).child("data").child("visible").set(false).then(function(snapshot) {
								Alert.alert('Success', 'Product was hidden', [{text: "Ok", style: 'cancel'}], { cancelable: true });
							});
						}
					}],
				{ cancelable: true }
			);
		} else {
			Alert.alert(
				'Show this product',
				'Are you sure you want to show this product in the store?',
				[
					{text: "No", style: 'cancel'},
					{text: 'Yes', style: 'destructive',
						onPress: () => {
							let key = props.productPreviewed.key;
							let category_key = props.productPreviewed.category.key;
							let ref = firebase.database().ref("/categories/" + category_key + "/products")
							.child(key).child("data").child("visible").set(true).then(function(snapshot) {
								Alert.alert('Success', 'Product is now visible', [{text: "Ok", style: 'cancel'}], { cancelable: true });
							});
						}
					}],
				{ cancelable: true }
			);
		}
	};

	const [editMode, setEditMode] = useState(false);
	const editConfirmation = () => {
		setEditMode(true);
	};

	const visibility = () => {
		if(props.productPreviewed.data.visible)
			return "eye";
		else
			return "eye-off";
	};

	const adminControls = () => {
      	if(props.adminList.includes(props.uid) && !editMode){
	  		// continue here continue here continue here continue here continue here
			return(
				<View style={styles.horizontal}>
					<TouchableOpacity
						style={styles.adminbotton}
						onPress={editConfirmation}>
						<MaterialCommunityIcons name={"square-edit-outline"} color={"white"} size={32} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.adminbotton}
						onPress={toggleVisibilityConfirmation}>
						<MaterialCommunityIcons name={visibility()} color={"white"} size={32} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.adminbotton}
						onPress={deleteConfirmation}>
						<MaterialCommunityIcons name={"trash-can-outline"} color={"red"} size={32} />
					</TouchableOpacity>
				</View>
			);

	  	} else {
		  	return;
	  	}
	};

	return(
		editmodo()
	);
};

const styles = StyleSheet.create({
	horizontal: {
		flexDirection:"row"
	},
	adminbotton: {
		paddingStart: 15,
	},
	requirementTitle: {
		fontSize: 20,
		marginHorizontal: 15,
		textAlign:"center",
		marginBottom:30,
	},
	requirementInput : {
		borderColor:Colors.Primary,
		borderRadius: 10,
		width: "80%",
		paddingVertical: 3,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderWidth: 2,
		fontSize:17,
		textAlign:'center',
	},
	letout: {
		width: "100%",
		flex: 1,
		justifyContent:"center",
		alignItems:"center",
	},
	flexer: {
		width:"100%",
		flex:1,
	},
	wholedamnting: {
		flex:1,
		alignItems:'center',
	},
	content: {
		marginHorizontal:20,
		marginTop:10,
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
		maxWidth:"100%",
		fontWeight:"bold",
		marginTop: -20,
		paddingHorizontal:10,
		backgroundColor:Colors.lowPrimary,
		color:"white",
	},
	description: {
		fontSize:13,
		paddingHorizontal: 10,
		flex: 1,
	},
	quantityOuterHolder: {
		paddingTop: 10,
		backgroundColor:Colors.Dank,
		width:"100%",
		justifyContent:"center",
		alignItems:"center",
	},
	quantityInnerHolder: {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
	},
	minus: {
		width:30,
		height:30,
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
		width:30,
		height:30,
		borderRadius:50,
		backgroundColor:Colors.Primary,
		alignItems:'center',
		justifyContent:'center',
	},
	title: {
		flexWrap: 'wrap',
		maxWidth:"100%",
		color: Colors.Accent,
		fontSize:20,
		paddingHorizontal: 10,
		fontWeight:"bold",
	},
	customHeader: {
		justifyContent:"space-between",
		height: 80,
		paddingBottom: 2,
		alignItems:"center",
	},
	quantityInput : {
		fontSize:16,
		textAlign:'center',
		marginHorizontal: 8,
	},
	quantityInputCurrency : {
		borderColor:Colors.Primary,
		borderRadius: 10,

		paddingVertical: 3,
		paddingHorizontal: 15,
		borderWidth: 2,
		fontSize:18,
		textAlign:'center',
		marginHorizontal: 8,
	},
});

export default ProductPreviewModal;
