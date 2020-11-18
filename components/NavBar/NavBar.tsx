import React from 'react';
import { connect } from 'react-redux';
import { Button, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Link from 'next/link';
import { getUser } from '../../redux/selectors';
import { USER_ACTIONS } from '../../redux/user/actions';

const NavBar = ({ user, userLogout }) => {
  const signOut = () => userLogout();

  return (
    <Navbar color="dark" light expand="md">
      <Link href="/">
        <NavbarBrand className="ml-3" style={{ color: 'white', cursor: 'pointer' }}>
          1712480
        </NavbarBrand>
      </Link>
      <Nav className="ml-auto" navbar>
        {user.user === null ? (
          <React.Fragment>
            <NavItem>
              <Link href="/login">
                <Button className="ml-3 mr-3 btn-info">Sign in</Button>
              </Link>
            </NavItem>

            <NavItem>
              <Link href="/sign-up">
                <Button className="ml-3 mr-3">Sign up</Button>
              </Link>
            </NavItem>
          </React.Fragment>
        ) : (
          <Button className="ml-3 mr-3 btn-danger" onClick={() => signOut()}>
            Sign out
          </Button>
        )}
      </Nav>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch({ type: USER_ACTIONS.USER_LOGOUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
