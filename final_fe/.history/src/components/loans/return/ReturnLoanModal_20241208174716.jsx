import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReturnLoanModal = ({ show, onHide, onSubmit }) => {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận trả thiết bị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ReturnLoanModal;
