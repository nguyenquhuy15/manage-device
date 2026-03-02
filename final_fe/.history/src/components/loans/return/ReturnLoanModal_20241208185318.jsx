import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReturnLoanModal = ({ show, onHide, onSubmit, loanId, deviceIds }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận trả thiết bị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn trả lại {deviceIds.length} thiết bị của khoản vay
        này?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="danger" onClick={() => onSubmit(loanId, deviceIds)}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnLoanModal;
