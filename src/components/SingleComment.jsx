import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";

export default function SingleComment({
  comment,
  author,
  rate,
  key,
  handleDeleteComment,
  id,
}) {
  console.log(comment)
  return (
    <Row className="divider py-3 text-left">
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
      <Col className="d-flex align-items-center comment__item">
        <DeleteIcon
          onClick={() => handleDeleteComment(id)}
          style={{ cursor: "pointer" }}
          className="delete__icon"
        />
      </Col>
    </Row>
  );
}
