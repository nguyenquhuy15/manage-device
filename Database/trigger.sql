DROP TRIGGER IF EXISTS after_insert_loan_device;
DELIMITER $$
CREATE TRIGGER after_insert_loan_device
AFTER INSERT ON loan_devices
FOR EACH ROW
BEGIN
    UPDATE loans
    SET quantity = quantity + 1
    WHERE id = NEW.loan_id;
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS after_delete_loan_device;
DELIMITER $$
CREATE TRIGGER after_delete_loan_device
AFTER DELETE ON loan_devices
FOR EACH ROW
BEGIN
    UPDATE loans
    SET quantity = quantity - 1
    WHERE id = OLD.loan_id;
END $$
DELIMITER ;


DROP TRIGGER IF EXISTS after_add_loan_devices;
DELIMITER $$

CREATE TRIGGER after_add_loan_devices
AFTER INSERT ON loan_devices
FOR EACH ROW
BEGIN
    -- Tăng total của thiết bị được mượn
    UPDATE devices
    SET total = total + 1
    WHERE id = NEW.device_id;
END$$

DELIMITER ;


DROP TRIGGER IF EXISTS set_device_total_to_zero;
DELIMITER $$

CREATE TRIGGER set_device_total_to_zero
BEFORE INSERT ON devices
FOR EACH ROW
BEGIN
    SET NEW.total = 0;
END$$

DELIMITER ;

