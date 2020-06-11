import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Modal } from 'react-native';


const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');
  
  function goalInputHandler(enteredText) {
  	  setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
  	  props.onAddGoal(enteredGoal);
	  setEnteredGoal('');
  };

  const cancelGoalHandler = () => {
  	  props.onCancelGoal();
	  setEnteredGoal('');
  };

	return (
	<Modal visible={props.visible} animationType="slide">
		<View style={styles.inputContainer}>
			<TextInput
				placeholder="Course Goal"
				style={styles.inputField}
				onChangeText={goalInputHandler}
				value={enteredGoal} />
			<View
				style={styles.bottonsHolder}>
				<View style={{width: '40%'}}>
					<Button
						color="red"
						title="Cancel"
						onPress={cancelGoalHandler} />
				</View>
				<View style={{width: '40%'}}>
					<Button
						title="Add"
						onPress={addGoalHandler} />
				</View> 
			</View>
		</View>
	</Modal>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	inputField: {
		borderColor: 'black',
		borderWidth: 1,
		padding: 10,
		width: '80%'
	},
	bottonsHolder: {
		marginTop: 10,
		width: '60%',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
	}
});

export default GoalInput;