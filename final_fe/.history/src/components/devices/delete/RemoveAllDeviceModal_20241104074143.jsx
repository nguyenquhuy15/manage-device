import React from "react";
import { Button, Modal } from "react-bootstrap";

const RemoveAllDevicesModal = React.memo((props) => {

    const getFullnamesAndUsernames = () => {
        return props.devices.map(device =>
            `<b>${account.fullname}</b>(${account.username})`
        );
    }

    return (
        <Modal
            show={true}
            onHide={props.hideModal}
        >
            <Modal.Header closeButton>Remove All Devices Modal</Modal.Header>
            <Modal.Body className="text-center m-3">
                <p className="mb-0">
                    Do you wanna remove {" "}
                    <span dangerouslySetInnerHTML={{ __html: getFullnamesAndUsernames().join(", ") }} />
                    ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>{" "}
                <Button variant="primary" onClick={async () => {
                    await props.onRemoveAll();
                    props.hideModal();
                }}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RemoveAllDevicesModal;