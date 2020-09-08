import React, { useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PossibleProducts from '../../../constants/Admins/PossibleProducts';
import Colors from '../../../constants/Colors';

const AccordionView = props => {
  const [activeSections, setactiveSections] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={styles.page}>
		<View style={styles.iconHolder}>
			<MaterialCommunityIcons name={section.icon} color={"white"} size={30} />
		</View>
        <Text style={styles.title}>{section.title}</Text>
      </View>
    );
  };

  const _renderContent = section => { //data.item.background
    return (
          <View style={styles.flexer}>

    		<FlatList
    			style={styles.flexer}
    			data={section.SubCategories}
    			renderItem={data =>
    			<TouchableOpacity
    				activeOpacity={.6}
    				style={{...styles.flatlistitem, ...{backgroundColor:data.item.background}}}
    				onPress={props.checkThisOut.bind(this,data)}>
    				<View style={styles.iconHolder}>
    					<Image
    					style={styles.image}
    					source={{uri:data.item.image}}/>
    				</View>
    				<View style={styles.text}>
                        <Text style={{color:data.item.textColor}}>{data.item.title}</Text>
    				</View>
    			</TouchableOpacity>
    			}
    		/>
        </View>
    );
  };

  const _updateSections = activeSectionss => {
    setactiveSections(activeSectionss);
  };

    return (
      <Accordion
        sections={PossibleProducts}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />
    );
};


const styles = StyleSheet.create({
    page: {
        padding: 10,
        flexDirection:'row',
        borderTopWidth: 2,
        alignItems: 'center',
        borderColor:Colors.Accent,
        backgroundColor:Colors.Primary
    },
    iconHolder: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlistitem: {
        flexDirection:'row',
    },
    title: {
        justifyContent: 'center',
        flex: 5,
        fontSize: 16,
        color:"white",
        fontWeight: '500',
    },
    flexer: {
        flex:1
    },
    text: {
        flex:2.5,
        justifyContent:'center'
    },
    image: {
        width:40,
        height:40,
        borderRadius:10,
        marginVertical:5,
    },
});

export default AccordionView;
