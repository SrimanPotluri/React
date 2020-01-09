import React, { Component } from "react";

import "./App.css";

//higher order function (a function that returns another function)
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      list
    };
  }

  onChangeSearch = event => {
    this.setState({ searchTerm: event.target.value });
  };

  //higher order function
  onDismiss = id => {
    const { list } = this.state;
    //function isNotid that removes the object with the id from the list
    const isNotid = item => item.objectID !== id;
    //filter method that takes a function as a parameter
    const updatedlist = list.filter(isNotid);
    this.setState({ list: updatedlist });
  };

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div>
        <Search value={searchTerm} onChange={this.onChangeSearch}>
          Search{" "}
        </Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

//Coverting Search, Table, Button ES6 class components to functional stateless components
//These functional stateless components have no lifecycle methods except for render method that will be applied implicitly.

function Search({ value, onChange, children }) {
  return (
    <div>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}

function Table({ list, pattern, onDismiss }) {
  return (
    <div>
      {list.filter(isSearched(pattern)).map(item => (
        <div key={item.objectID}>
          <span>
            <a href={item.url}> {item.title}</a>{" "}
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
          </span>
        </div>
      ))}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <div>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default App;
