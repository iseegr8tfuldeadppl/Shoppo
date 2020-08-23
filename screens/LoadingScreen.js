import React, {useState} from 'react';
import {View, StyleSheet, Image, BackHandler, PermissionsAndroid, Platform } from 'react-native';
import firebase from 'firebase';


const LoadingScreen = props =>  {


	BackHandler.addEventListener('hardwareBackPress', function() {
	    return true;
	});

	const delayTillEnter = () => {
		setTimeout(()=>{
			//Put All Your Code Here, Which You Want To Execute After Some Delay Time.

			checkIfLoggedIn();
		}, 1000);
	};

	const checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged(function(user){
			if(user && user!==null){
				props.setCurrentUser(user.uid);
				props.goHere(3);
			} else {
				props.goHere(2);
			}
		}); // to use component u have to add .bind(this) and also make it this.props.blabla
	};

	const page = () => {
		return(
			<View style={styles.screen}>
				<Image
					source={require("../images/justlogo.png")}
					style={{ width: 71.66, height: 86.33 }}
				/>
			</View>
		);
	};

	const request_permissions = async () => {
		try {
		    if (Platform.OS === 'android') {
		      	const granted = await PermissionsAndroid.request(
		        	PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
		      	); // I used redux saga here. 'yield' keywoard. You don't have to use that. You can use async - await or Promises.

		      	if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	  				delayTillEnter();
		        	// Your Save flow
				} else {
					BackHandler.exitApp();
				}
		    } else {
		      // iOS here, so you can go to your Save flow directly
		    }
	  	} catch (e) {}
	};

	request_permissions();
	return(page());
}

export default LoadingScreen;

const styles = StyleSheet.create({
	screen:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})
