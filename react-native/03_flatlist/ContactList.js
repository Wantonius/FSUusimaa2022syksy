import {useState} from 'react';
import {View,Text,Pressable,StyleSheet,FlatList} from 'react-native';

const ContactList = (props) => {
	
	const [state,setState] = useState({
		data:[
	{
		"firstname": "Amery",
		"lastname": "Christensen",
		"id": 1
	},
	{
		"firstname": "Inez",
		"lastname": "Mcconnell",
		"id": 2
	},
	{
		"firstname": "Reed",
		"lastname": "Herrera",
		"id": 3
	},
	{
		"firstname": "James",
		"lastname": "Chambers",
		"id": 4
	},
	{
		"firstname": "Tobias",
		"lastname": "Price",
		"id": 5
	},
	{
		"firstname": "Mariam",
		"lastname": "Francis",
		"id": 6
	},
	{
		"firstname": "Mark",
		"lastname": "Perez",
		"id": 7
	},
	{
		"firstname": "Whoopi",
		"lastname": "Meyer",
		"id": 8
	},
	{
		"firstname": "Dustin",
		"lastname": "Garrett",
		"id": 9
	},
	{
		"firstname": "Ross",
		"lastname": "Moon",
		"id": 10
	},
	{
		"firstname": "Dustin",
		"lastname": "Compton",
		"id": 11
	},
	{
		"firstname": "Brenden",
		"lastname": "Stephens",
		"id": 12
	},
	{
		"firstname": "Alexander",
		"lastname": "Head",
		"id": 13
	},
	{
		"firstname": "Harriet",
		"lastname": "Campbell",
		"id": 14
	},
	{
		"firstname": "Fay",
		"lastname": "Owens",
		"id": 15
	},
	{
		"firstname": "Cheyenne",
		"lastname": "Frost",
		"id": 16
	},
	{
		"firstname": "Yardley",
		"lastname": "Snow",
		"id": 17
	},
	{
		"firstname": "Cecilia",
		"lastname": "Schwartz",
		"id": 18
	},
	{
		"firstname": "Nita",
		"lastname": "Bradford",
		"id": 19
	},
	{
		"firstname": "Keegan",
		"lastname": "Little",
		"id": 20
	},
	{
		"firstname": "Serena",
		"lastname": "Gordon",
		"id": 21
	},
	{
		"firstname": "Ina",
		"lastname": "Powers",
		"id": 22
	},
	{
		"firstname": "Jesse",
		"lastname": "Cantu",
		"id": 23
	},
	{
		"firstname": "Bianca",
		"lastname": "Giles",
		"id": 24
	},
	{
		"firstname": "Carl",
		"lastname": "Riddle",
		"id": 25
	},
	{
		"firstname": "Cora",
		"lastname": "Bates",
		"id": 26
	},
	{
		"firstname": "Vance",
		"lastname": "Mccoy",
		"id": 27
	},
	{
		"firstname": "Kennedy",
		"lastname": "Elliott",
		"id": 28
	},
	{
		"firstname": "Nadine",
		"lastname": "Huff",
		"id": 29
	},
	{
		"firstname": "Mona",
		"lastname": "O'connor",
		"id": 30
	},
	{
		"firstname": "Quentin",
		"lastname": "Vargas",
		"id": 31
	},
	{
		"firstname": "Levi",
		"lastname": "Munoz",
		"id": 32
	},
	{
		"firstname": "Daria",
		"lastname": "Cantrell",
		"id": 33
	},
	{
		"firstname": "Moses",
		"lastname": "Sawyer",
		"id": 34
	},
	{
		"firstname": "Fiona",
		"lastname": "Mathews",
		"id": 35
	},
	{
		"firstname": "Kennan",
		"lastname": "Mcgowan",
		"id": 36
	},
	{
		"firstname": "Samson",
		"lastname": "Rocha",
		"id": 37
	},
	{
		"firstname": "Oleg",
		"lastname": "Simon",
		"id": 38
	},
	{
		"firstname": "Serena",
		"lastname": "Skinner",
		"id": 39
	},
	{
		"firstname": "Nehru",
		"lastname": "Rhodes",
		"id": 40
	},
	{
		"firstname": "Caryn",
		"lastname": "Nicholson",
		"id": 41
	},
	{
		"firstname": "Daria",
		"lastname": "Haney",
		"id": 42
	},
	{
		"firstname": "George",
		"lastname": "England",
		"id": 43
	},
	{
		"firstname": "Donna",
		"lastname": "Rollins",
		"id": 44
	},
	{
		"firstname": "Zia",
		"lastname": "Hogan",
		"id": 45
	},
	{
		"firstname": "Melvin",
		"lastname": "Howe",
		"id": 46
	},
	{
		"firstname": "Jordan",
		"lastname": "Cabrera",
		"id": 47
	},
	{
		"firstname": "Mira",
		"lastname": "Farrell",
		"id": 48
	},
	{
		"firstname": "Yen",
		"lastname": "Parks",
		"id": 49
	},
	{
		"firstname": "Xaviera",
		"lastname": "Talley",
		"id": 50
	},
	{
		"firstname": "Freya",
		"lastname": "Dalton",
		"id": 51
	},
	{
		"firstname": "Nichole",
		"lastname": "Deleon",
		"id": 52
	},
	{
		"firstname": "Noelle",
		"lastname": "Eaton",
		"id": 53
	},
	{
		"firstname": "Connor",
		"lastname": "Neal",
		"id": 54
	},
	{
		"firstname": "Chadwick",
		"lastname": "Goff",
		"id": 55
	},
	{
		"firstname": "Griffin",
		"lastname": "Moore",
		"id": 56
	},
	{
		"firstname": "Amelia",
		"lastname": "Hahn",
		"id": 57
	},
	{
		"firstname": "Kim",
		"lastname": "Blackburn",
		"id": 58
	},
	{
		"firstname": "Petra",
		"lastname": "Baker",
		"id": 59
	},
	{
		"firstname": "Kalia",
		"lastname": "Smith",
		"id": 60
	},
	{
		"firstname": "Zachary",
		"lastname": "Holden",
		"id": 61
	},
	{
		"firstname": "James",
		"lastname": "Christensen",
		"id": 62
	},
	{
		"firstname": "Hermione",
		"lastname": "Ball",
		"id": 63
	},
	{
		"firstname": "Fritz",
		"lastname": "Mills",
		"id": 64
	},
	{
		"firstname": "Noah",
		"lastname": "Young",
		"id": 65
	},
	{
		"firstname": "Dean",
		"lastname": "Lambert",
		"id": 66
	},
	{
		"firstname": "Ignatius",
		"lastname": "Phillips",
		"id": 67
	},
	{
		"firstname": "Tanya",
		"lastname": "Finley",
		"id": 68
	},
	{
		"firstname": "Troy",
		"lastname": "Armstrong",
		"id": 69
	},
	{
		"firstname": "Kieran",
		"lastname": "Chambers",
		"id": 70
	},
	{
		"firstname": "Lacy",
		"lastname": "Crosby",
		"id": 71
	},
	{
		"firstname": "Lani",
		"lastname": "Meyers",
		"id": 72
	},
	{
		"firstname": "Charles",
		"lastname": "Duncan",
		"id": 73
	},
	{
		"firstname": "Raphael",
		"lastname": "Rush",
		"id": 74
	},
	{
		"firstname": "Adrian",
		"lastname": "Lynn",
		"id": 75
	},
	{
		"firstname": "Jillian",
		"lastname": "Peters",
		"id": 76
	},
	{
		"firstname": "Henry",
		"lastname": "Norris",
		"id": 77
	},
	{
		"firstname": "Nevada",
		"lastname": "Erickson",
		"id": 78
	},
	{
		"firstname": "Uma",
		"lastname": "Hickman",
		"id": 79
	},
	{
		"firstname": "Damon",
		"lastname": "Hayden",
		"id": 80
	},
	{
		"firstname": "Lydia",
		"lastname": "Potter",
		"id": 81
	},
	{
		"firstname": "Lillith",
		"lastname": "Hoover",
		"id": 82
	},
	{
		"firstname": "Patience",
		"lastname": "Morgan",
		"id": 83
	},
	{
		"firstname": "Lamar",
		"lastname": "Barnett",
		"id": 84
	},
	{
		"firstname": "Hilary",
		"lastname": "Wood",
		"id": 85
	},
	{
		"firstname": "Elliott",
		"lastname": "Fulton",
		"id": 86
	},
	{
		"firstname": "Abraham",
		"lastname": "Joyce",
		"id": 87
	},
	{
		"firstname": "Serina",
		"lastname": "Cotton",
		"id": 88
	},
	{
		"firstname": "Judith",
		"lastname": "Kane",
		"id": 89
	},
	{
		"firstname": "Jaime",
		"lastname": "Moses",
		"id": 90
	},
	{
		"firstname": "Gage",
		"lastname": "Nolan",
		"id": 91
	},
	{
		"firstname": "Zeph",
		"lastname": "Simmons",
		"id": 92
	},
	{
		"firstname": "Ruth",
		"lastname": "Burke",
		"id": 93
	},
	{
		"firstname": "Akeem",
		"lastname": "Graham",
		"id": 94
	},
	{
		"firstname": "Gillian",
		"lastname": "Mcgowan",
		"id": 95
	},
	{
		"firstname": "Ashton",
		"lastname": "Hensley",
		"id": 96
	},
	{
		"firstname": "Shelly",
		"lastname": "Trevino",
		"id": 97
	},
	{
		"firstname": "Jayme",
		"lastname": "Hanson",
		"id": 98
	},
	{
		"firstname": "Dale",
		"lastname": "Roberts",
		"id": 99
	},
	{
		"firstname": "Omar",
		"lastname": "Beard",
		"id": 100
	}
]
	})
	
	const removeItem = (id) => {
		setState((state) => {
			let tempList = state.data.filter(contact => contact.id !== id);
			return {
				data:tempList
			}
		})
	}
	
	return(
		<View>
			<FlatList data={state.data}
						renderItem={({item}) => {
							return(
								<View style={styles.rowStyle}>
									<Text style={styles.textStyle}>
										{item.firstname} {item.lastname}
									</Text>
									<Pressable style={styles.buttonStyle}
										onPress={() => removeItem(item.id)}>
										<Text>Remove</Text>
									</Pressable>
								</View>
							)
						}}
						keyExtractor={(item) => ""+item.id}
						/>
		</View>
	)
}

const styles = StyleSheet.create({
	rowStyle:{
		flexDirection:"row",
		height:60,
		alignItems:"center",
		justifyContent:"space-between"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontSize:18,
		fontWeight:"bold"
	},
	buttonStyle:{
		width:80,
		height:50,
		borderRadius:5,
		backgroundColor:"red",
		alignItems:"center",
		justifyContent:"center"
	}
})

export default ContactList;