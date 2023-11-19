import React from "react";
import loader from "../assets/img/loader.gif";
export function Loader({ local }) {
  return (
    <div className={`loader${local ? "-local" : ""}`}>
      <img src={loader} alt="" />
    </div>
  );
}
