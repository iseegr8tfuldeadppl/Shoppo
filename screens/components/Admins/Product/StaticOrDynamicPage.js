import React, {useState} from 'react';
import { TextInput, Button, Text, View, StyleSheet, Alert, CheckBox, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../Header';

const StaticOrDynamicPage = props => {

	const [selection, setSelection] = useState(props.selected? true : props.type==="currency");

	const setChecked = () => {
		if(props.selected){
			if(props.selected.originaltype!==props.selected.originaltype){
				let temp = {
					key: props.selected.key,
					image: props.selected.image,
					title: props.selected.title,
					background: props.selected.background,
					textColor: props.selected.textColor,
					originaltype: props.selected.originaltype,
					type: props.selected.originaltype,
					requirements:props.selected.requirements,
					original_requirements:props.selected.original_requirements,
					checked: true,
				};
				props.setSelected(temp);
			}
		} else {
			props.setType(props.original_type);
		}
	};

	const makeStatic = () => {
		if(props.selected){
			if(props.selected.type!=="item"){
				let temp = {
					key: props.selected.key,
					image:props.selected.image,
					title:props.selected.title,
					background:props.selected.background,
					textColor:props.selected.textColor,
					originaltype:props.selected.originaltype,
					requirements:props.selected.requirements,
					original_requirements:props.selected.original_requirements,
					type:"item",
					checked:true,
				};

				props.setSelected(temp);
			}
		} else {
			props.setType("item");
		}
	};


	const confimClicked = () => {
		if(selection)
			makeStatic();
		else
			setChecked();
	};

	return(
		<View style={styles.screen}>
			<View style={{flexDirection:'row', }}>
				<CheckBox
					value={selection}
					onValueChange={(yes) => {
						setSelection(yes);
						if(!props.selected){
							if(yes) props.setType(props.original_type);
							else props.setType("item");
						}
					}}
					style={{alignSelf: "center"}}
					/>
				<TouchableOpacity onPress={() => {setSelection(!selection); confimClicked();}}><Text style={{ color:Colors.CheckBoxTextGreen, fontSize:18, textAlign:"center"}}>Let the buyer choose quantity.</Text></TouchableOpacity>
			</View>
			<View style={{flexDirection:'row', }}>
				<CheckBox
					value={!selection}
					onValueChange={() => {
						setSelection(false);
						if(!props.selected)
							props.setType("item");
					}}
					style={{alignSelf: "center"}}
				/>
				<TouchableOpacity onPress={() => {setSelection(!selection);  confimClicked();}}><Text style={{color:Colors.CheckBoxTextGreen,fontSize:18, textAlign:"center"}}>I want to set a fixed quantity.</Text></TouchableOpacity>
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
		flex:1,
		justifyContent:"center",
		alignItems:"center",
	},
	button:{
		width:"80%",
		marginTop:15,
	}
});

export default StaticOrDynamicPage ;
