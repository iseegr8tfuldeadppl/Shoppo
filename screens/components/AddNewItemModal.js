import React, { useState } from 'react';
import { TextInput, Button, ScrollView, Text, View, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Alert, Image} from 'react-native';
import Colors from '../constants/colors';
import AccordionView from './AccordionView';
import PossibleCategories from '../constants/PossibleCategories';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddNewItemModal = props => {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState();
  
  function NameUpdater(enteredText) {
  	  setName(enteredText);
  }

	/*
	<Text style={{fontSize:20, textAlign:'center', marginBottom:15}}>New Product For {props.data.category}</Text>
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
	*/
	
	let menu;
	if(props.data){
		if(selected){
			switch(selected.type){
				case "currency":
					const submitCurrency = () => {
						if(name.length===0){
							Alert.alert(
								'Missing Information', 
								'Please write The Cost', 
								[{text: 'Ok', style: 'cancel'}],
								{ cancelable: true }
							);
							return;
						}

  						props.onAdd({title:selected.title, cost:name, type:"currency"}, props.data);
  	
						setName('');
						props.onCancel();
					};

					let question = "Cost of 1 "  + selected.title;
					menu = 
						<View style={styles.screen}>
							<Image 
								style={{width:70, height:70, borderRadius:10, marginBottom:10,}}
								source={{ uri:selected.image }} />
							<Text style={{fontSize:23, textAlign:"center", marginBottom:50}}>{selected.title}</Text>
							<View style={{flexDirection:'row',alignItems:'center'}}>
								<TextInput
									maxLength={30}
									blurOnSubmit 
									autoCapitalize="none" 
									autoCorrect={false}  
									keyboardType="number-pad" 
									style={styles.input}
									placeholder={question}
									onChangeText={NameUpdater}
									value={name} />
								<Text style={{fontSize:20, marginStart:10,}}>Dinar</Text>
							</View>
							<View style={styles.button}>
								<Button title="Submit" color="red" onPress={submitCurrency} />
							</View>
							<View style={styles.button}>
								<Button title="Go Back" onPress={() => {setSelected();}} />
							</View>
						</View>
					break;
				case "account-charging":
					menu = <View style={styles.screen}>
								<Text>Account Charging</Text>
								<View style={styles.button}>
									<Button title="Go Back" color="red" onPress={() => {setSelected();}} />
								</View>
							</View>
					break;
				case "item":
					menu = <View style={styles.screen}>
								<Text>Item</Text>
								<View style={styles.button}>
									<Button title="Go Back" color="red" onPress={() => {setSelected();}} />
								</View>
							</View>
					break;
			}

		} else {
			menu =
				<ScrollView contentContainerStyle={{justifyContent:'center'}}>
					<Text style={{fontSize:26, textAlign:'center', marginBottom:15, marginTop:30}}>New Product For {props.data.category}</Text>
					<Text style={{fontSize:14, textAlign:'center', marginBottom:25}}>First, Select A Product!</Text>
					<AccordionView checkThisOut={(itsinfo) => {setSelected(itsinfo);}} />
					<View style={{alignItems:"center",}}>
						<View style={styles.button}>
							<Button title="Cancel" color="red" onPress={() => { props.onCancel();}} />
						</View>
					</View>
				</ScrollView>;
		}

	} else {
		
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

		menu =
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
			</View>;
		
	}

	return (
		<Modal visible={props.doIShowUp} animationType="slide">
			<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
				{menu}
			</TouchableWithoutFeedback>
		</Modal>
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

export default AddNewItemModal;