import React from "react";
import Books from "./Books";

export default function Bookshelf({ title, books, updateBook, isLoading }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {isLoading ? (
          <div>Loading</div>
        ) : books.length ? (
          <Books books={books} updateBook={updateBook} />
        ) : (
          <div>Currently no books</div>
        )}
      </div>
    </div>
  );
}
