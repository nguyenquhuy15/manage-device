import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ReturnLoanModal = ({ show, onHide, onSubmit }) => {
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = () => {
    if (!returnDate) {
      alert("Vui lòng chọn ngày trả.");
      return;
    }
    onSubmit(returnDate);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận trả thiết bị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="returnDate">
            <Form.Label>Ngày trả</Form.Label>
            <Form.Control
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnLoanModal;
