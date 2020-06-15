import React, { useState } from 'react';
import { Alert, Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import CanClientChooseQuantity from './CanClientChooseQuantity';
import WhatIsPriceAndDescriptionAndIcon from './WhatIsPriceAndDescriptionAndIcon';
import AccordionView from './AccordionView';
import Colors from '../../../constants/Colors';


const Product = props => {
	const [name, setName] = useState('');
	const [name2, setName2] = useState('');
	const [name3, setName3] = useState('');
	const [name4, setName4] = useState('');
	const [name5, setName5] = useState('');
	const [selected, setSelected] = useState();
  
	function NameUpdater(enteredText) {
  		setName(enteredText);
	}
	function NameUpdater2(enteredText) {
  		setName2(enteredText);
	}
	function NameUpdater3(enteredText) {
  		setName3(enteredText);
	}
	function NameUpdater4(enteredText) {
  		setName4(enteredText);
	}
	function NameUpdater5(enteredText) {
  		setName5(enteredText);
	}
	
	const submitProduct = () => {
		if(name.length===0){
			Alert.alert(
				'Missing Information', 
				'Please write The Cost', 
				[{text: 'Ok', style: 'cancel'}],
				{ cancelable: true }
			);
			return;
		}

  		props.onAdd({title:selected.title, cost:name, type:"currency"});
  	
		setName('');
		props.onCancel();
	};
	
	const unsetChecked = () => {
		let temp = {
			key: selected.key,
			image:selected.image,
			title:selected.title, 
			background:selected.background,
			textColor:selected.textColor,
			originaltype:selected.originaltype,
			type:selected.originaltype,
			checked:false,
		};
		setSelected(temp);
	};

	if(selected){
		// Product Details Setup
		switch(selected.type){
			case "currency":
			case "account-charging":
				if(!selected.checked){
					return(
						<CanClientChooseQuantity 
							selected={selected}
							unsetChecked={unsetChecked}
							setSelected={setSelected}/>
					);
				} else {
					return(
						<WhatIsPriceAndDescriptionAndIcon 
							unsetChecked={unsetChecked} 
							setName={setName} 
							setName2={setName2} 
							NameUpdater={NameUpdater} 
							NameUpdater2={NameUpdater2} 
							NameUpdater3={NameUpdater3} 
							NameUpdater4={NameUpdater4} 
							NameUpdater5={NameUpdater5} 
							name={name} 
							name2={name2} 
							name3={name3} 
							name4={name4} 
							name5={name5} 
							setSelected={setSelected}
							selected={selected} 
							onAdd={props.onAdd} 
							onCancel={props.onCancel} 
							data={props.data} />
					);
				}
				break;
			case "item":
				return(
					<WhatIsPriceAndDescriptionAndIcon 
						unsetChecked={unsetChecked} 
						setName={setName} 
						setName2={setName2} 
						NameUpdater={NameUpdater} 
						NameUpdater2={NameUpdater2} 
						NameUpdater3={NameUpdater3} 
						NameUpdater4={NameUpdater4} 
						NameUpdater5={NameUpdater5} 
						name={name} 
						name2={name2} 
						name3={name3} 
						name4={name4} 
							name5={name5} 
						setSelected={setSelected}
						selected={selected} 
						onAdd={props.onAdd} 
						onCancel={props.onCancel} 
						data={props.data} />
				);
				break;
		}

	} else {

		// Product List
		return(
			<ScrollView contentContainerStyle={{justifyContent:'center'}}>
				<Text style={{fontSize:26, textAlign:'center', marginBottom:15, marginTop:30}}>New Product For {props.data.category}</Text>
				<Text style={{fontSize:14, textAlign:'center', marginBottom:25}}>First, Select A Product!</Text>
				<AccordionView checkThisOut={(itsinfo) => {setSelected(itsinfo);}} />
				<View style={{alignItems:"center",}}>
					<View style={styles.button}>
						<Button title="Cancel" color={Colors.Accent} onPress={() => { props.onCancel();}} />
					</View>
				</View>
			</ScrollView>
		);
	}
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

export default Product;