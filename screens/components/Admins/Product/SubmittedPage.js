import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OkayButton from '../../OkayButton';
import {
    productWillShowUpString,
    productSubmittedString,
    backToMainMenuString,
    backToProductTypePageString
} from '../../../constants/strings';


const SubmittedPage = props => {

    const backTo = () => {
        if(props.reset)
            return(
                <OkayButton
                    style={{ minWidth: "75%", marginTop: 10 }}
                    textStyle={{ fontSize: 16 }}
                    onClick={() => {
                        if(props.setSelected) {
                            props.setSelected();
                        }
                    }}
                    text={backToProductTypePageString[props.language]} />
            );
    };

    return(
        <View style={{flex:1, justifyContent:"center", alignItems:"center", width:"100%", }}>

            <Text style={{ fontSize:20 }}>{productSubmittedString[props.language]}</Text>
            <MaterialCommunityIcons name="check" color={"green"} size={60} />
            <Text style={{ fontSize:13, color:"green", marginBottom: 30 }}>{productWillShowUpString[props.language]}</Text>

            {backTo()}

            <OkayButton
                style={{ minWidth: 220, marginTop: 10 }}
                textStyle={{ fontSize: 16 }}
                onClick={() => {
                    if(props.reset) {
                        props.reset();
                        props.onCancel();
                    } else {
                        if(props.productPreviewed)
                            props.setProductPreviewed();
                    }
                }}
                text={backToMainMenuString[props.language]} />
        </View>
    );
};

export default SubmittedPage;
