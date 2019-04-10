import React, { Component } from "react";
import Bookshelf from './Bookshelf';
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  state = {
    searchResults: []
  };

  searchBooks = event => {
    const query = event.target.value;

    if (query) {
      BooksAPI.search(query).then(books => {
        
          this.setState({ searchResults: books })
      });
    }
  };

  render() {
    const { searchResults } = this.state;
    const { closeSearch } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => closeSearch()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf
            title="Results"
            books={searchResults}
            // updateBook={this.onUpdateBook}
            // isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
}

export default Search;
