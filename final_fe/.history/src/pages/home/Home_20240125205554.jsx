import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container } from "react-bootstrap";

const HomePage = () => (
  <>
    <Helmet title="Home" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Home Page</h1>

      <Card>
        <Card.Body>
          <h1>Home page content</h1>
        </Card.Body>
      </Card>

    </Container>
  </>
);

export default HomePage;
