import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

const Navbar = (props) => {
	
	const dispatch = useDispatch();
	
	const state = useSelector(state => state);
	
	if(state.isLogged) {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
					<li className="nav-item">
					<Link to="/">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/form">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/" onClick={props.logout}>Logout</Link>
					</li>
				</ul>
			</nav>
	) 
	}else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
			</nav>
		)
	}
}

export default Navbar;