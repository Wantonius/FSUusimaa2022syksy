import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildren from './components/NamedChildren';

function App() {
  return (
    <div className="App">
		<ContactCard>
			<h4>Matti Meikäläinen</h4>
		</ContactCard>
		<NamedChildren
			header={<h2>Named card</h2>}
			media={<p>Media area</p>}
			content={<p>Content area</p>}/>
		<NamedChildren
			header={<h2>No media</h2>}
			content={<p>Content area</p>}/>
    </div>
  );
}

export default App;
