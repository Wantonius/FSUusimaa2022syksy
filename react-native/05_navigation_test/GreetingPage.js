import {View,Text,StyleSheet,Pressable} from 'react-native';

const GreetingPage = (props) => {

	let textcolor = "black";
	let backgroundColor = "white";
	if(props.textcolor) {
		textcolor = props.textcolor;
	}
	if(props.backgroundColor) {
		backgroundColor = props.backgroundColor;
	}
	let styles = StyleSheet.create({
		container:{
			flex:1,
			justifyContent:"center",
			alignItems:"center",
			backgroundColor:backgroundColor
		},
		text:{
			color:textcolor,
			fontSize:24,
			fontWeight:"bold",
			fontFamily:"sans-serif"
		},
		button:{
			height:80,
			width:110,
			backgroundColor:"red",
			alignItems:"center",
			justifyContent:"center"
		}
	})
	return(
		<View style={styles.container}>
			<Text style={styles.text}>Hello {props.firstname} {props.lastname}</Text>
			<Pressable style={styles.button} 
				onPress={() => props.navigation.navigate("GreetingForm")}>
				<Text>Go Back</Text>
			</Pressable>
		</View>	
	)
}

export default GreetingPage;