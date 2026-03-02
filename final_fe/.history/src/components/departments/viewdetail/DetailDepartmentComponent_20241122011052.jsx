import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const DetailDepartmentComponent = React.memo((props) => {

    return (
      <>
        <Row>
          <Col sm={3}>
            <p>Khoa/Viện:</p>
          </Col>
          <Col>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{props.info.departmentsName}</Tooltip>}
            >
              <span>{props.info.departmentsName}</span>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <p>Bộ Môn:</p>
          </Col>
          <Col>
            <span>{props.info.subjectsName}</span>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <p>Phòng thí nghiệm:</p>
          </Col>
          <Col>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{props.info.creatorEmail}</Tooltip>}
            >
              <span>{props.info.creatorFullname}</span>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <p>Created DateTime:</p>
          </Col>
          <Col>
            <span>{props.info.createdDateTime}</span>
          </Col>
        </Row>
      </>
    );
});

export default DetailDepartmentComponent;