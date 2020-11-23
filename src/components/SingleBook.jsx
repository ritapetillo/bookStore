import React, { Component } from 'react'
import { Card, Col, Badge, Button} from "react-bootstrap";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MyBedge from './MyBadge'
import { Link } from "react-router-dom";
import CommentIcon from "@material-ui/icons/Comment";




export class SingleBook extends Component {
    state = {
    selected:false
    }
  
  
    
    selectBook = () => {
        this.setState({ selected: !this.state.selected })
        console.log(this.state)
    }
  
  render() {
    let variant;
      let { book , handleSelection} = this.props
    


    return (
      <Col
        className={`col-6 col-md-3 col-lg-2 my-2 ${
          this.state.selected ? "selected" : ""
        }`}
        onClick={() => {
          this.selectBook();
        }}
      >
        <Card key={book.asin}>
          <Link to={"/single-book/" + book.asin} query={{ id: book.asin }}>
            <div className="bookList__image-container">
              <Card.Img variant="top" src={book.img} />
            </div>
          </Link>

          <Card.Body>
            <Card.Title className="text-left">
              {book.title}
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <MyBedge category={book.category} />
                <CommentIcon onClick={() => handleSelection(book.asin, book.title)} />
              </div>
            </Card.Title>
            <div className="bookList__price">
              <h5>$ {book.price}</h5>
              <AddShoppingCartIcon />
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
    }
}

export default SingleBook
