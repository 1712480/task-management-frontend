import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import { Spinner, Container } from 'reactstrap';

import Board from '../../components/board/Board';
import axios from 'axios';

const BoardPage = (props) => {
  const { data } = props;
  const [loading, setLoading] = useState(true);
  const [boardProps, setBoardProps] = useState(null);

  const handleOnChange = () => {
    Router.reload();
  };

  useEffect(() => {
    data.board && setBoardProps(data.board[0]);
  }, []);

  useEffect(() => {
    boardProps && setLoading(false);
  }, [boardProps]);

  return (
    <div>
      {loading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      <Container className="title-container mt-3 justify-content-center">
        {boardProps && <h2>{boardProps.boardName}</h2>}
        {boardProps && <h4>{boardProps.description}</h4>}
      </Container>
      {boardProps && <Board data={boardProps} onChange={handleOnChange} setLoading={setLoading} />}
    </div>
  );
};

BoardPage.getInitialProps = async ({ query: { id } }) => {
  const response = await axios.get(`https://mid-term-backend.herokuapp.com/board?id=${id}`);
  return { id, data: response.data };
};

export default BoardPage;
