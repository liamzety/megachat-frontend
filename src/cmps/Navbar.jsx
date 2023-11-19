import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../aux-cmps/Button";
import { Text } from "../aux-cmps/Text";
import { Modal } from "../aux-cmps/Modal";
import { CreateChatModal } from "./CreateChatModal";
import { SignModal } from "./SignModal";
import { loadUsers, login, logout, signUp } from "../store/actions/userActions";
import { useEffect } from "react";
import { CreateChat } from "./CreateChat";

export const Navbar = ({}) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { loggedUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //TODO: remove later
  const { users, msg } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const closeModals = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };
  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  const onSignIn = (userDetails) => {
    closeModals();

    dispatch(login(userDetails));
  };
  const onSignUp = (userDetails) => {
    closeModals();

    dispatch(signUp(userDetails));
  };
  const onSignOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="navbar flex">
        {!!loggedUser && (
          <div className="navbar-left flex center">
            <CreateChat>
              <div className="navbar-anchor">Create Chat</div>
            </CreateChat>
          </div>
        )}
        <div className="navbar-right flex center">
          {!!loggedUser ? (
            <>
              <Text className="navbar-username" type="text">
                {loggedUser.username}
              </Text>
              <div className="navbar-anchor" onClick={onSignOut}>
                Sign out
              </div>
            </>
          ) : (
            <>
              <div className="navbar-anchor" onClick={toggleSignInModal}>
                Sign in
              </div>
              <div className="navbar-anchor" onClick={toggleSignUpModal}>
                Sign up
              </div>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={isSignInModalOpen} title="Sign in">
        <SignModal
          cb={(userDetails) => {
            onSignIn(userDetails);
          }}
          toggleModal={toggleSignInModal}
        />
      </Modal>

      <Modal isOpen={isSignUpModalOpen} title="Sign up">
        <SignModal
          cb={(userDetails) => {
            onSignUp(userDetails);
          }}
          toggleModal={toggleSignUpModal}
        />
      </Modal>
      <Modal isOpen={!!msg} title="Error">
        {msg}
      </Modal>
    </>
  );
};
