import React from 'react';
import { TextInput, Button, Text, View, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../Header';


const WhatIsPriceAndDescriptionAndIcon = props => {

	const submit = () => {
		if(props.name.length===0 || (props.selected.originaltype==="item" && props.name5.length===0) || (props.name2.length===0 && props.selected.type!==props.selected.originaltype)  ){
			Alert.alert(
				'Missing Information', 
				'Please fill the boxes.', 
				[{text: 'Ok', style: 'cancel'}],
				{ cancelable: true }
			);
			return;
		}

		if(props.selected.originaltype==="item"){
  			props.onAdd({title:props.name5, cost:props.name, type:props.selected.type, description: props.name3, banner: props.name4, originaltype: props.selected.originaltype});
		} else {
  			props.onAdd({title:props.selected.title, cost:props.name, type:props.selected.type, description: props.name3, banner: props.name4, originaltype: props.selected.originaltype});
		}
		props.setName('');
		props.onCancel();
	};

	let question;
	let amountof;
	if(props.selected.type==="currency" || props.selected.type==="account-charging" ){
		question = "Cost of 1 "  + props.selected.title;
	} else {
		question = "Price";

		amountof = <View style={{flexDirection:'row',alignItems:'center', width:'95%',}}>
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

	let title;
	if(props.selected.originaltype==="item"){
		title = 
				<TextInput
					blurOnSubmit={true}
					style={styles.linkinput}
					placeholder="Title"
					onChangeText={props.NameUpdater5}
					value={props.name5} />;
	}

	return(
		<View style={styles.screen}>
			<View style={{...styles.screen, ...{justifyContent:"center", alignItems:"center", }}}>
				<Image 
					style={{width:70, height:70, borderRadius:10, }}
					source={{ uri:props.selected.image }} />

				{title}

				{amountof}

				<View style={{flexDirection:'row',alignItems:'center', width:'95%',}}>
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
					<Text style={{fontSize:20, marginStart:10, color:Colors.Accent}}>Dinar</Text>
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
					onPress={submit}>
					<Text style={{color:"white", fontSize:20, textAlign:"center", paddingEnd:10}}>Next</Text>
					<MaterialCommunityIcons name="arrow-right" color={"white"} size={32} />
				</TouchableOpacity>
			</Header>

		</View>
	);
}

const styles = StyleSheet.create({
	input : {
		flex:1,
		height: 45,
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:"30%",
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
		flex:1,
	},
	button:{
		width:"80%",
		marginTop:15,
	}
});

export default WhatIsPriceAndDescriptionAndIcon ;