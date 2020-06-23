import React, {useState} from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Alert, ScrollView, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Order from './Order';
import ArrowedHeader from './ArrowedHeader';
import OkayButton from './OkayButton';
import Colors from '../constants/Colors';

// admin stuff
import Client from './Admins/Product/Client';
import StateSelector from './Admins/Product/StateSelector';


const Orders = props => {

    const [displayedOrder, setDisplayedOrder] = useState();
    const [page, setPage] = useState("Orders");
    const [productListo, setProductListo] = useState([]);

    // Admin stuff
    const [clientSelected, setClientSelected] = useState();
    const [state, setState] = useState();
    const clientOrdersButton = () => {
        return(
            <TouchableOpacity onPress={() => {setPage("Clients");}} style={styles.adminHolda} activeOpacity={0.7}>
                <Text style={styles.adminText}>Press Here For Client Orders</Text>
            </TouchableOpacity>
        );
    };
    const ordersForThisClient = () => {
        let orders = [];
        let index = 0;
        for(var i in clientSelected.stuff.orders){
            orders.push({key: index.toString(), order: clientSelected.stuff.orders[i]});
            index += 1;
        }
        return orders;
    };

    const result = () => {
        if(displayedOrder && displayedOrder.order)
            return displayedOrder.order.result;
        else
            return "";
    };

    const statee = stuffos => {
        if(stuffos.order.state==="success")
            Alert.alert('Success!', 'Your order was successfully processed',
            [
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
        else if(stuffos.order.state==="failed")
            Alert.alert('Failed!', 'Your order failed',
            [
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
        else if(stuffos.order.state==="pending")
            Alert.alert('Processing!', 'Your order is still processing',
            [
                {text: 'Ok', style: 'cancel'}
            ],{ cancelable: true });
    };

    const back = () => {
        switch(page){
            case "Orders":
                props.backToRoot();
                break;
            case "Clients":
                setPage("Orders");
                break;
            case "Client":
                setClientSelected();
                setPage("Clients");
                break;
            case "Order":
                // admin if statement
                if(clientSelected){
                    setState();
                    setPage("Client");
                } else
                    setPage("Orders");
                break;
        }
    };

    const userSumbmitted = () => {
        let productList = [];

        let productsArray = [];
        for(var l in displayedOrder.order.products){
            productsArray.push({key: l, scuffed: displayedOrder.order.products[l]});
        }

        for(let i=0; i<productsArray.length; i++){

            // look for this product in product list to get its title
            let foundit = false;
            for(let j=0; j<props.categories.length; j++){
                for(let z=0; z<props.categories[j].products.length; z++){
                    //console.log(productsArray[i]);
                        //console.log("two " + props.categories[j].products[z].key);
                    if(props.categories[j].products[z].key===productsArray[i].key){

                        // convert requirements into an array from a firebase json object and then turn it into a cool listo
                        let requirementList = [];
                        let index = 0;
                        for(var l in productsArray[i].scuffed.requirements){
                            requirementList.push({key: index.toString(), tag: l, slot: productsArray[i].scuffed.requirements[l]});
                            index += 1;
                        }

                        productList.push({
                            key: productsArray[i].key,
                            name: props.categories[j].products[z].data.title,
                            category_key: props.categories[j].key,
                            requirements: requirementList
                        })

                        foundit = true;
                        break;
                    }
                }
                if(foundit)
                    break;
            }

        }
        setProductListo(productList);
    };

    if(productListo.length===0 && displayedOrder)
        userSumbmitted();

    const normalOrClientOrdersList = () => {
        // first if statement is admin stuff
        switch(page){
            case "Orders":
                if(props.orders.length===0){
                    return(
                        <>
                        {clientOrdersButton()}
                        <Text style={styles.plspress}>You have no orders submitted.</Text>
                        </>
                    );
                } else {
                    return(
                        <View style={styles.letout}>
                        {clientOrdersButton()}

                        <FlatList
                            style={styles.list}
                            data={props.orders}
                            renderItem={orderData =>
                                <Order
                                    setDisplayedOrder={setDisplayedOrder}
                                    statee={statee}
                                    item={orderData.item} />
                            }/>
                        </View>
                    );
                }
                break;
            case "Clients":
                return(
                    <FlatList
                        style={styles.list}
                        data={props.allUsers}
                        renderItem={clientData =>
                            <Client
                                setPage={setPage}
                                setClientSelected={setClientSelected}
                                item={clientData.item} />
                        }/>
                );
                break;
            case "Client":
                return(
                    <FlatList
                        style={styles.list}
                        data={ordersForThisClient()}
                        renderItem={orderData =>
                            <Order
                                setDisplayedOrder={(orderData) => {setDisplayedOrder(orderData); setPage("Order"); }}
                                statee={statee}
                                item={orderData.item} />
                        }/>
                );
                break;
            case "Order":
                // admin stuff if statement
                if(props.adminList.includes(props.uid)){
                    if(!state)
                        setState(displayedOrder.order.state);
                    return(
                        <View style={styles.page}>
                            <StateSelector
                                state={state}
                                setState={setState}/>
                            <FlatList
                                style={styles.flexer}
                                data={productListo}
                                renderItem={productData =>
                                    <View style={{width:"100%"}}>
                                        <Text style={styles.prodoct}>{productData.item.name}</Text>
                                        <FlatList
                                            style={styles.flexer2}
                                            data={productData.item.requirements}
                                            renderItem={requirementData =>
                                                <View>
                                                    <Text style={styles.tag}>{requirementData.item.tag}</Text>
                                                    <View style={styles.requirement}>
                                                        <Text>{requirementData.item.slot}</Text>
                                                    </View>
                                                </View>
                                            }/>
                                    </View>
                                }/>
                            <TextInput
                                multiline={true}
                                style={styles.quantityInputCurrency}
                                placeholder={"Response"}
                                onChangeText={(enteredText) => {props.setDescription(enteredText);} }
                                value={props.description} />
                            <OkayButton
                                style={{ width:"80%", marginBottom: 15, marginTop: 15, }}
                                textStyle={{ fontSize: 16 }}
                                onClick={() => {setDisplayedOrder(); }}
                                text={"Contact Us"} />
                        </View>
                    );
                }
                break;
        }
    };

    return(
        <SafeAreaView style={styles.letout}>
            <ArrowedHeader backToRoot={back} title={page}/>
            {normalOrClientOrdersList()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tag: {
        marginTop: 15,
        fontSize: 17,
        textAlign:"center",
    },
    requirement: {
        backgroundColor:"white",
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginTop: 5,
        borderWidth: 2,
        borderColor: Colors.Primary,
        paddingHorizontal: 30,
        alignItems:"center",
        justifyContent:"center",
    },
    prodoct: {
        paddingTop: 10,
        paddingHorizontal: 20,
        fontWeight: "bold",
        fontSize: 19,
    },
    flexer: {
        borderWidth: 2,
        borderColor: Colors.Primary,
        marginHorizontal: 5,
        marginVertical: 5,
        flex: 1,
        width:"95%",
    },
    flexer2: {
        width:"100%",
    },
    quantityInputCurrency : {
        borderColor:Colors.Primary,
        borderRadius: 10,
        minHeight: 80,
        width: "95%",
        fontWeight: "bold",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 2,
        fontSize:18,
    },
    adminHolda: {
        borderWidth: 5,
        borderColor: Colors.Accent,
        backgroundColor:Colors.Primary,
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    adminText: {
        color:"white",
        fontSize: 18,
        fontWeight:"bold",
    },
    result: {
        width: "100%",
        fontSize: 19,
        textAlign:"center",
        color:"black"
    },
    page: {
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: Colors.Dank,
        width:"100%",
        flex: 1,
    },
	customHeader: {
        height: null,
		paddingTop:18,
		paddingBottom:12
	},
    plspress: {
        fontSize: 20,
        textAlign:"center",
        paddingHorizontal: 50,
        marginTop: 20,
        marginBottom: 25,
    },
    list: {
        flex: 1,
        width: "100%",
    },
    letout: {
        width: "100%",
        flex: 1,
    },
});

export default Orders;
