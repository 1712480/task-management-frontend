import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';

import Ticket from '../ticket/Ticket';
import Modal from '../BoardModal/Modal';

import { IBoardProps } from './Board.d';

const Board: React.FunctionComponent<IBoardProps> = (props) => {
  const { data, onChange, setLoading } = props;
  const [buttonStyle, setDisplayNone] = useState({ display: 'block' });

  const handleOnDrop = async (event) => {
    event.preventDefault();
    setDisplayNone({ display: 'block' });
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

      setLoading(true);
      parentElement.appendChild(sourceIdElement);
      if (sourceId !== event.target.id) {
        event.dataTransfer.clearData();
        await updateTicket(sourceId, parentElement.id);
      }
    } else {
      if (targetElement) {
        setLoading(true);
        targetElement.appendChild(sourceIdElement);
        event.dataTransfer.clearData();
        await updateTicket(sourceId, targetElement.id);
      }
    }
  };

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDragStart = (event) => {
    setDisplayNone({ display: 'none' });
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const updateTicket = async (ticketId: string, newColumn: string) => {
    await axios
      .post('http://localhost:3001/board/update-ticket', {
        ticketId,
        newColumn,
      })
      .finally(() => onChange());
  };

  const saveTicket = async (id, name, des) => {
    setLoading(true);
    await axios
      .post('http://localhost:3001/board/save-ticket', {
        id,
        name,
        des,
      })
      .finally(() => onChange());
  };

  const createTicket = async (columnType, ticketName, description) => {
    setLoading(true);
    await axios
      .post('http://localhost:3001/board/create-ticket', {
        ticketName,
        description,
        columnType,
        boardId: data._id,
      })
      .finally(() => onChange());
  };

  const deleteTicket = async (ticketId, columnId) => {
    setLoading(true);
    await axios
      .post('http://localhost:3001/board/delete-ticket', {
        ticketId,
        columnId,
      })
      .finally(() => onChange());
  };

  const renderColumns = () =>
    data.columns &&
    data.columns.map((column) => {
      const { _id, columnType, tickets } = column;

      return (
        <Col key={`${_id}-container`} id={`${_id}-container`} className="col-3 m-3 column">
          <h5 key={`${_id}-title`} id={`${_id}-title`} className="p-3 column-name">
            {columnName[columnType]}
          </h5>
          <Col
            key={_id}
            id={_id}
            className="ticket-column"
            onDrop={(event) => handleOnDrop(event)}
            onDragOver={handleOnDragOver}
          >
            {tickets &&
              tickets.map((ticket) => (
                <Ticket
                  key={ticket._id}
                  handleOnDragStart={handleOnDragStart}
                  {...ticket}
                  saveTicket={saveTicket}
                  deleteTicket={deleteTicket}
                />
              ))}
            <Modal
              style={buttonStyle}
              className="image-container"
              id={`avoid-drop-${_id}`}
              columnType={columnType}
              createTicket={createTicket}
            >
              <img
                id={`avoid-drop-${_id}`}
                alt="plus"
                className="plus-image"
                src="https://res.cloudinary.com/dmiw0tnor/image/upload/v1605431002/mid-term/plus_aorjh2.png"
              />
            </Modal>
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

const columnName = {
  1: 'Went well',
  2: 'To improve',
  3: 'Action items',
};
