import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteAccountModal = React.memo((props) => {
  return (
    <Modal show={true} onHide={props.hideModal} centered>
      <Modal.Header closeButton>Xóa tài khoiarn</Modal.Header>
      <Modal.Body className="text-center m-3">
        <p className="mb-0">
          Bạn có muốn xóa thiết bị{" "}
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

export default DeleteDeviceModal;
