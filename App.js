import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import firebaseConfig from './screens/constants/ApiKeys';
import firebase from 'firebase';
import { defaultLanguage } from './screens/constants/strings';

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import NetInfo from '@react-native-community/netinfo';


export default function App() {

	// for Debugging only
	//console.disableYellowBox = true;

	const [language, setLanguage] = useState(defaultLanguage);
	const [connection, setConnection] = useState(true);
	const [page, setPage] = useState(1);
	const [uid, setUID] = useState("");

	if(!firebase.apps.length)
		firebase.initializeApp(firebaseConfig);

	// Subscribe
	const unsubscribe = NetInfo.addEventListener(state => {
	  //console.log("Connection type", state.type);
	  if(connection!=state.isConnected)
	  	setConnection(state.isConnected);
	  	//unsubscribe();
	});

	const goToPage = DestinationPage => {
		setPage(DestinationPage);
	};
	const setCurrentUser = uid => {
		setUID(uid);
	};

	const lapage = () => {
		if(page===1){
			return(
				<LoadingScreen language={language} setLanguage={setLanguage} connection={connection} setCurrentUser={setCurrentUser} goHere={goToPage}/>
			);
		} else if(page===2){
			return(<LoginScreen language={language} setLanguage={setLanguage}  connection={connection} goHere={goToPage}/>);
		} else if(page===3){
			return(<DashboardScreen language={language} setLanguage={setLanguage}  connection={connection} uid={uid} goHere={goToPage}/>);
		}
	};

	return  (
		lapage()
	);
}
