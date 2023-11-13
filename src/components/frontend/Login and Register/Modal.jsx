import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Modal() {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    console.log("Modal is about to be shown");
    setShow(true);
  };

  const handleHide = () => {
    console.log("Modal is about to be hidden");
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>My Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is the content of the modal.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modal;
