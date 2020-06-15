import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image, Button  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Colors from '../constants/Colors';

const ProductPreviewModal = props => {

	const [quantity, setQuantity] = useState("1");
	let page;

	const IsOriginallyCurrency = () => {
		return props.productPreviewed.data.originaltype==="currency" || props.productPreviewed.data.originaltype==="account-charging";
	};
	
	const quantityUpdater = enteredText => {
		if(!IsOriginallyCurrency()){
			enteredText = enteredText.replace(",", "");
			enteredText = enteredText.replace(".", "");
			enteredText = enteredText.replace("-", "");
			enteredText = enteredText.replace(" ", "");
		}
		setQuantity(enteredText);
	};

	const addToCart = () => {
		props.productPreviewed.quantity = quantity;
		props.addToCart(props.productPreviewed);
	};

	const buyNow = () => {
		props.productPreviewed.quantity = quantity;
		props.buyNow(props.productPreviewed);
	};

	if(IsOriginallyCurrency()){
		
		page = <View>
				<Text>Please enter how much {props.productPreviewed.data.title} you want</Text>
				<TextInput
					maxLength={30}
					blurOnSubmit 
					autoCapitalize="none" 
					autoCorrect={false}  
					keyboardType="number-pad" 
					style={styles.input}
					placeholder="How Much Euro You Want"
					onChangeText={quantityUpdater}
					value={quantity} />
			   </View>;
	} else {
		page = <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', marginBottom:11,}}>
					<TouchableOpacity
						onPress={() => { if(isNaN(parseInt(quantity))) setQuantity("1"); else if(quantity!=="1") setQuantity((parseInt(quantity)-1).toString());}}
						style={{
							width:35, 
							height:35, 
							borderRadius:50, 
							backgroundColor:Colors.Primary, 
							alignItems:'center', 
							justifyContent:'center',}}>
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
						onPress={() => { if(isNaN(parseInt(quantity))) setQuantity("1"); else setQuantity((parseInt(quantity)+1).toString());}}
						style={{
							width:35, 
							height:35, 
							borderRadius:50, 
							backgroundColor:Colors.Primary, 
							alignItems:'center', 
							justifyContent:'center',}}>
						<MaterialCommunityIcons name="plus" color={"white"} size={23} />
					</TouchableOpacity>
				</View>;
			
	}


	return(

		<Modal visible={props.productPreviewed!==undefined} animationType="slide">
		
			<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
				<View style={{flex:1, alignItems:'center',}}>

					<Header
							style={{ paddingTop:18, paddingBottom:12,  }}>
						<TouchableOpacity
							onPress={() => {props.setProductPreviewed();} }>
							<MaterialCommunityIcons name="arrow-left" color={"white"} size={32} />
						</TouchableOpacity>
					</Header>

					<Image 
						style={{width:"100%", height:250, }}
						source={{
							uri:props.productPreviewed.data.banner, }} />
					<View style={{width:"100%", flex:1}}>
						<View style={{justifyContent:"flex-start", maxWidth:"100%", marginHorizontal:10, flexDirection:'row'}}>
							<Text numberOfLines={3} ellipsizeMode='tail' style={{fontSize:23, flexWrap: 'wrap', maxWidth:"100%", paddingHorizontal:5, marginTop:-20, backgroundColor:Colors.lowPrimary, color:"white",  }}>{props.productPreviewed.data.title}</Text>
						</View>

						<View style={{marginHorizontal:20, marginTop:10}}>
							<Text style={{fontSize:13, }}>{props.productPreviewed.data.description}</Text>
						</View>
					</View>
					
					{page}

					<View style={styles.button}>
						<Button title="Buy Now" color={Colors.Accent} onPress={buyNow} />
					</View>

					<View style={{...styles.button, ...{marginBottom:20}}}>
						<Button title="Add To Cart" color={Colors.Accent} onPress={addToCart} />
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
	input : {
		height: 45,
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:"30%",
		textAlign:'center',
		borderWidth: 1,
		marginVertical: 10,
	},
	quantityInput : {
		borderColor:Colors.Primary,
		fontSize:16,
		textAlign:'center',
		paddingHorizontal: 10,
	},
});

export default ProductPreviewModal;