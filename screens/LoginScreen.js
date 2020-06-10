import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth'; // change this to 'expo-google-sign-in' to turn the window login into a popup, also remove behavior: 'web' from the google code maybe?
import Icon from 'react-native-vector-icons/FontAwesome';


const LoginScreen = props => {

	const [loading, setLoading] = useState(false);

	const isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			var providerData = firebaseUser.providerData;
			for (var i = 0; i < providerData.length; i++) {
				if (
					providerData[i].providerId ===
					firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.getBasicProfile().getId()
				) {
					// We don't need to reauth the Firebase connection.
					return true;
				}
			}
		}
		return false;
	};


	const onSignIn = googleUser => {
		//console.log('Google Auth Response', googleUser);
		// We need to register an Observer on Firebase Auth to make sure auth is initialized.
		var unsubscribe = firebase.auth().onAuthStateChanged(
			function(firebaseUser) {
			unsubscribe();
			// Check if we are already signed-in Firebase with the correct user.
			if (!isUserEqual(googleUser, firebaseUser)) {
				// Build Firebase credential with the Google ID token.
				var credential = firebase.auth.GoogleAuthProvider.credential(
				googleUser.idToken,
				googleUser.accessToken
				);
				// Sign in with credential from the Google user.
				firebase
				.auth()
				.signInAndRetrieveDataWithCredential(credential)
				/*
				.then(function(result) {
					if (result.additionalUserInfo.isNewUser) {
					firebase
						.database()
						.ref('/users/' + result.user.uid)
						.set({
						gmail: result.user.email,
						profile_picture: result.additionalUserInfo.profile.picture,
						first_name: result.additionalUserInfo.profile.given_name,
						last_name: result.additionalUserInfo.profile.family_name,
						created_at: Date.now()
						})
						.then(function(snapshot) {
						// console.log('Snapshot', snapshot);
						});
					} else {
					firebase
						.database()
						.ref('/users/' + result.user.uid)
						.update({
						last_logged_in: Date.now()
						});
					}
				})
				*/
				.catch(function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					var email = error.email;
					// The firebase.auth.AuthCredential type that was used.
					var credential = error.credential;
				});
				setLoading(false);
			} else {
				//console.log('User already signed-in Firebase.');
				setLoading(false);
				props.goHere(3);
			}
			} // to use component add .bind(this) here and make props into this.props
		);
	};


	const signInWithGoogleAsync = async () => {
		setLoading(true);
		try {
			const result = await Google.logInAsync({
				behavior: 'web',
				androidClientId: "366313995332-mjbmbk7ff5ds0krfam6k7hhd5ek8o6va.apps.googleusercontent.com",
				iosClientId: "366313995332-fg9o2im3ntkbvsar20preei2g7p0s5gf.apps.googleusercontent.com",
				scopes: ['profile', 'email']
			});

			if (result.type === 'success') {
				onSignIn(result);
				return result.accessToken;
			} else {
				setLoading(false);
				return { cancelled: true };
			}
		} catch (e) {
			setLoading(false);
			return { error: true };
		}
	};


	let content;
	if(loading){
		content = <ActivityIndicator style={{width:'80%',}} />
	} else {
		content = <Text style={{marginLeft: 'auto', marginRight: 'auto',}}>Sign In With Google</Text>
	}

	return (
		<View style={styles.container}>
		<TouchableOpacity
			style={styles.botton}
			onPress={() => signInWithGoogleAsync()}>
			<Icon
				style={{alignSelf:'flex-start'}}
				name="google"
				size={28}
				reverse
				color="black" />
			{content}
		</TouchableOpacity>
		</View>
	);
}


export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botton:{
	shadowColor: 'black',
	shadowOffset: { width: 0, height: 2},
	shadowOpacity: 0.26,
	shadowRadius: 0,
	borderColor: 'black',
	width: '80%',
	paddingHorizontal: 10,
	paddingVertical: 10,
	borderWidth: 1, 
	borderRadius: 30, 
	flexDirection: 'row', 
	justifyContent: 'center', 
	alignItems: 'center',
	elevation: 4,
	backgroundColor: 'white',
  }
});