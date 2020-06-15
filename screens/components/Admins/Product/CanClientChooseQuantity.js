import React, {useState} from 'react';
import { TextInput, Button, Text, View, StyleSheet, Alert, Image, CheckBox, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../Header';

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
			<View style={{...styles.screen, ...{justifyContent:"center", alignItems:"center", }}}>
				<Image 
					style={{width:70, height:70, borderRadius:10, marginBottom:10,}}
					source={{ uri:props.selected.image }} />
				<Text style={{color:Colors.Accent,fontSize:23, textAlign:"center", marginBottom:50}}>{props.selected.title}</Text>
				<View style={{flexDirection:'row', }}>
					<CheckBox
						value={selection}
						onValueChange={setSelection}
						style={{alignSelf: "center"}}
						/>
					<TouchableOpacity onPress={() => {setSelection(!selection);}}><Text style={{ color:Colors.CheckBoxTextGreen, fontSize:18, textAlign:"center"}}>Let the buyer choose quantity.</Text></TouchableOpacity>
				</View>
				<View style={{flexDirection:'row', }}>
					<CheckBox
						value={!selection}
						onValueChange={() => {setSelection(false);}}
						style={{alignSelf: "center"}}
					/>
					<TouchableOpacity onPress={() => {setSelection(!selection);}}><Text style={{color:Colors.CheckBoxTextGreen,fontSize:18, textAlign:"center"}}>I want to set a fixed quantity.</Text></TouchableOpacity>
				</View>
			</View>

			<Header
				style={{ paddingTop:0, paddingBottom:0, paddingHorizontal:0, backgroundColor:null, position:'absolute', justifyContent:"space-between",  }}>
				
				<TouchableOpacity
					style={{backgroundColor:Colors.Primary, paddingEnd: 20, paddingStart:8, borderBottomRightRadius:20, paddingVertical:10 , flexDirection:"row", justifyContent:"center", alignItems:"center", }}
					onPress={() => {props.unsetChecked(); props.setSelected();}}>
					<MaterialCommunityIcons name="arrow-left" color={"white"} size={32} />
					<Text style={{color:"white", fontSize:20, textAlign:"center", paddingStart:10}}>Back</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{backgroundColor:Colors.Primary, paddingEnd: 8, paddingStart:20, borderBottomLeftRadius:20, paddingVertical:10 , flexDirection:"row", justifyContent:"center", alignItems:"center", }}
					onPress={confimClicked}>
					<Text style={{color:"white", fontSize:20, textAlign:"center", paddingEnd:10}}>Next</Text>
					<MaterialCommunityIcons name="arrow-right" color={"white"} size={32} />
				</TouchableOpacity>
			</Header>

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
		flex:1,
	},
	button:{
		width:"80%",
		marginTop:15,
	}
});

export default CanClientChooseQuantity ;