import React, { useState } from 'react';
import { Alert, Text, View, Button, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Colors from '../../../constants/Colors';
import {
	submittedString,
	waitString,
	pleaseWriteTitleLongString,
	okString,
	pleaseWriteDescriptionLongString,
	pleaseWritePriceLongString,
	pleaseEnterPictureLongString,
	pleaseWriteTitleString,
	pleaseWriteDescriptionString,
	pleaseWriteTitle2String,
	costOfOneString,
	costOfProductString,
	pleaseEnterStockString,
	pleaseWriteLinkString,
	doNotCancelAlertString
} from '../../../constants/strings';
import DoubleArrowedHeader from './DoubleArrowedHeader';
import CostPage from './CostPage';
import ImageSubmission from './ImageSubmission';
import TitlePage from './TitlePage';
import StockPage from './StockPage';
import RequirementsPage from './RequirementsPage';
import DescriptionPage from './DescriptionPage';
import Preview from './Preview';
import firebase from 'firebase';
import SubmittedPage from './SubmittedPage';
import SneakPage from './SneakPage';


const pages = [
	"Title", "Description", "Cost", "Stock", "Requirements", "Picture", "Preview", "Submitting Post...", "Submitted"
]

const EditProduct = props => {

	const [stock, setStock] = useState(props.productPreviewed.data.stock);
	const [page, setPage] = useState(pages[0]);
	const [sneak, setSneak] = useState(props.productPreviewed.data.sneak);
	const [cost, setCost] = useState(props.productPreviewed.data.cost);
	const [type, setType] = useState(props.productPreviewed.data.type);
	const [title, setTitle] = useState(props.productPreviewed.data.title);
	const [imageUri, setImageUri] = useState();
	const [description, setDescription] = useState(props.productPreviewed.data.description);
    const [requirements, setRequirements] = useState();
	const [imageUrl, setImageUrl] = useState(props.productPreviewed.data.banner);
	const [preselectedBanner, setPreselectedBanner] = useState(props.productPreviewed.data.banner.length>0? true:false);


	const IsCurrency = () => {
		return props.productPreviewed.data.original_type==="currency" || props.productPreviewed.data.original_type==="account-charging";
	};

	const uploadImage = async(uri) => {

		// CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE CONTINUE HERE

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
		for(let i=0; i<requirements.length; i++)
			if(requirements[i].selected)
				submittable_requirements += requirements[i].tag + ',';

		// to remove the last fasila
		if(submittable_requirements.length>0)
			submittable_requirements = submittable_requirements.substring(0, submittable_requirements.length-1);

		let ref = firebase.database().ref('/categories/' + props.productPreviewed.category.key + '/products/' + props.productPreviewed.key);
		ref.update({
			data: {
				sneak: sneak ? sneak: false,
				visible: true,
				banner: downloadURL,
				title: title,
				description: description,
				stock: stock,
				submittable_requirements: submittable_requirements,
				cost: cost,
				background: props.productPreviewed.data.background,
				type: type,
				original_type: props.productPreviewed.data.original_type
			},
		})
		.then(function(snapshot) {
			console.log('Snapshot', snapshot);
			setPage(submittedString[props.language]);
		});
	};

	const next = () => {
		switch(page){
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
					setPage("Cost");
				} else
					Alert.alert(waitString[props.language], pleaseWriteDescriptionLongString[props.language],[{text: okString[props.language], style: 'cancel'}],{ cancelable: true });
				break;
			case "Cost":
				if(cost!==""){
					setPage("Stock");
				} else
					Alert.alert(waitString[props.language], pleaseWritePriceLongString[props.language],[{text: okString[props.language], style: 'cancel'}],{ cancelable: true });
				break;
			case "Stock":
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
				props.setProductPreviewed();
				break;
		}
	};

	const back = () => {
		switch(page){
			case "Title":
				props.setEditMode(false);
				break;
			case "Sneak":
				setPage("Title");
				break;
			case "Description":
				setPage("Sneak");
				break;
			case "Cost":
				setPage("Description");
				break;
			case "Stock":
				setPage("Cost");
				break;
			case "Requirements":
				setPage("Stock");
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


	const hasRelevantBanner = () => {
		return props.productPreviewed.banner!==""
	}

	const Lepage = () => {
		switch(page){
			case "Title":
				return(
					<TitlePage
						hint={pleaseWriteTitle2String[props.language]}
						title={title}
						setTitle={setTitle}/>
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
			case "Sneak":
				return(
					<SneakPage
						hint={pleaseWriteTitleString[props.language]}
						setSneak={setSneak}
						sneak={sneak} />
				);
				break;
			case "Cost":
				if(IsCurrency()){
					return(
						<CostPage
							language={props.language}
							hint={costOfOneString[props.language] + " " + props.productPreviewed.data.title}
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
						type={type}
						hint={pleaseEnterStockString[props.language]}
						setStock={setStock}
						stock={stock} />
				);
				break;
			case "Requirements":
				return(
					<RequirementsPage
						language={props.language}
						submittable_requirements={props.productPreviewed.data.submittable_requirements}
						setRequirements={setRequirements}
						requirements={requirements}/>
				);
				break;
			case "Picture":
				// use the pre-defined banner only if it's a currency since currencies have relevant banner

				return(
					<ImageSubmission
						language={props.language}
						preselectedBanner={preselectedBanner}
						setPreselectedBanner={setPreselectedBanner}
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
						productPreviewed={props.productPreviewed}
						setProductPreviewed={props.setProductPreviewed}
						/>
				);
				break;
		}
	};

	return(
		<SafeAreaView style={styles.letout}>

			<DoubleArrowedHeader
				language={props.language}
				style={{paddingTop:15}}
				next={next}
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

export default EditProduct;
