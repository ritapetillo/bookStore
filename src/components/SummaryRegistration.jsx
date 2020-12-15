import React from 'react'
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";


export default function SummaryRegistration({ location }) {
    const { state } = location;
    const {user} = state
    
    return (
      <Container>
        <div className="w-50 mt-4">
          <h3 className="mb-4">Review your data</h3>
          <Row>
            <Col sm={2}>
              <h5>Name</h5>
            </Col>
            <Col>{user.name}</Col>
          </Row>
          <Row>
            <Col sm={2}>
              <h5>Surname</h5>
            </Col>
            <Col>{user.surname}</Col>
          </Row>
          <Row>
            <Col sm={2}>
              <h5>Email</h5>
            </Col>
            <Col>{user.email}</Col>
          </Row>
     
          
            </div>
            <Button className="mt-4 mb-4">Confirm</Button>
      </Container>
    );
}
