import React, { update, useEffect, useState } from "react";
import Book from "./Book";

function Bookshelf({ props, results2, MoveTos }) {
  const result = props;
  debugger
  const [books, setBooks] = useState([]);
  const [reads, setReads] = useState([]);
  const [currentlyReadings, setCurrentlyReadings] = useState([]);
  const [wantToReads, setWantToReads] = useState([]);

  let read = [];
  let currentlyReading = [];
  let wantToRead = [];

  useEffect(() => {
    async function fetchMyAPI() {
      result &&
        (await result.map((s) => {
          if (s.shelf === "currentlyReading") {
            currentlyReading = [...currentlyReading, s];
          } else if (s.shelf === "wantToRead") {
            wantToRead = [s, ...wantToRead];
          } else if (s.shelf === "read") {
            read = [s, ...read];
          }
        }));
    }
    fetchMyAPI();
    setReads(read);
    setCurrentlyReadings(currentlyReading);
    setWantToReads(wantToRead);
    setBooks([read, currentlyReading, wantToRead]);
  }, [props, MoveTos,]);

  return (
    <div>
      {results2 ? (
        <div>
          {results2 &&
            results2.length > 0 &&
            results2.map((r, index) => (
              <div key={index}>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <li>
                      <Book book={r} MoveTo={MoveTos} />
                    </li>
                  </ol>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <h2 className="bookshelf-title">
            {currentlyReadings &&
              currentlyReadings.length > 0 &&
              currentlyReadings[0].shelf}
          </h2>
          {currentlyReadings &&
            currentlyReadings.length > 0 &&
            currentlyReadings.map((r, index) => (
              <div key={index}>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <li>
                      <Book book={r} MoveTo={MoveTos} />
                    </li>
                  </ol>
                </div>
              </div>
            ))}

          <h2 className="bookshelf-title">
            {" "}
            {wantToReads && wantToReads.length > 0 && wantToReads[0].shelf}
          </h2>
          {wantToReads &&
            wantToReads.length > 0 &&
            wantToReads.map((r, index) => (
              <div key={index}>
                <div className="bookshelf-books" key={index}>
                  <ol className="books-grid">
                    <li>
                      <Book book={r} MoveTo={MoveTos} />
                    </li>
                  </ol>
                </div>
              </div>
            ))}

          <h2 className="bookshelf-title">
            {reads && reads.length > 0 && reads[0].shelf}
          </h2>
          {reads &&
            reads.length > 0 &&
            reads.map((r, index) => (
              <div key={index}>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <li>
                      <Book book={r} MoveTo={MoveTos} />
                    </li>
                  </ol>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Bookshelf;
