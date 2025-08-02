import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
<<<<<<< HEAD
import "./Hero.css";
=======
import "../styles/Hero.css";
>>>>>>> feature/achievements-blog
import RightCol from "./rightCol";
import LeftCol from "./LeftCol";

const Hero = () => {
  return (
<<<<<<< HEAD
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
=======
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

>>>>>>> feature/achievements-blog
      </Container>
    </section>
  );
};

export default Hero;
