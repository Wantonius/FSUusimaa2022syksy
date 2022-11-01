import {useState} from 'react';
import './App.css';
import {themes,ThemeContext} from './context/ThemeContext';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';


function App() {
	
	const [state,setState] = useState({
		theme:themes.dark
	})
	
	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}
	
	return (
		<div className="App">
		<ThemeContext.Provider value={state.theme}>
			<Headline>
				Context
			</Headline>
			<Paragraph>
				Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.
			</Paragraph>
			<ThemeButton toggleTheme={toggleTheme}/>
		</ThemeContext.Provider>
		</div>
	);
}

export default App;
