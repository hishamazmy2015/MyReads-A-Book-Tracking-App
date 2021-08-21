import React, { useState, useEffect } from "react";

import { getAll, search, update } from "./BooksAPI";
import "./App.css";
import { Link } from "react-router-dom";
import Book from "./Book";
import Bookshelf from "./Bookshelf";

function BooksApp() {
  const [state, setState] = useState({
    showSearchPage: false,
  });
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);

  const MoveTo = (book, e) => {
    update(book, e.target.value).then(fetchMyAPI());
  };

  async function fetchMyAPI() {
    let fu = await getAll();
    setResult(fu);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  async function searchFun(e) {
    setResult2([]);
    if (e && e !== "")
      search(e, 5)
        .then((data) => {
          setResult2([...data, ...result2]);
        })
        .catch((error) => {
          setResult2({ error });
          console.log("<============= error============ >",error)
        });
    else setResult2([]);
  }

  return (
    <div className="app">
      {state.showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to="/"
              className="close-search"
              onClick={() => setState({ showSearchPage: false })}
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input
                type="search"
                onChange={(e) => searchFun(e.target.value)}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {result2 && result2.length > 0 ? (
                <Bookshelf results2={result2} MoveTos={MoveTo} />
              ) : (
                <div>
                
                    {" "}
                    <h1>
                      {" "}
                      <span color="#fff388"> No Result </span>
                    </h1>{" "}
                  
                  
                </div>
              )}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf props={result} MoveTos={MoveTo} />
            </div>
          </div>
          <div className="open-search">
            <Link
              onClick={() => setState({ showSearchPage: true })}
              to="/search"
            >
              Add a book
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksApp;
