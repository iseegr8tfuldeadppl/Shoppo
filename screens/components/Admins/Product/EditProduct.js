import React, { useState } from 'react';
import { Alert, Text, View, Button, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Colors from '../../../constants/Colors';
import DoubleArrowedHeader from './DoubleArrowedHeader';
import CostPage from './CostPage';
import ImageSubmission from './ImageSubmission';
import StaticOrDynamicPage from './StaticOrDynamicPage';
import QuantityPage from './QuantityPage';
import TitlePage from './TitlePage';
import StockPage from './StockPage';
import RequirementsPage from './RequirementsPage';
import DescriptionPage from './DescriptionPage';
import Preview from './Preview';
import firebase from 'firebase';
import SubmittedPage from './SubmittedPage';


const pages = [
	"Title", "Description", "Cost", "StaticOrDynamic", "Quantity", "Stock", "Requirements", "Picture", "Preview", "Submitting Post...", "Submitted"
]

const EditProduct = props => {

	const [stock, setStock] = useState(props.productPreviewed.data.stock);
	const [page, setPage] = useState("Title");
	const [cost, setCost] = useState(props.productPreviewed.data.cost);
	const [quantity, setQuantity] = useState("1");
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

	console.log('/users/categories/' + props.productPreviewed.category.key + '/products/' + props.productPreviewed.key);
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

		let ref = firebase.database().ref('/categories/' + props.productPreviewed.category.key + '/products/' + props.productPreviewed.key);
		ref.set({
			data: {
				visible: true,
				banner: downloadURL,
				title: title,
				description: description,
				stock: stock,
				submittable_requirements: submittable_requirements,
				quantity: quantity,
				cost: cost,
				background: props.productPreviewed.data.background,
				type: type,
				original_type: props.productPreviewed.data.original_type
			},
		})
		.then(function(snapshot) {
			console.log('Snapshot', snapshot);
			setPage("Submitted");
		});
	};

	const next = () => {
		switch(page){
			case "Title":
				if(title!==""){
					setPage("Description");
				} else
					Alert.alert('Wait!', 'You should enter a title first!',[{text: 'Ok', style: 'cancel'}],{ cancelable: true });
				break;
			case "Description":
				if(description!==""){
					if(IsCurrency())
						setPage("StaticOrDynamic");
					else
						setPage("Cost");
				} else
					Alert.alert('Wait!', 'You should enter a short description first!',[{text: 'Ok', style: 'cancel'}],{ cancelable: true });
				break;
			case "StaticOrDynamic":
				setPage("Cost");
				if(IsCurrency()){
					setPage("Cost");
				} else
					setPage("Quantity");
				break;
			case "Quantity":
				setPage("Cost");
				break;
			case "Cost":
				if(cost!==""){
					setPage("Stock");
				} else
					Alert.alert('Wait!', 'You should select a price first!',[{text: 'Ok', style: 'cancel'}],{ cancelable: true });
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
					Alert.alert('Wait!', 'You should either select, photograph or paste a picture of your product! (Recommended: upload picture on Imgur and get the direct link to the picture & paste it)',[{text: 'Ok', style: 'cancel'}],{ cancelable: true });
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
		if(quantity!=="1")
			setQuantity("1");
		if(imageUri)
			setImageUri();
	};

	const back = () => {
		switch(page){
			case "Title":
				props.setEditMode(false);
				break;
			case "Description":
				setPage("Title");
				break;
			case "StaticOrDynamic":
				setPage("Description");
				break;
			case "Cost":
				if(IsCurrency()){
					setPage("StaticOrDynamic");
				} else
					setPage("Description");
				break;
			case "Quantity":
				setPage("Cost");
				break;
			case "Stock":
				if(IsCurrency()){
					setPage("Cost");
				} else
					setPage("Quantity");
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

	const hasRelevantBanner = () => {
		return props.productPreviewed.banner!==""
	}

	const Lepage = () => {
		switch(page){
			case "Title":
				return(
					<TitlePage
						hint={"Enter a title"}
						title={title}
						setTitle={setTitle}/>
				);
				break;
			case "Description":
				return(
					<DescriptionPage
						hint={"Enter a description!"}
						setDescription={setDescription}
						description={description} />
				);
				break;
			case "StaticOrDynamic":
				return(
					<StaticOrDynamicPage
						type={type}
						productPreviewed={props.productPreviewed}
						original_type={props.productPreviewed.data.original_type}
						setType={setType} />
				);
				break;
			case "Quantity":
				return(
					<QuantityPage
						hint={"Quantity"}
						setQuantity={setQuantity}
						quantity={quantity}/>
				);
				break;
			case "Cost":
				if(IsCurrency()){
					return(
						<CostPage
							hint={"Cost of 1 " + props.productPreviewed.data.title}
							setCost={setCost}
							cost={cost} />
					);
				} else {
					return(
						<CostPage
							hint={"Cost of your product"}
							setCost={setCost}
							cost={cost} />
					);
				}
				break;
			case "Stock":
				return(
					<StockPage
						type={type}
						hint={"How much stock do you have"}
						setStock={setStock}
						stock={stock} />
				);
				break;
			case "Requirements":
				return(
					<RequirementsPage
						submittable_requirements={props.productPreviewed.data.submittable_requirements}
						setRequirements={setRequirements}
						requirements={requirements}/>
				);
				break;
			case "Picture":
				// use the pre-defined banner only if it's a currency since currencies have relevant banner

				return(
					<ImageSubmission
						preselectedBanner={preselectedBanner}
						setPreselectedBanner={setPreselectedBanner}
						preview={() => {setPage("Preview");}}
						hint={"Paste a link"}
						setImageUrl={setImageUrl}
						imageUrl={imageUrl}
						setImageUri={setImageUri}
						imageUri={imageUri}/>
				);
				break;
			case "Preview":
				return(
					<Preview
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
						<Text style={{ fontSize:17, marginBottom:20 }}>Do not exit until submission finishes!</Text>
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
