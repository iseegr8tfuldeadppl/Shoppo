import React, {useState} from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';
import possibleRequirements from '../../../constants/possibleRequirements';
import Colors from '../../../constants/Colors';
import {
    noRequirementsAlertString,
    selectRequirementsString,
    resetToDefaultString
} from '../../../constants/strings';


const RequirementsPage = props => {

    if(!props.requirements){
        let possibleRequirementsTemp = possibleRequirements.slice();

        // clear the trues first apparently they aren't reset automatically
        for(let i=0; i<possibleRequirementsTemp.length; i++)
            possibleRequirementsTemp[i].selected = false;

        if(props.selected){
            for(let i=0; i<props.selected.requirements.length; i++){
                for(let j=0; j<possibleRequirementsTemp.length; j++){
                    if(possibleRequirementsTemp[j].tag===props.selected.requirements[i]){
                        possibleRequirementsTemp[j].selected = true;
                    }
                }
            }
        } else {
            let submittable_requirements = props.submittable_requirements.split(",");
            for(let i=0; i<submittable_requirements.length; i++){
                for(let j=0; j<possibleRequirementsTemp.length; j++){
                    if(possibleRequirementsTemp[j].tag===submittable_requirements[i]){
                        possibleRequirementsTemp[j].selected = true;
                    }
                }
            }
        }
        props.setRequirements(possibleRequirementsTemp);
    }

    const switchIt = singleRequirementData => {
        let possibleRequirementsTemp = possibleRequirements.slice();
        for(let i=0; possibleRequirementsTemp.length; i++){
            if(singleRequirementData.item.tag===possibleRequirementsTemp[i].tag){
                possibleRequirementsTemp[i].selected = ! possibleRequirementsTemp[i].selected;
                break;
            }
        }
        props.setRequirements(possibleRequirementsTemp);
    };

    const doicheckit = singleRequirementData => {
        if(props.selected){
            for(let i=0; i<props.selected.requirements.length; i++){
                if(singleRequirementData.item.tag===props.selected.requirements[i])
                    return true;
            }
        } else {
            let submittable_requirements = props.submittable_requirements.split(",");
            for(let i=0; i<submittable_requirements.length; i++){
                if(singleRequirementData.item.tag===submittable_requirements[i])
                    return true;
            }
        }
        return false;
    };

    if(props.requirements)
        if(props.requirements.length===0)
            return(
                <View style={styles.list}>
                    <Text style={styles.plspress}>{noRequirementsAlertString[props.language]}</Text>
                </View>
            );

    return(
        <View style={styles.list}>

            <Text style={styles.plspress}>{selectRequirementsString[props.language]}</Text>
            <TouchableOpacity activeOpacity={0.6} style={styles.resetHolder} onPress={() => {setRequirements();}}>
                <Text style={styles.reset}>{resetToDefaultString[props.language]}</Text>
            </TouchableOpacity>

            <FlatList
                style={styles.list}
                data={props.requirements}
                renderItem={singleRequirementData =>
                    <View style={styles.item}>
                        <CheckBox
                            value={singleRequirementData.item.selected}
                            onValueChange={switchIt.bind(this, singleRequirementData)} />
                        <Text style={styles.flexin}>{singleRequirementData.item.title}</Text>
                    </View>
                }/>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems:"center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor:"black",
        borderBottomWidth: 1,
    },
    flexin: {
        fontSize: 16,
        paddingStart: 10,
        flex: 1,
    },
    plspress: {
        fontSize: 20,
        textAlign:"center",
        paddingHorizontal: 50,
        marginTop: 20,
        marginBottom: 25,
    },
    reset: {
        fontSize: 20,
        textAlign:"center",
        paddingHorizontal: 10,
        color: "white",
    },
    resetHolder: {
        paddingVertical: 10,
        backgroundColor: Colors.Primary,
    },
    list: {
        borderTopColor:"gray",
        borderTopWidth:1,
        flex: 1,
        width: "100%",
    },
});

export default RequirementsPage;
