import React, { useState } from 'react';
import { Alert, TextInput, Text, View, Button, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import OkayButton from '../../OkayButton';
import {
	missingInformationString,
	pleaseWriteProductString,
	okString,
	newCategoryString,
	priorityOptionalString,
	categoryNameString,
	submitString,
	cancelString
} from '../../../constants/strings';



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
				missingInformationString[props.language],
				pleaseWriteProductString[props.language],
				[{text: okString[props.language], style: 'cancel'}],
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
			<Text style={styles.title}>{newCategoryString[props.language]}</Text>
			<TextInput
				style={styles.input}
				placeholder={categoryNameString[props.language]}
				onChangeText={NameUpdater}
				value={name} />
			<TextInput
				maxLength={15}
				style={styles.input}
				blurOnSubmit
				placeholder={priorityOptionalString[props.language]}
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType="number-pad"
				onChangeText={updatePriority}
				value={priority} />
			<OkayButton
				style={styles.submit}
				textStyle={styles.text}
				onClick={addCategory}
				text={submitString[props.language]} />
			<OkayButton
					style={styles.cancel}
					textStyle={styles.text}
					onClick={() => {
						 setName('');
						 props.onCancel();
					}}
					text={cancelString[props.language]} />
		</View>
	);

};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
	},
	submit: {
		marginTop: 20,
		width:"80%",
		marginBottom: 10,
		marginHorizontal: 20,
	},
	cancel: {
		width:"80%",
		marginHorizontal: 20,
		marginBottom: 10,
	},
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
