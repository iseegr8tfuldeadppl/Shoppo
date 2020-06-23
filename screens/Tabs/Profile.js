// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, ScrollView, Image, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import ProfilePageItem from '../components/ProfilePageItem';
import Call from '../components/Call';
import Email from '../components/Email';
import Orders from '../components/Orders';


const Profile = props => {

    const [page, setPage] = useState("Root");

    BackHandler.addEventListener('hardwareBackPress', function() {
	    if(page==="Call")
            setPage("Root");
        else if(page==="Email")
            setPage("Root")
        else if(page==="Orders")
            setPage("Root");
	    return true;
	});

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

    const getOrders = () => {
        let cake = [];

        if(props.userInfo){
            if(props.userInfo.orders){
                let orders = Object.values(props.userInfo.orders);
                for(let i=0; i<orders.length; i++){
                    cake.push({key: i.toString(), order:orders[i]});
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

    switch(page){
        case "Orders":
            return(
                <Orders
                    categories={props.categories}
                    uid={props.uid}
	  				allUsers={props.allUsers}
                    adminList={props.adminList}
                    backToRoot={() => {setPage("Root");} }
                    orders={getOrders()} />);
            break;
        case "Call":
            return(
                <Call
                    backToRoot={() => {setPage("Root");} }
                    numbers={getNumbers()} />);
            break;
        case "Email":
            return(
                <Email
                    backToRoot={() => {setPage("Root");} }
                    emails={getEmail()} />);
            break;
    }

    const first_last_name = () => {
        if(props.userInfo)
            return props.userInfo.last_name + " " + props.userInfo.first_name;
        else
            return "";
    }

    const profile_pic = () => {
        if(props.userInfo)
            return props.userInfo.profile_picture;
        else
            return;
    };

  return (
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
                    <Image
                        style={styles.image}
                        source={{ uri:profile_pic() }} />
                </View>
            </View>

            <ProfilePageItem
                name={"menu"}
                onEsspresso={() => {setPage("Orders");}}
                text={"Orders"} />

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

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    topbarLeftTextsHolder : {
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
		height: 90,
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
