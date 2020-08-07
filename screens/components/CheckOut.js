import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Colors from '../constants/Colors';
import CheckoutItem from './CheckoutItem';
import CheckoutBar from './CheckoutBar';
import OkayButton from './OkayButton';
import PaymentMethod from './PaymentMethod';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import paymentMethods from '../constants/paymentMethods';
import moment from 'moment';


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
		props.setCheckoutList();
		if(props.sender!=="Cart")
			props.resetRequirements();
		//setTitle("Payment Method");
	};

	const next = () => {
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
				submitOrder();
				setTitle("Order Confirmed");
			}
		} else if(title==="Submit Picture"){

			if(!imageUri)
				Alert.alert('Wait!', 'You should select a picture first!', [{text: 'Ok', style: 'cancel'}], { cancelable: true });
			else {
				uploadImage(imageUri);
			}
		} else if(title==="Order Confirmed"){
			exit();
		}

	};

	const goBack = () => {
		if(title==="Payment Method"){
			exit();
		} else if(title==="Confirm Order"){
			setTitle("Payment Method");
		} else if(title==="Submit Picture"){
			setTitle("Confirm Order");
		} else if(title==="Order Confirmed"){
			if(props.sender==="Cart")
				cleanCart();
			if(imageUri)
				setImageUri();
			exit();
		}
	};

	BackHandler.addEventListener('hardwareBackPress', function() {
		goBack();
	    return true;
	});

	const uploadImage = async(uri) => {

		setTitle("Submitting Picture...");

  		let name = ".png";
	  	if(!props.userInfo){
		  	name = "0" + name;
	  	} else if(!props.userInfo.orders){
		  	name = "0" + name;
	  	} else {
		  	let largest = 0;
		  	let ordersKeys = Object.keys(props.userInfo.orders);
		  	for(var i=0; i<ordersKeys.length; i++){
			  	let pictureId = Object.values(props.userInfo.orders)[i].picture;
				pictureId = pictureId.split(".png?alt=media")[0].split(props.uid + "%2F")[1];
			  	if(parseInt(pictureId)>largest)
			  		largest = parseInt(pictureId);
	  		}
		  	name = (largest+1).toString() + name;
	  	}

  	  	const response = await fetch(uri);
  	  	const blob = await response.blob();
	  	var ref = firebase.storage().ref().child(props.uid).child(name);
	  	const snapshot = await ref.put(blob);

		//console.log("typeof(snapshot.downloadURL) " + typeof(snapshot.downloadURL));
	  	snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    	//console.log("File available at", downloadURL);

			submitOrder(downloadURL);
	    });
	};

	for(let i=0; i<props.checkoutList.length; i++){
		if(parseFloat(props.checkoutList[i].quantity)>parseFloat(props.checkoutList[i].data.stock)){

			Alert.alert(
				'Stock Is Limited!',
				'There is only ' + props.checkoutList[i].data.stock + ' ' + props.checkoutList[i].data.title + ' left in stock.',
				[
					{text: 'Ok', style: 'cancel'},
					{
						text: 'Set it to ' + props.checkoutList[i].data.stock,
						style: 'destructive',
						onPress: () => {
							let checkoutList = props.checkoutList.slice();
							checkoutList[i].quantity = props.checkoutList[i].data.stock;
							props.setCheckoutList(checkoutList);
						}
					}
				],
				{ cancelable: true }
			);
			break;
		}
	}

	console.log(props.checkoutList);
	const submitOrder = imageUrl => {
		let submittable = {};
		for(let i=0; i<props.checkoutList.length; i++){
			submittable[props.checkoutList[i].key] = {
				quantity: props.checkoutList[i].quantity,
				requirements: {}
			}
			for(let j=0; j<props.checkoutList[i].requirements.length; j++){
				submittable[props.checkoutList[i].key]["requirements"][props.checkoutList[i].requirements[j].tag] = props.checkoutList[i].requirements[j].slot;
			}
		}

		let yes = imageUrl? imageUrl : "";
		let message = "";
		for(let i=0; i<props.checkoutList.length; i++){

			message += "Product: " + props.checkoutList[i].data.title + '\n';
			message += "Quantity: " + props.checkoutList[i].quantity + '\n';
			message += "Total: " + calculateTotalForThisProduct(props.checkoutList[i]) + " DA" + "\n";


			if(props.checkoutList[i].requirements.length!==0)
				message += '\n';

			for(let j=0; j<props.checkoutList[i].requirements.length; j++){
				message += props.checkoutList[i].requirements[j].title + ": " + props.checkoutList[i].requirements[j].slot + '\n';
			}

		}

		let orders_counted = (orders_count() + 1).toString();

		message = message.substring(0, message.length-1);

		let ref = firebase.database().ref('/users/' + props.uid + "/orders");
		ref.push({
				state: "pending",
				message: message,
				picture: yes,
 				date: moment().format('YYYYMMDDhhmmssa')
			})
			.then(function(snapshot) {
				//console.log('Snapshot', snapshot);
				let ref2 = firebase.database().ref('/userList/' + props.uid);
				ref2.set({
					n: moment().format('YYYYMMDDhhmmssa'),
					o: orders_counted,
					f: props.userInfo.first_name + " " + props.userInfo.last_name
				})
				.then(function(snapshot) {
					//console.log('Snapshot', snapshot);
					setTitle("Order Confirmed");
					if(props.sender==="Cart")
						cleanCart();
					if(imageUri)
						setImageUri();
				});
		});
	};

	const orders_count = () => {

		let counter = 0;
		if(props.userInfo.orders){
			let vals = Object.values(props.userInfo.orders);
			let index = -1;
			for(var i in props.userInfo.orders){
				index += 1;
				if(vals[index].state==="pending")
					counter += 1;
			}
			return counter;
		}
		return 0;
	};

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

    const getOrders = () => {
        let cake = [];

        if(props.userInfo){
            if(props.userInfo.orders){
                let orders = Object.values(props.userInfo.orders);
                for(let i=0; i<orders.length; i++){
                    cake.push({key: i.toString(), order:orders[i]});
                }
            }
        }

        return cake;
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
				   onClick={next} />
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
				   onClick={next} />
			   </>
		   );
	   } else if(title==="Submit Picture"){
		   if(selected.type==="image-submit"){
			   if(imageUri){
				   return(
					   <View style={styles.regularPage}>

						   	<View style={styles.regularPage}>

								<Text style={{ fontSize:20 }}>Image Selected!</Text>
								<MaterialCommunityIcons name="check" color={"green"} size={60} />

			 					<OkayButton
									style={{ marginTop:10 }}
			 						textStyle={{ fontSize: 16 }}
			 						onClick={() => {setImageUri(); }}
			 						text={"Select Another Picture"} />

						   	</View>

						  <CheckoutBar
							  text={"Submit"}
							  calculateTotal={calculateTotal}
							  onClick={next} />

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
							  onClick={next} />
					   </View>
				   );
			   }
		   }
	   } else if(title==="Submitting Picture..."){
	   		return(
				<View style={styles.regularPage}>
					<Text style={{ fontSize:17, marginBottom:20 }}>Do not exit until submission finishes!</Text>
					<ActivityIndicator size={50}/>
				</View>
			);
		} else if(title==="Order Confirmed"){
 			return(
 				<View style={{flex:1, justifyContent:"center", alignItems:"center", width:"100%", }}>


					<Text style={{ fontSize:20, marginBottom: 10 }}>Order Submitted!</Text>
					<Text style={{ fontSize:14, marginHorizontal:30, textAlign:"center" }}>We will notify you as soon as we process your order!</Text>
					<MaterialCommunityIcons name="check" color={"green"} size={60} />
					<Text style={{ fontSize:13, color:"green", marginBottom: 30 }}>Average Process Time: 24 Hours</Text>

 					<OkayButton
						style={{ minWidth: 220 }}
 						textStyle={{ fontSize: 16 }}
 						onClick={() => { setTitle("My Orders");  }}
 						text={"Go to Orders List"} />

 					<OkayButton
						style={{ minWidth: "75%", marginTop: 10 }}
 						textStyle={{ fontSize: 16 }}
 						onClick={() => { if(props.productPreviewed && props.sender==="Cart") props.setProductPreviewed(); exit(); }}
 						text={"Back to " + props.sender} />

 					<OkayButton
						style={{ minWidth: 220, marginTop: 10 }}
 						textStyle={{ fontSize: 16 }}
 						onClick={() => {if(props.productPreviewed) props.setProductPreviewed(); exit(); }}
 						text={"Back to Main Menu"} />
 				</View>
 			);
 		}
	};

	if(title==="My Orders"){
		if(props.sender==="Cart")
			cleanCart();
		if(imageUri)
			setImageUri();
		exit();

		props.setProductPreviewed();
		props.setRemoteOrdersOpen("ah");
		props.navigation.navigate("Profile");
	}

	return(
		<View style={{flex:1, alignItems:"center", width:"100%"}}>
			<Header style={styles.customHeader}>
				<TouchableOpacity
					onPress={goBack}>
					<MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
				</TouchableOpacity>
			</Header>

			<Text style={styles.cuteTitle}>{title}</Text>

			{display()}
		</View>
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
		height: 70,
	},
	cuteTitle: {
		width:"100%",
		fontSize:21,
		paddingHorizontal: 20,
		paddingTop:10,
		paddingBottom: 11,
		backgroundColor:Colors.Primary,
		color:"white",
	},
});

export default CheckOut;
