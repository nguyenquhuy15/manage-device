import React from "react";
import { Button, Modal } from "react-bootstrap";

const RemoveAllDevicesModal = React.memo((props) => {

    const getFullnamesAndUsernames = () => {
        return props.devices.map(
          (device) => `<b>${device.fullname}</b>(${device.username})`
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
                    Bạn có muốn  {" "}
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