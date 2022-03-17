import React, { useState } from "react";
import "./Signin.css";
import { Button, Box } from "@material-ui/core";
import { TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Lock, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "white",
    },
    width: "100%",
  },
}));

function Signin() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: Password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        alert("Loged in successfully");
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="Signin">
      <form className="Form">
        <div className="heading">Sign in</div>
        <Box margin="2rem">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            placeholder="Email"
            variant="filled"
            className={classes.root}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box margin="2rem">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            placeholder="Password"
            variant="filled"
            type="password"
            className={classes.root}
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <div className="btn">
          <Box margin="1rem">
            <Button
              style={{
                minWidth: "200px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </div>
        <div>
          {" "}
          Do not have a an account <Link to="/">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;