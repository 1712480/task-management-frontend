import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Container, Input, Card, Button } from 'reactstrap';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/user/actions';

const Login = ({ userLogin }) => {
  const login = async () => {
    const userName = (document.getElementById('userName') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    await axios
      .post('http://localhost:3001/user/user-login', {
        userName,
        password,
      })
      .then(async (response) => {
        toast.success('Sign in success');
        await userLogin(response);
        Router.replace('/');
      })
      .catch((err) => {
        toast.error('userName or password incorrect.');
      });
  };
  return (
    <Container className="login-container">
      <Card className="form p-3">
        <h1 className="title">Sign in</h1>
        <Input id="userName" className="mt-2" placeholder="user name ..." />
        <Input id="password" className="mt-2" placeholder="password ..." type="password" />
        <Button className="mt-2" onClick={login}>
          OK
        </Button>
      </Card>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (user) => dispatch({ type: USER_ACTIONS.USER_LOGIN, payload: user }),
});

export default connect(null, mapDispatchToProps)(Login);
