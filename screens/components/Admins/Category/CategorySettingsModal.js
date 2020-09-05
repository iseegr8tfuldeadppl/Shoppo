import React, {useState} from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/Colors';
import OkayButton from '../../OkayButton';
import firebase from 'firebase';
import Header from '../../Header';
import {
    successString,
    categoryWasDeletedString,
    deleteThisCategoryString,
    submitString,
    deleteThisCategoryLongString,
    dontDeleteThisCategoryString,
    doDeleteThisCategoryString,
    failedString,
    pleaseWriteCategoryString,
    okString,
    updatesAppliedAlertString,
    cancelString,
    categoryNameString,
    nameString,
    priorityOptionalString,
    priorityString,
    visibilityString,
    visibleString,
    invisibleString,
    categorySettingsString
} from '../../../constants/strings';


const CategorySettingsModal = props => {

    const [priority, setPriority] = useState(props.visible.priority.toString());
    const [name, setName] = useState(props.visible.category);
    const [invisible, setInvisible] = useState(props.visible.invisible);

	//admin stuff
	const deleteConfirmation = () => {
		Alert.alert(
			deleteThisCategoryString[props.language],
			deleteThisCategoryLongString[props.language],
			[
				{text: dontDeleteThisCategoryString[props.language], style: 'cancel'},
				{text: doDeleteThisCategoryString[props.language], style: 'destructive',
					onPress: () => {
						let ref = firebase.database().ref("/categories/" + props.visible.key)
						.remove().then(function(snapshot) {
							Alert.alert(successString[props.language], categoryWasDeletedString[props.language],
                                [{text: okString[props.language], style: 'cancel'}], { cancelable: true });
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
    			failedString[props.language],
    			pleaseWriteCategoryString[props.language],
    			[
                    {text: okString[props.language], style: 'cancel'}
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
                        			successString[props.language],
                        			updatesAppliedAlertString[props.language],
                        			[
                                        {text: okString[props.language], style: 'cancel'},
                        				{text: cancelString[props.language], style: 'destructive', onPress: () => {
                                            props.setCategorySettings();
                                        } }],
                        			{ cancelable: true }
                        		);
                    		});
                        } else {
                    		Alert.alert(
                    			successString[props.language],
                    			updatesAppliedAlertString[props.language],
                    			[
                                    {text: okString[props.language], style: 'cancel'},
                    				{text: cancelString[props.language], style: 'destructive', onPress: () => {
                                        props.setCategorySettings();
                                    } }],
                    			{ cancelable: true }
                    		);
                        }

            		});
                } else {
            		Alert.alert(
                        successString[props.language],
                        updatesAppliedAlertString[props.language],
            			[
                            {text: okString[props.language], style: 'cancel'},
            				{text: cancelString[props.language], style: 'destructive', onPress: () => {
                                props.setCategorySettings();
                            } }],
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
                        successString[props.language],
                        updatesAppliedAlertString[props.language],
            			[
                            {text: okString[props.language], style: 'cancel'},
            				{text: cancelString[props.language], style: 'destructive', onPress: () => {
                                props.setCategorySettings();
                            } }],
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
                <Header style={styles.nuller}>
                    <TouchableOpacity
                        style={styles.headerIcon}
                        onPress={() => {props.setCategorySettings();} }>
                        <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
                    </TouchableOpacity>
                    <View style={styles.headertitleholder}><Text style={styles.headertitle}>{categorySettingsString[props.language]}</Text></View>
                    <TouchableOpacity onPress={deleteConfirmation} style={{paddingVertical: 10}}>
                        <MaterialCommunityIcons name="trash-can-outline" color={"red"} size={50} />
                    </TouchableOpacity>
                </Header>

                <View style={styles.holder}>
                    <View style={styles.horizontal}>

                        <Text style={styles.sub}>{visibilityString[props.language]}</Text>

                        <TouchableOpacity style={visibility(false)} onPress={() => {setInvisible(false);}}>
                            <Text>{visibleString[props.language]}</Text>
                            <MaterialCommunityIcons name="eye" color={"white"} size={40} />
                        </TouchableOpacity>

                        <TouchableOpacity style={visibility(true)} onPress={() => {setInvisible(true);}}>
                            <Text>{invisibleString[props.language]}</Text>
                            <MaterialCommunityIcons name="eye-off" color={"white"} size={40} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.sub}>{priorityString[props.language]}</Text>
                        <TextInput
                            style={styles.input}
                            blurOnSubmit
                            autoCapitalize="none"
                            placeholder={priorityOptionalString[props.language]}
                            autoCorrect={false}
                            keyboardType="number-pad"
                            onChangeText={(enteredText) => {setPriority(enteredText);} }
                            value={priority} />
                    </View>
                    <View style={{...styles.horizontal, ...{marginBottom: 40}}}>
                        <Text style={styles.sub}>{nameString[props.language]}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={categoryNameString[props.language]}
                            onChangeText={(namo) => {setName(namo);}}
                            value={name} />
                    </View>

                    <View style={styles.okaybuttonsholder}>
                        <OkayButton
                            style={styles.okaybutton}
                            textStyle={styles.text}
                            onClick={() => {
                                update();
                            }}
                            text={submitString[props.language]} />
                        <OkayButton
                            style={styles.okaybutton}
                            textStyle={styles.text}
                            onClick={() => {
                                props.setCategorySettings();
                            }}
                            text={cancelString[props.language]} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    nuller: {
        height: null,
        paddingTop: null
    },
    okaybuttonsholder: {
        flexDirection:"row",
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
    },
    okaybutton: {
        flex: 1,
        marginHorizontal: 5,
    },
    holder: {
        paddingHorizontal: 10,
        flex:1,
        justifyContent:"center",
        backgroundColor:"white",
        marginBottom: 10,
        width:"100%",
        alignItems:"center",
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
    headerIcon: {
        paddingVertical: 10
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
