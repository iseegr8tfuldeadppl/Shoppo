import React, { useState } from 'react';
import { Alert, TextInput, Text, View, Button, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const Category = props => {
	const [name, setName] = useState('');

	function NameUpdater(enteredText) {
  		setName(enteredText);
	}

	const addCategory = () => {
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

		setName('');
		props.onCancel();
	};

	return(
		<View style={styles.screen}>
			<Text style={{fontSize:20, textAlign:'center', marginBottom:15}}>New Category</Text>
			<TextInput
				style={styles.input}
				placeholder="Category Name"
				onChangeText={NameUpdater}
				value={name} />
			<View style={styles.button}>
				<Button title="Submit" onPress={addCategory} buttonStyle={{backgroundColor:"red"}}/>
			</View>
			<View style={styles.button}>
				<Button title="Cancel" onPress={() => { setName(''); props.onCancel();}} />
			</View>
		</View>
	);

};

const styles = StyleSheet.create({
	input : {
		maxWidth:"70%",
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
		width:"80%",
		marginTop:15,
	}
});


export default Category;
