import React from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePageItem from './ProfilePageItem';
import ArrowedHeader from './ArrowedHeader';
import { noEmailsString, pressEmailsString, emailString } from '../constants/strings';


const Email = props => {

    const email = mail => {
        Linking.openURL(`mailto:${mail}`);
    };

    if(props.emails.length===0)
        return(
            <View style={styles.list}>
                <ArrowedHeader backToRoot={props.backToRoot} title={emailString[props.language]}/>

                <Text style={styles.plspress}>{noEmailsString[props.language]}</Text>
            </View>
        );

    return(
        <View style={styles.list}>
            <ArrowedHeader backToRoot={props.backToRoot} title={emailString[props.language]}/>

            <Text style={styles.plspress}>{pressEmailsString[props.language]}</Text>

            <FlatList
                style={styles.list}
                data={props.emails}
                renderItem={singleEmailData =>
                    <ProfilePageItem
                        name={"email"}
                        onEsspresso={() => {email(singleEmailData.item.email);}}
                        text={singleEmailData.item.email} />
                }/>
        </View>
    );
};

const styles = StyleSheet.create({
    plspress: {
        fontSize: 20,
        textAlign:"center",
        paddingHorizontal: 50,
        marginTop: 20,
        marginBottom: 25,
    },
    list: {
        borderTopColor:"gray",
        borderTopWidth:1,
        flex: 1,
        width: "100%",
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
});

export default Email;
