import React, { Component } from "react";

import "./App.css";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

//higher order function (a function that returns another function)
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: DEFAULT_QUERY,
      result: null
    };
  }

  componentDidMount = () => {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };

  setSearchTopStories = result => {
    this.setState({ result });
  };

  onChangeSearch = event => {
    this.setState({ searchTerm: event.target.value });
  };

  //higher order function
  onDismiss = id => {
    const { result } = this.state;
    //function isNotid that removes the object with the id from the list
    const isNotid = item => item.objectID !== id;
    //filter method that takes a function as a parameter
    const updatedHits = result.hits.filter(isNotid);
    this.setState({
      result: { ...result, hits: updatedHits }
    });
  };

  render() {
    const { searchTerm, result } = this.state;

    //render null if the list is empty

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onChangeSearch}>
            Search{" "}
          </Search>
        </div>
        {result && (
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        )}
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
