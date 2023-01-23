import {useState} from 'react';
import GreetingPage from './GreetingPage';
import GreetingForm from './GreetingForm';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		textcolor:"",
		backgroundColor:""
	})
	
	const setGreeting = (data) => {
		setState({
			firstname:data.firstname,
			lastname:data.lastname,
			textcolor:data.textcolor.toLowerCase(),
			backgroundColor:data.backgroundColor.toLowerCase()
		})
	}
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="GreetingForm">
				{props => <GreetingForm {...props} setGreeting={setGreeting}/>}
				</Stack.Screen>
				<Stack.Screen name="GreetingPage" options={{
					headerLeft:() => null
				}}>
				{props => <GreetingPage {...props} {...state}/>}
				</Stack.Screen>
			</Stack.Navigator>	
		</NavigationContainer>
	);
}

