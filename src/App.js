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
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onChangeSearch}>
            Search{" "}
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

//Coverting Search, Table, Button ES6 class components to functional stateless components
//These functional stateless components have no lifecycle methods except for render method that will be applied implicitly.
//functional stateless components to arrow functions

const Search = ({ value, onChange, children }) => (
  <div>
    {children}
    <input type="text" value={value} onChange={onChange} />
  </div>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID} className="table-row">
        <span style={{ width: "40%" }}>
          <a href={item.url}> {item.title}</a>{" "}
        </span>
        <span style={{ width: "30%" }}>{item.author}</span>
        <span style={{ width: "10%" }}>{item.num_comments}</span>
        <span style={{ width: "10%" }}>{item.points}</span>
        <span style={{ width: "10%" }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

const Button = ({ onClick, children }) => (
  <div>
    <button type="button" onClick={onClick} className="button-inline">
      {children}
    </button>
  </div>
);

export default App;
