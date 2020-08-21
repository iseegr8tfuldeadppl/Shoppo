import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/Colors';
import {
    failedString,
    successString,
    pendingString
} from '../../../constants/strings';


const StateSelector = props => {

    const style = state => {
        if(state===props.state)
            return styles.stateM3abbezHolder;
        return styles.stateHolder;
    };
    return(
        <View style={{...styles.holder, ...props.style}}>
            <TouchableOpacity style={style("pending")} onPress={() => {
                if(props.touchable){
                    if(props.state!=="pending")props.setState("pending", props.keyy);
                }
            }} activeOpacity={0.50}>
                <MaterialCommunityIcons name={"rotate-right"} color={"gray"} size={20} />
                <Text style={styles.processing}>{pendingString[props.language]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style("failed")} onPress={() => {
                if(props.touchable){
                    if(props.state!=="failed")props.setState("failed", props.keyy);
                }
            }} activeOpacity={0.50}>
                <MaterialCommunityIcons name={"alert-circle"} color={"red"} size={20} />
                <Text style={styles.failed}>{failedString[props.language]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style("success")} onPress={() => {
                if(props.touchable){
                    if(props.state!=="success")props.setState("success", props.keyy);
                }
            }} activeOpacity={0.50}>
                <MaterialCommunityIcons name={"check-circle"} color={"green"} size={20} />
                <Text style={styles.success}>{successString[props.language]}</Text>
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
        fontSize: 13,
        color: "gray",
    },
    failed: {
        fontSize: 13,
        color: "red",
    },
    success: {
        fontSize: 13,
        color: "green",
    },
});

export default StateSelector;
