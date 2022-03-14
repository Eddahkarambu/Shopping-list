import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";

export default class Paths extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    );
  }
}
