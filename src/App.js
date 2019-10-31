import React, {Component} from 'react';
import {CardList} from './components/card-list/card-list.component'
import {SearchBox} from './components/search-box/search-box.component'
import './App.css';

class App extends Component {
 constructor(){ //constructor runs first
   super()

   this.state = {
     monsters: [],
     searchField: ''
   };

  //  this.handleChange = this.handleChange.bind(this)//Setting 'this' to the compoenent
 }

 componentDidMount(){ //When React puts this component on the page, it renders it on the DOM for the first time, when it does that it calls block of code written inside
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json()) //response.json() is a method that lives on response body which converts resonse to json format our javascript cana use, then returns promise.
    .then(users => this.setState({monsters: users})) //Setting our state 
 }

//  handleChange(e){ old way
//   this.setState({searchField: e.target.value})
//  }

 handleChange = (e) => {
   this.setState({searchField: e.target.value})
 }

 //onChange fires a syntehtic event whenever the input is changed i.e typed or removed from input field.
  render(){
    const { monsters, searchField } = this.state //Destructure object from state

    //Create a new array of objects called filteredMonsters. including only the monsters names that match searchField.
    const filteredMonsters = monsters.filter(monster => { 
      return monster.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return (
      <div className = 'App'>
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder = 'Search monsters'
          handleChange = {this.handleChange}
        />
        <CardList monsters = {filteredMonsters}/>
      </div>
    )
  }
}

export default App;
