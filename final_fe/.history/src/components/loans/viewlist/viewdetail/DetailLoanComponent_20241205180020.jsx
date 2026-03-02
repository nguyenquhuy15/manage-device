import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const DetailLoanComponent = React.memo((props) => {

    return (
      <>
        <Row>
          <Col sm={3}>
            <p>Lớp</p>
          </Col>
          <Col>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{props.info.loansName}</Tooltip>}
            >
              <span>{props.info.loansName}</span>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <p>Người đại diện</p>
          </Col>
          <Col>
            <span>{props.info.loansContact}</span>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <p>Email:</p>
          </Col>
          <Col>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{props.info.loansInfo}</Tooltip>}
            >
              <span>{props.info.loansInfo}</span>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <p>Ngày mượn:</p>
          </Col>
          <Col>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{props.info.loansLoanDate}</Tooltip>}
            >
              <span>{props.info.loansLoanDate}</span>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row></Row>

        <Row>
          <Col sm={3}>
            <p>Số điện thoại:</p>
          </Col>
          <Col>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{props.info.phone}</Tooltip>}
            >
              <span>{props.info.phone}</span>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <p>Số lượng thiết bị :</p>
          </Col>
          <Col>
            <span>{props.info.quantity}</span>
          </Col>
        </Row>
      </>
    );
});

export default DetailLoanComponent;