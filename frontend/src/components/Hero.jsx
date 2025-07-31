import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Hero.css";
import RightCol from "./rightCol";
import LeftCol from "./LeftCol";

const Hero = () => {
  return (
    <section className="hero-section text-white py-5">
      <Container>
        <Row className="align-items-center">

          {/* Left Section */}
          <Col md={6} className="text-center mb-4 mb-md-0">
            <LeftCol />
          </Col>

          {/* Right Section */}
          <Col md={6}>
            <RightCol />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
