import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Colors from '../../../constants/Colors';


const DescriptionPage = props => {

    return(
        <View style={styles.letout}>
            <TextInput
                multiline={true}
                style={styles.quantityInputCurrency}
                placeholder={props.hint}
                onChangeText={(enteredText) => {props.setDescription(enteredText);} }
                value={props.description} />
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

        minHeight: 100,
        width: "95%",
		fontWeight: "bold",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderWidth: 2,
		fontSize:18,
	},
});

export default DescriptionPage;
