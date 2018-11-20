import React, { Component } from 'react';
import jsonContacts from './contacts.json'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: jsonContacts.slice(0, 5)
    }
    // Bind all the methods triggered with onClick, onChange, onMouseEnter (any event)
    this.addContact = this.addContact.bind(this)
  }
  addContact() {
    let randomIndex = Math.floor(jsonContacts.length * Math.random()) // random number between 0 and jsonContacts.length (excluded)
    let randomContact = jsonContacts[randomIndex]

    // // Method 1
    // // Create a copy of this.state.contacts 
    // let newContacts = this.state.contacts.slice()
    // newContacts.push(randomContact) // We can push because it's a copy of the state.contacts
    // this.setState({
    //   contacts: newContacts
    // })

    // Method 2
    this.setState({
      contacts: [...this.state.contacts, randomContact]
    })
  }
  sortContacts(field) {
    // Create a different compareFunction based on "field" value
    let compareFunction
    if (field === 'name') {
      compareFunction = (a,b) => (a.name > b.name ? 1 : -1)
    }
    else if (field === 'popularity') {
      compareFunction = (a,b) => (b.popularity - a.popularity)
    }

    // this.state.contacts.slice() create a copy of the array (this.state.contacts)
    this.setState({
      contacts: this.state.contacts.slice().sort(compareFunction)
    })
  }
  deleteContact(indexToRemove) {
    this.setState({
      // filter creates a copy
      // in "(c,i)", "c" is the current contact, "i" is the current index
      contacts: this.state.contacts.filter((c,i) => (i !== indexToRemove))
    })
  }
  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>

        <button onClick={this.addContact}>Add Random Contact</button>
        
        {/* 2 ways to bind: with "bind"; with an arrow function */}
        <button onClick={this.sortContacts.bind(this, 'name')}>Sort by name</button>
        <button onClick={() => this.sortContacts('popularity')}>Sort by popularity</button>
        
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((c,i) => (
              <tr key={i}>
                <td><img src={c.pictureUrl} /></td>
                <td>{c.name}</td>
                <td>{c.popularity.toFixed(2)}</td>
                <td>
                  <button onClick={() => this.deleteContact(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
