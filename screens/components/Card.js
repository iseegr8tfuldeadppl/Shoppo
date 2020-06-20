import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';


const Card = props => {
	return (
		<TouchableOpacity {...props} activeOpacity={.7} style={{...styles.card, ...props.style}} >{props.children}</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2},
		shadowOpacity: 0.26,
		shadowRadius: 0,
		alignItems:'center',
		elevation: 5,
		width: '100%',
		borderRadius: 10,
	},
});

export default Card;
