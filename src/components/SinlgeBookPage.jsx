import React, { Component } from "react";
import { Container, Row, Col, Button, FormControl } from "react-bootstrap";
import "../style/SingleBookPage.css";
import CommentForm from "./CommentForm";
import MyBadge from "./MyBadge";
import PriceTag from "./PriceTag";
import SingleComment from "./SingleComment";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";
import allBooks from "../data/allbooks";
import StarIcon from "@material-ui/icons/Star";
import { getCommentsByBook, postComment, deleteComment } from "../ftutilies";

export class SinlgeBookPage extends Component {
  state = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NmEyYTk4MzViMDAwMTc1ODRlZWEiLCJpYXQiOjE2MDU3OTAyNTAsImV4cCI6MTYwNjk5OTg1MH0.Ejb3EVfJ7nTLrgnDHZxoIT42pIuuNrw04s4nqDxCR2I",
    book: "",
    averageRate: "",

    comments: [],
    singleComment: {
      text: "",
      rate: "",
    },
    errorMsg: "",
    loading: false,
    allComments: [],
    comments: [],
    modified: false,
  };
  // componentDidUpdate = async (prevProp, prevState) => {
  //   if (this.state.modified) {
  //     this.fetchComments();
  //     this.setState({ modified: false });
  //   }
  // };

  componentDidMount = async () => {
    try {
      let book = await allBooks.filter(
        (book) => book.asin === this.props.match.params.id
      );
      this.setState({
        book: book[0],
        singleComment: {
          ...this.state.singleComment,
          asin: this.props.match.params.id,
          username: "rita",
        },
      });
      console.log(this.state.book);
      this.fetchComments();
    } catch (e) {
      console.log(e);
    }
  };

  fetchComments = async () => {
    const comments = await getCommentsByBook(this.state.book.asin);
    this.setState({ comments: comments, allComments: comments });
    console.log(this.state.comments);
    this.getAvRate();
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const res = await postComment(this.state.singleComment);
    if (res) {
      this.setState({
        singleComment: {
          text: "",
          rate: "",
        },
        errorMsg: "",
        loading: false,
        modified: true,
      });
      this.fetchComments();
    } else {
      this.setState({ loading: false });
    }
  };

  handleChange = (e) => {
    console.log(e.target.value);
    let singleCommentClone = { ...this.state.singleComment };
    singleCommentClone[e.target.name] = e.target.value;
    this.setState({ singleComment: singleCommentClone });
    console.log(this.state.singleComment);
  };
  handleDeleteComment = async (id) => {
    console.log(id);
    const res = await deleteComment(id);
    if (res) {
      this.fetchComments();
    } else {
      console.log("there is an error");
    }
  };

  filterComments = (e) => {
    console.log(this.state.allComments);
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

  render() {
    let { book, comments, averageRate } = this.state;
    console.log(comments);
    return (
      <Container className="my-3">
        <Row>
          <Col md={4} className="d-flex align-items-center">
            <img
              src={book.img}
              className="img-fluid singleBookPage__img"
              alt=""
            />
          </Col>
          <Col md={8}>
            <Row className="d-flex flex-column align-items-start divider py-4">
              <h3>{book.title}</h3>
              <h6 className="mb-2"># {book.asin}</h6>

              <span className="d-flex mb-4">
                {Array(averageRate)
                  .fill("")
                  .map((item) => (
                    <StarIcon style={{ color: "#ffc107" }} />
                  ))}
              </span>

              <MyBadge category={book.category} />
            </Row>
            <Row className="d-flex flex-column align-items-start divider py-4">
              <h4 className="ml-1">$ {book.price}</h4>
              <div className="d-flex">
                <PriceTag text={"Hardcover"} price={book.price} />
                <PriceTag text={"eBook"} price={book.price} />
              </div>

              <div className="mt-4">
                <Button className="mr-2">Add to cart</Button>
                <Button variant="success">Add to your watchlist</Button>
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="d-flex align-items-center mr-3 nav__search my-4">
            <FormControl
              type="text"
              placeholder="Search Comments"
              className="mr-sm-2"
              onChange={(e) => this.filterComments(e)}
            />
            <SearchIcon />
          </div>
        </Row>
        {comments !== [] &&
          comments.map((comment) => (
            <SingleComment
              id={comment._id}
              text={comment.text}
              rate={Number(comment.rate)}
              author={comment.username}
              key={comment._id}
              handleDeleteComment={this.handleDeleteComment}
            />
          ))}

        <Row className="w-100">
          <CommentForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            text={this.state.singleComment.text}
            rate={this.state.singleComment.rate}
          />
        </Row>
      </Container>
    );
  }
}

export default withRouter(SinlgeBookPage);
