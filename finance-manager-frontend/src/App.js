import React from "react";
import Header from "./components/pages/Header/Header";
import "./App.css";
import FmContent from "./components/pages/FmContent/FmContent";
import FmDrawer from "./components/pages/FmDrawer/FmDrawer";
import AuthGlobalState from "./components/context/authContext/AuthGlobalState";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AuthGlobalState>
        <Header />
        {/* <FmDrawer /> */}
        <main className={classes.content}>
          <Toolbar />
          <FmContent />
        </main>
      </AuthGlobalState>
    </div>
  );
}

export default App;
