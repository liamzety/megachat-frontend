import React from "react";
import { Button } from "../aux-cmps/Button";
import { useState } from "react";

export const SignModal = ({ toggleModal, cb }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  return  (
    <div className="sign-modal">
        <input
        placeholder="Username"
          type="text"
          value={userDetails.username}
          onChange={({ target: { value } }) =>
          setUserDetails({ ...userDetails, username: value })
          }
        />
        <input
        placeholder="Password"
          type="password"
          value={userDetails.password}
          onChange={({ target: { value } }) =>
          setUserDetails({ ...userDetails, password: value })
          }
        />
        <div className="flex column">
          <Button onClick={() => cb(userDetails)}>
           Confirm
          </Button>
          <Button onClick={toggleModal}>Close</Button>
        </div>
      </div>
  ) ;
};