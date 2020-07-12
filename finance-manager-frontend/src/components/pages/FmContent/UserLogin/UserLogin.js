import React, { useState, useContext } from "react";
import AuthContext from "../../../context/authContext/AuthContext";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  textField: {
    marginTop: 10,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  loginPaper: {
    // padding: 10,
    marginTop: 100,
    textAlign: "center",
  },
  loginHeader: {
    marginBottom: 15,
    height: 40,
    backgroundColor: "#3f51b5",
    color: "#eaebf1",
  },
});

const UserLogin = () => {
  const classes = useStyles();
  const loginHandler = () => {
    //axios call
    axios
      .post(`http://localhost:5000/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        authContext.loginDispatchHandler({ email: email });
      })
      .catch((error) => {
        console.log("Error occurred while fetching Entries");
        console.error(error);
      });
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const authContext = useContext(AuthContext);

  return (
    <Paper elevation={3} className={classes.loginPaper}>
      <div className={classes.loginHeader}>
        <Typography variant="h5" component="h5">
          Sign In
          {/* Login -
          {authContext.isLoggedIn
            ? "LoggedIn as " + authContext.user.email
            : "NotLoggedIn"} */}
        </Typography>
      </div>
      <FormControl>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className={classes.textField}
              size="small"
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              className={classes.textField}
              size="small"
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.loginButton}
              onClick={loginHandler}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  );
};

export default UserLogin;
