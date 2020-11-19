import React, { Component } from "react";
import { Container, Row, Col, Button, FormControl } from "react-bootstrap";
import "../style/SingleBookPage.css";
import CommentForm from "./CommentForm";
import MyBadge from "./MyBadge";
import PriceTag from "./PriceTag";
import SingleComment from "./SingleComment";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";
import allBooks from '../data/allbooks'


export class SinlgeBookPage extends Component {
    state = {
        token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NmEyYTk4MzViMDAwMTc1ODRlZWEiLCJpYXQiOjE2MDU3OTAyNTAsImV4cCI6MTYwNjk5OTg1MH0.Ejb3EVfJ7nTLrgnDHZxoIT42pIuuNrw04s4nqDxCR2I",
        book:"",
    
        comments: [],
        singleComment: {
            comment: "",
            rate: "",
            elementId: "",
        },
        errorMsg: "",
        loading: false,
        allComments: [],
        modified: false
    };
        componentDidUpdate = async (prevProp, prevState) => {

            if (this.state.modified ) {
                this.fetchComments()
                this.setState({modified:false})

         
        }
      };

    componentDidMount = async () => {
        try {
                      let book = await allBooks.filter(
                        (book) => book.asin === this.props.match.params.id
                      );
                      this.setState({ book: book[0] });
                      console.log(this.state.book);
                      this.fetchComments();  
        } catch (e) {
            console.log(e)
        }


           
            
           
        }
    

    fetchComments = async () => { 
         let urlComments =
                "https://striveschool-api.herokuapp.com/api/comments/" +
                this.state.book.asin;
        let headers = {
            Authorization: `Bearer ${this.state.token}`,
            "Content-Type": "application/json"
        }
         try {
                let res = await fetch(urlComments, {
                    method: "GET",
                    headers: new Headers(headers),
                });
                let data = await res.json();
                this.setState({ comments: data, allComments: data });
              
            } catch (e) {
                console.log(e);
            }
    }
    

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let headers = {
      Authorization: `Bearer ${this.state.token}`,
      "Content-Type": "application/json",
    };
    try {
      let res = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: new Headers(headers),
          body: JSON.stringify(this.state.singleComment),
        }
      );
      console.log(res);
      if (res.ok) {
        this.setState({
          singleComment: {
            comment: "",
            rate: "",
            elementId: "",
          },
          errorMsg: "",
            loading: false,
            modified: true
        });
        console.log(this.state.singleComment);
      } else {
        let error = await res.json();
        this.setState({ errorMsg: error.message, loading: false });
      }
    } catch (e) {
      this.setState({ errorMsg: e.message, loading: false });
    }
       
     }
        
    

  handleChange = (e) => {
    console.log(e.target.value);
    let singleCommentClone = { ...this.state.singleComment };
    singleCommentClone[e.target.name] = e.target.value;
    singleCommentClone.elementId = this.state.book.asin;
    this.setState({ singleComment: singleCommentClone });
    console.log(this.state.singleComment);
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
            this.setState({modified:true})
            
        } else {
            console.log('there is an error')
        }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  filterComments = (e) => {
    console.log(this.state.allComments);
    let research = e.target.value;
    let { allComments } = this.state;
      let filteredComments = allComments.filter((comment) =>
        comment.comment.toLowerCase().includes(research.toLowerCase())
      );
      console.log(filteredComments)
    this.setState({ comments: filteredComments });
  };

  render() {
    let { book, comments } = this.state;
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
        {comments.map((comment) => (
          <SingleComment
            id={comment._id}
            comment={comment.comment}
            rate={comment.rate}
            author={comment.author}
            key={comment._id}
            handleDeleteComment={this.handleDeleteComment}
          />
        ))}

        <Row className="w-100">
          <CommentForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            comment={this.state.singleComment.comment}
            rate={this.state.singleComment.rate}
          />
        </Row>
      </Container>
    );
  }
}

export default withRouter (SinlgeBookPage);
