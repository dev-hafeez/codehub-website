import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/Hero.css";
import RightCol from "./rightCol";
import LeftCol from "./LeftCol";

const Hero = () => {
  return (
    <section className="hero-section text-white py-5 ">
      <Container>
        <Row className="align-items-center">
  <Col lg={6} sm={12} className="text-center mb-4 mb-lg-0">
    <LeftCol />
  </Col>
  <Col lg={6} sm={12}>
    <RightCol />
  </Col>
</Row>

      </Container>
    </section>
  );
};

export default Hero;
