// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, FlatList, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Header from '../components/Header';
import SideCategoryItem from '../components/SideCategoryItem';
import CategoryPreview from '../components/CategoryPreview';


const Categories = props => {

    const [categoryPreviewed, setCategoryPreviewed] = useState();

    if(props.tabPressedWhileWereStillInThePage){
        setCategoryPreviewed();
    }

	BackHandler.addEventListener('hardwareBackPress', function() {
	    if(categoryPreviewed)
            setCategoryPreviewed();
	    return true;
	});

    const list = () => {
        return(
            <FlatList
        		style={{paddingHorizontal: 8, paddingTop:10, flex:1 }}
        		data={props.categories}
        		renderItem={categoryData =>
                    <SideCategoryItem
                        setCategoryPreviewed={setCategoryPreviewed}
                        item={categoryData.item}/>
        		}/>
        );
    };

    const categoryPreviewedTitle = () =>{
        if(categoryPreviewed)
            return categoryPreviewed.category;
        else
            return "";
    };

    const page = () => {

        if(categoryPreviewed){
            return(
            <>
            <Header style={styles.header}>
                <TouchableOpacity
                    onPress={() => {setCategoryPreviewed();} }>
                    <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
                </TouchableOpacity>
                <View style={{ justifyContent:"center", alignItems:"flex-start", flex: 1 }}><Text style={styles.headertitle}>{categoryPreviewedTitle()}</Text></View>
            </Header>
            <CategoryPreview
                item={categoryPreviewed}
                setProductPreviewed={props.setProductPreviewed}/>
            </>
            );
        } else {
        return(
            <>
            <Header style={styles.header}>
                <TouchableOpacity
                    onPress={() => {setCategoryPreviewed();} }>
                    <MaterialCommunityIcons name="menu" color={"white"} size={30} />
                </TouchableOpacity>
                <View style={styles.headertitleholder}><Text style={styles.headertitle}>Categories</Text></View>
            </Header>

            {list()}
            </>
        );
        }
    };

  return (
    <SafeAreaView style={{ flex: 1 }}>
		{page()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	header:{
		height: 90,
	},
    headertitleholder: {
        justifyContent:"center",
        alignItems:"flex-start",
        flex: 1
    },
    headertitle: {
        textAlign:"center",
        fontSize: 23,
        color:"white",
        marginHorizontal: 11,
    },
});
export default Categories;
