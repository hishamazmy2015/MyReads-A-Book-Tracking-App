import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { getAll, search, update } from "./BooksAPI";
import "./App.css";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import SearchComponent from "./SearchComponent";
import Search2 from './Search2';
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

  async function changeSearchPage() {
    useState({ showSearchPage: !state.showSearchPage });
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


      <Route exact path="/search2" component={Search2} ></Route>


      <Route
        exact
        path="/search"
        component={
          <SearchComponent
            res={result2}
            MoveTos={MoveTo}
            searchFuns={searchFun}
          />
        }
      ></Route>
      {state.showSearchPage ? (
        <div></div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                props={result}
                MoveTos={MoveTo}
                toggleSearch={changeSearchPage}
              />
            </div>
          </div>
          <div className="open-search">
            <Link
              onClick={() => {
                setState({ showSearchPage: true });
                searchFun("");
              }}
              path="/search"
              exact
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
