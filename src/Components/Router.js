import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";


export default class Paths extends Component {
    render() {
        return (
                <Routes>
                    <Route path="/" element={<Signup />}/>
                </Routes>
        )
    }
}