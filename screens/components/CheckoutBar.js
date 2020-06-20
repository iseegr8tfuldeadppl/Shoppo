import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import OkayButton from './OkayButton';


const CheckoutBar = props => {

    return(
        <View style={styles.verticalHolder}>
            <View style={styles.horizontalHolder}>
                <Text style={styles.total}>Total: {props.calculateTotal()} DA</Text>

                <OkayButton
                    textStyle={{
                        fontSize: 15,
                    }}
                    onClick={props.onClick}
                    text={props.text} />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    verticalHolder: {
        width:"100%",
        paddingBottom:8,
        paddingHorizontal:20,
    },
    horizontalHolder: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
	total: {
        fontWeight:"bold",
		flex:1,
		textAlign:"right",
		fontSize:17,
		paddingHorizontal:30
	},
});

export default CheckoutBar;
