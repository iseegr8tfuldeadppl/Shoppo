import React from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Product from './Product/Product';
import Category from './Category/Category';
import firebase from 'firebase';

const AddNewItemModal = props => {

  const onAdd = (name, priority) => {
        if(!priority)
            priority = '1';

        firebase.database()
		.ref('/categories/')
		.push({
			name: name,
    		priority: parseInt(priority)
		})
		.then(function(snapshot) {
			props.setData();
			props.onCancel();
			//console.log('Snapshot', snapshot);
		});
  };

    const menu = () => {
    	if(!props.data){
            return(
                <Category
                    language={props.language}
                    onCancel={props.onCancel}
                    onAdd={onAdd}/>
            );
    	}
		return(
            <Product
                categories={props.categories}
				data={props.data}
				onAdd={onAdd}
				onCancel={props.onCancel}/>
        );
    };

	return (
		<Modal visible={props.doIShowUp} animationType="slide">
			<TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
				{menu()}
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddNewItemModal;
