import React, {useState} from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Alert, ScrollView, TextInput, Image, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowedHeader from '../ArrowedHeader';
import OkayButton from '../OkayButton';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { orderString, ordersString, clientsString } from '../../constants/strings';

const Clients = props => {

    BackHandler.addEventListener('hardwareBackPress', function() {
        props.backToRoot();
        return true;
    });

    /*
    const statee = stuffos => {
        if(stuffos.order.state==="success")
            Alert.alert('Success!', 'Your order was successfully processed',
            [
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
        else if(stuffos.order.state==="failed")
            Alert.alert('Failed!', 'Your order failed',
            [
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
        else if(stuffos.order.state==="pending")
            Alert.alert('Processing!', 'Your order is still processing',
            [
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
    };
    */

    /*
    const usersLatestFiltered = () => {
        let usersLatest = [];
        let count = 1;
        for(let i=0; i<props.usersLatest.length; i++){
            if(props.usersLatest[i].o){
                if(parseInt(props.usersLatest[i].o)>0){
                    props.usersLatest[i].count = count;
                    count += 1;
                    usersLatest.push(props.usersLatest[i]);
                }
            }
        }
        return usersLatest;
    };
    */

    const addNumbersToUsersLatest = () => {
        let usersLatest = [];
        if(usersLatest){
            let count = 1;
            for(let i=props.usersLatest.length-1; i>=0; i--){
                props.usersLatest[i].count = count;
                count += 1;
                usersLatest.push(props.usersLatest[i]);
            }
        }
        return usersLatest;
    };

    const orderCount = o => {
        if(o==="1")
            return o + " " + orderString[props.language];
        return o + " " + ordersString[props.language];
    };

    const howold = n => {
        return moment(n, "YYYYMMDDhhmmssa").fromNow();
    };

    return(
        <SafeAreaView style={styles.letout}>
            <ArrowedHeader backToRoot={props.backToRoot} title={clientsString[props.language]}/>
            <FlatList
                style={styles.list}
                data={addNumbersToUsersLatest()}
                renderItem={clientLatestData =>
                    <TouchableOpacity style={styles.holder} onPress={() => {props.setClientSelected(clientLatestData.item); props.setPage("Chat"); }} activeOpacity={0.50}>
                        <Text style={styles.count}>#{clientLatestData.item.count}</Text>
                        <View style={styles.men}>
                            <Text style={styles.title}>{clientLatestData.item.f}</Text>
                            <Text style={styles.howold}>{howold(clientLatestData.item.n)}</Text>
                        </View>
                        <View style={styles.pressoHolder}>
                            <Text style={styles.pressoText}>{orderCount(clientLatestData.item.o)}</Text>
                        </View>
                    </TouchableOpacity>
                }/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tag: {
        marginTop: 15,
        fontSize: 17,
        textAlign:"center",
    },
    requirement: {
        backgroundColor:"white",
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginTop: 5,
        borderWidth: 2,
        borderColor: Colors.Primary,
        paddingHorizontal: 30,
        alignItems:"center",
        justifyContent:"center",
    },
    adminHolda: {
        borderWidth: 5,
        borderColor: Colors.Accent,
        backgroundColor:Colors.Primary,
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    adminText: {
        color:"white",
        fontSize: 18,
        fontWeight:"bold",
    },
    result: {
        width: "100%",
        fontSize: 19,
        textAlign:"center",
        color:"black"
    },
	customHeader: {
        height: null,
		paddingTop:18,
		paddingBottom:12
	},
    plspress: {
        fontSize: 20,
        textAlign:"center",
        paddingHorizontal: 50,
        marginTop: 20,
        marginBottom: 25,
    },
    list: {
        flex: 1,
        width: "100%",
    },
    letout: {
        width: "100%",
        flex: 1,
    },
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

export default Clients;
