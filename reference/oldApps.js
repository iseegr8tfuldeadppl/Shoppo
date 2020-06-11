import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import GoalItem from './componentos/GoalItem';
import GoalInput from './componentos/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  console.log('lol');

  const addGoalHandler = goalTitle => {
	setCourseGoals(currentGoals => [
		...currentGoals,
		{id: Math.random().toString(), value: goalTitle }
	]);
	setIsAddMode(false);
  };
  
  const cancelGoalHandler = () => {
	setIsAddMode(false);
  };

  const deleteGoalHandler = goalId => {
  	  setCourseGoals(currentGoals => {
		return currentGoals.filter((goal) => goal.id !== goalId);
	  });
  };

   
  return (
    <View style={styles.screen}>
	<Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
		<GoalInput 
		visible={isAddMode}
		onAddGoal={addGoalHandler}
		onCancelGoal={cancelGoalHandler}/>

		<FlatList 
			keyExtractor={(item, index) => item.id}
			data={courseGoals} 
			renderItem={itemData => 
				<GoalItem
					id ={itemData.item.id}
					onDelete={deleteGoalHandler}
					title={itemData.item.value}
				/>
			}
		/>
	</View>
  );
}

const styles = StyleSheet.create({
	screen: {
		padding: 50,
	},
});
