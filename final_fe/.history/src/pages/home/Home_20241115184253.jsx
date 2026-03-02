import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        <h1 className="h3 mb-3">Home Page</h1>
        <Row>
          <Col md={4}>
            <Card
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigate("/devices")}
            >
              <Card.Body>
                <h4>Page 1</h4>
                <p>Go to Page 1</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigate("/accounts")}
            >
              <Card.Body>
                <h4>Page 2</h4>
                <p>Go to Page 2</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigate("/departments")}
            >
              <Card.Body>
                <h4>Page 3</h4>
                <p>Go to Page 3</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
