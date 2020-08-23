import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import { mainMenuString, categoriesString, cartString, profileString } from '../constants/strings';


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

            <TouchableOpacity onPress={() => {pressed(mainMenuString[props.language]);}} activeOpacity={0.6} style={styles.tab}>
                <MaterialCommunityIcons  name="home" color={logoFocus(mainMenuString[props.language])} size={25} />
                <Text style={textFocus(mainMenuString[props.language])}>{mainMenuString[props.language]}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {pressed(categoriesString[props.language]);}} activeOpacity={0.6} style={styles.tab}>
                <MaterialCommunityIcons name="menu" color={logoFocus(categoriesString[props.language])} size={25} />
                <Text style={textFocus(categoriesString[props.language])}>{categoriesString[props.language]}</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => {pressed(cartString[props.language]);}} activeOpacity={0.6} style={styles.tab}>
                <MaterialCommunityIcons name="cart" color={logoFocus(cartString[props.language])} size={25} />
                <Text style={textFocus(cartString[props.language])}>{cartString[props.language]}</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => {pressed(profileString[props.language]);}} activeOpacity={0.6} style={styles.tab}>
                <MaterialCommunityIcons name="account" color={logoFocus(profileString[props.language])} size={25} />
                <Text style={textFocus(profileString[props.language])}>{profileString[props.language]}</Text>
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
