import React, {useState} from 'react';
import { TextInput, Button, Text, View, StyleSheet, Alert, Image, CheckBox, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';

const CanClientChooseQuantity = props => {

	const [selection, setSelection] = useState(true);
	
	const setChecked = () => {
		let temp = {
			key: props.selected.key,
			image: props.selected.image,
			title: props.selected.title, 
			background: props.selected.background,
			textColor: props.selected.textColor,
			originaltype: props.selected.originaltype,
			type: props.selected.originaltype,
			checked: true,
		};
		props.setSelected(temp);
	};
	
	const makeStatic = () => {
		let temp = {
			key: props.selected.key,
			image:props.selected.image,
			title:props.selected.title, 
			background:props.selected.background,
			textColor:props.selected.textColor,
			originaltype:props.selected.originaltype,
			type:"item",
			checked:true,
		};

		props.setSelected(temp);
	};


	const confimClicked = () => {
		if(selection)  
			setChecked();
		else 
			makeStatic();
	};
	
	let question = "Choose";
	return(
		<View style={styles.screen}>
			<Image 
				style={{width:70, height:70, borderRadius:10, marginBottom:10,}}
				source={{ uri:props.selected.image }} />
			<Text style={{fontSize:23, textAlign:"center", marginBottom:50}}>{props.selected.title}</Text>
			<View style={{flexDirection:'row', }}>
				<CheckBox
					value={selection}
					onValueChange={setSelection}
					style={{alignSelf: "center"}}
					/>
				<TouchableOpacity onPress={() => {setSelection(!selection);}}><Text style={{fontSize:18, textAlign:"center"}}>Let the buyer choose quantity.</Text></TouchableOpacity>
			</View>
			<View style={{flexDirection:'row', }}>
				<CheckBox
					value={!selection}
					onValueChange={() => {setSelection(false);}}
					style={{alignSelf: "center"}}
				/>
				<TouchableOpacity onPress={() => {setSelection(!selection);}}><Text style={{fontSize:18, textAlign:"center"}}>I want to set a fixed quantity.</Text></TouchableOpacity>
			</View>
			<View style={styles.button}>
				<Button title="Continue" color="red" onPress={confimClicked} />
			</View>
			<View style={styles.button}>
				<Button title="Go Back" onPress={() => { props.unsetChecked(); props.setSelected(); }} />
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

export default CanClientChooseQuantity ;