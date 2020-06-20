import React from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePageItem from './ProfilePageItem';
import ArrowedHeader from './ArrowedHeader';


const Call = props => {

    const call = number => {
        Linking.openURL(`tel:${number}`);
    };

    if(props.numbers.length===0)
        return(
            <View style={styles.list}>
                <ArrowedHeader backToRoot={props.backToRoot} title={"Call"}/>

                <Text style={styles.plspress}>There are no phone numbers available currently.</Text>
            </View>
        );

    return(
        <View style={styles.list}>
            <ArrowedHeader backToRoot={props.backToRoot} title={"Call"}/>

            <Text style={styles.plspress}>Veuillez taper sur le numéro pour l'appeler.</Text>

            <FlatList
                style={styles.list}
                data={props.numbers}
                renderItem={singlePhoneData =>
                    <ProfilePageItem
                        name={"phone"}
                        onEsspresso={() => {call(singlePhoneData.item.number);}}
                        text={singlePhoneData.item.number} />
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
});

export default Call;
