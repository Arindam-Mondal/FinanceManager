import React from "react";
import Grid from "@material-ui/core/Grid";
import UserLogin from "./UserLogin/UserLogin";

const FmContent = () => {
  return (
    <Grid container>
      <Grid item xs={1} sm={4}></Grid>
      <Grid item xs={10} sm={4}>
        <UserLogin />
      </Grid>
    </Grid>
  );
};

export default FmContent;
