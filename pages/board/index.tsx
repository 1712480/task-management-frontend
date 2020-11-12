import React from 'react';
import axios from 'axios';

import Board from '../../components/board/Board';

const BoardPage = (props) => {
  return <Board data={props.data} />;
};

BoardPage.getInitialProps = async () => {
  const res = await axios.get(`https://mid-term-backend.herokuapp.com/board?boardName=board1`);
  return {
    data: res.data,
  };
};

export default BoardPage;
