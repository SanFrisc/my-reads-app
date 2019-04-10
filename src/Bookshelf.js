import React from 'react'
import Books from "./Books";


export default function Bookshelf ({title, books, updateBook}) {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                {books.length ? <Books books={books} updateBook={updateBook}/> : <div>Currently no books</div>}
            </div>
        </div>
    )
}