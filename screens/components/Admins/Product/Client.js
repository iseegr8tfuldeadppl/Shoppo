import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Colors from '../../../constants/Colors';


const Client = props => {

    const howold = () => {
        let orders = [];
        for(var i in props.item.stuff.orders)
            orders.push(props.item.stuff.orders[i]);

        let newest = 0;
        for(let i=0; i<orders.length; i++){
            if(moment(orders[i].latest_update, "YYYYMMDDhmmssa").isAfter(orders[newest].latest_update)){
                newest = i;
            }
        }
        return moment(orders[newest].latest_update, "YYYYMMDDhmmssa").fromNow();
    };

    const count = () => {
        return parseInt(props.item.key) + 1
    };

    const fullname = () => {
        return props.item.stuff.last_name + " " + props.item.stuff.first_name;
    };

    const orderCount = () => {
        return Object.keys(props.item.stuff.orders).length;
    };

    return(
        <TouchableOpacity style={styles.holder} onPress={() => {props.setClientSelected(props.item); props.setPage("Client"); }} activeOpacity={0.50}>
            <Text style={styles.count}>#{count()}</Text>
            <View style={styles.men}>
                <Text style={styles.title}>{fullname()}</Text>
                <Text style={styles.howold}>{howold()}</Text>
            </View>
            <View style={styles.pressoHolder}>
                <Text style={styles.pressoText}>{orderCount()} Orders</Text>
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
