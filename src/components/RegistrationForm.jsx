import React, { Component } from 'react'
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import validator from 'validator';
const passCheck = /^(?=.*\d)(?=.*[a-z]).{8,15}$/;
const zipCodeTest = 	
/^\d{5}$/




export default class RegistrationForm extends Component {
  state = {
    user: {
      name: "",
      surname: "",
      email:"",
      password: "",
      password2:""
    },
    validated: false,
  };

  handleChange = (e) => {
    let newUser = { ...this.state.user };
    newUser[e.target.id] = e.target.value;
    this.setState({
      user: newUser,
    });
  };
  canDisableButton = () => {
    const { user } = this.state;
    let notValid = Object.keys(user).filter((k) => user[k].length <= 0);
    return notValid.length > 0;
    // return notValid.length <= 0
  };

  handleValidation = () => {
      const { user } = this.state

        if (
          user.name.length > 2 &&
          user.surname.length > 3 &&
          validator.isEmail(user.email) &&
          user.password.search(passCheck) !== -1 &&
          user.password2 === user.password 
        ) {
          return true;
        }
  };

    handleSubmit = (e) => {
                    e.preventDefault();

        if (this.handleValidation) {
            this.props.history.push("/summary-registration", { user: this.state.user});
            // console.log(this.state.user)
      }
  };

  render() {
    const { user } = this.state;

    return (
      <Container>
        <h3 className="mt-4">Registration Form</h3>
        <Row className="mt-4">
          <Form
            className="w-100 mb-5 ml-3"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    value={user.name}
                    onChange={this.handleChange}
                    required
                  />
                  {user.name != "" && user.name.length < 2 && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "10px",
                        marginTop: "2px",
                      }}
                    >
                      Name must contain at least 2 characters
                    </h6>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="surname">Surname</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="surname"
                    id="surname"
                    placeholder="Your Surname"
                    required
                    value={user.surname}
                    onChange={this.handleChange}
                  />
                  {user.surname != "" && user.surname.length < 3 && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "10px",
                        marginTop: "2px",
                      }}
                    >
                      Surname must contain at least 3 characters
                    </h6>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label htmlFor="name">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={user.email}
                    onChange={this.handleChange}
                    required
                  />
                  {user.email != "" && !validator.isEmail(user.email) && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "10px",
                        marginTop: "2px",
                      }}
                    >
                      Please insert a correct email
                    </h6>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="phone">Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    required
                    value={user.password}
                    onChange={this.handleChange}
                  />
                  {user.password.search(passCheck) == -1 &&
                    user.password != "" && (
                      <h6
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginTop: "2px",
                        }}
                      >
                        Password should contain at least 8 chars, 1 digit, 1
                        letter
                      </h6>
                    )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="phone">Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="Confirm Password"
                    required
                    value={user.password2}
                    onChange={this.handleChange}
                  />
                  {user.password !== user.password2 &&
                    user.password2 != "" && (
                      <h6
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginTop: "2px",
                        }}
                      >
                        Passwords don't match
                      </h6>
                    )}
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" disabled={this.canDisableButton()}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
