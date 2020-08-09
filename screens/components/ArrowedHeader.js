import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';


const ArrowedHeader = props => {

    return(
        <Header style={{...styles.header, ...props.style}}>
            <TouchableOpacity
                onPress={props.backToRoot}>
                <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
            </TouchableOpacity>
            <View style={styles.headertitleholder}><Text style={styles.headertitle}>{props.title}</Text></View>
        </Header>
    );
};

const styles = StyleSheet.create({
    headertitleholder: {
        justifyContent:"center",
        alignItems:"flex-start",
        flex: 1
    },
    headertitle: {
        textAlign:"center",
        fontSize: 23,
        color:"white",
        marginHorizontal: 11,
    },
	header:{
		height: 60,
	},
});

export default ArrowedHeader;
