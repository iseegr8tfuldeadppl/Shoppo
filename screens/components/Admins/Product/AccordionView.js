import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PossibleProducts from '../../../constants/Admins/PossibleProducts';

export default class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  _renderHeader = section => {
    return (
      <View style={styles.page}>
		<View style={styles.iconHolder}>
			<MaterialCommunityIcons name={section.icon} color={"white"} size={30} />
		</View>
        <Text style={styles.title}>{section.title}</Text>
      </View>
    );
  };

  backgroundo = () => {
      return({
          backgroundColor:data.item.background
      });
  }

  _renderContent = section => {
    return (
      <View style={{...styles.flexer, ...backgroundo()}}>
		<FlatList
			style={styles.flexer}
			data={section.SubCategories}
			renderItem={data =>
			<TouchableOpacity
				activeOpacity={.6}
				style={styles.flatlistitem}
				onPress={this.props.checkThisOut.bind(this, data.item)}
				>
				<View style={styles.iconHolder}>
					<Image
					style={styles.image}
					source={{ uri:data.item.image }} />
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

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={PossibleProducts}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}


const styles = StyleSheet.create({
    page: {
        padding: 10,
        flexDirection:'row',
        borderTopWidth: 2,
        alignItems: 'center',
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
