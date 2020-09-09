// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Card from '../components/Card';
import AddNewItemModal from '../components/Admins/AddNewItemModal';
import Header from '../components/Header';
import ProductPreviewModal from '../components/ProductPreviewModal';
import MainCategoryItem from '../components/MainCategoryItem';
import CategoryPreview from '../components/CategoryPreview';
import Taboo from '../components/Taboo';
import CategorySettingsModal from '../components/Admins/Category/CategorySettingsModal';
import { mainMenuString, searchString } from '../constants/strings';


const MainMenu = props => {

    // Admin Stuff
    const [data, setData] = useState();
    const [categorySettings, setCategorySettings] = useState();
    const [NewItemPage, setNewItemPage] = useState(false);

    const openAddProductModal = () => {
        setNewItemPage(true); let nigger = props.categoryPreviewed; nigger.nigger=true; setData(nigger);
    };

  const addNewItemModal = () => {
    if(props.adminList.includes(props.uid))
        return(
            <AddNewItemModal
                language={props.language}
                setData={setData}
                categories={props.categories}
                data={data}
                doIShowUp={NewItemPage}
                onCancel={() => {setNewItemPage(false); setData();}} />
        );
  };

    const adminCategoryAdd = () => {
        if(props.adminList.includes(props.uid))
            return(
                <TouchableOpacity
                    style={{paddingStart: 10}}
                    onPress={() => {if(props.categoryPreviewed) openAddProductModal(); else setNewItemPage(true);} }>
                    <MaterialCommunityIcons name="plus" color={"white"} size={30} />
                </TouchableOpacity>
            );
    };

    const categoryPreviewedTitle = () =>{
        if(props.categoryPreviewed)
            return props.categoryPreviewed.category;
        return "";
    };

    const doubleTabPress = () => {
        if(props.categoryPreviewed)
            props.setCategoryPreviewed();
        if(props.productPreviewed)
            props.setProductPreviewed();
    };

    const page = () => {

       // category preview
      if(props.productPreviewed && props.navigation.isFocused()){
        return(
		  	<ProductPreviewModal
                setSearch={props.setSearch}
                navigation={props.navigation}
                language={props.language}
                setRemoteOrdersOpen={props.setRemoteOrdersOpen}
            	checkoutList={props.checkoutList}
            	setCheckoutList={props.setCheckoutList}
				adminList={props.adminList}
            	uid={props.uid}
		  		userInfo={props.userInfo}
            	navigation={props.navigation}
            	addToCart={props.addToCart}
            	cart={props.cart}
            	updateCart={props.updateCart}
            	setProductPreviewed={props.setProductPreviewed}
            	productPreviewed={props.productPreviewed}/>
		);
	  }

      if(props.categoryPreviewed){
		  return(
                <>
                {addNewItemModal()}
                <Header style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {

                            // hide category
                            props.setCategoryPreviewed();

                            // if this preview was opened from search then take us back there
                    		if(props.categoryPreviewed.iscategory!==undefined && props.setSearch)
                    			props.setSearch(true);
                            }}>
                        <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
                    </TouchableOpacity>
                    {adminCategoryAdd()}
                    <View style={styles.headertitleholder}><Text style={styles.headertitle}>{categoryPreviewedTitle()}</Text></View>
                </Header>
                <CategoryPreview
                    adminList={props.adminList}
                    setSearch={props.setSearch}
                    uid={props.uid}
                    language={props.language}
  	                setCategoryPreviewed={props.setCategoryPreviewed}
                    item={props.categoryPreviewed}
                    setProductPreviewed={props.setProductPreviewed}/>
                  <Taboo language={props.language} focus={mainMenuString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
                </>
		  );
	  }


    const messagesFromSupport = () => {
        if(props.amount_of_notifications>0)
            return(
                <TouchableOpacity
                    activeOpacity={0.3}
                    onPress={() => {
                        props.setRemoteOrdersOpen("ah");
                		props.navigation.navigate("Profile");
                    }}
                    style={{paddingHorizontal:10, marginTop:-10, alignItems:"center", justifyContent:"center"}}>
                    <MaterialCommunityIcons name="message" color={"white"} size={30} />
                    <Text style={{color:"white", marginTop:-35, marginRight:-13, backgroundColor:"#FF4444", paddingHorizontal:6, paddingVertical:2, borderRadius:100}}>{props.amount_of_notifications}</Text>
                </TouchableOpacity>
            );
        return;
    };

  const categorySettingsModal = () => {
      if(categorySettings)
        return(
            <CategorySettingsModal
                language={props.language}
                setCategorySettings={setCategorySettings}
                visible={categorySettings} />
        );
  };

	  // main page
	  return(
          <>
          {addNewItemModal()}

          {categorySettingsModal()}

        <Header style={styles.header}>
            <TouchableOpacity
              onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
              <MaterialCommunityIcons name="menu" color={"white"} size={30} />
          </TouchableOpacity>
          <Card onPress={() => props.setSearch(true)} style={styles.searchHolder}>
              <MaterialCommunityIcons name="magnify" color={"black"} size={20} />
              <Text style={styles.searchText}>{searchString[props.language]}</Text>
          </Card>
          {messagesFromSupport()}
          {adminCategoryAdd()}
        </Header>

        <FlatList
            style={styles.list}
            data={props.categories}
            renderItem={categoryData =>
            <MainCategoryItem
                language={props.language}
                setCategorySettings={setCategorySettings}
                adminList={props.adminList}
                uid={props.uid}
                style={styles.mainCategoryItem}
                setCategoryPreviewed={props.setCategoryPreviewed}
                setNewItemPage={setNewItemPage}
                setData={setData}
                setProductPreviewed={props.setProductPreviewed}
                item={categoryData.item}/>
            }/>
            <Taboo language={props.language} focus={mainMenuString[props.language]} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
          </>
		  );
  };

    return(
        <SafeAreaView style={styles.holder} forceInset={{ bottom: 'never' }}>
            {page()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    holder: {
        flex: 1
    },
	mainCategoryItem: {
		paddingBottom: 10,
	},
	list: {
		paddingHorizontal: 8,
		paddingTop:15,
	},
	addCategory: {
		padding:10,
        backgroundColor:Colors.Accent,
		width:"100%",
		justifyContent:'center',
		alignItems:'center'
	},
    searchHolder: {
		backgroundColor:"white",
        marginStart:10,
        paddingVertical: 10,
        flexDirection: 'row',
        flex:1,
		padding: 15,
    },
    searchText: {
		color:"black",
        textAlign:'center',
        fontSize:16,
        marginStart:10,
    },
	header:{
		height: 70,
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
export default MainMenu;
