import React from "react";
import { Button, Modal } from "react-bootstrap";

const RemoveAllDevicesModal = React.memo((props) => {

    const getName= () => {
        return props.devices.map(device =>
            `<b>${device.name}</b>`
        );
    }

    return (
      <Modal show={true} onHide={props.hideModal}>
        <Modal.Header closeButton>Trả tất cả thiết bị</Modal.Header>
        <Modal.Body className="text-center m-3">
          <p className="mb-0">
            Bạn có muốn trả{" "}
            <span dangerouslySetInnerHTML={{ __html: getName().join(", ") }} />?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideModal}>
            Close
          </Button>{" "}
          <Button
            variant="primary"
            onClick={async () => {
              await props.onRemoveAll();
              props.hideModal();
            }}
          >
            Trả
          </Button>
        </Modal.Footer>
      </Modal>
    );
});

export default RemoveAllDevicesModal;