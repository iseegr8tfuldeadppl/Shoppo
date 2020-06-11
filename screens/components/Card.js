import React from 'react';
import {View, StyleSheet} from 'react-native';

const StartGameScreen = props => {
	return (
		<View style={{...styles.card, ...props.style}} >{props.children}</View>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2},
		shadowOpacity: 0.26,
		shadowRadius: 0,
		backgroundColor: 'white',
		elevation: 5,
		padding: 15,
		width: '100%',
		borderRadius: 10,
	},
});

export default StartGameScreen;