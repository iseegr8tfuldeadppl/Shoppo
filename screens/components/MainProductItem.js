import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './Card';
import CachedImage from './CachedImage';


const MainProductItem = props => {

    const visible = () =>  {
        if(!props.item.data.visible){
            return(
                <View style={{position:"absolute", justifyContent:"flex-start", width:"100%", paddingTop: 3, paddingStart: 5}}>
                    <MaterialCommunityIcons name={"eye-off"} color={"white"} size={25} />
                </View>
            );
        }
    };

    const product = () => {
        if(props.item.showmore){
            return(
                <Card
                    onPress={() => {props.setCategoryPreviewed();}}
                    style={{...styles.productItem, ...styles.showmoreCard}}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.showmoreText}>More</Text>
                    <MaterialCommunityIcons name={"dots-horizontal"} color={"white"} size={60} />
                </Card>
            );
        } else {
            return(
                <Card
                    onPress={() => {props.setProductPreviewed(props.item);}}
                    style={styles.productItem}>

                    <CachedImage
                        source={props.item.data.banner}
                        style={styles.image}
                        />

                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.price}>{props.item.data.cost} DA</Text>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{props.item.data.title}</Text>
                    {visible()}
                </Card>
            );
        }
    };

    return(
        product()
    );
};


const styles = StyleSheet.create({
    showmoreCard: {
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.Accent,
        height: 140,
    },
    showmoreText: {
        marginTop: 18,
        marginBottom: -18,
        textAlign:"center",
        fontWeight:"bold",
        fontSize: 20,
        color:"white",
    },
    productItem: {
        marginTop:7,
        marginHorizontal:7,
        flex:0.5,
        borderRadius: 18,
        height: 150,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 0,
        elevation: 5,

        backgroundColor: Colors.Primary,
    },
    image: {
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        width: "100%",
        height: 100,
    },
    price: {
        paddingTop: 2,
        fontWeight: "bold",
        flexWrap: 'wrap',
        fontSize: 17,
        color: '#FFFFFF'
    },
    title: {
        paddingTop: 1,
        paddingHorizontal: 2,
        paddingBottom: 5,
        flexWrap: 'wrap',
        fontSize: 12,
        color: '#FFFFFF',
    },

});

export default MainProductItem;
