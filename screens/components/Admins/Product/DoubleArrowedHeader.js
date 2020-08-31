import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../Header';
import { nextString, previousString } from '../../../constants/strings';


const DoubleArrowedHeader = props => {

    return(
        <Header style={{...styles.header, ...props.style}}>
            <TouchableOpacity onPress={props.back} style={styles.holda}>
                <View style={styles.back}>
                    <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
                    <Text style={styles.headertitle}>{previousString[props.language]}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.next} style={styles.holda}>
                <View style={styles.next}>
                    <Text style={styles.headertitle}>{nextString[props.language]}</Text>
                    <MaterialCommunityIcons name="arrow-right" color={"white"} size={30} />
                </View>
            </TouchableOpacity>
        </Header>
    );
};

const styles = StyleSheet.create({
    holda: {
        paddingTop:18,
        paddingBottom:12,
        flex: 0.5,
    },
    header: {
        width:"100%",
        paddingTop:0,
        paddingHorizontal: 0,
        paddingBottom:0,
        flexDirection:"row",
		height: null,
    },
    back: {
        paddingStart: 10,
        width: "100%",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection: "row",
    },
    next: {
        paddingEnd: 10,
        width: "100%",
        justifyContent:"flex-end",
        alignItems:"center",
        flexDirection: "row",
    },
    headertitle: {
        marginTop: -1,
        textAlign:"center",
        fontSize: 18,
        color:"white",
        marginHorizontal: 11,
    },
});

export default DoubleArrowedHeader;
