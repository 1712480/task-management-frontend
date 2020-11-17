import React from 'react';
import Link from 'next/link';
import { Container, Card, CardTitle, CardText, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { getUser } from '../redux/selectors';
import '../styles/Home.module.scss';
import axios from 'axios';

const Home = (props) => {
  const { data, user } = props;
  console.log(user);

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
    <Container>
      <h1 className="justify-content-center">Board List</h1>
      <Container className="mt-3 grid-layout">{renderBoards}</Container>
    </Container>
  );
};

Home.getInitialProps = async () => {
  const res = await axios.get(`https://mid-term-backend.herokuapp.com/board/all-board`);
  return {
    data: res.data,
  };
};

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

export default connect(mapStateToProps)(Home);
