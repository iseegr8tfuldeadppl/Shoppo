import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ProfilePageItem = props => {

    return(
        <TouchableOpacity style={styles.holder} onPress={props.onEsspresso} activeOpacity={0.50}>
            <MaterialCommunityIcons name={props.name} color={"gray"} size={30} />
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color:"black",
        marginStart: 15,
        fontSize: 17,
    },
    holder: {
        paddingHorizontal: 20,
        paddingVertical: 9,
        alignItems:"center",
        width: "100%",
        flexDirection:"row",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
});

export default ProfilePageItem;
