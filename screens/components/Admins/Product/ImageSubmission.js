import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/Colors';
import ImagePicker from 'react-native-image-picker';
import OkayButton from '../../OkayButton';
import {
    previewString,
    selectAnotherPictureString,
    takePictureOrSelectPictureAlertString,
    orString
} from '../../../constants/strings';


const ImageSubmission = props => {

  	const galery = async () => {
	    let result = await ImagePicker.launchImageLibraryAsync();

	    if (!result.cancelled) {
			props.setImageUri(result.uri);
	    }
    };

    const camera = async () => {
        let result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled)
          props.setImageUri(result.uri);
    };

    const previewBotton = () => {
        if(props.selected){
            return(
                <OkayButton
                    style={{ marginTop:10 }}
                    textStyle={{ fontSize: 16 }}
                    onClick={props.preview}
                    text={previewString[props.language]} />
            );
        }
        return;
    };

    if(props.imageUri || props.preselectedBanner){
        return(
             <View style={styles.regularPage}>

                 <Text style={{ fontSize:20 }}>Image Selected!</Text>
                 <MaterialCommunityIcons name="check" color={"green"} size={60} />

                  <OkayButton
                      style={{ marginTop:10 }}
                      textStyle={{ fontSize: 16 }}
                      onClick={() => {props.setImageUri(); props.setImageUrl(""); if(!props.selected) props.setPreselectedBanner(false); }}
                      text={selectAnotherPictureString[props.language]} />

                   {previewBotton()}

             </View>
        );
    }

   return(
        <View style={styles.regularPage}>

            <View style={styles.hideable}>
                <Text style={styles.select}>{takePictureOrSelectPictureAlertString[props.language]}</Text>

                <View style={{ flexDirection:"row" }}>
                    <TouchableOpacity
                            onPress={galery}
                            activeOpacity={.70}
                            style={{...styles.imageSelector, ...{ marginEnd: 10 }}}>
                        <MaterialCommunityIcons name="image" color={"white"} size={60} />
                    </TouchableOpacity>

                    <TouchableOpacity
                            onPress={camera}
                            activeOpacity={.70}
                            style={{...styles.imageSelector, ...{ marginStart: 10 }}}>
                        <MaterialCommunityIcons name="camera" color={"white"} size={60} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.or}>{orString[props.language]}</Text>
            </View>


            <View style={styles.showable}>
                <TextInput
                    style={styles.quantityInputCurrency}
                    blurOnSubmit
                    placeholder={props.hint}
                    onChangeText={(enteredText) => {props.setImageUrl(enteredText);} }
                    value={props.imageUrl} />
            </View>
        </View>
   );
};


const styles = StyleSheet.create({
    showable: {
        paddingTop: 40,
        paddingHorizontal: 10,
        width: "100%",
        backgroundColor:"white",
    },
    or: {
        fontSize:22,
        paddingHorizontal:18,
        textAlign:"center",
        fontWeight: "bold",
        marginBottom:10
    },
    select: {
        backgroundColor: "#FFF",
        fontSize:22,
        paddingHorizontal:18,
        textAlign:"center",
        marginBottom:25
    },
    hideable: {
        alignItems:"center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
    },
	regularPage: {
        alignItems:"center",
        justifyContent:"center",
		width:"100%",
		flex:1,
	},
	quantityInputCurrency : {
        marginBottom: 60,
		borderColor:Colors.Primary,
		borderRadius: 10,

		paddingVertical: 3,
		fontWeight: "bold",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderWidth: 2,
		fontSize:18,
		textAlign:'center',
	},
	imageSelector: {
		borderRadius:150,
		width:90,
		height:90,
		backgroundColor: Colors.Primary,
		justifyContent:"center",
		alignItems:"center",
	},
});

export default ImageSubmission;
