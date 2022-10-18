import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildren from './components/NamedChildren';
function App() {
  return (
    <div className="App">
		<ContactCard>
			ContactCard Test
		</ContactCard>
		<ContactCard>
			<h3>My contact</h3>
		</ContactCard>
		<NamedChildren
				header={<h2>Complex Contact Card</h2>}
				media={<h3>Media Area</h3>}
				content={<h3>Content Area</h3>}/>
		<NamedChildren
				header={<h2>No Media</h2>}
				content={<h3>Content Area</h3>}/>
    </div>
  );
}

export default App;
