import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Colors from '../constants/Colors';


const Order = props => {

    const howold = () => {
        return moment(props.item.order.date, "YYYYMMDDhmmssa").fromNow();
    };

    const count = () => {
        return parseInt(props.item.key) + 1
    };

    const productCount = () => {
        console.log();
        const count = Object.keys(props.item.order.products).length;
        if(count===1)
            return "1 Product";
        else
            return count + " Product";
    };

    const state = () => {
        if(props.item.order.state==="processing")
            return(
                <TouchableOpacity style={styles.stateHolder} onPress={() => {props.statee(props.item)}} activeOpacity={0.50}>
                    <MaterialCommunityIcons name={"rotate-right"} color={"gray"} size={25} />
                    <Text style={styles.processing}>Processing</Text>
                </TouchableOpacity>
            );
        else if(props.item.order.state==="failed")
            return(
                <TouchableOpacity style={styles.stateHolder} onPress={() => {props.statee(props.item)}} activeOpacity={0.50}>
                    <MaterialCommunityIcons name={"alert-circle"} color={"red"} size={25} />
                    <Text style={styles.failed}>Failed</Text>
                </TouchableOpacity>
            );
        else if(props.item.order.state==="success")
            return(
                <TouchableOpacity style={styles.stateHolder} onPress={() => {props.statee(props.item)}} activeOpacity={0.50}>
                    <MaterialCommunityIcons name={"check-circle"} color={"green"} size={25} />
                    <Text style={styles.success}>Success</Text>
                </TouchableOpacity>
            );
    };

    return(
        <TouchableOpacity style={styles.holder} activeOpacity={0.85}>
            <Text style={styles.count}>#{count()}</Text>
            <View style={styles.men}>
                <Text style={styles.title}>{productCount()}</Text>
                <Text style={styles.howold}>{howold()}</Text>
            </View>
            {state()}
            <TouchableOpacity style={styles.pressoHolder} onPress={() => {props.setDisplayedOrder(props.item);}} activeOpacity={0.50}>
                <Text style={styles.pressoText}>View</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    men: {
        marginStart: 15,
        justifyContent:"flex-start",
        flex: 1,
    },
    processing: {
        fontSize: 12,
        color: "gray",
    },
    failed: {
        fontSize: 12,
        color: "red",
    },
    success: {
        fontSize: 12,
        color: "green",
    },
    stateHolder: {
        paddingEnd: 10,
        alignItems:"center",
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

export default Order;
