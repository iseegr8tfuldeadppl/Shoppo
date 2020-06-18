import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import firebaseConfig from './screens/constants/ApiKeys';
import firebase from 'firebase';

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {


	// for Debugging only
	console.disableYellowBox = true;

	const [page, setPage] = useState(1);
	const [uid, setUID] = useState("");
	let content;

	if(!firebase.apps.length)
		firebase.initializeApp(firebaseConfig);

	const goToPage = DestinationPage => {
		setPage(DestinationPage);
	};
	const setCurrentUser = uid => {
		setUID(uid);
	};

	if(page===1){
		content = <LoadingScreen setCurrentUser={setCurrentUser} goHere={goToPage}/>
	} else if(page===2){
		content = <LoginScreen goHere={goToPage}/>
	} else if(page===3){
		content = <DashboardScreen uid={uid} goHere={goToPage}/>
	}

	return  (
		<View style={styles.screen}>
			{content}
		</View>
	);
}


const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
