import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AuthContext from "../../context/authContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  powerButton: {
    textAlign: "right",
  },
  grow: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Finance Manager
          </Typography>
          <div className={classes.grow} />
          <Typography variant="inherit">{authContext.user.email}</Typography>
          <IconButton color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
