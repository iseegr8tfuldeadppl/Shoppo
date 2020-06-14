import React from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Product from './Product/Product';
import Category from './Category/Category';
import firebase from 'firebase';

const AddNewItemModal = props => {

  const onAdd = (name) => {
	console.log(name);
	if(props.data){
		firebase.database()
			.ref('/categories/' + props.data.key + "/products")
			.push({
				data: JSON.stringify(name),
			})
			.then(function(snapshot) {
				
				props.setData();
				props.onCancel();
				//console.log('Snapshot', snapshot);
			});
	} else {
		firebase.database()
			.ref('/categories/')
			.push({
				name: name,
			})
			.then(function(snapshot) {
				props.setData();
				props.onCancel();
				//console.log('Snapshot', snapshot);
			});
	}

  };

	let menu;
	if(props.data){
		menu = <Product 
				data={props.data}
				onAdd={onAdd}
				onCancel={props.onCancel}/>
	} else {
		menu = <Category 
				onCancel={props.onCancel}
				onAdd={onAdd}/>
	}

	return (
		<Modal visible={props.doIShowUp} animationType="slide">
			<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
				{menu}
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddNewItemModal;