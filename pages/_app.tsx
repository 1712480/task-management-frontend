import React from 'react';
import { Provider } from 'react-redux';
import { Navbar, NavbarBrand, NavItem, Nav, Button } from 'reactstrap';
import Link from 'next/link';

import store from '../redux/store';

import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar color="dark" light expand="md">
        <Link href="/">
          <NavbarBrand className="ml-3" style={{ color: 'white', cursor: 'pointer' }}>
            1712480
          </NavbarBrand>
        </Link>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link href="/">
              <Button className="ml-3 mr-3 btn-info">Sign in</Button>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/">
              <Button className="ml-3 mr-3">Sign up</Button>
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
