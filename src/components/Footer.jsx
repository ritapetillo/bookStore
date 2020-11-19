import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import "../style/Footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import PinterestIcon from "@material-ui/icons/Pinterest";

export default function Footer() {
  return (
    <div className="footer__container">
      <Container className="px-4">
        <Row>
          <Col>
            <h4>Website</h4>
            <h5>About us</h5>
            <h5>Contact us</h5>
            <h5>Private Policy</h5>
          </Col>
          <Col>
            <h4>Partnerships</h4>
            <h5>Wholesale</h5>
            <h5>Library Partnership</h5>
            <h5>Corrections Libraries</h5>
          </Col>
          <Col>
            <h4>Quick Help</h4>
            <h5>Help & Support</h5>
            <h5>Shipping Costs</h5>
            <h5>Billing</h5>
          </Col>
          <Col>
           
            <h4>Follow Us</h4>
            <div class="d-flex text-white justify-content-between">
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
              <PinterestIcon/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
