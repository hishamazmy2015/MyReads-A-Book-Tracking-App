import React, { update, useEffect, useState } from "react";
import Book from "./Book";

function Bookshelf({ props }) {
  const result = props;

  const [reads, setReads] = useState([]);
  const [currentlyReadings, setCurrentlyReadings] = useState([]);
  const [wantToReads, setWantToReads] = useState([]);

  let read = [];
  let currentlyReading = [];
  let wantToRead = [];

  useEffect(() => {
    async function fetchMyAPI() {
      await result.map((s) => {
        if (s.shelf === "currentlyReading") {
          console.log("<=====   currentlyReading00 ====> ");
          console.log("<=====   currentlyReading00 ====> ", currentlyReading);
          currentlyReading = [...currentlyReading, s];
        } else if (s.shelf === "wantToRead") {
          wantToRead = [s, ...wantToRead];
          console.log("<=====   wantToRead00           =====> ");
          console.log("<=====   wantToRead00            =====> ", wantToRead);
        } else if (s.shelf === "read") {
          read = [s, ...read];
          console.log("<=====   read00                  =====> ");
          console.log("<=====   read00                  =====> ", read);
        }
      });
    }
    fetchMyAPI();
    setReads(read)
    setCurrentlyReadings(currentlyReading)
    setWantToReads(wantToRead)

    console.log("<=====   currentlyReading2      =======> ", currentlyReadings);
    console.log("<=====   read2                  =====> ", reads);
    console.log("<=====   wantToRead2            =====> ", wantToReads);
  }, [props]);

  console.log("<=====   currentlyReading3      =======> ", currentlyReading);
  console.log("<=====   read3                  =====> ", read);
  console.log("<=====   wantToRead3            =====> ", wantToRead);

  console.log("<=====   currentlyReadings3s      =======> ", currentlyReadings);
  console.log("<=====   reads3s                  =====> ", reads);
  console.log("<=====   wantToReads3s            =====> ", wantToReads);
  return (
    <div>
      {currentlyReadings &&
        currentlyReadings.length > 0 &&
        currentlyReadings.map((r) => (
          <div>
            <h1>{r.shelf} </h1>
            <div className="bookshelf">
              <h2 className="bookshelf-title"> {r.shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <li>
                    <Book />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        ))}

      {wantToReads &&
        wantToReads.length > 0 &&
        wantToReads.map((r) => (
          <div>
            <h1>{r.shelf} </h1>
            <div className="bookshelf">
              <h2 className="bookshelf-title"> {r.shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <li>
                    <Book />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        ))}

      {reads &&
        reads.length > 0 &&
        reads.map((r) => (
          <div>
            <h1>{r.shelf} </h1>
            <div className="bookshelf">
              <h2 className="bookshelf-title"> {r.shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <li>
                    <Book />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Bookshelf;
