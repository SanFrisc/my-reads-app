import React, { Component } from "react";
import { getAll, update } from "./BooksAPI";
import Bookshelf from "./Bookshelf";
class ListBooks extends Component {
  state = {
    booksCurrentlyReading: [],
    booksWantToRead: [],
    booksRead: [],
    isLoading: false
  };

  componentWillMount() {
    this.setState({
      isLoading: true
    });
    getAll().then(books => {
      this.filterBooksByShelf(books);
    });
  }

  filterBooksByShelf(books) {
    this.setState({
      booksCurrentlyReading: books.filter(
        item => item.shelf === "currentlyReading"
      ),
      booksWantToRead: books.filter(item => item.shelf === "wantToRead"),
      booksRead: books.filter(item => item.shelf === "read"),
      isLoading: false
    });
  }

  onUpdateBook = (book, shelf) => {
    update(book, shelf).then(data => {
      const { booksCurrentlyReading, booksWantToRead, booksRead } = this.state;
      const allBooks = [
        ...booksCurrentlyReading,
        ...booksRead,
        ...booksWantToRead
      ];

      for (let i = 0; i < allBooks.length; i++) {
        const bookId = allBooks[i].id;
        for (const [key, value] of Object.entries(data)) {
          if (value.includes(bookId)) {
            allBooks[i].shelf = key;
            break;
          }
        }
      }

      this.filterBooksByShelf(allBooks);
    });
  };

  render() {
    const {
      booksCurrentlyReading,
      booksWantToRead,
      booksRead,
      isLoading
    } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>

        <div className="list-books-content">
          <Bookshelf
            title="Currently Reading"
            books={booksCurrentlyReading}
            updateBook={this.onUpdateBook}
            isLoading={isLoading}
          />
          <Bookshelf
            title="Want To Read"
            books={booksWantToRead}
            updateBook={this.onUpdateBook}
            isLoading={isLoading}
          />
          <Bookshelf
            title="Read"
            books={booksRead}
            updateBook={this.onUpdateBook}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
}

export default ListBooks;
