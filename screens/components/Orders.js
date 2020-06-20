import React, {useState} from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity, MaterialCommunityIcons, View, Text, Alert, Modal, ScrollView } from 'react-native';
import Order from './Order';
import ArrowedHeader from './ArrowedHeader';
import OkayButton from './OkayButton';


const Orders = props => {

    const [displayedOrder, setDisplayedOrder] = useState();

    const statee = stuffos => {
        if(stuffos.order.state==="success")
            Alert.alert('Success!', 'Your order was successfully processed',
            [{text: 'Show Results', style: 'destructive',
            onPress: () => {
                setDisplayedOrder(stuffos);
            }},
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
        else if(stuffos.order.state==="failed")
            Alert.alert('Failed!', 'Your order failed',
            [{text: 'Show Results', style: 'destructive',
            onPress: () => {
                setDisplayedOrder(stuffos);
            }},
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
        else if(stuffos.order.state==="processing")
            Alert.alert('Processing!', 'Your order is still processing',
            [{text: 'Show Results', style: 'destructive',
            onPress: () => {
                setDisplayedOrder(stuffos);
            }},
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
    };

    if(props.orders.length===0)
        return(
            <View style={styles.list}>
                <ArrowedHeader backToRoot={props.backToRoot} title={"Orders"}/>

                <Text style={styles.plspress}>You have no orders submitted.</Text>
            </View>
        );

console.log(displayedOrder);
    return(
        <SafeAreaView style={styles.letout}>
            <ArrowedHeader backToRoot={props.backToRoot} title={"Orders"}/>

            <Modal visible={displayedOrder!==undefined} animationType="slide">

                <View style={styles.modal}>
                    <ArrowedHeader style={styles.customHeader} backToRoot={props.backToRoot} title={"My Order"}/>
                    <ScrollView style={styles.page}>
                        <Text style={styles.result}>{displayedOrder.order.result}</Text>
                    </ScrollView>
                    <OkayButton
                        style={{ width:"80%", marginBottom: 15, }}
                        textStyle={{ fontSize: 16 }}
                        onClick={() => {setDisplayedOrder(); }}
                        text={"Contact Us"} />
                </View>

            </Modal>

            <FlatList
                style={styles.list}
                data={props.orders}
                renderItem={orderData =>
                    <Order
                        setDisplayedOrder={setDisplayedOrder}
                        statee={statee}
                        item={orderData.item} />
                }/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    result: {
        width: "100%",
        fontSize: 19,
        textAlign:"center",
        color:"black"
    },
    page: {
        flex:1,
        width:"100%",
    },
	customHeader: {
        height: null,
		paddingTop:18,
		paddingBottom:12
	},
    modal: {
        width:"100%",
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
    },
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
    letout: {
        flex: 1,
    },
    list: {
        flex: 1,
        width: "100%",
    }
});

export default Orders;
