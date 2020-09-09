import React, {useState} from 'react';
import { View, FlatList, ActivityIndicator, TextInput, StyleSheet, SafeAreaView, Text, BackHandler, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowedHeader from './ArrowedHeader';
import OkayButton from './OkayButton';
import ImagePicker from 'react-native-image-picker';
import Colors from '../constants/Colors';
import moment from 'moment';
import Banner from './Banner';
import {
    pendingString,
    failedString,
    successString,
    areYouSureString,
    setStateString,
    chatString,
    typeString,
    uploadingString,
    yesString,
    noString,
    selectPictureString
} from '../constants/strings';

// admin
import StateSelector from './Admins/Product/StateSelector';

const Chat = props => {
    const [previewedImage, setPreviewedImage] = useState();
    const [messageInput, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    BackHandler.addEventListener('hardwareBackPress', function() {
        if(!uploading)
    	    back();
	    return true;
	});

    const back = () => {
        // admin if statement
        if(props.adminList.includes(props.uid)){
            props.setClientSelected();
            props.setMessages();
            props.setPage("Clients");
            return;
        }
        props.backToRoot();
    };

    const clientOrAdminDecision = admin => {
        if(props.adminList.includes(props.uid))
            return admin;
        return !admin;
    };

    const picture = (url, admin) => {
        if(url){
            return(
                <View
                    style={{...{width: "65%", height: 150, marginTop:10}, ...leftOrRight(admin)}}>
                    <Banner
                        language={props.language}
                        url={url}
                        setPreview={setPreviewedImage}
                        preview={previewedImage}
                        style={{height: 150, width:"100%", borderRadius: 23, borderWidth: 1, borderColor:Colors.Primary}}
                        images={[url]} />
                </View>
            );
        }
    };

    const setState = (stato, key) => {
        let stateDisplay = "";
        if(stato==="pending"){
            stateDisplay = pendingString[props.language];
        } else if(stato==="failed"){
            stateDisplay = failedString[props.language];
        } else if(stato==="success"){
            stateDisplay = successString[props.language];
        }

		Alert.alert(
			areYouSureString[props.language],
			setStateString[props.language] + stateDisplay + '.',
			[
                {text: noString[props.language], style: 'cancel'},
				{text: yesString[props.language], style: 'destructive', onPress: () => { updateState(stato, key); } }],
			{ cancelable: true }
		);
    };

    const updateState = (stato, key) => {

        // count new amount of pending orders
        let pendingOrdersCount = 0;
        for(let i=0; i<props.messago.length; i++){
            console.log("state " + props.messago[i].state, props.messago[i])
            if(props.messago[i].state)
                if(props.messago[i].state==="pending")
                    pendingOrdersCount ++;
        }

		let ref = firebase.database().ref('/users/' + props.clientSelected.key + '/orders/' + key);
		ref.update({"state": stato, "seen": false})
		.then(function(snapshot) {
			//console.log('Snapshotssss', snapshot);

            let ref = firebase.database().ref('/userList/' + props.clientSelected.key);
            ref.update({"o":pendingOrdersCount.toString()})
            .then(function(snapshot) {
                //console.log('Snapshotssss2', snapshot);

                // temporarely
                // let array2 = props.turnIntoMessages();
                // props.setMessages(array2);
            });
		});
    };

    const stateman = (admin, state, key) => {
        if(state)
            return(
                <StateSelector
                    language={props.language}
                    touchable={!clientOrAdminDecision(admin)}
                    keyy={key}
                    state={state}
                    setState={setState}/>
            );
    };

    const isItTop = key => {
        if(key===props.messago[props.messago.length-1].key)
            return {paddingTop: 13, paddingBottom: 7};
        else
            return {paddingBottom: 7};
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

    const textMessage = (text, admin) => {
        if(text)
            return(
                <View style={{...{borderRadius: 23, maxwidth: "70%", padding: 10}, ...leftOrRight2(admin) }}>
                    <Text style={styles.prodoct}>{text}</Text>
                </View>
            );
    };

    const message = item => {
        item = item.item;
        return(
            <View style={{...{borderRadius: 15, width: "100%"}, ...leftOrRight(item.admin), ...isItTop(item.key)}}>
                {textMessage(item.message, item.admin)}
                {picture(item.picture, item.admin)}
                {stateman(item.admin, item.state, item.key)}
            </View>
        );
    };

    const submitMessage = () => {
        let uid = props.uid;
        if(props.adminList.includes(props.uid))
            uid = props.clientSelected.key;
		let ref = firebase.database().ref('/users/' + uid + "/messages");
		ref.push({
				message: messageInput,
 				date: moment().format('YYYYMMDDhhmmssa'),
                admin: props.adminList.includes(props.uid)
			})
			.then(function(snapshot) {
				//console.log('submitMessage response = ' + snapshot);
                setMessage("");

                // temporarely
                // let array2 = props.turnIntoMessages();
                // props.setMessages(array2);

				let ref2 = firebase.database().ref('/userList/' + uid);
				ref2.update({"n":moment().format('YYYYMMDDhhmmssa')})
				.then(function(snapshot) {
					//console.log('Snapshot', snapshot);
				});
		});
    };

  	const galery = () => {
		const options = {
		  title: selectPictureString[props.language],
		  storageOptions: {
		    skipBackup: true,
		    path: 'images',
		  },
		};
        ImagePicker.launchImageLibrary(options, (result) => {
          // Same code as in above section!
          if (result.didCancel) {
          } else if (result.error) {
          } else if (result.customButton) {
          } else {
             uploadImage(result.uri);
          }
        });
    };

	const uploadImage = async(uri) => {

        setUploading(true);

  		let name = moment().format('YYYYMMDDhhmmssa') + ".png";
  	  	const response = await fetch(uri);
  	  	const blob = await response.blob();
	  	var ref = firebase.storage().ref().child(props.uid).child(name);
	  	const snapshot = await ref.put(blob);

		//console.log("typeof(snapshot.downloadURL) " + typeof(snapshot.downloadURL));
	  	snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    	//console.log("File available at", downloadURL);
			submitPicture(downloadURL);
	    });
	};

	const submitPicture = imageUrl => {

        // Step 1: check if uploader is an admin
        const is_admin = props.adminList.includes(props.uid);

        // Step 2: if it's an admin then upload on the client's root, else upload on current user root
        let path = is_admin ? "/users/" + props.clientSelected.key + "/messages" : "/users/" + props.uid + "/messages"

        // Step 3: push record onto firebase
        let ref = firebase.database().ref(path);
		ref.push({
            admin: is_admin,
			picture: imageUrl,
			date: moment().format('YYYYMMDDhhmmssa')
		}).then(function(snapshot) {
			//console.log('Snapshot', snapshot);

            // Step 4: remove loading screen
            setUploading(false);
		});
	};

    const camera = () => {
		const options = {
        };
        // Launch Camera:
        ImagePicker.launchCamera(options, (result) => {
          // Same code as in above section!
          if (result.didCancel) {
          } else if (result.error) {
          } else if (result.customButton) {
          } else {
             uploadImage(result.uri);
          }
        });

    };

    const uploadingNotice = () => {
        if(uploading){
			return(
				<View style={styles.loadingh}>
					<Text style={{color:"white", fontSize: 25, fontWeight:"bold"}}>{uploadingString[props.language]}</Text>
                	<ActivityIndicator size={50}/>
				</View>
			);
        }
    };

    const display = () =>{

        if(previewedImage)
            return(
				<Banner
                    language={props.language}
                    setPreview={setPreviewedImage}
                    preview={previewedImage}
					style={{width: "65%", height: 150, borderRadius: 23, marginTop: 7, borderWidth: 1, borderColor:Colors.Primary}}
					images={[previewedImage]} />
            );

        return(
            <SafeAreaView style={styles.letout}>
                <ArrowedHeader backToRoot={back} title={chatString[props.language]}/>
                <FlatList
                    inverted={true}
                    style={styles.flexer}
                    data={props.messago}
                    renderItem={message}
                />

                <View style={styles.bottomBar}>

                    <TouchableOpacity
                        style={{marginRight: 4}}
                        onPress={galery}
                        activeOpacity={.70}>
                        <MaterialCommunityIcons name="image" color={Colors.Primary} size={37} />
                    </TouchableOpacity>

                    <TouchableOpacity
                            onPress={camera}
                            activeOpacity={.70}>
                        <MaterialCommunityIcons name="camera" color={Colors.Primary} size={37} />
                    </TouchableOpacity>

                    <TextInput
                        multiline={true}
                        style={styles.quantityInputCurrency}
                        placeholder={typeString[props.language]}
                        onChangeText={setMessage}
                        value={messageInput} />
                    <TouchableOpacity
                            onPress={() => {
                                if(messageInput.length>0)
                                    submitMessage()
                            }}
                            style={{
                                paddingVertical: 6
                            }}
                            activeOpacity={.70}>
                        <MaterialCommunityIcons name="send" color={Colors.Primary} size={35} />
                    </TouchableOpacity>
                </View>

                {uploadingNotice()}
            </SafeAreaView>
        );
    };

    const markOrdersAsSeen = () => {

        // Step 1: only clients mark all orders automatically as seen
        if(!props.adminList.includes(props.uid)) {

            // Pre-Step 2: safety check
            if(props.userInfo){
                // Pre-Step 2: if client does have orders in chat
                if(props.userInfo.orders){
                    let orders_to_be_made_seen = {};

                    // Step 2: loop over all orders and mark them as seen
                    let order_ids = Object.keys(props.userInfo.orders);
                    let order_values = Object.values(props.userInfo.orders);
                    for(let i=0; i<order_ids.length; i++){
                        if(!order_values.seen){
                            order_values[i].seen = true;
                            orders_to_be_made_seen[order_ids[i]] = order_values[i];
                        }
                    }

                    // Step 3: if there are unseen orders then update them in firebase
                    if(Object.keys(orders_to_be_made_seen).length>0){
                		let ref = firebase.database().ref('/users/' + props.uid + "/orders");
                		ref.update(orders_to_be_made_seen)
                			.then(function(snapshot) {
                                // for some reason getting undefined here altho it does reach firebase, maybe has to do with update()
                        });
                    }

                }
            }
        }
    };

    markOrdersAsSeen();
    return(display());

};

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection:"row",
        justifyContent:"center",
        paddingHorizontal: 5,
        alignItems:"center",
        width:"100%",
        borderTopWidth: 1,
        borderTopColor:Colors.Primary,
    },
    page: {
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: Colors.Dank,
        width:"100%",
        flex: 1,
    },
    letout: {
        width: "100%",
        flex: 1,
    },
    flexer: {
        flex: 1,
        width:"100%",
        paddingTop: 5,
    },
    prodoct: {
        color:"white",
        fontSize: 15,
    },
    quantityInputCurrency : {
        marginHorizontal: 7,
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        fontWeight: "bold",
        paddingHorizontal: 11,
        paddingVertical: 6,
        fontSize:15,
    },
	loadingh:{
		flex: 1,
		position:"absolute",
		width:"100%",
		height:"100%",
		backgroundColor:"#55666666",
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Chat;
