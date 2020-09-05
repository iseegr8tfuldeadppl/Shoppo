import React, { useState } from 'react';
import { Alert, Text, View, Button, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import AccordionView from './AccordionView';
import Colors from '../../../constants/Colors';
import DoubleArrowedHeader from './DoubleArrowedHeader';
import CostPage from './CostPage';
import ImageSubmission from './ImageSubmission';
import StaticOrDynamicPage from './StaticOrDynamicPage';
import TitlePage from './TitlePage';
import StockPage from './StockPage';
import PriorityPage from './PriorityPage';
import RequirementsPage from './RequirementsPage';
import DescriptionPage from './DescriptionPage';
import Preview from './Preview';
import firebase from 'firebase';
import SubmittedPage from './SubmittedPage';
import SneakPage from './SneakPage';
import {
	pleaseWriteStockString,
	waitString,
	okString,
	selectProductAlertString,
	pleaseWriteTitleLongString,
	pleaseWriteDescriptionLongString,
	pleaseWritePriceLongString,
	pleaseEnterPictureLongString,
	pleaseWriteTitleString,
	pleaseWriteTitle2String,
	pleaseWriteDescriptionString,
	costOfOneString,
	costOfProductString,
	priorityOptionalString,
	pleaseWriteLinkString,
	doNotCancelAlertString,
	pleaseSelectProductString
} from '../../../constants/strings';


const pages = [
	"Root", "Title", "Description", "Cost", "StaticOrDynamic", "Stock", "Requirements", "Picture", "Preview", "Submitting Post...", "Submitted"
]

const Product = props => {

	const [stock, setStock] = useState("");
	const [sneak, setSneak] = useState("");
	const [priority, setPriority] = useState("");
	const [page, setPage] = useState(pages[0]);
	const [selected, setSelected] = useState();
	const [cost, setCost] = useState("");
	const [title, setTitle] = useState("");
	const [imageUri, setImageUri] = useState();
	const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState();
	const [imageUrl, setImageUrl] = useState();
	const [preselectedBanner, setPreselectedBanner] = useState(false);

	//props.onAdd({title:selected.title, cost:name, type:"currency"});

	const unsetChecked = () => {
		let temp = {
			key: selected.key,
			image:selected.image,
			title:selected.title,
			background:selected.background,
			textColor:selected.textColor,
			originaltype:selected.originaltype,
			type:selected.originaltype,
			requirements:selected.original_requirements,
			original_requirements:selected.original_requirements,
			checked:false,
		};
		setSelected(temp);
	};
	const cleanRequirements = () => {
		let temp = {
			key: selected.key,
			image:selected.image,
			title:selected.title,
			background:selected.background,
			textColor:selected.textColor,
			originaltype:selected.originaltype,
			type:selected.originaltype,
			requirements:selected.original_requirements,
			original_requirements:selected.original_requirements,
			checked:selected.checked,
		};
		setSelected(temp);
	};

	const IsCurrency = () => {
		return selected.type==="currency" || selected.type==="account-charging";
	};

	const uploadImage = async(uri) => {

		let name = 0;
		let found = true;
		while(found){
			found = false;
			for(let i=0; i<props.categories.length; i++){
				for(let j=0; j<props.categories[i].products; j++){
					if(props.categories[i].products[j].banner.contains(name.toString() + ".png")){
						found = true;
						name += 1;
						break;
					}
				}
				if(found)
					break;
			}
		}

  	  	const response = await fetch(uri);
  	  	const blob = await response.blob();
	  	var ref = firebase.storage().ref().child("products");
	  	const snapshot = await ref.put(blob);

		//console.log("typeof(snapshot.downloadURL) " + typeof(snapshot.downloadURL));
	  	snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    	//console.log("File available at", downloadURL);

			submitProduct(downloadURL);
	    });
	}

	const submitProduct = downloadURL => {

		let submittable_requirements = "";
		for(let i=0; i<requirements.length; i++){
			if(requirements[i].selected){
				submittable_requirements += requirements[i].tag + ',';
			}
		}

		// to remove the last fasila
		if(submittable_requirements.length>0)
			submittable_requirements = submittable_requirements.substring(0, submittable_requirements.length-1);

		let ref = firebase.database().ref('/categories/' + props.data.key + '/products');
		ref.push({
			data: {
				sneak: sneak,
				visible: true,
				priority: !priority? 1 : parseInt(priority),
				banner: downloadURL,
				title: title,
				description: description,
				stock: stock,
				submittable_requirements: submittable_requirements,
				cost: cost,
				background: selected.background,
				type: selected.type,
				original_type: selected.originaltype
			},
		})
		.then(function(snapshot) {
			console.log(snapshot);
			setPage("Submitted");
		});
	};

	const next = () => {
		switch(page){
			case "Root":
				Alert.alert(waitString[props.language], selectProductAlertString[props.language],[{text: okString[props.language], style: 'cancel'}],{ cancelable: true });
				break;
			case "Title":
				if(title!==""){
					setPage("Sneak");
				} else
					Alert.alert(waitString[props.language], pleaseWriteTitleLongString[props.language],[{text: okString[props.language], style: 'cancel'}],{ cancelable: true });
				break;
			case "Sneak":
				setPage("Description");
				break;
			case "Description":
				if(description!==""){
					if(IsCurrency())
						setPage("StaticOrDynamic");
					else
						setPage("Cost");
				} else
					Alert.alert(waitString[props.language], pleaseWriteDescriptionLongString[props.language],[{text: okString[props.language], style: 'cancel'}],{ cancelable: true });
				break;
			case "StaticOrDynamic":
				setPage("Cost");
				break;
			case "Cost":
				if(cost!==""){
					setPage("Stock");
				} else
					Alert.alert(waitString[props.language], pleaseWritePriceLongString[props.language],[{text: okString[props.language], style: 'cancel'}],{ cancelable: true });
				break;
			case "Stock":
				setPage("Priority");
				break;
			case "Priority":
				setPage("Requirements");
				break;
			case "Requirements":
				setPage("Picture");
				break;
			case "Picture":
				if(imageUri || imageUrl!==""){
					setPage("Preview");
				} else
					Alert.alert(waitString[props.language], pleaseEnterPictureLongString[props.language],[{text: okString[props.language], style: 'cancel'}],{ cancelable: true });
				break;
			case "Preview":
				setPage("Submitting Post...");
				if(!imageUrl){
					uploadImage(uri);
				} else {
					submitProduct(imageUrl);
				}
				break;
			case "Submitted":
				reset();
				props.onCancel();
				break;
		}
	};

	const reset = () => {
		if(cost.length)
			setCost("");
		if(stock.length)
			setStock("");
		if(description.length)
			setDescription("");
		if(title.length)
			setTitle("");
		if(imageUrl)
			if(imageUrl.length)
				setImageUrl("");
		if(imageUri)
			setImageUri();
	};

	const back = () => {
		switch(page){
			case "Root":
				reset();
				props.onCancel();
				break;
			case "Title":
				unsetChecked();
				cleanRequirements();
				setSelected();
				setPage("Root");
				break;
			case "Sneak":
				setPage("Title");
				break;
			case "Description":
				setPage("Sneak");
				break;
			case "StaticOrDynamic":
				setPage("Description");
				break;
			case "Cost":
				let ah = selected;
				ah.type = ah.originaltype;
				setSelected(ah);
				if(IsCurrency()){
					setPage("StaticOrDynamic");
				} else
					setPage("Description");
				break;
			case "Stock":
				setPage("Cost");
				break;
			case "Priority":
				setPage("Stock");
				break;
			case "Requirements":
				setPage("Priority");
				break;
			case "Picture":
				setPage("Requirements");
				break;
			case "Preview":
				setPage("Picture");
				break;
			case "Submitted":
				reset();
				props.onCancel();
				break;
		}
	};

	const hasRelevantBanner = () => {
		return selected.image!==""
	}

	const Lepage = () => {
		if(selected){
			switch(page){
				case "Root":
					if(IsCurrency())
						setTitle(selected.title);
					setPage("Title");
					break;
				case "Title":
					return(
						<TitlePage
							hint={pleaseWriteTitleString[props.language]}
							title={title}
							setTitle={setTitle}/>
					);
					break;
				case "Sneak":
					return(
						<SneakPage
							hint={pleaseWriteTitle2String[props.language]}
							setSneak={setSneak}
							sneak={sneak} />
					);
					break;
				case "Description":
					return(
						<DescriptionPage
							hint={pleaseWriteDescriptionString[props.language]}
							setDescription={setDescription}
							description={description} />
					);
					break;
				case "StaticOrDynamic":
					return(
						<StaticOrDynamicPage
							language={props.language}
							setSelected={setSelected}
							selected={selected} />
					);
					break;
				case "Cost":
					if(IsCurrency()){
						return(
							<CostPage
								language={props.language}
								hint={costOfOneString[props.language] + " " + selected.title}
								setCost={setCost}
								cost={cost} />
						);
					} else {
						return(
							<CostPage
								language={props.language}
								hint={costOfProductString[props.language]}
								setCost={setCost}
								cost={cost} />
						);
					}
					break;
				case "Stock":
					return(
						<StockPage
							type={selected.type}
							hint={pleaseWriteStockString[props.language]}
							setStock={setStock}
							stock={stock} />
					);
					break;
				case "Priority":
					return(
						<PriorityPage
							type={selected.type}
							hint={priorityOptionalString[props.language]}
							setPriority={setPriority}
							priority={priority} />
					);
					break;
				case "Requirements":
					return(
						<RequirementsPage
							selected={selected}
							language={props.language}
							setRequirements={setRequirements}
							requirements={requirements}/>
					);
					break;
				case "Picture":
					// use the pre-defined banner only if it's a currency since currencies have relevant banner
					if(!imageUrl){
						if(hasRelevantBanner()){
							setImageUrl(selected.image);
							setPreselectedBanner(true);
						} else
							setImageUrl("");
					}

					return(
						<ImageSubmission
							language={props.language}
							preselectedBanner={preselectedBanner}
							preview={() => {setPage("Preview");}}
							hint={pleaseWriteLinkString[props.language]}
							setImageUrl={setImageUrl}
							imageUrl={imageUrl}
							setImageUri={setImageUri}
							imageUri={imageUri}/>
					);
					break;
				case "Preview":
					return(
						<Preview
							language={props.language}
							imageUrl={imageUrl}
							imageUri={imageUri}
							requirements={requirements}
							title={title}
							description={description}
							cost={cost} />
					);
					break;
				case "Submitting Post...":
					return(
						<View style={styles.regularPage}>
							<Text style={{ fontSize:17, marginBottom:20 }}>{doNotCancelAlertString[props.language]}</Text>
							<ActivityIndicator size={50}/>
						</View>
					);
					break;
				case "Submitted":
					return(
						<SubmittedPage
							reset={reset}
							setSelected={setSelected}
							onCancel={props.onCancel}
							/>
					);
					break;
			}
		} else {
			return(
				<ScrollView>
					<Text style={styles.subTitle}>{pleaseSelectProductString[props.language]}</Text>
					<AccordionView checkThisOut={(itsinfo) => {setSelected(itsinfo.item);}} />
				</ScrollView>
			);
		}
	};

	return(
		<SafeAreaView style={styles.letout}>

			<DoubleArrowedHeader
				next={next}
				language={props.language}
				back={back}/>
			<Text style={styles.cuteTitle}>{page}</Text>

			{Lepage()}
		</SafeAreaView>
	);
};


const styles = StyleSheet.create({
	regularPage: {
		width:"100%",
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	subTitle: {
		fontSize:19,
		textAlign:'center',
		marginVertical:25
	},
	customHeader: {
		paddingTop:18,
		paddingBottom:12,
	},
	cuteTitle: {
		width:"100%",
		fontSize:21,
		paddingHorizontal: 20,
		paddingTop:10,
		paddingBottom: 11,
		backgroundColor:Colors.Primary,
		color:"white",
	},
	input : {
		maxWidth:"70%",
		height: 50,
		paddingHorizontal:8,
		borderRadius:5,
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:"30%",
		textAlign:'center',
		borderWidth: 1,
		marginVertical: 10,
	},
	letout:{
		width: "100%",
		flex:1,
	},
});

export default Product;
