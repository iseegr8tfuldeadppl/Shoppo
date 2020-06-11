import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { Button} from 'react-native-elements';
import Colors from '../constants/colors';


const AddNewItemModal = props => {
  const [name, setName] = useState('');
  
  function NameUpdater(enteredText) {
  	  setName(enteredText);
  }

  const add = () => {
	if(name.length===0){
		Alert.alert(
			'Missing Information', 
			'Please write a product name', 
			[{text: 'Ok', style: 'cancel'}],
			{ cancelable: true }
		);
		return;
	}

  	props.onAdd(name, props.data);
  	
	props.onCancel();
  };

  const cancel = () => {
  	  props.onCancel();
	  setName('');
  };

	console.log(props.data);
	let title, hint = "Category Name";
	if(props.data){
		hint = "Product Name"
		title = <Text style={{fontSize:20, textAlign:'center', marginBottom:15}}>New Product For {props.data.category}</Text>
	}

	return (
	<Modal visible={props.doIShowUp} animationType="slide">
		<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
			<View style={styles.screen}>
				{title}
				<TextInput
					style={styles.input}
					placeholder={hint}
					onChangeText={NameUpdater}
					value={name} />
				<View style={styles.button}>
					<Button title="Confirm" onPress={add} buttonStyle={{backgroundColor:"red"}}/>
				</View>
				<View style={styles.button}>
					<Button title="Cancel" onPress={cancel} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	</Modal>
	);
};

const styles = StyleSheet.create({
	input : {
		height: 50,
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:"30%",
		textAlign:'center',
		borderWidth: 1,
		marginVertical: 10,
	},
	screen:{
		justifyContent:'center',
		alignItems:'center',
		flex:1,
	},
	button:{
		width:"70%",
		marginTop:15,
	}
});

export default AddNewItemModal;