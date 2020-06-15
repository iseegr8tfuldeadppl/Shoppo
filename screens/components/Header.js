import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';


const Header = props => {
	return (
		<View {...props} style={{...styles.header, ...props.style}}>
			{props.children}
		</View>
	);
};

const styles = StyleSheet.create({
	header : {
		flexDirection: 'row',
        alignItems:'center',
		paddingTop:Constants.statusBarHeight,
		paddingHorizontal:15,
		width: '100%',
		backgroundColor: Colors.Accent,
	},
});

export default Header;