import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <Helmet title="Home" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-4 text-center">Home Page</h1>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Card
              className="text-center shadow-lg border-0 rounded-3 hover-card"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
              onClick={() => handleNavigate("/devices")}
            >
              <Card.Body>
                <h4 className="card-title">Quản lý thiết bị</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="text-center shadow-lg border-0 rounded-3 hover-card"
              style={{ cursor: "pointer", backgroundColor: "#e9ecef" }}
              onClick={() => handleNavigate("/accounts")}
            >
              <Card.Body>
                <h4 className="card-title">Quản lý tài khoản</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="text-center shadow-lg border-0 rounded-3 hover-card"
              style={{ cursor: "pointer", backgroundColor: "#dee2e6" }}
              onClick={() => handleNavigate("/departments")}
            >
              <Card.Body>
                <h4 className="card-title">Khoa/Viện</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
