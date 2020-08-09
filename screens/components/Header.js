import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';


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
		paddingHorizontal:15,
		width: '100%',
		backgroundColor: Colors.Accent,
	},
});

export default Header;
