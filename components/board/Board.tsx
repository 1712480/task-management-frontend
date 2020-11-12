import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import { IBoardProps } from './Board.d';

import Ticket from '../ticket/Ticket';

const Board: React.FunctionComponent<IBoardProps> = (props) => {
  const { data } = props;

  const handleOnDrop = (event) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain');
    const sourceIdElement = document.getElementById(sourceId);
    const sourceParentId = sourceIdElement.parentElement.id;
    const targetElement = document.getElementById(event.target.id);

    // Drop on the same column
    if (sourceParentId === event.target.id) {
      return event.dataTransfer.clearData();
    }

    if (event.target.id.search('avoid-drop') !== -1) {
      const parentElement = document.getElementById(event.target.id.split('-')[2]);

      if (parentElement.id === sourceParentId) {
        return event.dataTransfer.clearData();
      }

      parentElement.appendChild(sourceIdElement);
      if (sourceId !== event.target.id) {
        event.dataTransfer.clearData();
        updateTicket(sourceId, parentElement.id).then((response) => console.log(response));
      }
    } else {
      if (targetElement) {
        targetElement.appendChild(sourceIdElement);
        event.dataTransfer.clearData();
        updateTicket(sourceId, targetElement.id);
      }
    }
  };

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const updateTicket = async (ticketId: string, newColumn: string) => {
    await axios.post('https://mid-term-backend.herokuapp.com/board/update-ticket', {
      ticketId,
      newColumn,
    });
  };

  const renderColumns = () =>
    data.columns &&
    data.columns.map((column) => {
      const { _id, columnName, tickets } = column;
      return (
        <Col key={`${columnName}-container`} id={`${columnName}-container`} className="col-3 m-3 column">
          <h5 key={`${columnName}-title`} id={`${columnName}-title`} className="p-3 column-name">
            {columnName}
          </h5>
          <Col
            key={_id}
            id={_id}
            className="ticket-column"
            onDrop={(event) => handleOnDrop(event)}
            onDragOver={handleOnDragOver}
          >
            {tickets &&
              tickets.map((ticket) => <Ticket key={ticket._id} handleOnDragStart={handleOnDragStart} {...ticket} />)}
          </Col>
        </Col>
      );
    });

  return (
    <Container className="board-container">
      <Row className="justify-content-center">{renderColumns()}</Row>
    </Container>
  );
};

export default Board;
