import React from 'react';
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import Colors from '../constants/Colors';

const OkayButton = props => {
	return (
		<TouchableOpacity onPress={props.onClick} style={{...styles.holder, ...props.style}}>
			<Text style={{...styles.text, ...props.textStyle}}>{props.text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	holder: {
		backgroundColor: Colors.Accent,
		padding:10,
		borderRadius:5,
		minWidth: 80,
		justifyContent:"center",
		alignItems:"center",
	},
	text: {
		textAlign:"center",
		color:"white",
		paddingHorizontal:10,
		paddingVertical:1,
	},
});

export default OkayButton;
