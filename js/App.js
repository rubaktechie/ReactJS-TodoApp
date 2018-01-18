import React from 'react';
import ReactDOM from 'react-dom';

var cursorPointer = {
	cursor:'pointer'
}
var paddingstyle = {
	padding : '8px'
}
var textcolor ={
	color : '#757575',
}
class Active extends React.Component{
   constructor(props) {	
    	super(props);	
	}
	render(){
		return(
			<li className="collection-item center card" data-value={this.props.test_id} onDoubleClick={this.props.onClick}>
				<a href="#!" style={textcolor} className="left hover_opacity" >{this.props.test_id+1}</a>
				<a href="#!" style={textcolor} className="hover_opacity">{this.props.value[1]}</a>
				<a href="#!" className="secondary-content"><i className="material-icons destroy" data-value={this.props.test_id} onClick={this.props.handleClose}>close</i></a>
				<a href="#!" style={textcolor} className="right hover_opacity" >
				<span className="new badge red" data-badge-caption="">Active</span>
				</a>
			</li>
		)
	}
}
class Completed extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<li className="collection-item center card" data-value={this.props.test_id}>
				<a href="#!" style={textcolor} className="left hover_opacity" >{this.props.test_id+1}</a>
				<a href="#!" style={textcolor} className="hover_opacity">{this.props.value[1]}</a>
				<a href="#!" className="secondary-content"><i className="material-icons destroy" data-value={this.props.test_id} onClick={this.props.handleClose}>close</i></a>
				<a href="#!" style={textcolor} className="right hover_opacity"><span className="new badge" data-badge-caption="">Completed</span></a>
			</li>			
		)
	}
}

class List extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<ul className="collection" style={cursorPointer}>
			{this.props.items.map(
					(item, i) => {
						if (item[0] == 'active') {
							return <Active key={i} test_id={i} value={item} handleClose={this.props.handleClose} onClick={this.props.onItemClick}/>	
						}else{
							return <Completed key={i} test_id={i} value={item} handleClose={this.props.handleClose} onClick={this.props.onItemClick} updateTodo={this.props.updateTodo}/>
						}
					}
				)}
			</ul>
		)		
	}	
}
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
		this.handleClose = this.handleClose.bind(this);
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
		newArr[e.currentTarget.dataset.value][0] = "completed"; 
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
	handleClose(e){
		let newArr = this.state.values;
		newArr.splice(e.target.dataset.value, 1);
		this.setState({values: newArr});
		localStorage.setItem('todo', JSON.stringify(newArr));
		ReactDOM.findDOMNode(this.refs.myInput).focus();
	}
	render(){
		return(
			<div>
			<div className="row card center" style={paddingstyle}>
				<div className=" input-field">
					<input type="text" id="add-todo" value={this.state.todovalue} onChange = {this.updateState} onKeyPress={this.enterPress} ref="myInput"/>
					<label data-for="add-todo">Add ToDo</label>
				</div>
				<button className="waves-effect wa ves-light btn offset-s4" onClick={this.addTodo}>Add ToDo</button>
			</div>
				<div className="card" style={paddingstyle}>
					<List items={this.state.values} onItemClick={this.handleItemClick} handleClose={this.handleClose} updateTodo={this.updateTodo}/>
				</div>
			</div>
		)
	}
}
export default App;
