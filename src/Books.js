import React from 'react';

const Books = ({ books, updateBook }) => {

    return (
        <div className="books-grid">
            {books.map((book) => (
                <div className="book" key={book.title}>
                    <div className="book-top">
                        <div className="book-cover"
                            style={{
                                backgroundImage: `url(${book.imageLinks.thumbnail})`,
                            }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select onChange={event => updateBook(book, event.target.value)} value={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.author}</div>
                </div>
            ))}
        </div>
    )
}

export default Books