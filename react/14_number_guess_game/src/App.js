import {Routes,Route} from 'react-router-dom';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import './App.css';

function App() {
  return (
    <div className="App">
		<Routes>
			<Route exact path="/" element={<StartPage/>}/>
			<Route path="/game" element={<GamePage/>}/>
		</Routes>
    </div>
  );
}

export default App;
