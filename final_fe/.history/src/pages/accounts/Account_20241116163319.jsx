import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container } from "react-bootstrap";
import { appConfig } from "../../config";

const AccountPage = () => {}
  <>
    <Helmet title="Account" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Account Page</h1>

      <Card>
        <Card.Body>
          <h1>Account page content</h1>
          <p>{appConfig.mode}</p>
        </Card.Body>
      </Card>

    </Container>
  </>
);

export default AccountPage;
