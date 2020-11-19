import React from 'react'
import { Form, Button } from "react-bootstrap";


function CommentForm({handleSubmit,handleChange,comment,rate}) {
    return (
      <Form
        className="w-100 comment__form text-left"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comment"
            value={comment}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rate</Form.Label>
          <Form.Control
            as="select"
            name="rate"
            className="w-50"
            onChange={(e) => handleChange(e)}
          >
                    <option value="" selected={rate ===""} > Rate the book here</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option valeu="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Comment
        </Button>
      </Form>
    );
}

export default CommentForm
