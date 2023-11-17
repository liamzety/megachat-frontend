import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../aux-cmps/Button";
import { Text } from "../aux-cmps/Text";
import { Modal } from "../aux-cmps/Modal";
import { CreateRoomModal } from "./CreateRoomModal";
import { SignModal } from "./SignModal";
import { createRoom } from "../store/actions/roomActions";
import { loadUsers, login, logout, signUp } from "../store/actions/userActions";
import { useEffect } from "react";

export const Navbar = ({}) => {
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { loggedUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //TODO: remove later
  const { users, msg } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const closeModals = () => {
    setIsRoomModalOpen(false);
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(false);
  };
  const toggleCreateRoomModal = () => {
    setIsRoomModalOpen(!isRoomModalOpen);
  };
  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };
  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };
  const onCreateRoom = (roomDetails) => {
    closeModals();

    dispatch(createRoom(roomDetails));
    directToRooms();
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

  const directToRooms = () => {
    navigate("/rooms", { replace: true });
  };

  return (
    <>
      <div className="navbar flex">
        {!!loggedUser && (
          <div className="navbar-left flex center">
            <div className="navbar-anchor" onClick={toggleCreateRoomModal}>
              Create Room
            </div>
            <div className="navbar-anchor" onClick={directToRooms}>
              Join Existing Rooms
            </div>
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

      <Modal isOpen={isRoomModalOpen} title="Room Details">
        <CreateRoomModal
          onCreateRoom={(roomDetails) => {
            onCreateRoom(roomDetails);
          }}
          toggleModal={toggleCreateRoomModal}
        />
      </Modal>

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
