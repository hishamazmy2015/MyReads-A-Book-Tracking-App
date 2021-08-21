import React from "react";
import { update } from "./BooksAPI";

function Book({ book, MoveTo }) {
  if (!book.shelf) {
    book = { ...book, shelf: "None" };
    update(book, "None");
  }
  console.log("<================== shelf =================>", book);
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
                <option value="currentlyReading" isOptionDisabled={!book.shelf}>
                  Currently Reading
                </option>
                <option value="wantToRead" isOptionDisabled={!book.shelf}>
                  Want to Read
                </option>
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
          <div className="book-authors">{book.authors}</div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Book;