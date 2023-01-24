import {FlatList,View,Pressable,Text,StyleSheet} from 'react-native';

const ShoppingList = (props) => {
	return(
		<View style={styles.container}>
			<View style={styles.buttonBox}>
				<Pressable style={styles.navigateButton}
					onPress={() => props.navigation.navigate("Add Item")}>
					<Text style={styles.textStyle}>Add New Item</Text>
				</Pressable>
				<Pressable style={[styles.navigateButton,styles.logoutButton]}
					onPress={() => props.logout()}>
					<Text style={styles.textStyle}>Logout</Text>
				</Pressable>
			</View>
			<View style={styles.listBox}>
				<FlatList data={props.list}
							renderItem={
								({item}) => {
									return (
										<View style={styles.row}>
											<Text style={styles.textStyle}>Type:{item.type}</Text>
											<Text style={styles.textStyle}>Count:{item.count}</Text>
											<Text style={styles.textStyle}>Price:{item.price}</Text>
											<Pressable style={styles.buttonStyle} onPress={() => props.removeItem(item.id)}>
												<Text style={styles.textStyle}>Remove</Text>
											</Pressable>
										</View>
									)
								}
							}
							keyExtractor={(item) => ""+item.id}
							/>
			</View>	
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	buttonBox:{
		flex:1,
		justifyContent:"space-evenly",
		flexDirection:"row",
		alignItems:"center"
	},
	listBox:{
		flex:10,
		justifyContent:"center",
		alignItems:"center"
	},
	navigateButton:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"blue"
	},
	logoutButton:{
		backgroundColor:"red"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontWeight:"bold",
		fontSize:13,
		padding:2
	},
	buttonStyle:{
		padding:3,
		width:70,
		height:50,
		backgroundColor:"red",
		alignItems:"flex-start",
		justifyContent:"center"
	},
	row:{
		flex:1,
		flexDirection:"row",
		justifyContent:"space-evenly",
		alignItems:"center"
	}
})

export default ShoppingList;