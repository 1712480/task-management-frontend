import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const ModalExample = (props) => {
  const { style, className, columnType, children, createTicket } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const save = () => {
    const name = (document.getElementById('input-name') as HTMLInputElement).value;
    const description = (document.getElementById('input-description') as HTMLInputElement).value;
    createTicket(columnType, name, description);
    toggle();
  };

  return (
    <div style={style}>
      <Button onClick={toggle} className={className}>
        {children}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Input id="input-name" placeholder="name ..." />
        </ModalHeader>
        <ModalBody>
          <Input id="input-description" placeholder="description ..." />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={save}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
