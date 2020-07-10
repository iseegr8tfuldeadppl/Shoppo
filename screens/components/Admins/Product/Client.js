import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Colors from '../../../constants/Colors';


const Client = props => {

    const howold = () => {
        return moment(props.item.n, "YYYYMMDDhmmssa").fromNow();
    };

    const orderCount = () => {
        if(props.item.o==="1")
            return props.item.o + " Order";
        return props.item.o + " Orders";
    };

    return(
        <TouchableOpacity style={styles.holder} onPress={() => {props.setClientSelected(props.item); props.setPage("Chat"); }} activeOpacity={0.50}>
            <Text style={styles.count}>#{props.item.count}</Text>
            <View style={styles.men}>
                <Text style={styles.title}>{props.item.f}</Text>
                <Text style={styles.howold}>{howold()}</Text>
            </View>
            <View style={styles.pressoHolder}>
                <Text style={styles.pressoText}>{orderCount()}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    men: {
        marginStart: 15,
        justifyContent:"flex-start",
        flex: 1,
    },
    pressoHolder: {
        marginVertical: 15,
        marginEnd: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: Colors.Primary,
    },
    pressoText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
    count: {
        marginStart: 15,
        color:"gray",
        fontSize: 21,
        fontWeight: "bold",
    },
    title: {
        color:Colors.Accent,
        fontSize: 19,
        fontWeight: "bold",
    },
    howold: {
        marginStart: 2,
        color:Colors.Primary,
        fontSize: 13,
        fontWeight: "bold",
    },
    holder: {
        alignItems:"center",
        width: "100%",
        flexDirection:"row",
        borderBottomWidth: 1,
        borderBottomColor: Colors.Accent,
    },
});

export default Client;
