import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteDeviceModal = React.memo((props) => {
  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>Delete Device Modal</Modal.Header>
      <Modal.Body className="text-center m-3">
        <p className="mb-0">
          Do you wanna delete <span className="text-danger">{props.name}</span>{" "}
          device?
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

export default DeleteDeviceModal;
