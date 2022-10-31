import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../actions/loginActions';

const Navbar = (props) => {
	
	const dispatch = useDispatch();
	
	const state = useSelector(state => state);
	
	if(state.login.isLogged) {
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
					<Link to="/" onClick={() => dispatch(logout(state.login.token))}>Logout</Link>
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