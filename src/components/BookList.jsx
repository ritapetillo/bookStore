import React, { Component } from "react";
import { Container, Button, Row, Col, FormControl } from "react-bootstrap";
import SingleBook from "./SingleBook";
import AlertBook from "./AlertBook";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import "../style/BookList.css";
import CommentWindow from "./CommentWindow";
import { FlashOnRounded } from "@material-ui/icons";


export default class BookList extends Component {
  state = {
    modifiedComments: false,
    commentShow: false,
    currentBook: "",
    comments: "",
    averageRate: "",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NmEyYTk4MzViMDAwMTc1ODRlZWEiLCJpYXQiOjE2MDU3OTAyNTAsImV4cCI6MTYwNjk5OTg1MH0.Ejb3EVfJ7nTLrgnDHZxoIT42pIuuNrw04s4nqDxCR2I",
    currentBookTitle: "",
  };

  componentDidUpdate = (prevProp, prevState) => {
    if (prevState.currentBook !== this.state.currentBook) {
      this.fetchComments();
    }
    if (prevState.modifiedComments !== this.state.modifiedComments) {
            this.fetchComments();

    }
  };
  handleSelection = (book_id, book_title) => {
    this.setState({
      currentBook: book_id,
      commentShow: true,
      currentBookTitle: book_title,
    });
    console.log(this.state);
  };
  handleCommentClose = () => {
    this.setState({ commentShow: false });
  };

  fetchComments = async () => {
    let urlComments =
      "https://striveschool-api.herokuapp.com/api/comments/" +
      this.state.currentBook;
    let headers = {
      Authorization: `Bearer ${this.state.token}`,
      "Content-Type": "application/json",
    };
    try {
      let res = await fetch(urlComments, {
        method: "GET",
        headers: new Headers(headers),
      });
      let data = await res.json();
      console.log(data);
      this.setState({ comments: data, allComments: data });
      this.getAvRate();
    } catch (e) {
      console.log(e);
    }
  };
  filterComments = (e) => {
    let research = e.target.value;
    let { allComments } = this.state;
    let filteredComments = allComments.filter((comment) =>
      comment.comment.toLowerCase().includes(research.toLowerCase())
    );
    console.log(filteredComments);
    this.setState({ comments: filteredComments });
  };

  getAvRate = () => {
    let { comments } = this.state;
    if (comments.length > 0) {
      let total = comments.reduce((tot, comm) => {
        return tot + parseInt(comm.rate);
      }, 0);
      let average = Math.round(total / comments.length);

      this.setState({ averageRate: average });
    }
  };

  handleDeleteComment = async (id) => {
    console.log(id);
    let urlComments =
      "https://striveschool-api.herokuapp.com/api/comments/" + id;
    let headers = {
      Authorization: `Bearer ${this.state.token}`,
      "Content-Type": "application/json",
    };
    try {
      let res = await fetch(urlComments, {
        method: "DELETE",
        headers: new Headers(headers),
      });
      let data = await res.json();
      if (res.ok) {
        this.setState({ modifiedComments: !this.state.modifiedComments });
      } else {
        console.log("there is an error");
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {
      bookList,
      title,
      reduce,
      navigate,
      indexBook,
      filterBooks,
    } = this.props;
    const { commentShow, currentBook, comments, currentBookTitle } = this.state;

    return (
      <Container className="position-relative">
        <Col md={12}>
          <div className="d-flex justify-content-between">
            <h3 className="bookList__title text-left">{title.toUpperCase()}</h3>
            <div className="ml-auto d-flex align-items-center mr-3 nav__search">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => filterBooks(e, title)}
              />
              <SearchIcon />
            </div>
            <div>
              {/* <UnfoldLessIcon
              className="icon-cursor"
              onClick={() => reduce(title)}
            ></UnfoldLessIcon> */}
              <ArrowBackIosIcon
                className="icon-cursor"
                onClick={() => navigate(title, "back", 18)}
              />
              <span className="px-3">{indexBook / 18}</span>
              <ArrowForwardIosIcon
                className="icon-cursor"
                onClick={() => navigate(title, "next", 18)}
              />
            </div>
          </div>
          <Row>
            <AlertBook
              text="No results"
              variant="warning"
              show={bookList <= 0 ? true : false}
            />
          </Row>
          <Row>
            {bookList.map((book) => (
              <SingleBook book={book} handleSelection={this.handleSelection} />
            ))}
          </Row>
        </Col>
        {commentShow && comments !== "" && (
          <CommentWindow
            book_id={currentBook}
            handleCommentClose={this.handleCommentClose}
            comments={comments}
            title={currentBookTitle}
            handleDeleteComment={this.handleDeleteComment}
          />
        )}
      </Container>
    );
  }
}
