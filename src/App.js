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

  const MoveTo = async (book, e) => {
    console.log(" e is ", e);
    book = { ...book, shelf: e.target.value };
    // update(book, e.target.value);
    await update(book, e.target.value);
    // await fetchMyAPI();
    await fetchMyAPI();
  };

  async function fetchMyAPI() {
    let fu = await getAll();
    setResult(fu);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

   function searchFun(e) {
    setResult2([]);
    if (e && e !== "")
      search(e, 5)
        .then((data) => {
          // data &&
          //   data.map((sh) => {
          //     if (!sh.shelf) {
          //       sh = { ...sh, shelf: "None" };
          //       update(sh, "None");
          //     }
          //   });

          setResult2([...data, ...result2]);
          // fetchMyAPI();
        })
        .catch((error) => {
          setResult2({ error });
          console.log("<============= error============ >", error);
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
              onClick={() => {
                setState({ showSearchPage: false });
                searchFun("");
              }}
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="search"
                onChange={(e) => searchFun(e.target.value)}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {result2 && result2.error ? (
                <div>
                  <h>Try Search Again </h>
                </div>
              ) : result2.length > 0 ? (
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
              onClick={() => {
                setState({ showSearchPage: true });
                searchFun("");
              }}
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
