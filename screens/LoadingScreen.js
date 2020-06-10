import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import firebase from 'firebase';

const LoadingScreen = props =>  {

	const delayTillEnter = () => {
		setTimeout(()=>{
			//Put All Your Code Here, Which You Want To Execute After Some Delay Time.

			// initialize firebase if not aleady been
			if(!firebase.apps.length)
				firebase.initializeApp(firebaseConfig);

			checkIfLoggedIn();
		}, 1000);
	}

	const checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				props.navigation.navigate('DashboardScreen');
			} else {
				props.navigation.navigate('LoginScreen');
			}
		}); // to use component u have to add .bind(this) and also make it this.props.blabla
	}
	
	delayTillEnter();
	return(
		<View style={styles.screen}>
			<Image
				source={require("../images/justlogo.png")}
				style={{ width: 71.66, height: 86.33 }}
			/>
		</View>
	);
}

export default LoadingScreen;

const styles = StyleSheet.create({
	screen:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})