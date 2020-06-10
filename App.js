import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert, Button} from 'react-native';
import firebaseConfig from './constants/ApiKeys';
import firebase from 'firebase';
import MainStackNavigator from './navigation/MainStackNavigator'

export default function App() {
	
	if(!firebase.apps.length)
		firebase.initializeApp(firebaseConfig);
		
	return <MainStackNavigator />
}


const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
