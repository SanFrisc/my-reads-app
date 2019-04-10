import React, { Component } from 'react';
import { getAll, update } from './BooksAPI';
import Bookshelf from "./Bookshelf";

class ListBooks extends Component {
    state = {
        booksCurrentlyReading: [],
        booksWantToRead: [],
        booksRead: [],
    }

    componentWillMount() {
        getAll().then((books) => {
            this.filterBooksByShelf(books);
        });
    }

    filterBooksByShelf(books){
        this.setState({ 
            booksCurrentlyReading: books.filter(item => item.shelf === 'currentlyReading'),
            booksWantToRead: books.filter(item => item.shelf === 'wantToRead'),
            booksRead: books.filter(item => item.shelf === 'read')
        });
    }

    onUpdateBook = (book, shelf) => {
        update(book, shelf).then(data => {
            const { booksCurrentlyReading, booksWantToRead, booksRead } = this.state;
            const allBooks = [...booksCurrentlyReading, ...booksRead, ...booksWantToRead]

            for (let i = 0; i < allBooks.length; i++) {
                const bookId = allBooks[i].id;
                // data.currentlyReading.forEach(item => {
                //     if (bookId === item) {
                //         allBooks[i].shelf = "currentlyReading"
                //     }
                // });
                // data.wantToRead.forEach(item => {
                //     if (bookId === item) {
                //         allBooks[i].shelf = "wantToRead"
                //     }
                // });
                // data.read.forEach(item => {
                //     if (bookId === item) {
                //         allBooks[i].shelf = "read"
                //     }
                // });

                for (const [key, value] of Object.entries(data)) {
                    console.log(`${key}: ${value}`);
                    if (value.includes(bookId)) {
                        allBooks[i].shelf = key
                        break;
                    }
                }
            }
            
            this.filterBooksByShelf(allBooks);

        });
    
    }

    render() {

        const { booksCurrentlyReading, booksWantToRead, booksRead } = this.state;

        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    <Bookshelf title="Currently Reading" books={booksCurrentlyReading} updateBook={this.onUpdateBook} />
                    <Bookshelf title="Want To Read" books={booksWantToRead} updateBook={this.onUpdateBook} />
                    <Bookshelf title="Read" books={booksRead} updateBook={this.onUpdateBook} />
                </div>

                <div className="open-search">
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>

            </div>
        )
    }
}

export default ListBooks