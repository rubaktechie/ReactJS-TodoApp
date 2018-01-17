import React from 'react';
import ReactDOM from 'react-dom';

var cursorPointer = {
	cursor:'pointer'
}
var paddingstyle = {
	padding : '5px'
}
var textcolor ={
	color : '#757575',
}
var completed_opacity = {
	opacity : '0.7',
	color : '#757575'
}
const Active = ({test_id, value, onClick, updateTodo }) => (
  <li className="collection-item center card" data-value={test_id} onDoubleClick={onClick}>
  	<a href="#!" style={textcolor} className="left">{test_id+1}</a>
  	<a href="#!" style={textcolor} >{value[1]}</a>
  	<a href="#!" style={textcolor} className="right"><span className="new badge" data-badge-caption="">Active</span></a>
  </li>
);
const Completed = ({test_id, value, onClick, updateTodo }) => (
  <li className="collection-item center" data-value={test_id} onClick={updateTodo}>
  	<a href="#!" style={completed_opacity} className="left">{test_id+1}</a>
  	<a href="#!" style={completed_opacity} >{value[1]}</a>
  	<a href="#!" style={completed_opacity} className="right"><span className="badge">Completed</span></a>
  </li>
);

const List = ({items, onItemClick, updateTodo }) => (
  <ul className="collection" style={cursorPointer}>
    {
      items.map(
			function(item, i){
				if (item[0] == 'active') {
					return <Active key={i} test_id={i} value={item} onClick={onItemClick}/>	
				}else{
					return <Completed key={i} test_id={i} value={item} onClick={onItemClick} updateTodo={updateTodo}/>
				}
			}
	    )
    }
  </ul>
);
class App extends React.Component{
   constructor(props) {	
    	super(props);
    	let todo = [];
    	if (!(localStorage.getItem("todo") === null)) {
    		todo = JSON.parse(localStorage.getItem("todo"));
    	}
		this.state = {
			todovalue : [],
			values : todo
		}	
		this.updateState = this.updateState.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.handleItemClick  = this.handleItemClick.bind(this);
		this.enterPress  = this.enterPress.bind(this);
	}
	addTodo(){
		if((this.state.todovalue).length > 0){
			let newTodo = ["active", this.state.todovalue];
			let newArr = this.state.values;
			newArr.push(newTodo);
			this.setState({values: newArr});
			localStorage.setItem('todo', JSON.stringify(newArr));
			this.setState({todovalue: ''});
			ReactDOM.findDOMNode(this.refs.myInput).focus();
		}
	}
	updateState(e) {
		this.setState({todovalue: e.target.value});
	}
	handleItemClick(e){
		let newArr = this.state.values;
		newArr[e.target.dataset.value][0] = "completed"; 
		localStorage.setItem('todo', JSON.stringify(newArr));
		this.setState({values: newArr});
	}
	updateTodo(e){
		console.log(e.target.dataset.value);
	}
	enterPress(e){
		if(e.key === 'Enter'){
			this.addTodo();
		}	
	}
	render(){
		return(
			<div className="row">	
				<div className="input-field col s8 offset-s2 card">
					<div className="card center" style={paddingstyle}>
						<input type="text"  value={this.state.todovalue} onChange = {this.updateState} onKeyPress={this.enterPress} ref="myInput" placeholder="Add ToDo" />
						<button className="waves-effect wa ves-light btn offset-s4" onClick={this.addTodo}>Add ToDo</button>
					</div>
					<div className="card" style={paddingstyle}>
						<List items={this.state.values} onItemClick={this.handleItemClick} updateTodo={this.updateTodo}/>
					</div>
				</div>
			</div>
		)
	}
}
export default App;