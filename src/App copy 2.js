import React, { useState, useEffect } from "react";

import { getAll, search, update } from "./BooksAPI";
import "./App.css";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import Search2 from "./Search2";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function BooksApp() {
  const [state, setState] = useState({
    showSearchPage: false,
  });
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);

  const MoveTo = async (book, e) => {
    console.log(" e is ", e);
    book = { ...book, shelf: e.target.value };
    await update(book, e.target.value);
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
          setResult2([...data, ...result2]);
        })
        .catch((error) => {
          setResult2({ error });
          console.log("<============= error============ >", error);
        });
    else setResult2([]);
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/search2" component={Search2}></Route>

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
                exact
                path="/search"
                onClick={() => {
                  setState({ showSearchPage: true });
                  searchFun("");
                }}
              >
                Add a book
              </Link>
            </div>
          </div>
        )}
      </Switch>
    </div>
  );
}

export default BooksApp;
