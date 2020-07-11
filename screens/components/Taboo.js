import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';


const Taboo = props => {

    const logoFocus = tab =>{
        if(props.focus===tab){
            return Colors.Accent;
        }
        return "gray";
    };

    const textFocus = tab => {
        if(tab===props.focus)
            return styles.focusedText;
        return styles.unfocusedText;
    };

    const pressed = tab => {
        if(tab===props.focus)
            props.doubleTabPress();
        else
            props.navigation.navigate(tab);
    };

    return(
    <View style={styles.bar}>

        <TouchableOpacity onPress={() => {pressed("Main Menu");}} activeOpacity={0.6} style={styles.tab}>
            <MaterialCommunityIcons  name="home" color={logoFocus("Main Menu")} size={25} />
            <Text style={textFocus("Main Menu")}>Main Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {pressed("Categories");}} activeOpacity={0.6} style={styles.tab}>
            <MaterialCommunityIcons name="menu" color={logoFocus("Categories")} size={25} />
            <Text style={textFocus("Categories")}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => {pressed("Cart");}} activeOpacity={0.6} style={styles.tab}>
            <MaterialCommunityIcons name="cart" color={logoFocus("Cart")} size={25} />
            <Text style={textFocus("Cart")}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => {pressed("Profile");}} activeOpacity={0.6} style={styles.tab}>
            <MaterialCommunityIcons name="account" color={logoFocus("Profile")} size={25} />
            <Text style={textFocus("Profile")}>Profile</Text>
        </TouchableOpacity>

    </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        flexDirection:"row",
        width:"100%",
        borderTopWidth: 1,
        borderTopColor:"#BBB",
        backgroundColor:Colors.Dank
    },
    tab: {
        flex: 1,
        alignItems:"center",
        paddingVertical: 4,
        justifyContent:"center"
    },
    unfocusedText: {
        fontSize: 11,
        color:"gray"
    },
    focusedText: {
        fontSize: 11,
        color:Colors.Accent
    },
});

export default Taboo;
