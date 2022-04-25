import React from "react";
import { Grid } from "@mui/material";

import MainCard from "../../../Components/MainCard";
import CreateHR from "./create";
import HRList from "./list";

const HR = (props) => {
  const [HRAdded, setHRAdded] = React.useState("");

  //   let HRAdd = "";
  //   React.useEffect(() => {
  //     setHRAdded(HRAdd);
  //   }, [HRAdded]);
  //   const handleCreateHR = (val) => {
  //     HRAdd = val;
  //     setHRAdded(val);
  //   };

  let HRAdd = "";
  React.useEffect(() => {
    setHRAdded(HRAdd);
  }, [HRAdded]);

  const handleCreateHR = async (hr) => {
    HRAdd = hr;
    setHRAdded(hr);
    console.log("HRAdded", hr);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        // alignItems="center"
        justifyContent="center"
        py={2}
        justifyItems={"center"}
      >
        <Grid item xs={12} sm={6} p={2}>
          <MainCard title="Create HR">
            <CreateHR handleCreateHR={handleCreateHR} />
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} p={2}>
          <MainCard title="HR List by company">
            <HRList HRAdded={HRAdded} user={props.user} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default HR;
