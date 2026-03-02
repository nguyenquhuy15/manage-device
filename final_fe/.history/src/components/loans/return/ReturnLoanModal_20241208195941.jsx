import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReturnLoanModal = React.memo((props) => {

  return (
    <Modal show={true} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận trả thiết bị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có chắc chắn muốn trả các thiết bị sau?</p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={props.onSubmit}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ReturnLoanModal;
