import React, { update, useEffect, useState } from "react";
import Book from "./Book";
import { getAll } from "./BooksAPI";

function Bookshelf() {
  const [res, setRes] = useState([]);
  const [read, setRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);


    useEffect(() => 
    
    getAll().then((ss) => {
      console.log("<============ RES =====================> ", ss);
        ss &&
          ss.map((s) => {
            switch (s.shelf) {
              case "currentlyReading":
                setCurrentlyReading([s, ...currentlyReading]);
                console.log("object  recurrentlyReadings >>> ", currentlyReading);
                break;
              case "wantToRead":
                setWantToRead([s], ...wantToRead);
                console.log("object  wantToRead >>> ", wantToRead);
                break;
              case "read":
                setRead([s, ...read]);
                console.log("object  read >>> ", read);
                break;
            }
          });

          setRes([read, currentlyReading, wantToRead]);
          console.log("object  res >>> ", res);
      }),[]);
    
  
    console.log("object  ress >>> ", res);
  
  return (
    <div>
      {res &&
        res.length > 0 &&
        res.map((r) => (
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
