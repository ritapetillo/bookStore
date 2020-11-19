import React, { Component } from 'react'
import { Card, Col, Badge} from "react-bootstrap";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MyBedge from './MyBadge'
import { Link } from "react-router-dom";



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
      let { book } = this.props
    


        return (
          <Col
            className={`col-6 col-md-3 col-lg-2 my-2 ${
              this.state.selected ? "selected" : ""
            }`}
            onClick={() => {
              this.selectBook();
            }}
          >
            <Link to={"/single-book/" + book.asin} query={{ id: book.asin }}>
              <Card key={book.asin}>
                <div className="bookList__image-container">
                  <Card.Img variant="top" src={book.img} />
                </div>
                <Card.Body>
                  <Card.Title className="text-left">
                    {book.title}
                    <br />
                    <MyBedge category={book.category} />
                  </Card.Title>
                  <div className="bookList__price">
                    <h5>$ {book.price}</h5>
                    <AddShoppingCartIcon />
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
    }
}

export default SingleBook
