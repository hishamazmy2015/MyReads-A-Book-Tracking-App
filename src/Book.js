import React, { useState, useEffect } from "react";
import { update } from "./BooksAPI";

function Book({ book, MoveTo }) {
  console.log("object book ===================>  ",book);
  console.log("object book ===================>  ",book);
  console.log("object book ===================>  ",book);
  console.log("object book ===================>  ",book);
  useEffect(() => {
    if (book && book.shelf === undefined) {
      book = { ...book, shelf: "None" };
    }
  }, []);

  return (
    <div>
      {book ? (
        <div className="book">
          <div className="book-top">
            {book && book.imageLinks ? (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url('${book.imageLinks.thumbnail}')`,
                }}
              ></div>
            ) : (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url('http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
                }}
              ></div>
            )}
            <div className="book-shelf-changer">
              <select onChange={(e) => MoveTo(book, e)} value={book.shelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="None" isOptionDisabled={!book.shelf}>
                  None
                </option>
                {/* {!book.shelf ? (
                  <option value="none" disabled={!book.shelf} selected>
                    None
                  </option>
                ) : (
                  <option value="none" disabled={!book.shelf}>
                    None
                  </option>
                )} */}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {/* {book.authors} */}
          {book.authors && book.authors.join(', ') }
            
            </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Book;
