import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import { getAll, search, update } from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import SearchComponent from "./SearchComponent";

function BooksApp() {
  const [state, setState] = useState({
    showSearchPage: false,
  });
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);

  const MoveTo = async (book, e) => {
    book = { ...book, shelf: e.target.value };
    await update(book, e.target.value);
    fetchMyAPI();
    await fetchMyAPI();
    //Need To Cancel the request before the newest one.
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

  const combinedIDOfBooks = (books1, books2) => {
    // result2.map((item,i) =>Object.assign({},item,result[i]))
  };
  function searchFun(e) {
    let responseAssignResult2 = [];
    setResult2([]);
    if (e && e !== "")
      search(e, 5)
        .then((res2) => {
          res2.map((item, i) => {
            if (item && item.shelf === undefined) {
              item = { ...item, shelf: "None" };
            }
            const found = result.filter((exist) => {
               (exist.id === item.id) ;
            });
            if (found) console.log("<=========== Found =========== > ", found);

            responseAssignResult2 = [item, ...responseAssignResult2];
            // Object.assign({},item,result[i])
          });
          setResult2([responseAssignResult2, ...result2]);

          // res.map(data=>{
          //   const found = result.map((exist) => {if(exist.id === data.id ) return exist });
          //   if (!found) setResult2([data, ...result2]);
          //   else setResult2([found, ...result2]);
          // })
        })
        .catch((error) => {
          setResult2({ error });
        });
    else setResult2([]);
  }

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/search"
          render={() => (
            <SearchComponent
              result2={result2}
              MoveTo={MoveTo}
              searchComp={searchFun}
            />
          )}
        ></Route>
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
              to="/search"
              exact
            >
              Add a book
            </Link>
          </div>
        </div>
      </Switch>
    </div>
  );
}

export default BooksApp;
