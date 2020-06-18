import React from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePageItem from './ProfilePageItem';
import Header from './Header';

const Email = props => {

    const email = mail => {
        Linking.openURL(`mailto:${mail}`);
    };

    if(props.emails.length===0)
        return(
            <View style={styles.list}>
                <Header style={styles.header}>
                    <TouchableOpacity
                        onPress={props.backToRoot}>
                        <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
                    </TouchableOpacity>
                    <View style={styles.headertitleholder}><Text style={styles.headertitle}>Email</Text></View>
                </Header>

                <Text style={styles.plspress}>There are no emails available currently.</Text>
            </View>
        );

    return(
        <View style={styles.list}>
            <Header style={styles.header}>
                <TouchableOpacity
                    onPress={props.backToRoot}>
                    <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
                </TouchableOpacity>
                <View style={styles.headertitleholder}><Text style={styles.headertitle}>Email</Text></View>
            </Header>

            <Text style={styles.plspress}>Veuillez taper sur un E-mail pour l'ouvrir.</Text>

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
});

export default Email;
