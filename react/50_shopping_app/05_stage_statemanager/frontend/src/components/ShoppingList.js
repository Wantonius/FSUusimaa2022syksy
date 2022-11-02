import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import useAppState from '../hooks/useAppState';
import useAction from '../hooks/useAction';

const ShoppingList = (props) => {

	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const [search,setSearch] = useState({
		type:""
	})
	
	const {remove,edit,getList} = useAction();
	const {list} = useAppState();
	
	const changeMode = (mode,index) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}

	const removeItem = (id) => {
		remove(id);
		changeMode("cancel",0);
	}
	
	const editItem = (item) => {
		edit(item);
		changeMode("cancel",0);
	}

	const searchItems = () => {
		let query = "?type="+search.type;
		getList(query);
	}
	
	const onChange = (event) => {
		setSearch((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}

	let items = list.map((item,index) => {
		if(state.removeIndex === index) {
			return (<RemoveRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem}/>)
		}
		if(state.editIndex === index) {
			return (<EditRow key={item.id} item={item} changeMode={changeMode} editItem={editItem}/>)
		}
		return <Row key={item.id} item={item} index={index} changeMode={changeMode}/>
	})
	
	return (
	<>
		<div style={{"width":"30%","margin":"auto"}}>
			<label htmlFor="type" className="form-label">Search by type</label>
			<input type="text"
					name="type"
					id="type"
					className="form-control"
					onChange={onChange}
					value={search.type}/>
			<button onClick={searchItems} className="btn btn-primary">Search</button>
		</div>
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	</>
	)
}

export default ShoppingList;