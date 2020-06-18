import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectAllBar from '../components/SelectAllBar';


const SideItem = props => {

	return(
		<TouchableOpacity
            activeOpacity={0.80}
            style={styles.holder}
            onPress={() => {props.setProductPreviewed(props.item);}}>
            <Image
                style={styles.image}
                source={{ uri:props.item.data.banner }} />
			<Text
				numberOfLines={1}
				ellipsizeMode='tail'
				style={styles.price}>
				{props.item.data.cost} DA</Text>
			<Text
				numberOfLines={1}
				ellipsizeMode='tail'
				style={styles.title}>
				{props.item.data.title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
    holder: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 0,
        elevation: 7,

        marginHorizontal: 8,
        marginVertical:7,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
        alignItems:"center",
    },
    price: {
        fontWeight:"bold",
        color:"white",
        paddingStart:10,
        marginStart: 10,
        fontSize: 18,
    },
    price: {
        paddingTop: 2,
        fontWeight: "bold",
        flexWrap: 'wrap',
        fontSize: 17,
        color: '#FFFFFF'
    },
    title: {
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 5,
        flexWrap: 'wrap',
        fontSize: 13,
        color: '#FFFFFF',
    },
    image: {
        width: "100%",
        height: 90,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default SideItem;
