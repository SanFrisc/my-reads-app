import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  state = {
    searchResults: [],
    isLoading: false,
    query: ""
  };

  componentDidMount() {
    this.nameInput.focus();
  }

  searchBooks = event => {
    const query = event.target.value;

    if (event.keyCode === 13 && query !== "") {
      this.setState({ isLoading: true });
      BooksAPI.search(query).then(books => {
        this.setState({ searchResults: books, isLoading: false });
      });
    } else if (event.keyCode === 27) {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    const { searchResults, isLoading, query } = this.state;
    const { closeSearch } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => closeSearch()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              ref={input => {
                this.nameInput = input;
              }}
              type="search"
              value={query}
              placeholder="Search by title or author"
              onKeyUp={this.searchBooks}
              onChange={event => this.setState({ query: event.target.value })}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf
            title="Results"
            books={searchResults}
            // TODO updateBook={this.onUpdateBook}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
}

export default Search;
