import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ReturnLoanModal = ({ show, onHide, onSubmit, loanId, devices }) => {
  const [selectedDeviceIds, setSelectedDeviceIds] = useState(
    devices.map((device) => device.id)
  ); 
  const handleCheckboxChange = (deviceId) => {
    const updatedIds = selectedDeviceIds.includes(deviceId)
      ? selectedDeviceIds.filter((id) => id !== deviceId)
      : [...selectedDeviceIds, deviceId];
    setSelectedDeviceIds(updatedIds);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDeviceIds(devices.map((device) => device.id));
    } else {
      setSelectedDeviceIds([]);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận trả thiết bị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Chọn tất cả"
            onChange={handleSelectAll}
            checked={
              selectedDeviceIds.length === devices.length && devices.length > 0
            }
          />
        </Form.Group>
        {devices.map((device) => (
          <Form.Group key={device.id} controlId={`device-${device.id}`}>
            <Form.Check
              type="checkbox"
              label={device.name} // Display device name
              checked={selectedDeviceIds.includes(device.id)}
              onChange={() => handleCheckboxChange(device.id)}
            />
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={() => onSubmit(loanId, selectedDeviceIds)} // Pass selectedDeviceIds
          disabled={selectedDeviceIds.length === 0}
        >
          Xác nhận
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ReturnLoanModal;
