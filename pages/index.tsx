import React from 'react';
import Link from 'next/link';

import { Container, Card, CardTitle, CardText, Button } from 'reactstrap';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../reducers/reducer';
import '../styles/Home.module.scss';
import axios from 'axios';
import BoardPage from './board';

const store = createStore(reducer);

const Home = (props) => {
  const { data } = props;

  const renderBoards =
    data.boards &&
    data.boards.map((board) => {
      const { _id, boardName, description } = board;
      return (
        <Card key={_id} className="p-3">
          <CardTitle>{boardName}</CardTitle>
          <CardText>{description}</CardText>
          <Link href={`/board?id=${_id}`}>
            <Button className="alert-info">Open</Button>
          </Link>
        </Card>
      );
    });
  return (
    <Provider store={store}>
      <Container>
        <h1 className="justify-content-center">Board List</h1>
        <Container className="mt-3 grid-layout">{renderBoards}</Container>
      </Container>
    </Provider>
  );
};

Home.getInitialProps = async () => {
  const res = await axios.get(`https://mid-term-backend.herokuapp.com/board/all-board`);
  return {
    data: res.data,
  };
};

export default Home;
