// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, ScrollView, BackHandler } from 'react-native';
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
import { profileString } from '../constants/strings';


const Profile = props => {

    const [page, setPage] = useState("Root");

    // this is for when they press "go to my orders" from <checkout>
    if(props.navigation.isFocused()){
        if(props.remoteOrdersOpen){
            // admin check
            if(props.adminList.includes(props.uid)){
                if(page!=="Clients")
                    setPage("Clients");
            } else {
                if(page!=="Chat")
                    setPage("Chat");
            }
            props.setRemoteOrdersOpen();
        }
    }

    BackHandler.addEventListener('hardwareBackPress', function() {
	    if(page==="Call")
            setPage("Root");
        else if(page==="Email")
            setPage("Root")
        else if(page==="Clients")
            setPage("Root");
	    return true;
	});

    // admin thing
    const [clientSelected, setClientSelected] = useState();

    const turnIntoMessages = () => {
        let messagos = []

        if(props.adminList.includes(props.uid)){
    		firebase.database().ref('/users/' + clientSelected.key).on('value', userInfoSnapShot => {
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

        return messagos;
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
        if(String(messago)!==String(ah)){
            setMessages(ah);
        }

    }

    // admin if statement
    if(clientSelected){
        let ah = turnIntoMessages();
        if(String(messago)!==String(ah)){
            setMessages(ah);
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
                return orders + " Orders";
            else if(orders===1)
                return orders + " Order";
            else
                return "0 Orders";
        } else return "0 Orders";
    };

    const doubleTabPress = () => {
        setPage("Root");
    };

    const ordersOrClients = () => {
        if(props.adminList.includes(props.uid))
            return "Clients";
        return "Orders";
    };

    const pageDisplay = () => {
        switch(page){
            case "Chat":
                return(
                    <SafeAreaView style={styles.letout}>
                        <Chat
                            clientSelected={clientSelected}
                            setPage={setPage}
                            setClientSelected={setClientSelected}
                            uid={props.uid}
                            adminList={props.adminList}
                            backToRoot={() => {setPage("Root");} }
                            setMessages={setMessages}
                            turnIntoMessages={turnIntoMessages}
                            messago={messago} />
                    </SafeAreaView>
                );
                break;
            case "Clients":
                return(
                      <SafeAreaView style={styles.letout}>
                        <Clients
                            setPage={setPage}
                            clientSelected={clientSelected}
                            setClientSelected={setClientSelected}
                            categories={props.categories}
                            uid={props.uid}
        	  				usersLatest={props.usersLatest}
                            adminList={props.adminList}
                            backToRoot={() => {setPage("Root");} }/>
                          <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                      </SafeAreaView>
                );
                break;
            case "Call":
                return(
                  <SafeAreaView style={styles.letout}>
                      <Call
                          backToRoot={() => {setPage("Root");} }
                          numbers={getNumbers()} />
                      <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                  </SafeAreaView>
                );
                break;
            case "Email":
                return(
                  <SafeAreaView style={styles.letout}>
                    <Email
                        backToRoot={() => {setPage("Root");} }
                        emails={getEmail()} />
                      <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                  </SafeAreaView>
                );
                break;
            default:
                return(
                  <SafeAreaView style={styles.letout}>
                      <Header style={styles.header}>
                          <TouchableOpacity
                              onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
                              <MaterialCommunityIcons name="menu" color={"white"} size={30} />
                          </TouchableOpacity>
                          <View style={styles.headertitleholder}><Text style={styles.headertitle}>Profile</Text></View>
                      </Header>

                      <ScrollView>
                          <View style={styles.topBar}>
                              <View style={styles.topBarInner}>
                                  <View style={styles.topbarLeftTextsHolder}>
                                      <Text
                                              style={styles.name}
                                              numberOfLines={1}
                                              ellipsizeMode='tail'>
                                          {first_last_name()}</Text>
                                      <Text
                                              style={styles.orderCount}
                                              numberOfLines={1}
                                              ellipsizeMode='tail'>
                                          {ordersCounted()}</Text>
                                  </View>
                                  <CachedImage
                                      source={profile_pic()}
                                      style={styles.image}/>
                              </View>
                          </View>

                          <ProfilePageItem
                              name={"menu"}
                              onEsspresso={() => {if(props.adminList.includes(props.uid)) setPage("Clients"); else setPage("Chat");}}
                              text={ordersOrClients()} />

                          <ProfilePageItem
                              name={"share-variant"}
                              onEsspresso={() => {setPage("Share");}}
                              text={"Share app with friends!"} />

                          <ProfilePageItem
                              name={"phone"}
                              onEsspresso={() => {setPage("Call");}}
                              text={"Call Us"} />

                          <ProfilePageItem
                              name={"email"}
                              onEsspresso={() => {setPage("Email");}}
                              text={"Email Us"} />
                      </ScrollView>
                      <Taboo language={props.language} focus={profileString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                  </SafeAreaView>
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

  return (
    pageDisplay()
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
    },
});
export default Profile;
