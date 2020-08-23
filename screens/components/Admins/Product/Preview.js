import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import Card from '../../Card';
import Colors from '../../../constants/Colors';
import {
    pressToPreviewString,
    dinarString
} from '../../../constants/strings';


const Preview = props => {

    const uriii = () => {
        if(props.imageUri)
            return props.imageUri;
        return props.imageUrl;
    };

    return(
        <View style={styles.letout}>

            <Text style={styles.hint}>{pressToPreviewString[props.language]}</Text>

            <Card
                style={styles.productItem}>

                <Image
                    style={styles.image}
                    source={{ uri:uriii() }} />

                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.price}>{props.cost} {dinarString[props.language]}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{props.title}</Text>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    hint: {
        marginHorizontal: 5,
        fontSize: 22,
        textAlign:"center",
        marginBottom: 20,
    },
    letout: {
        width:"100%",
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    },
    productItem: {
        justifyContent:'center',
        marginTop:7,
        marginHorizontal:30,
        width: "50%",
        borderRadius: 18,

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

export default Preview;
