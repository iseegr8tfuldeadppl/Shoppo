import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Colors from '../../../constants/Colors';


const StockPage = props => {

    const update = enteredText => {
        if(props.type==="item"){
            enteredText = enteredText.replace(",", "");
            enteredText = enteredText.replace(".", "");
            enteredText = enteredText.replace("-", "");
    		enteredText = enteredText.replace(/\s/g, "");
        }

        props.setStock(enteredText);
    };

    return(
        <View style={styles.letout}>
            <TextInput
                style={styles.quantityInputCurrency}
                blurOnSubmit
                autoCapitalize="none"
                placeholder={props.hint}
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={(enteredText) => {update(enteredText);} }
                value={props.stock} />
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

		paddingVertical: 3,
		fontWeight: "bold",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderWidth: 2,
		fontSize:18,
		textAlign:'center',
	},
});

export default StockPage;
