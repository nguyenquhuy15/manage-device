import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  // Hàm xử lý khi nhấn vào khung
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
              className="custom-card text-center hover-card"
              onClick={() => handleNavigate("/devices")}
            >
              <Card.Body>
                <div className="icon-container">
                  <i className="bi bi-tools icon"></i>
                </div>
                <h4 className="card-title">Quản lý thiết bị</h4>
              </Card.Body>
            </Card>
          </Col>

          {/* Box Quản lý tài khoản */}
          <Col md={4} sm={6} className="mb-4">
            <Card
              className="custom-card text-center hover-card"
              onClick={() => handleNavigate("/accounts")}
            >
              <Card.Body>
                <div className="icon-container">
                  <i className="bi bi-person-circle icon"></i>
                </div>
                <h4 className="card-title">Quản lý tài khoản</h4>
              </Card.Body>
            </Card>
          </Col>

          {/* Box Khoa/Viện */}
          <Col md={4} sm={6} className="mb-4">
            <Card
              className="custom-card text-center hover-card"
              onClick={() => handleNavigate("/departments")}
            >
              <Card.Body>
                <div className="icon-container">
                  <i className="bi bi-building icon"></i>
                </div>
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
