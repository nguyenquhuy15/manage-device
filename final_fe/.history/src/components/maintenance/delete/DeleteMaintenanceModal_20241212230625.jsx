import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteMaintenanceModal = React.memo((props) => {
    return (
        <Modal
            show={true}
            onHide={props.hideModal}
        >
            <Modal.Header closeButton>Xóa thiết bị đã bảo trì</Modal.Header>
            <Modal.Body className="text-center m-3">
                <p className="mb-0">
                    Nếu thiết bị đã sửa xong bạn có muốn xóa thiết bị <span className="text-danger">{props.name}</span> này?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>{" "}
                <Button variant="primary" onClick={props.onSubmit}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteMaintenanceModal;