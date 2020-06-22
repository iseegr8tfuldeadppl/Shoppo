import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Colors from '../../../constants/Colors';


const CostPage = props => {


    return(
        <View style={styles.letout}>
            <TextInput
                maxLength={10}
                style={styles.quantityInputCurrency}
                blurOnSubmit
                autoCapitalize="none"
                placeholder={props.hint}
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={(enteredText) => {props.setCost(enteredText);} }
                value={props.cost} />
            <Text style={styles.text}>DA</Text>
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

export default CostPage;
