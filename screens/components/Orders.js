import React, {useState} from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Alert, ScrollView, TextInput, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowedHeader from './ArrowedHeader';
import OkayButton from './OkayButton';
import Colors from '../constants/Colors';
import moment from 'moment';
import firebase from 'firebase';
import Banner from './Banner';

// admin stuff
import Client from './Admins/Product/Client';
import StateSelector from './Admins/Product/StateSelector';


const Orders = props => {

    const [messageInput, setMessage] = useState("");
    const [page, setPage] = useState(props.adminList.includes(props.uid)? "Clients" : "Chat");

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

    const back = () => {
        switch(page){
            // this case statement is admin stuff
            case "Clients":
                props.backToRoot();
                break;

            case "Chat":
                // admin if statement
                if(props.clientSelected){
                    props.setClientSelected();
                    props.setMessages();
                    setPage("Clients");
                } else
                    props.backToRoot();
                break;
        }
    };

    const picture = url => {
        if(url){
            return(
				<Banner
					style={{width: "65%", height: 150, borderRadius: 23, marginTop: 7, borderWidth: 1, borderColor:Colors.Primary}}
					images={url} />
            );
        }
    };

    const isItTop = key => {
        if(key===props.messago[props.messago.length-1].key)
            return {paddingTop: 13, paddingBottom: 7};
        else
            return {paddingBottom: 7};
    };

    const clientOrAdminDecision = admin => {
        if(props.adminList.includes(props.uid))
            return admin;
        return !admin;
    };

    const leftOrRight = admin => {
        if(clientOrAdminDecision(admin))
            return {paddingEnd: 10, alignItems:"flex-end"};
        return {paddingStart: 10, alignItems:"flex-start"};
    };
    const leftOrRight2 = admin => {
        if(clientOrAdminDecision(admin))
            return {backgroundColor:"gray"};
        return {backgroundColor: Colors.Accent};
    };

    const setState = (stato, key) => {
        let stateDisplay = "";
        if(stato==="pending"){
            stateDisplay = "Pending";
        } else if(stato==="failed"){
            stateDisplay = "Failed";
        } else if(stato==="success"){
            stateDisplay = "Success";
        }

		Alert.alert(
			'Are you sure?',
			'set the state to this order to ' + stateDisplay + '.',
			[
                {text: 'No', style: 'cancel'},
				{text: 'Yes', style: 'destructive', onPress: () => { updateState(stato, key); } }],
			{ cancelable: true }
		);
    };

    const updateState = (stato, key) => {

        // count new amount of pending orders
        let pendingOrdersCount = 0;
        for(let i=0; i<props.messago.length; i++){
            if(props.messago[i].state)
                if(props.messago[i].state==="pending")
                    pendingOrdersCount ++;
        }

		let ref = firebase.database().ref('/users/' + props.clientSelected.key + '/orders/' + key);
		ref.update({"state": stato})
		.then(function(snapshot) {
			//console.log('Snapshotssss', snapshot);

            let ref = firebase.database().ref('/userList/' + props.clientSelected.key);
            ref.update({"o":pendingOrdersCount.toString()})
            .then(function(snapshot) {
                //console.log('Snapshotssss2', snapshot);

                let array2 = props.turnIntoMessages();
                props.setMessages(array2);
            });
		});
    };

    const stateman = (admin, state, key) => {
        if(state)
            return(
                <StateSelector
                    keyy={key}
                    state={state}
                    setState={setState}/>
            );
    };

    const message = item => {
        return(
            <View style={{...{borderRadius: 15, width: "100%"}, ...leftOrRight(item.admin), ...isItTop(item.key)}}>
                <View style={{...{borderRadius: 23, maxwidth: "70%", padding: 10}, ...leftOrRight2(item.admin) }}>
                    <Text style={styles.prodoct}>{item.message}</Text>
                </View>
                {picture(item.picture)}
                {stateman(item.admin, item.state, item.key)}
            </View>
        );
    };

    const submitMessage = () => {
		let ref = firebase.database().ref('/users/' + props.uid + "/messages");
		ref.push({
				message: messageInput,
 				date: moment().format('YYYYMMDDhmmssa'),
                admin: props.adminList.includes(props.uid)
			})
			.then(function(snapshot) {
				//console.log('submitMessage response = ' + snapshot);
                setMessage("");

                let array2 = props.turnIntoMessages();
                props.setMessages(array2);

				let ref2 = firebase.database().ref('/userList/' + props.uid + ' /n');
				ref2.set(moment().format('YYYYMMDDhmmssa'))
				.then(function(snapshot) {
					//console.log('Snapshot', snapshot);
				});
		});
    };

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
        let count = 1;
        for(let i=props.usersLatest.length-1; i>=0; i--){
            props.usersLatest[i].count = count;
            count += 1;
            usersLatest.push(props.usersLatest[i]);
        }
        return usersLatest;
    };

    const pageChosen = () => {
        // first if statement is admin stuff
        switch(page){
            case "Clients":
                return(
                    <FlatList
                        style={styles.list}
                        data={addNumbersToUsersLatest()}
                        renderItem={clientLatestData =>
                            <Client
                                setPage={setPage}
                                setClientSelected={props.setClientSelected}
                                item={clientLatestData.item} />
                        }/>
                );
                break;
            case "Chat":
                return(
                    <View style={styles.page}>
                        <FlatList
                            inverted={true}
                            style={styles.flexer}
                            data={props.messago}
                            renderItem={productData => message(productData.item)}
                        />

                        <View style={{flexDirection:"row", width:"100%", paddingHorizontal: 10, borderTopWidth: 1, borderTopColor:Colors.Primary, paddingVertical: 10}}>
                            <TextInput
                                multiline={true}
                                style={styles.quantityInputCurrency}
                                placeholder={"Aa"}
                                onChangeText={setMessage}
                                value={messageInput} />
                            <OkayButton
                                style={{ backgroundColor:Colors.Primary, borderRadius: 15, marginStart: 10 }}
                                onClick={() => {submitMessage()}}
                                textStyle={{ fontSize: 17, color:"white", fontWeight:"bold" }}
                                text={"Send"} />
                        </View>

                    </View>
                );
                break;
        }
    };

    return(
        <SafeAreaView style={styles.letout}>
            <ArrowedHeader backToRoot={back} title={page}/>
            {pageChosen()}
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
    prodoct: {
        color:"white",
        fontSize: 15,
    },
    flexer: {
        flex: 1,
        width:"100%",
        paddingTop: 5,
    },
    quantityInputCurrency : {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 1,
        borderColor:Colors.Primary,
        fontWeight: "bold",
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize:15,
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
    page: {
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: Colors.Dank,
        width:"100%",
        flex: 1,
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
});

export default Orders;
