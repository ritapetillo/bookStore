import React from 'react'
import { Row, Col, Button } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";


export default function SingleComment({ comment, author, rate, key, handleDeleteComment,id }) {
  return (
    <Row className="divider py-3 ">
      <Col className="d-flex flex-column align-items-start" sm={10}>
        <span>
        
          {Array(rate)
            .fill("")
            .map((item) => (
              <StarIcon style={{ color: "#ffc107" }} />
            ))}
        </span>
        <small>from {author}</small>
        <p>{comment}</p>
      </Col>
      <Col className="d-flex align-items-center">
        <DeleteIcon onClick={() => handleDeleteComment(id)} />
      </Col>
    </Row>
  );
}
