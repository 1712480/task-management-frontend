import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Container, Input, Card, Button } from 'reactstrap';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/user/actions';

const Index = ({ userLogin }) => {
  const signUp = async () => {
    const userName = (document.getElementById('userName') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    await axios
      .post('http://localhost:3001/user/create-user', {
        userName,
        password,
      })
      .then(async (response) => {
        toast.success('Sign up success');
        Router.replace('/login');
      })
      .catch((err) => {
        toast.error('Sign up failed.');
      });
  };
  return (
    <Container className="login-container">
      <Card className="form p-3">
        <h1 className="title">Sign up</h1>
        <Input id="userName" className="mt-2" placeholder="user name ..." />
        <Input id="password" className="mt-2" placeholder="password ..." type="password" />
        <Button className="mt-2" onClick={signUp}>
          OK
        </Button>
      </Card>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (user) => dispatch({ type: USER_ACTIONS.USER_LOGIN, payload: user }),
});

export default connect(null, mapDispatchToProps)(Index);
