import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OkayButton from '../../OkayButton';


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
                        } else {

                        }
                    }}
                    text={"Back to product type page"} />
            );
    };

    return(
        <View style={{flex:1, justifyContent:"center", alignItems:"center", width:"100%", }}>

            <Text style={{ fontSize:20 }}>Product Submitted!</Text>
            <MaterialCommunityIcons name="check" color={"green"} size={60} />
            <Text style={{ fontSize:13, color:"green", marginBottom: 30 }}>Product will show up instantly to all clients!</Text>

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
                text={"Back to Main Menu"} />
        </View>
    );
};

export default SubmittedPage;
