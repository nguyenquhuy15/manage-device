import React from "react";
import { Button, Modal } from "react-bootstrap";

const RemoveDeviceModal = React.memo((props) => {
    return (
        <Modal
            show={true}
            onHide={props.hideModal}
        >
            <Modal.Header closeButton>Remove Device Modal</Modal.Header>
            <Modal.Body className="text-center m-3">
                <p className="mb-0">
                    Do you wanna remove <b>{props.device?.fullname}</b> ({props.device?.username}) ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>{" "}
                <Button variant="primary" onClick={async () => {
                    await props.onRemove();
                    props.hideModal();
                }}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RemoveAccountModal;