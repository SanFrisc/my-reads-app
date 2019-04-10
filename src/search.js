import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  state = {
    searchResults: [],
    isLoading: false,
    inputKey: "search"
  };

  searchBooks = event => {
    const query = event.target.value;

    if (event.keyCode === 13 && query !== '') {
      this.setState({ isLoading: true });
      BooksAPI.search(query).then(books => {
        this.setState({ searchResults: books, isLoading: false });
      });
    } else if (event.keyCode === 27) {
        this.setState({ searchResults: [], inputKey: new Date().valueOf() })
    }

    console.log(event.keyCode);
  };

  render() {
    const { searchResults, isLoading, inputKey } = this.state;
    const { closeSearch } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => closeSearch()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
                key={inputKey}
              type="text"
              placeholder="Search by title or author"
              onKeyUp={this.searchBooks}
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