import React, { useState } from "react";
import "./Signup.css";
import { Button, Box } from "@material-ui/core";
import { TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Lock, Person, Email } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "white",
    },
    width: "100%",
  },
}));

function Signup() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

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
            placeholder="First Name"
            variant="filled"
            required
            value={firstName}
            className={classes.root}
            color="primary"
            onChange={(e) => setFirstName(e.target.value)}
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
            <Button variant="contained" color="primary">
              Signup
            </Button>
          </Box>
          <Box margin="1rem">
            <Button variant="contained" color="secondary">
              Signin
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
}

export default Signup;
