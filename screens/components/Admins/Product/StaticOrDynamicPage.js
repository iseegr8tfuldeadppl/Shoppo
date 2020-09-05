import React, {useState} from 'react';
import { TextInput, Button, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { CheckBox } from '@react-native-community/checkbox';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../Header';
import {
	letBuyerChooseString,
	iChooseQuantityString
} from '../../../constants/strings';



const StaticOrDynamicPage = props => {

	const [selection, setSelection] = useState(props.selected? true : props.selected.type==="currency");

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
			return;
		}

		let ah = props.selected;
		ah.type = ah.originaltype;
		props.setSelected(ah);
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
			return;
		}

		let ah = props.selected;
		ah.type = "item";
		props.setSelected(ah);
	};


	const confimClicked = () => {
		if(selection){
			makeStatic();
			return;
		}
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
							if(yes){
								let ah = props.selected;
								ah.type = ah.originaltype;
								props.setSelected(ah);
							}
							else{
								let ah = props.selected;
								ah.type = "item";
								props.setSelected(ah);
							}
						}
					}}
					style={{alignSelf: "center"}}
					/>
				<TouchableOpacity onPress={() => {setSelection(!selection); confimClicked();}}><Text style={{ color:Colors.CheckBoxTextGreen, fontSize:18, textAlign:"center"}}>{letBuyerChooseString[props.language]}</Text></TouchableOpacity>
			</View>
			<View style={{flexDirection:'row', }}>
				<CheckBox
					value={!selection}
					onValueChange={() => {
						setSelection(false);
						if(!props.selected){
							let ah = props.selected;
							ah.type = "item";
							props.setSelected(ah);
						}
					}}
					style={{alignSelf: "center"}}
				/>
				<TouchableOpacity onPress={() => {setSelection(!selection);  confimClicked();}}><Text style={{color:Colors.CheckBoxTextGreen,fontSize:18, textAlign:"center"}}>{iChooseQuantityString[props.language]}</Text></TouchableOpacity>
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
