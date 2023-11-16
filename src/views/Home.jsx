import React, { useState } from "react";
import { Button } from "../aux-cmps/Button";
import { CreateRoomModal } from "../cmps/CreateRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, loadRooms } from "../store/actions/roomActions";
import { loadUsers, login, signUp, logout } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { Modal } from "../aux-cmps/Modal";
import { SignModal } from "../cmps/SignModal";
import { Text } from "../aux-cmps/Text";
import { useEffect } from "react";

export function Home(props) {
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
      <section className="home">
        {/* TODO: Move to navbar */}

        <Button onClick={toggleCreateRoomModal}>Create Room</Button>
        {!!loggedUser && (
          <Button onClick={directToRooms}> Join Existing Rooms</Button>
        )}

        <div className="user-section">
          {loggedUser ? (
            <>
              <Text type="text">{loggedUser.username}</Text>
              <Button onClick={onSignOut}>Sign out</Button>
            </>
          ) : (
            <>
              <Button onClick={toggleSignInModal}>Sign in</Button>
              <Button onClick={toggleSignUpModal}>Sign up</Button>
            </>
          )}
        </div>
      </section>
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
}
