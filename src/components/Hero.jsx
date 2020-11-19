import React from 'react'
import {
 Jumbotron,
  Container,
  Button

} from "react-bootstrap";
import "../style/Hero.css";



export default function Hero() {
    return (
      <Container>
        <Jumbotron className="hero"></Jumbotron>
      </Container>
    );
}
