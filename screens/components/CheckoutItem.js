import React from 'react';
import { View, Image, Text } from 'react-native';
import Colors from '../constants/Colors';
import {
    quantityString,
    dinarString,
    costString
} from '../constants/strings';


const CheckoutItem = props => {

    return(
        <View
            style={{
                paddingHorizontal: 10,
                paddingTop: 15,
                alignItems:"center",
                flexDirection:"row",
            }}>
            <Image
                style={{
                    width:100,
                    height:50,
                    borderRadius:1,
                }}
                source={{
                    uri:props.item.data.banner,
                }} />

            <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                    flex: 1,
                    marginStart: 10,
                    fontSize: 14,
                }}>
                {props.item.data.title}</Text>

            <View
                style={{
                    backgroundColor: Colors.Accent,
                    padding:10,
                    borderRadius:5,
                }}>
                <Text style={{color:"white", }}>{quantityString[props.language]}: {props.item.quantity}</Text>
                <Text style={{color:"white", }}>{costString[props.language]}: {props.calculateTotalForThisProduct(props.item)} {dinarString[props.language]}</Text>
            </View>
        </View>
    );
};

export default CheckoutItem;
