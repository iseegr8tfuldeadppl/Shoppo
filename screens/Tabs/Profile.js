// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { Share, ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, SafeAreaView, ScrollView, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import ProfilePageItem from '../components/ProfilePageItem';
import Call from '../components/Call';
import Email from '../components/Email';
import Clients from '../components/Admins/Clients';
import firebase from 'firebase';
import moment from 'moment';
import Taboo from '../components/Taboo';
import Chat from '../components/Chat';
import CachedImage from '../components/CachedImage';
import {
    profileString,
    shareAppWithFriends,
    linkString,
    loadingString,
    callUsString,
    emailUsString,
    youCanShopString,
    clientsString,
    chatString,
    atTheString,
    callString,
    ordersString,
    storeNameString,
    rootString,
    emailString
} from '../constants/strings';


const Profile = props => {

    const [page, setPage] = useState(rootString[props.language]);
    const [loading, setLoading] = useState(false);

    // this is for when they press "go to my orders" from <checkout>
    if(props.navigation.isFocused()){
        if(props.remoteOrdersOpen){
            // admin check
            if(props.adminList.includes(props.uid)){
                if(page!==clientsString[props.language])
                    setPage(clientsString[props.language]);
            } else {
                if(page!==chatString[props.language])
                    setPage(chatString[props.language]);
            }
            props.setRemoteOrdersOpen();
        }
    }

    BackHandler.addEventListener('hardwareBackPress', function() {
        if(loading){
           setPage(rootString[props.language]);
           setLoading(false);
       } else if(page===callString[props.language])
            setPage(rootString[props.language]);
        else if(page===emailString[props.language])
            setPage(rootString[props.language])
        else if(page===clientsString[props.language])
            setPage(rootString[props.language]);
        else if(page===chatString[props.language]) {
            if(props.adminList.includes(props.uid)){
                setPage(clientsString[props.language]);
                setClientSelected();
            } else {
                setPage(rootString[props.language]);
            }
        }

	    return true;
	});

    // admin thing
    const [clientSelected, setClientSelected] = useState();

    const turnIntoMessages = () => {

        let messagos = []

        if(props.adminList.includes(props.uid)){
    		firebase.database().ref('/users/' + clientSelected.key).on('value', userInfoSnapShot => {
                messagos = []
                let dataaa = userInfoSnapShot.val() ? userInfoSnapShot.val() : {};
                let userInfoSnap = {...dataaa};
                if(userInfoSnap.orders){
                    let ordersKeys = Object.keys(userInfoSnap.orders);
                    let orderst = Object.values(userInfoSnap.orders);
                    for(let i=0; i<orderst.length; i++){
                        messagos.push({
                            key: ordersKeys[i].toString(),
                            message: orderst[i].message,
                            picture: orderst[i].picture,
                            state: orderst[i].state,
                            date: orderst[i].date
                        });
                    }
                }
                if(userInfoSnap.messages){
                    let messagesKeys = Object.keys(userInfoSnap.messages);
                    let messagest = Object.values(userInfoSnap.messages);
                    for(let i=0; i<messagest.length; i++){
                        messagos.push({
                            key: messagesKeys[i].toString(),
                            message: messagest[i].message,
                            picture: messagest[i].picture,
                            date: messagest[i].date,
                            admin: messagest[i].admin
                        });
                    }
                }

                // Order messages chronologically
                for(let i=0; i<messagos.length; i++){
                    for(let j=0; j<messagos.length; j++){
                        if(messagos.length===j+1)
                            break;
                        if(getDate(messagos[j].date) < getDate(messagos[j+1].date) ){
                            let temp = messagos[j];
                            messagos[j] = messagos[j+1];
                            messagos[j+1] = temp;
                        }
                    }
                }

                if(messagos.length>0){
                    if(String(messago)!==String(messagos)){
                        setMessages(messagos);
                        if(loading)
                            setLoading(false);
                    }
                }

    		});
        } else {
            if(props.userInfo){
                if(props.userInfo.orders){
                    let ordersKeys = Object.keys(props.userInfo.orders);
                    let orderst = Object.values(props.userInfo.orders);
                    for(let i=0; i<orderst.length; i++){
                        messagos.push({
                            key: ordersKeys[i].toString(),
                            message: orderst[i].message,
                            picture: orderst[i].picture,
                            state: orderst[i].state,
                            date: orderst[i].date
                        });
                    }
                }

                if(props.userInfo.messages){
                    let messagesKeys = Object.keys(props.userInfo.messages);
                    let messagest = Object.values(props.userInfo.messages);
                    for(let i=0; i<messagest.length; i++){
                        messagos.push({
                            key: messagesKeys[i].toString(),
                            message: messagest[i].message,
                            picture: messagest[i].picture,
                            date: messagest[i].date,
                            admin: messagest[i].admin
                        });
                    }
                }

                // Order messages chronologically
                for(let i=0; i<messagos.length; i++){
                    for(let j=0; j<messagos.length; j++){
                        if(messagos.length===j+1)
                            break;
                        if(getDate(messagos[j].date) < getDate(messagos[j+1].date) ){
                            let temp = messagos[j];
                            messagos[j] = messagos[j+1];
                            messagos[j+1] = temp;
                        }
                    }
                }

            }
            return messagos;
        }

    };

    const getDate = date => {
        var time = parseInt(date.substring(0, date.length-2));
        if(date[8]==="1" && date[9]==="2"){
            time -= 120000;
        }

        if(date[date.length-2]==="p"){
            time += 120000;
        }

        return time;
    };

    const [messago, setMessages] = useState(props.adminList.includes(props.uid)? undefined : turnIntoMessages());

    if(!props.adminList.includes(props.uid)){
        let ah = turnIntoMessages();
        if(ah){
            if(String(messago)!==String(ah)){
                setMessages(ah);
            }
        }

    }

    // admin if statement
    if(clientSelected && !messago){

        // show loading screen while we load client convo
        if(!loading && !messago)
            setLoading(true);
        else{
            turnIntoMessages();
        }
    }

    const getNumbers = () => {
        let cake = [];
        if(props.userInfo){
            let numbers = Object.keys(props.contact.numbers);
            for(let i=0; i<numbers.length; i++){
                cake.push({key: i.toString(), number:numbers[i]});
            }
        }
        return cake;
    };

    const getEmail = () => {
        let cake = [];
        if(props.userInfo){
            if(props.contact.email){
                let emails = Object.values(props.contact.email);
                for(let i=0; i<emails.length; i++){
                    cake.push({key: i.toString(), email:emails[i]});
                }
            }
        }
        return cake;
    };

    const ordersCounted = () => {
        if(props.userInfo.orders){
            let orders = Object.keys(props.userInfo.orders).length;
            if(orders>1)
                return orders + " " + ordersString[props.language];
            else if(orders===1)
                return orders + " " + orderString[props.language];
            else
                return "0 " + ordersString[props.language];
        } else return "0 " + ordersString[props.language];
    };

    const doubleTabPress = () => {
        setPage(rootString[props.language]);
    };

    const ordersOrClients = () => {
        if(props.adminList.includes(props.uid))
            return clientsString[props.language];
        return ordersString[props.language];
    };

    const onShare = async () => {
        try {
          const result = await Share.share({
              message: atTheString[props.language]
                  + " " + storeNameString[props.language]
                  + " " + youCanShopString[props.language]
                  + "\n\n" + linkString[props.language]
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
              console.log("shared");
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log("dismissed");
          }
        } catch (error) {
          console.log("sharing error", error.message);
        }
    };

    const pageDisplay = () => {
        switch(page){
            case chatString[props.language]:
                return(
                    <View style={styles.letout}>
                        <Chat
                            userInfo={props.userInfo}
                            clientSelected={clientSelected}
                            language={props.language}
                            setPage={setPage}
                            setClientSelected={setClientSelected}
                            uid={props.uid}
                            adminList={props.adminList}
                            backToRoot={() => {setPage(rootString[props.language]);} }
                            setMessages={setMessages}
                            turnIntoMessages={turnIntoMessages}
                            messago={messago} />
                    </View>
                );
                break;
            case clientsString[props.language]:
                return(
                      <View style={styles.letout}>
                        <Clients
                            setPage={setPage}
                            language={props.language}
                            clientSelected={clientSelected}
                            setClientSelected={setClientSelected}
                            categories={props.categories}
                            uid={props.uid}
        	  				usersLatest={props.usersLatest}
                            adminList={props.adminList}
                            backToRoot={() => {setPage(rootString[props.language]);} }/>
                          <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                      </View>
                );
                break;
            case callString[props.language]:
                return(
                  <View style={styles.letout}>
                      <Call
                          backToRoot={() => {setPage(rootString[props.language]);} }
                          language={props.language}
                          numbers={getNumbers()} />
                      <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                  </View>
                );
                break;
            case emailString[props.language]:
                return(
                  <View style={styles.letout}>
                    <Email
                        backToRoot={() => {setPage(rootString[props.language]);} }
                        language={props.language}
                        emails={getEmail()} />
                      <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                  </View>
                );
                break;
            default:
                return(
                    <View style={styles.letout}>
                        <Header style={styles.header}>
                            <TouchableOpacity
                                onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
                                <MaterialCommunityIcons name="menu" color={"white"} size={30} />
                            </TouchableOpacity>
                            <View style={styles.headertitleholder}><Text style={styles.headertitle}>{profileString[props.language]}</Text></View>
                        </Header>

                        <ScrollView>
                            <View style={styles.topBar}>
                                <View style={styles.topBarInner}>
                                    <View style={styles.topbarLeftTextsHolder}>
                                        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{first_last_name()}</Text>
                                    <Text style={styles.orderCount} numberOfLines={1} ellipsizeMode='tail'>{ordersCounted()}</Text>
                                </View>
                                <CachedImage
                                    source={profile_pic()}
                                    style={styles.image}/>
                                </View>
                            </View>

                            <ProfilePageItem
                                name={"menu"}
                                onEsspresso={() => {
                                    if(props.adminList.includes(props.uid))
                                        setPage(clientsString[props.language]);
                                    else
                                        setPage(chatString[props.language]);
                                }}
                                text={ordersOrClients()} />

                            <ProfilePageItem
                                name={"share-variant"}
                                onEsspresso={onShare}
                                text={shareAppWithFriends[props.language]} />

                            <ProfilePageItem
                                name={"phone"}
                                onEsspresso={() => {setPage(callString[props.language]);}}
                                text={callUsString[props.language]} />

                            <ProfilePageItem
                                name={"email"}
                                onEsspresso={() => {setPage(emailString[props.language]);}}
                                text={emailUsString[props.language]} />
                        </ScrollView>
                        <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                    </View>
                );
                break;
        }
    };


    const first_last_name = () => {
        return props.userInfo.last_name + " " + props.userInfo.first_name;
    }

    const profile_pic = () => {
        if(props.userInfo)
            return props.userInfo.profile_picture;
        return;
    };

    const loadingPage = () => {
        if(loading)
            return(
                <View style={{flex:1, width:"100%", height:"100%", opacity: 0.8, backgroundColor:"#333333", alignItems:"center", justifyContent:"center", position:"absolute"}}>
                    <Text style={{color:"white",fontWeight:"bold",fontSize:30}}>{loadingString[props.language]}</Text>
                </View>
            );
    }

  return (
    <SafeAreaView style={{flex:1, height:"100%", width:"100%"}}>
        {pageDisplay()}
        {loadingPage()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    topbarLeftTextsHolder : {
        width:"60%",
        justifyContent:"space-between",
    },
    name: {
        color: "white",
        fontSize: 20,
    },
    image: {
        marginStart: 10,
        marginVertical: 15,
        width: 120,
        height: 120,
    },
    letout: {
        flex: 1
    },
	header:{
		height: 70,
        paddingTop: 5,
	},
    headertitle: {
        textAlign:"center",
        fontSize: 23,
        color:"white",
        marginHorizontal: 11,
    },
    headertitleholder: {
        justifyContent:"center",
        alignItems:"flex-start",
        flex: 1
    },
    topBar: {
        backgroundColor: Colors.Primary,
        width: "100%",
        alignItems:"center",
        height:150
    },
    topBarInner: {
        flex: 1,
        width:"100%",
        paddingHorizontal: 20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    orderCount: {
        color: "white",
        width: "100%",
        textAlign:"left",
    },
});
export default Profile;
