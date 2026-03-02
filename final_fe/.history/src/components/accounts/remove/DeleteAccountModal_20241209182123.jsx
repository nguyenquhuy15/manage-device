import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteAccountModal = React.memo((props) => {
  return (
    <Modal show={true} onHide={props.hideModal} centered>
      <Modal.Header closeButton>Xóa tài khoản</Modal.Header>
      <Modal.Body className="text-center m-3">
        <p className="mb-0">
          Bạn có muốn xóa tài khoản này{" "}
          <span className="text-danger">{props.name}</span> ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideModal}>
          Close
        </Button>{" "}
        <Button variant="primary" onClick={props.onSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteAccountModal;
