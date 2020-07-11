import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth'; // change this to 'expo-google-sign-in' to turn the window login into a popup, also remove behavior: 'web' from the google code maybe?
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './components/Card';
import moment from 'moment';


const LoginScreen = props => {

	const [loading, setLoading] = useState(false);

	BackHandler.addEventListener('hardwareBackPress', function() {
	    return true;
	});

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
				.then(function(result) {
					firebase
					.database()
					.ref('/users/' + result.user.uid)
					.set({
						gmail: result.user.email,
						profile_picture: result.additionalUserInfo.profile.picture,
						first_name: result.additionalUserInfo.profile.given_name? result.additionalUserInfo.profile.given_name : "",
						last_name: result.additionalUserInfo.profile.family_name? result.additionalUserInfo.profile.family_name : ""
					})
					.then(function(snapshot) {
						console.log('Snapshot' + snapshot);
						if (result.additionalUserInfo.isNewUser) {
							firebase
							.database()
							.ref('/userList/' + result.user.uid)
							.set({
								n: moment().format('YYYYMMDDhhmmssa')
							});
						}
					});
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

	const page = () => {
		if(!props.connection){
			return(
				<View style={styles.screen}>
					<Text style={{color:"red", fontSize: 25, fontWeight:"bold"}}>No Internet</Text>
                	<MaterialCommunityIcons name="wifi-off" color={"red"} size={60} />
				</View>
			);
		} else {
			return(
				<View style={styles.container}>
				<Card
					style={styles.botton}
					onPress={() => signInWithGoogleAsync()}>
					<MaterialCommunityIcons name="google" color={"black"} size={28} />
					{content}
				</Card>
				</View>
			);
		}
	};

	return (
		page()
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
	borderColor: 'black',
	width: '80%',
	paddingHorizontal: 10,
	paddingVertical: 10,
	borderWidth: 1,
	borderRadius: 30,
	flexDirection: 'row',
	justifyContent: 'center',
	backgroundColor: 'white',
  }
});
