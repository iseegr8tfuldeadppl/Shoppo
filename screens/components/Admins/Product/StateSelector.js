import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/Colors';


const StateSelector = props => {

    const style = state => {
        if(state===props.state)
            return styles.stateM3abbezHolder;
        else
            return styles.stateHolder;
    };

    return(
        <View style={styles.holder}>
            <TouchableOpacity style={style("pending")} onPress={() => {props.setState("pending");}} activeOpacity={0.50}>
                <MaterialCommunityIcons name={"rotate-right"} color={"gray"} size={50} />
                <Text style={styles.processing}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style("failed")} onPress={() => {props.setState("failed");}} activeOpacity={0.50}>
                <MaterialCommunityIcons name={"alert-circle"} color={"red"} size={50} />
                <Text style={styles.failed}>Failed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style("success")} onPress={() => {props.setState("success");}} activeOpacity={0.50}>
                <MaterialCommunityIcons name={"check-circle"} color={"green"} size={50} />
                <Text style={styles.success}>Success</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    holder: {
        width: "100%",
        justifyContent:"center",
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: Colors.Dank,
    },
    stateHolder: {
        flex: 1,
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: Colors.Dank,
        borderColor: Colors.Dank,
        borderWidth: 3,
        padding: 10,
        borderRadius: 25,
        alignItems:"center",
    },
    stateM3abbezHolder: {
        flex: 1,
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: Colors.Dank,
        borderColor: Colors.Accent,
        borderWidth: 3,
        padding: 10,
        borderRadius: 25,
        alignItems:"center",
    },
    processing: {
        fontSize: 16,
        color: "gray",
    },
    failed: {
        fontSize: 16,
        color: "red",
    },
    success: {
        fontSize: 16,
        color: "green",
    },
});

export default StateSelector;
