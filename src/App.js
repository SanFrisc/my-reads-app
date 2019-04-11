import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ListBooks from "./ListBooks";
import Search from "./search";
import "./App.css";

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/search" render={() => <Search />} />
            <Route exact path="/" render={() => <ListBooks />} />
          </Switch>
          <Link to="/search" className="open-search">
            <button>Add Book</button>
          </Link>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
