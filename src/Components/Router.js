import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Shoppinglist from "./Shoppinglist";

export default class Paths extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/shoppinglist" element={<Shoppinglist />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }
}
