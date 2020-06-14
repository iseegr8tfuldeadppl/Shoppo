import React from 'react';
import { TextInput, Button, Text, View, StyleSheet, Alert, Image} from 'react-native';
import Colors from '../../../constants/Colors';


const WhatIsPriceAndDescriptionAndIcon = props => {

	const submit = () => {
		if(props.name.length===0 || (props.name2.length===0 && props.selected.type!==props.selected.originaltype)  ){
			Alert.alert(
				'Missing Information', 
				'Please fill the boxes.', 
				[{text: 'Ok', style: 'cancel'}],
				{ cancelable: true }
			);
			return;
		}

  		props.onAdd({title:props.selected.title, cost:props.name, type:props.selected.type, description: props.name3, banner: props.name4});
  	
		props.setName('');
		props.onCancel();
	};

	let question;
	let amountof;
	if(props.selected.type==="currency" || props.selected.type==="account-charging" ){
		question = "Cost of 1 "  + props.selected.title;
	} else {
		question = "Price";

		amountof = <View style={{flexDirection:'row',alignItems:'center'}}>
						<TextInput
							maxLength={30}
							blurOnSubmit 
							autoCapitalize="none" 
							autoCorrect={false}  
							keyboardType="number-pad" 
							style={styles.input}
							placeholder="Amount of"
							onChangeText={props.NameUpdater2}
							value={props.name2} />
						<Text style={{fontSize:20, marginStart:10,}}>{props.selected.title}</Text>
					</View>;
	}
	return(
		<View style={styles.screen}>
			<Image 
				style={{width:70, height:70, borderRadius:10, marginBottom:10,}}
				source={{ uri:props.selected.image }} />

			{amountof}

			<View style={{flexDirection:'row',alignItems:'center'}}>
				<TextInput
					maxLength={30}
					blurOnSubmit 
					autoCapitalize="none" 
					autoCorrect={false}  
					keyboardType="number-pad" 
					style={styles.input}
					placeholder={question}
					onChangeText={props.NameUpdater}
					value={props.name} />
				<Text style={{fontSize:20, marginStart:10,}}>Dinar</Text>
			</View>
			
				<TextInput
					blurOnSubmit={true}
					style={styles.linkinput}
					placeholder="Link To Banner (Optional)"
					onChangeText={props.NameUpdater4}
					value={props.name4} />

				<TextInput
					numberOfLines={3}
					blurOnSubmit={false}
					multiline={true}
					style={styles.descriptionInput}
					placeholder="Write a short description (Optional)"
					onChangeText={props.NameUpdater3}
					value={props.name3} />
					


			<View style={styles.button}>
				<Button title="Submit" color="red" onPress={submit} />
			</View>
			<View style={styles.button}>
				<Button title="Go Back" onPress={props.unsetChecked} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input : {
		maxWidth:"70%",
		height: 50,
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:"3%",
		textAlign:'center',
		borderWidth: 1,
		marginVertical: 10,
	},
	linkinput : {
		width:"95%",
		height: 50,
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
		textAlign:'center',
		borderWidth: 1,
		marginVertical: 10,
	},
	descriptionInput : {
		width:"95%",
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
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

export default WhatIsPriceAndDescriptionAndIcon ;