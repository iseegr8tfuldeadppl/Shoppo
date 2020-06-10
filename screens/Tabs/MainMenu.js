// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';

const MainMenu = props => {
  return (
    <SafeAreaView style={{ flex: 1}}>
	<Header>
        <TouchableOpacity
			onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
			<MaterialCommunityIcons name="menu" color={"white"} size={30} />
		</TouchableOpacity>
		<Text style={{
			color: 'white',
			fontSize: 18,}}>Main Menu</Text>
	</Header>
	<ScrollView style={{paddingHorizontal: 8}}>
		<Text>yes</Text>
	</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
export default MainMenu;