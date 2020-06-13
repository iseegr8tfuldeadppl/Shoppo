import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import Constants from 'expo-constants';


const Header = props => {
	return (
		<View style={styles.header}>
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
		height: 90,
		backgroundColor: Colors.Accent,
	},
});

export default Header;