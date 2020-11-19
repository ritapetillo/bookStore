import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Child from "./Child";
import { Container, Button, Col } from "react-bootstrap";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import BookList from "./components/BookList";
import { Book } from "@material-ui/icons";
import fantasy from "./data/fantasy.json";
import history from "./data/history.json";
import horror from "./data/horror.json";
import scifi from "./data/scifi.json";
import romance from "./data/romance.json";
import SinlgeBookPage from "./components/SinlgeBookPage";
import { Link, Route, Switch } from "react-router-dom";


let books = {
  fantasy,
  history,
  scifi,
  horror,
  romance,
};

class App extends React.Component {
  state = {
    bookList: books.fantasy.slice(0, 18),
    title: "fantasy",
    reduced: false,
    index: 18,
  };

  changeCategory = (cat) => {
    this.setState({ bookList: books[cat].slice(0, 18), title: cat,index:18 });
  };
  searchBook = (e) => {
        let research = e.target.value;

    let allBooks = [...fantasy, ...horror, ...history, ...romance, ...scifi];
    let filteredBooks = allBooks.filter((book) =>
      book.title.toLocaleLowerCase().includes(research.toLocaleLowerCase())
    );
    this.setState({
      bookList: filteredBooks,
      title:
        research === "" ? "Results - All Books" : `Results for ${research}`,
    });
  };

  filterBooks = (e,cat) => {
    let research= e.target.value;
    let booksToFilter = books[cat]
    let filteredBooks = booksToFilter.filter(book => book.title.toLocaleLowerCase().includes(research.toLocaleLowerCase()))
   this.setState({bookList:filteredBooks})

  }
  navigate = (cat, dir, increment) => {
    switch (dir) {
      case "back":
        if (this.state.index - increment >= 18) {
          console.log(this.state.index)
          this.setState({
            bookList: books[cat].slice(
              this.state.index - 2* increment,
              this.state.index - increment
            ),
            index: this.state.index - increment,
          });
        }

        break;
      case "next":
        if (this.state.index + increment <= books[cat].length) {
          
          this.setState({
            bookList: books[cat].slice(
              this.state.index,
              this.state.index + increment
            ),
            index: this.state.index + increment,
          });
        }
        break;
    }
  };

  reduce = (cat) => {
    if (this.state.reduced) {
      this.changeCategory(cat.toLocaleLowerCase());
      this.setState({ reduced: false });
      console.log(this.state);
    } else {
      this.setState({
        bookList: this.state.bookList.slice(0, 18),
        reduced: true,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <NavBar changeCategory={this.changeCategory} search={this.searchBook} />
        <Switch>
          <Route exact path="/">
            <Hero />
            <BookList
              bookList={this.state.bookList}
              title={this.state.title}
              reduce={this.reduce}
              navigate={this.navigate}
              indexBook={this.state.index}
              filterBooks={this.filterBooks}
            />
          </Route>
          <Route exact path="/single-book/:id">
            <SinlgeBookPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
