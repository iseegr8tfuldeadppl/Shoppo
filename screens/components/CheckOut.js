import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import CheckoutItem from './CheckoutItem';
import CheckoutBar from './CheckoutBar';
import OkayButton from './OkayButton';
import PaymentMethod from './PaymentMethod';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';


const paymentMethods = [
	{
		icon: "data:image/png;base64,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",
		title: "Main a Main",
		explanation: "",
		type: "irl",
		key: "1"
	},
	{
		icon: "https://eldjazair365.com/fr/wp-content/uploads/2016/11/ccp-poste.png",
		title: "CCP",
		explanation: "Go to your local poste office and get Mondat, fill out the information below and pay amount and then take a picture of it with your name written on it and submit it in the app!",
		account: "NOM Prénom: Benbouali Mohamed Amine\nNuméro Compte: 0066154848\nClé: 85\nAdresse: Laissez Le Vide",
		type: "image-submit",
		key: "2"
	},
	{
		icon: "https://lh3.googleusercontent.com/hM4GVvncnaqPeNwAAuY1VRSYTYQ0EVdEKNZKsQAubWotw4QT6Yyoj52NORnYldqQuA=s180",
		title: "BaridiMob",
		explanation: "Open the BaridiMob App and send the payment to the account number below and then submit a screenshot of that",
		account:"07799999006615484885",
		type: "image-submit",
		key: "3"
	}
];


const CheckOut = props => {

	// i'm using this title to detect when user presses confirm to switch the page to reduce variables
	const [title, setTitle] = useState("Payment Method");
	const [selected, setSelected] = useState();
	const [imageUri, setImageUri] = useState();
	//const [imageUrl, setImageUrl] = useState();

	const calculateTotal = () => {
		let total = 0.00;

		if(props.checkoutList)
			for(let i=0; i<props.checkoutList.length; i++){
				if(props.checkoutList)
					total += parseFloat(calculateTotalForThisProduct(props.checkoutList[i]));;
			}

		return Math.round(total).toString();
	};

	const calculateTotalForThisProduct = item => {
		return (parseFloat(item.data.cost) * parseFloat(item.quantity)).toString();
	};

	const cleanCart = () => {
		if(props.cart.length>0){
			let cartCopy = props.cart.slice();
			let clean = false;
			while(!clean){
				clean = true;
				for(let i=0; i<cartCopy.length; i++){
					for(let j=0; j<props.checkoutList.length; j++){
						if(cartCopy[i].key===props.checkoutList[j].key && cartCopy[i].quantity===props.checkoutList[j].quantity){
							cartCopy.splice(i, 1);
							clean = false;
							break;
						}
					}
					if(!clean)
						break;
				}
			}

			props.updateCart(cartCopy);
		}
	};

	const exit = () => {
		if(imageUri)
			setImageUri();
		props.setCheckoutList();
		setTitle("Payment Method");
		cleanCart();
	};

	const Buy = () => {

		if(title==="Payment Method"){
			if(selected)
				setTitle("Confirm Order");
			else
				Alert.alert(
					'Wait!',
					'You should select a payment method first!',
					[
						{text: 'Ok', style: 'cancel'}
					],
					{ cancelable: true }
				);

		} else if(title==="Confirm Order"){
			if(selected.type==="image-submit"){
				setTitle("Submit Picture");
			} else {
				setTitle("Order Confirmed");
			}
		} else if(title==="Submit Picture"){
	      	uploadImage(imageUri);

			//setTitle("Order Confirmed");
		} else if(title==="Order Confirmed"){
			exit();
		}

		// if(props.setProductPreviewed)
		// 	props.setProductPreviewed();
	};

	const goBack = () => {
		if(title==="Payment Method"){
			exit();
		} else if(title==="Confirm Order"){
			setTitle("Payment Method");
		} else if(title==="Submit Picture"){
			setTitle("Confirm Order");
		} else if(title==="Order Confirmed"){
			exit();
		}
	};


	const uploadImage = async(uri) => {
	  const response = await fetch(uri);
	  const blob = await response.blob();
	  var ref = firebase.storage().ref().child("my-image");
	  const snapshot = await ref.put(blob);
	  //setImageUrl(snapshot.downloadURL);
	  //console.log("imageUrl" + imageUrl);
	}

  	const galery = async () => {
	    let result = await ImagePicker.launchImageLibraryAsync();

	    if (!result.cancelled) {
			setImageUri(result.uri);
	    }
    };

	const camera = async () => {
		let result = await ImagePicker.launchCameraAsync();

		if (!result.cancelled) {
		  setImageUri(result.uri);
		}
	};

	const buttonText = () => {
		if(selected.type==="image-submit")
			return "Next";
		else
			return "Submit";
	};

	const display = () => {
		if(title==="Payment Method"){
		   return(
			   <>
			   <FlatList
				   style={{width:"100%", flex:1, paddingTop: 15 }}
				   data={paymentMethods}
				   renderItem={singlePaymentMethod =>
					   <PaymentMethod
						   setSelected={setSelected}
						   selected={selected}
						   item={singlePaymentMethod.item}/>
				   }/>
			   <CheckoutBar
				   text={"Next"}
				   calculateTotal={calculateTotal}
				   onClick={Buy} />
			   </>
		   );
	   } else if(title==="Confirm Order"){
		   return(
			   <>
			   <FlatList
				   style={{width:"100%", flex:1, }}
				   data={props.checkoutList}
				   renderItem={singleProductData =>
					   <CheckoutItem
						   calculateTotalForThisProduct={calculateTotalForThisProduct}
						   item={singleProductData.item}/>
				   }/>
			   <CheckoutBar
				   text={buttonText()}
				   calculateTotal={calculateTotal}
				   onClick={Buy} />
			   </>
		   );
	   } else if(title==="Submit Picture"){
		   if(selected.type==="image-submit"){
			   if(imageUri){
				   return(
					   <View style={styles.regularPage}>

						   	<View style={styles.regularPage}>

								<Text style={{ fontSize:22 }}>Image Selected!</Text>
								<MaterialCommunityIcons name="check" color={"green"} size={60} />

								<Image
									style={{
										width:200,
										height:200,
										borderRadius:1,
										marginStart:5,
									}}
									source={{
										uri:imageUri,
									}} />

						   	</View>

						  <CheckoutBar
							  text={"Submit"}
							  calculateTotal={calculateTotal}
							  onClick={Buy} />

					   </View>
				   );
			   } else {
				   return(
					   <View style={styles.regularPage}>

						   	<View style={styles.regularPage}>

								<Text style={{ fontSize:22, paddingHorizontal:18, textAlign:"center", marginBottom:25 }}>Press one of the two to select your image!</Text>

								<View style={{ flexDirection:"row" }}>
							   		<TouchableOpacity
											onPress={galery}
											activeOpacity={.70}
											style={{...styles.imageSelector, ...{ marginEnd: 10 }}}>
										<MaterialCommunityIcons name="image" color={"white"} size={60} />
									</TouchableOpacity>

									<TouchableOpacity
											onPress={camera}
											activeOpacity={.70}
											style={{...styles.imageSelector, ...{ marginStart: 10 }}}>
										<MaterialCommunityIcons name="camera" color={"white"} size={60} />
									</TouchableOpacity>
								</View>

						   	</View>

						  <CheckoutBar
							  text={"Submit"}
							  calculateTotal={calculateTotal}
							  onClick={Buy} />
					   </View>
				   );
			   }
		   }
		} else if(title==="Order Confirmed"){
 			return(
 				<View style={{flex:1, justifyContent:"center", alignItems:"center", width:"100%", }}>

 					<OkayButton
 						textStyle={{ fontSize: 20 }}
 						onClick={() => {setTitle("Payment Method"); }}
 						text={"Back to Main Menu"} />
 				</View>
 			);
 		}
	};

	return(
		<Modal visible={props.checkoutList!==undefined} animationType="slide">

			<View style={{flex:1, alignItems:"center",}}>
				<Header style={styles.customHeader}>
					<TouchableOpacity
						onPress={goBack}>
						<MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
					</TouchableOpacity>
				</Header>

				<Text style={styles.cuteTitle}>{title}</Text>

				{display()}
			</View>

		</Modal>
	);
};

const styles = StyleSheet.create({
	regularPage: {
		width:"100%",
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	imageSelector: {
		borderRadius:150,
		width:90,
		height:90,
		backgroundColor: Colors.Primary,
		justifyContent:"center",
		alignItems:"center",
	},
	customHeader: {
		paddingTop:18,
		paddingBottom:12,
	},
	cuteTitle: {
		width:"100%",
		fontSize:22,
		paddingHorizontal: 20,
		paddingTop:10,
		paddingBottom: 11,
		backgroundColor:Colors.Primary,
		color:"white",
	},
});

export default CheckOut;
