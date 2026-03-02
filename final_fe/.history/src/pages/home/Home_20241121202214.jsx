import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <Helmet title="Home" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-4 text-center">Trang chủ quản lý</h1>
        <Row className="justify-content-center">
          
          
          {/* Box Quản lý thiết bị */}
          <Col md={4} sm={6} className="mb-4">
            <Card
              className="custom-card device-card text-center hover-card"
              onClick={() => handleNavigate("/devices")}
            >
              <Card.Body className="d-flex align-items-center justify-content-center">
                <i className="bi bi-tools icon me-3"></i>
                <h4 className="card-title mb-0">Quản lý thiết bị</h4>
              </Card.Body>
            </Card>
          </Col>


          {/* Box Phòng ban */}
          <Col md={4} sm={6} className="mb-4">
            <Card
              className="custom-card department-card text-center hover-card"
              onClick={() => handleNavigate("/departments")}
            >
              <Card.Body className="d-flex align-items-center justify-content-center">
                <i className="bi bi-diagram-3 icon me-3"></i>{" "}
                {/* Icon mới cho Phòng ban */}
                <h4 className="card-title mb-0">Phòng ban</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
