import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Colors from '../../../constants/Colors';


const TitlePage = props => {

    return(
        <View style={styles.letout}>
            <TextInput
                style={styles.quantityInputCurrency}
                blurOnSubmit
                placeholder={props.hint}
                onChangeText={(enteredText) => {props.setTitle(enteredText);} }
                value={props.title} />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginStart: 10,
    },
    letout: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection: "row",
        width: "100%",
    },
	quantityInputCurrency : {
		borderColor:Colors.Primary,
		borderRadius: 10,

        width: "95%",
		paddingVertical: 3,
		fontWeight: "bold",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderWidth: 2,
		fontSize:18,
		textAlign:'center',
	},
});

export default TitlePage;
