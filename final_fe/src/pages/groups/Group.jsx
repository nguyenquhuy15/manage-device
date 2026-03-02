import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container } from "react-bootstrap";

const GroupPage = () => (
  <>
    <Helmet title="Group" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Group Page</h1>

      <Card>
        <Card.Body>
          <h1>Group page content</h1>
        </Card.Body>
      </Card>

    </Container>
  </>
);

export default GroupPage;
