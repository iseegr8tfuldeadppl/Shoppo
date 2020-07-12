import React, {useState} from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/Colors';
import OkayButton from '../../OkayButton';
import firebase from 'firebase';
import Header from '../../Header';


const CategorySettingsModal = props => {

    const [priority, setPriority] = useState(props.visible.priority.toString());
    const [name, setName] = useState(props.visible.category);
    const [invisible, setInvisible] = useState(props.visible.invisible);

    console.log(props.visible.priority);

	//admin stuff
	const deleteConfirmation = () => {
		Alert.alert(
			'Delete this category',
			'Are you sure you want to delete this category from the store?',
			[
				{text: "No Don't Delete it", style: 'cancel'},
				{text: 'Yes Delete It', style: 'destructive',
					onPress: () => {
						let ref = firebase.database().ref("/categories/" + props.visible.key)
						.remove().then(function(snapshot) {
							Alert.alert('Success', 'Category was deleted', [{text: "Ok", style: 'cancel'}], { cancelable: true });
                            props.setCategorySettings();
						});
					}
				}],
			{ cancelable: true }
		);
	};

    const update = () => {
        if(name===""){
    		Alert.alert(
    			'Failed',
    			'Category requires a name.',
    			[
                    {text: 'Ok', style: 'cancel'}
                ],
    			{ cancelable: true }
    		);
            return;
        }

        if(invisible!==props.visible.invisible){
    		let ref = firebase.database().ref('/categories/' + props.visible.key + '/invisible');
    		ref.set(invisible)
    		.then(function(snapshot) {
    			//console.log('Snapshot', snapshot);
                if(name!==props.visible.category){
            		ref = firebase.database().ref('/categories/' + props.visible.key + '/name');
            		ref.set(name)
            		.then(function(snapshot) {
            			//console.log('Snapshot', snapshot);

                        if(priority!==props.visible.priority){
                    		ref = firebase.database().ref('/categories/' + props.visible.key + '/priority');
                    		ref.set(priority? priority: 1)
                    		.then(function(snapshot) {
                    			//console.log('Snapshot', snapshot);

                        		Alert.alert(
                        			'Successful',
                        			'Your updates have been applied!',
                        			[
                                        {text: 'Ok', style: 'cancel'},
                        				{text: 'Exit', style: 'destructive', onPress: () => { props.setCategorySettings(); } }],
                        			{ cancelable: true }
                        		);
                    		});
                        } else {
                    		Alert.alert(
                    			'Successful',
                    			'Your updates have been applied!',
                    			[
                                    {text: 'Ok', style: 'cancel'},
                    				{text: 'Exit', style: 'destructive', onPress: () => { props.setCategorySettings(); } }],
                    			{ cancelable: true }
                    		);
                        }

            		});
                } else {
            		Alert.alert(
            			'Successful',
            			'Your updates have been applied!',
            			[
                            {text: 'Ok', style: 'cancel'},
            				{text: 'Exit', style: 'destructive', onPress: () => { props.setCategorySettings(); } }],
            			{ cancelable: true }
            		);
                }
    		});
        } else {
            if(name!==props.visible.category){
        		let ref = firebase.database().ref('/categories/' + props.visible.key + '/name');
        		ref.set(name)
        		.then(function(snapshot) {
        			//console.log('Snapshot', snapshot);

            		Alert.alert(
            			'Successful',
            			'Your updates have been applied!',
            			[
                            {text: 'Ok', style: 'cancel'},
            				{text: 'Exit', style: 'destructive', onPress: () => { props.setCategorySettings(); } }],
            			{ cancelable: true }
            		);
        		});
            }
        }
    };

    const visibility = whichone => {
        if(whichone){
            if(invisible)
                return styles.onselected;
            return styles.one;
        }

        if(invisible)
            return styles.one;
        return styles.onselected;
    };


    return(
        <Modal
            visible={props.visible!==undefined}>

            <View
                style={styles.page}>
                <Header style={{height: null, paddingTop: null}}>
                    <TouchableOpacity
                        style={{paddingVertical: 10}}
                        onPress={() => {props.setCategorySettings();} }>
                        <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
                    </TouchableOpacity>
                    <View style={styles.headertitleholder}><Text style={styles.headertitle}>Category Settings</Text></View>
                    <TouchableOpacity onPress={deleteConfirmation} style={{paddingVertical: 10}}>
                        <MaterialCommunityIcons name="trash-can-outline" color={"red"} size={50} />
                    </TouchableOpacity>
                </Header>

                <View style={{paddingHorizontal: 10, flex:1, justifyContent:"center", backgroundColor:"white", marginBottom: 10, width:"100%",alignItems:"center",}}>
                    <View style={styles.horizontal}>

                        <Text style={styles.sub}>Visibility</Text>

                        <TouchableOpacity style={visibility(false)} onPress={() => {setInvisible(false);}}>
                            <Text style={styles.selection}>Visible</Text>
                            <MaterialCommunityIcons name="eye" color={"white"} size={40} />
                        </TouchableOpacity>

                        <TouchableOpacity style={visibility(true)} onPress={() => {setInvisible(true);}}>
                            <Text style={styles.selection}>Invisible</Text>
                            <MaterialCommunityIcons name="eye-off" color={"white"} size={40} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.sub}>Priority</Text>
                        <TextInput
                            style={styles.input}
                            blurOnSubmit
                            autoCapitalize="none"
                            placeholder={"Priority (Optional)"}
                            autoCorrect={false}
                            keyboardType="number-pad"
                            onChangeText={(enteredText) => {setPriority(enteredText);} }
                            value={priority} />
                    </View>
                    <View style={{...styles.horizontal, ...{marginBottom: 40}}}>
                        <Text style={styles.sub}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Category Name"
                            onChangeText={(namo) => {setName(namo);}}
                            value={name} />
                    </View>

                    <View style={{flexDirection:"row", marginBottom: 5,}}>
                        <OkayButton
                            style={{
                                flex: 1,
                                marginHorizontal: 5,
                            }}
                            textStyle={{
                                fontSize: 16,
                            }}
                            onClick={() => {
                                update();
                            }}
                            text={"Save"} />
                        <OkayButton
                            style={{
                                flex: 1,
                                marginHorizontal: 5,
                            }}
                            textStyle={{
                                fontSize: 16,
                            }}
                            onClick={() => {
                                props.setCategorySettings();
                            }}
                            text={"Cancel"} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    selection: {

    },
    one: {
        flex: 1,
        backgroundColor:Colors.Accent,
        borderRadius: 16,
        padding: 10,
        marginHorizontal: 10,
        alignItems:"center",
        justifyContent:"center",
    },
    selection: {
        color:"white",
        textAlign:"center",
        fontSize: 15,
    },
    onselected: {
        flex: 1,
        borderWidth: 6,
        borderColor: Colors.Primary,
        backgroundColor:Colors.Accent,
        borderRadius: 16,
        padding: 10,
        marginHorizontal: 10,
        alignItems:"center",
        justifyContent:"center",
    },
    horizontal: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    sub: {
        marginEnd: 10,
        fontSize: 17,
        fontWeight:"bold",
        flex: 1,
    },
    page: {
        flex: 1,
        width: "100%",
        alignItems:"center",
        justifyContent:"center"
    },
    title: {
        fontWeight:"bold",
        fontSize: 23,
        marginBottom: 45,
    },
	input : {
		width:"70%",
		height: 50,
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:"30%",
		textAlign:'center',
		borderWidth: 1,
		marginVertical: 10,
	},
    headertitleholder: {
        justifyContent:"center",
        alignItems:"flex-start",
        flex: 1
    },
    headertitle: {
        textAlign:"center",
        fontSize: 23,
        color:"white",
        marginHorizontal: 11,
    },
});

export default CategorySettingsModal;
