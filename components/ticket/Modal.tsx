import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const ModalExample = (props) => {
  const { buttonLabel, className, ticketProps, saveTicket } = props;
  const { _id, ticketName, description } = ticketProps;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const save = () => {
    const name = (document.getElementById('input-name') as HTMLInputElement).value;
    const description = (document.getElementById('input-description') as HTMLInputElement).value;
    saveTicket(_id, name, description);
    toggle();
  };

  return (
    <div>
      <Button onClick={toggle} className={className}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Input id="input-name" defaultValue={ticketName} />
        </ModalHeader>
        <ModalBody>
          <Input id="input-description" defaultValue={description} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={save}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
