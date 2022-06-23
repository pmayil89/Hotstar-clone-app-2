import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { auth, provider } from "../firebase";
import {
  selectUserEmail,
  selectUserPhoto,
  selectUserName,
  setUserLoginDetails,
  setSignOutState,
} from "../feature/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [username]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleAuth = () => {
    debugger;
    if (!username) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      auth.signOut().then(() => {
        dispatch(setSignOutState());
        navigate("/");
      });
    }
  };
  return (
    <Nav>
      <LOGO src="/images/logo.svg"></LOGO>
      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="home">
              <img src="/images/home-icon.svg" />
              <span> Home</span>
            </a>
            <a href="search">
              <img src="/images/search-icon.svg" />
              <span>Search</span>
            </a>
            <a href="watchlist">
              <img src="/images/watchlist-icon.svg" />
              <span>Search</span>
            </a>
            <a href="watchlist">
              <img src="/images/watchlist-icon.svg" />
              <span>Watchlist</span>
            </a>
            <Link to={`/fromAWS/`}>
              <a href="">
                <img src="/images/original-icon.svg" />
                <span>From AWS</span>
              </a>
            </Link>
          </NavMenu>
          <Signout>
            <Imgphoto src={userPhoto}></Imgphoto>
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </Signout>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding-left: 10px;
  z-index: 3;
`;

const LOGO = styled.img`
  height: 70px;
  width: 80px;
  margin-top: 4px;
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 0, 249);
      font-size: 15px;
      letter-spacing: 1.42px;
      line-height: 1.05;
      padding: 2px 0px;
      position: relative;
      white-space: nowrap;

      &:before {
        content: "";
        background-color: rgb(249, 0, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        visibility: hidden;
        width: auto;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.95);
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }

    @media (max-width: 608px) {
      display: none;
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-color: white;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
  }
`;

const Imgphoto = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

const Signout = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 120px;
  opacity: 0;
  &:hover {
    opacity: 1;
    transition-duration: 1s;
  }
`;

export default Header;
