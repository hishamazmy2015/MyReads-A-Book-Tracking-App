import React, { useState, useEffect } from "react";

import "./App.css";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";

function SearchComponent({ result2, MoveTo, searchComp }) {
  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            onClick={() => {
              searchComp("");
            }}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="search"
              onChange={(e) => searchComp(e.target.value)}
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
            ) : result2 && result2.length > 0 ? (
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
      ;
    </div>
  );
}

export default SearchComponent;
