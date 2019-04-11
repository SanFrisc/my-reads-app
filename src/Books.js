import React, { useState, useEffect } from "react";

const Books = ({ books, updateBook }) => {
  const [isLoading, setIsLoading] = useState(undefined);
  useEffect(() => {
    setIsLoading(undefined);
  }, [books]);

  return (
    <div className="books-grid">
      {books.map(book => (
        <div className="book" key={book.id}>
          <div className="book-top">
            <div
              className="book-cover"
              style={
                book.imageLinks
                  ? {
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }
                  : undefined
              }
            />
            {updateBook && (
              <div className="book-shelf-changer">
                {isLoading === book.id ? (
                  <div>Loading Book</div>
                ) : (
                  <select
                    onChange={event => {
                      setIsLoading(book.id);
                      updateBook(book, event.target.value);
                    }}
                    value={book.shelf}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                  </select>
                )}
              </div>
            )}
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      ))}
    </div>
  );
};

export default Books;
