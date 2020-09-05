import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import firebase from 'firebase';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './components/Card';
import moment from 'moment';
import Colors from './constants/Colors';
import {
	signInWithGoogleString,
	noInternetString
} from './constants/strings';


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
					.update({
						gmail: result.user.email,
						profile_picture: result.additionalUserInfo.profile.picture,
						first_name: result.additionalUserInfo.profile.given_name? result.additionalUserInfo.profile.given_name : "",
						last_name: result.additionalUserInfo.profile.family_name? result.additionalUserInfo.profile.family_name : ""
					})
					.then(function(snapshot) {
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
		    await GoogleSignin.hasPlayServices();
		    const result = await GoogleSignin.signIn();

			if (result) {
				onSignIn(result);
				return result.accessToken;
			} else {
				setLoading(false);
				return { cancelled: true };
			}
		} catch (error) {
			setLoading(false);

			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
		      // user cancelled the login flow
		    } else if (error.code === statusCodes.IN_PROGRESS) {
		      // operation (e.g. sign in) is in progress already
		    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
		      // play services not available or outdated
		    } else {
		      // some other error happened
		    }

			return { error: true };
		}
	};

	const content = () => {
		if(loading)
			return(
				<ActivityIndicator color={Colors.Accent} style={{width:'89%',}} />
			);
		return(
			<Text style={{marginLeft: 'auto', marginRight: 'auto', color:Colors.Accent, fontSize:16}}>{signInWithGoogleString[props.language]}</Text>
		);
	};

	const page = () => {
		if(!props.connection)
			return(
				<View style={styles.container}>
					<Text style={{color:"red", fontSize: 25, fontWeight:"bold"}}>{noInternetString[props.language]}</Text>
                	<MaterialCommunityIcons name="wifi-off" color={"red"} size={60} />
				</View>
			);

		return(
			<View style={styles.container}>

				<View
					style={{flex: 1, width:"100%", justifyContent:"center", alignItems:"center"}}>
					<Image
						source={require("../images/justlogo.png")}
						style={{ width: 71.66, height: 86.33, marginBottom: 60 }}
					/>
				</View>

				<Card
					style={styles.botton}
					onPress={() => signInWithGoogleAsync()}>
					<MaterialCommunityIcons name="google" color={Colors.Accent} size={31} />
					{content()}
				</Card>
			</View>
		);
	};

	useEffect(() => {
	   // androidClientId: 366313995332-mjbmbk7ff5ds0krfam6k7hhd5ek8o6va.apps.googleusercontent.com
	   GoogleSignin.configure({
		 	webClientId: "366313995332-d8u2f0t1ktp09578j2081l1d5e09tc3i.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
		 	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		 	iosClientId: "366313995332-fg9o2im3ntkbvsar20preei2g7p0s5gf.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
	   });
	 }, []);

	return (page());
}


export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botton:{
	borderColor: Colors.Accent,
	width: '80%',
	paddingHorizontal: 10,
	paddingVertical: 10,
	borderWidth: 1,
	borderRadius: 30,
	flexDirection: 'row',
	justifyContent: 'center',
	backgroundColor: 'white',
	marginBottom: 70
  }
});
