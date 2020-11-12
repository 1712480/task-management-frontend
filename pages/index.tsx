import React from 'react';
import Link from 'next/link';

import { Container, Card, CardTitle, CardText, Button } from 'reactstrap';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../reducers/reducer';
import '../styles/Home.module.scss';

const store = createStore(reducer);

export default function Home() {
  return (
    <Provider store={store}>
      <Container>
        <h1 className="mt-3">Board List</h1>
        <Container className="mt-3 grid-layout">
          <Card className="p-3">
            <CardTitle>This is a pretty long title</CardTitle>
            <CardText>Short description of the board...</CardText>
            <Link href="/board?boardName=board1">
              <Button className="alert-info">Open</Button>
            </Link>
          </Card>
          <Card className="p-3">
            <CardTitle className="title">This is a pretty long title</CardTitle>
            <CardText>Short description of the board...</CardText>
            <Button className="alert-info">Open</Button>
          </Card>
          <Card className="p-3">
            <CardTitle className="title">This is a pretty long title</CardTitle>
            <CardText>Short description of the board...</CardText>
            <Button className="alert-info">Open</Button>
          </Card>
          <Card className="p-3">
            <CardTitle className="title">This is a pretty long title</CardTitle>
            <CardText>Short description of the board...</CardText>
            <Button className="alert-info">Open</Button>
          </Card>
          <Card className="p-3">
            <CardTitle className="title">This is a pretty long title</CardTitle>
            <CardText>Short description of the board...</CardText>
            <Button className="alert-info">Open</Button>
          </Card>
        </Container>
      </Container>
    </Provider>
  );
}
