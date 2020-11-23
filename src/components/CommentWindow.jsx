import React from 'react'
import { Container, Button, Row, Col, FormControl } from "react-bootstrap";
import SingleComment from './SingleComment'
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";


export default function CommentWindow({
  handleCommentClose,
  comments,
  title,
  handleDeleteComment,
}) {
  console.log(title);
  return (
    <Container className="comments__window position-absolute px-5">
      <Row>
        <ArrowForwardIosIcon onClick={() => handleCommentClose()} />
        <h6 className="mt-3">{title}</h6>
        <h6 className="mt-3">Comments</h6>
      </Row>
      {comments.map((comment) => (
        <SingleComment
          id={comment._id}
          comment={comment.comment}
          rate={comment.rate}
          author={comment.author}
          key={comment._id}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </Container>
  );
}

