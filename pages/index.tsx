import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Container, Card, CardTitle, CardText, Button, Spinner } from 'reactstrap';
import { connect } from 'react-redux';

import '../styles/Home.module.scss';
import axios from 'axios';
import Modal from '../components/BoardModal/Modal';

const Home = (props) => {
  const { data } = props;
  const [loading, setLoading] = useState(false);

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
          <Button className="alert-danger" onClick={() => deleteBoard(_id)}>
            Delete
          </Button>
        </Card>
      );
    });

  const deleteBoard = async (boardId) => {
    setLoading(true);
    await axios
      .post('http://localhost:3001/board/delete-board', {
        boardId,
      })
      .finally(() => Router.reload());
  };

  const createBoard = async (columnType, name, description) => {
    setLoading(true);
    await axios
      .post('http://localhost:3001/board/create-board', {
        boardName: name,
        description,
      })
      .finally(() => Router.reload());
  };

  return (
    <Container>
      {loading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      <h1 className="justify-content-center">Board List</h1>
      <Container className="mt-3 grid-layout">
        {renderBoards}
        <Modal className="image-container" createTicket={createBoard}>
          <img
            alt="plus"
            className="plus-image"
            src="https://res.cloudinary.com/dmiw0tnor/image/upload/v1605431002/mid-term/plus_aorjh2.png"
          />
        </Modal>
      </Container>
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
  const user = state.user;
  return { user };
};

export default connect(mapStateToProps)(Home);
