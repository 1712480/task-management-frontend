import React from 'react';
import { Card, CardTitle, CardText, Button, Row, Container } from 'reactstrap';

import Modal from './Modal';

import { ITicket } from './Ticket.d';

const Ticket: React.FunctionComponent<ITicket> = (props) => {
  const {
    _id,
    ticketName,
    column: columnId,
    description,
    updatedAt,
    handleOnDragStart,
    saveTicket,
    deleteTicket,
  } = props;
  const ticketProps = {
    _id,
    ticketName,
    description,
  };

  const handleDeleteTicket = () => deleteTicket(_id, columnId);

  return (
    <>
      <Card id={_id} draggable="true" onDragStart={handleOnDragStart} className="mb-3 p-3 ticket-container">
        <CardTitle id={`avoid-drop-${columnId}`} tag="h4">
          {ticketName ? ticketName : 'Empty Name'}
        </CardTitle>
        <CardText id={`avoid-drop-${columnId}`} className="description">
          {description ? description : 'Empty description'}
        </CardText>
        <CardText id={`avoid-drop-${columnId}`} className="updated">
          {updatedAt && `updated: ${new Date(updatedAt).toLocaleString()}`}
        </CardText>
        <Container id={`avoid-drop-${columnId}`}>
          <Row id={`avoid-drop-${columnId}`} className="justify-content-around">
            <Modal
              buttonLabel="Edit"
              id={`avoid-drop-${columnId}`}
              className="btn-info cta"
              ticketProps={ticketProps}
              saveTicket={saveTicket}
            />
            <Button id={`avoid-drop-${columnId}`} className="btn-danger cta" onClick={handleDeleteTicket}>
              Delete
            </Button>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default Ticket;
