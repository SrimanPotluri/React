import React, { Component } from "react";
import axios from "axios";
import { Search } from "../../components/Search";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";

import "./index.css";

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from "../../constants";

const Loading = () => <div>Loading...</div>;

//higher order component, takes in a component and returns an enhanced version of that component
const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

//higher order function
const updateSearchTopStoriesState = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: DEFAULT_QUERY,
      searchKey: "",
      results: null,
      error: null,
      isLoading: false
    };
  }

  componentDidMount = () => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  };

  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm];
  };

  setSearchTopStories = result => {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  };

  onChangeSearch = event => {
    this.setState({ searchTerm: event.target.value });
  };

  //higher order function
  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    //function isNotid that removes the object with the id from the list
    const isNotid = item => item.objectID !== id;
    //filter method that takes a function as a parameter
    const updatedHits = hits.filter(isNotid);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  };

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    //render null if the list is empty

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onChangeSearch}
            onSubmit={this.onSearchSubmit}
          >
            Search{" "}
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}

        <ButtonWithLoading
          isLoading={isLoading}
          onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
        >
          More
        </ButtonWithLoading>
      </div>
    );
  }
}

export default App;
