import React from 'react'
import { Container, Button, Col,Row } from "react-bootstrap";


function Child(props) {
  return (
    <Container>
      <Row className="d-flex justify-content-center mb-4">
        <Col>
          <p>
            I'm a child component {props.name} {props.counter}
          </p>
        </Col>
        <Col>
          <Button onClick={props.incrase}>Incrase counter</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Child
