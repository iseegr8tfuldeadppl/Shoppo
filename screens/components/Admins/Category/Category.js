import React, { useState } from 'react';
import { Alert, TextInput, Text, View, Button, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import OkayButton from '../../OkayButton';


const Category = props => {
	const [name, setName] = useState('');
	const [priority, setPriority] = useState('');

	function NameUpdater(enteredText) {
  		setName(enteredText);
	}
	function updatePriority(enteredText) {
		setPriority(cleanPriority(enteredText));
	}

	const cleanPriority = enteredText => {
		enteredText = enteredText.replace(",", "");
		enteredText = enteredText.replace(".", "");
		enteredText = enteredText.replace(",", ".");
		enteredText = enteredText.replace("-", "");
		enteredText = enteredText.replace(/\s/g, "");
		return enteredText;
	};

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

  		props.onAdd(name, priority);

		setName('');
		props.onCancel();
	};

	return(
		<View style={styles.screen}>
			<Text style={styles.title}>New Category</Text>
			<TextInput
				style={styles.input}
				placeholder="Category Name"
				onChangeText={NameUpdater}
				value={name} />
			<TextInput
				maxLength={15}
				style={styles.input}
				blurOnSubmit
				placeholder={"Priority (Optional)"}
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType="number-pad"
				onChangeText={updatePriority}
				value={priority} />
			<OkayButton
				style={{
					marginTop: 20,
					width:"80%",
					marginBottom: 10,
					marginHorizontal: 20,
				}}
				textStyle={{
					fontSize: 16,
				}}
				onClick={addCategory}
				text={"Submit"} />
			<OkayButton
					style={{
						width:"80%",
						marginHorizontal: 20,
						marginBottom: 10,
					}}
					textStyle={{
						fontSize: 16,
					}}
					onClick={() => {
						 setName(''); props.onCancel();
					}}
					text={"Cancel"} />
		</View>
	);

};

const styles = StyleSheet.create({
    title: {
        fontWeight:"bold",
        fontSize: 23,
        marginBottom: 45,
    },
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
