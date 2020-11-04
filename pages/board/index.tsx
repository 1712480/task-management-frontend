import React from 'react';
import axios from 'axios';

const Board = (props) => {
  console.log(props);
  return <div>data</div>;
};

Board.getInitialProps = async () => {
  const res = await axios.get('http://localhost:3001/board?boardName=board1');
  return {
    data: res.data,
  };
};

export default Board;
