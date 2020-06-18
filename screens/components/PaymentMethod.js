import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import Colors from '../constants/Colors';


const PaymentMethod = props => {

    if(props.selected===props.item){
        return(
            <View style={styles.container}>
                <TouchableOpacity
                        style={{...styles.holder, ...styles.selected}}
                        activeOpacity={.95}
                        onPress={() => { props.setSelected(); }}>
                    <Image
                        style={styles.image}
                        source={{ uri:props.item.icon }} />
                    <Text style={{ marginStart: 10, fontSize: 21, color:"white" }}>{props.item.title}</Text>
                </TouchableOpacity>
        </View>
        );
    }

    return(
        <View style={styles.uncontainer}>
            <TouchableOpacity
                    style={{...styles.holder, ...styles.unselected}}
                    activeOpacity={.95}
                    onPress={() => { props.setSelected(props.item); }}>
                <Image
                    style={styles.image}
                    source={{ uri:props.item.icon }} />
                <Text style={{ marginStart: 10, fontSize: 21, color:"white" }}>{props.item.title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    selected: {
        backgroundColor: Colors.Primary,
    },
    unselected: {
        backgroundColor: Colors.Accent,
    },
    image: {
        backgroundColor: 'white',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        height: 100,
        width: 100,
    },
    holder: {
        borderRadius:10 ,

        flex:0.5,
        flexDirection:"row",
        alignItems:"center" ,
    },
    container: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 0,
        elevation: 5,

        borderRadius: 10,
        marginHorizontal:7,
        marginVertical:6,
    },
    uncontainer: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 0,
        elevation: 5,

        borderRadius: 10,
        marginHorizontal:14,
        marginVertical:6,
    },
});

export default PaymentMethod;
