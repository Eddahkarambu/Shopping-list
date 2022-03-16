import React, { useState } from "react";
import "./Signup.css";
import { Button, Box } from "@material-ui/core";
import { TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Lock, Person, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "white",
    },
    width: "100%",
  },
}));

function Signup() {
  let navigate = useNavigate();
  const classes = useStyles();
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: Password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        let path = `/signin`;
        navigate(path);
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="Signup">
      <form className="Form">
        <div className="heading">Create Account</div>
        <Box margin="2rem">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            placeholder="User Name"
            variant="filled"
            required
            value={userName}
            className={classes.root}
            color="primary"
            onChange={(e) => setuserName(e.target.value)}
          />
        </Box>
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

        <Box margin="2rem">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            placeholder="Confirm Password"
            variant="filled"
            type="password"
            className={classes.root}
            required
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>

        <div className="btn">
          <Box margin="1rem">
            <Button
              style={{
                minWidth: "200px",
                paddingBottom: "20px",
                paddingTop: "20px",
              }}
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Signup
            </Button>
          </Box>
        </div>
        <div>
          {" "}
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
