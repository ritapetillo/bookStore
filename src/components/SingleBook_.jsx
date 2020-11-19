import React from "react";
import { Card, Col } from "react-bootstrap";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import "../style/BookList.css";

class BookList extends React.Component  {
   
        state = {
            selected:false
        }

        selectBook = () => {
            this.setState({selected:!this.state.selected})
        }
    render() {
        let book = this.props.book;
        
        return (
    
        
            <Col className={"col-6 col-md-3 col-lg-2 my-2" } onClick={()=>this.selectBook()}>
                <Card key={book.asin}>
                    <div className="bookList__image-container">
                        <Card.Img variant="top" src={book.img} />
                    </div>
                    <Card.Body>
                        <Card.Title className="text-left">{book.title}</Card.Title>
                        <div className="bookList__price">
                            <h5>$ {book.price}</h5>
                            <AddShoppingCartIcon />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
 
        )
}
}

    export default BookList