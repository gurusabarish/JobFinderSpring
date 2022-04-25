import React from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";

import MainCard from "../../Components/MainCard";
import CreateJob from "./Job";
import JobsList from "./Job/list";
import ApplicationsList from "./Applications/list";

const HR = (props) => {
  const [jobAdded, setJobAdded] = React.useState("");
  const [applicationList, setApplicationList] = React.useState([]);

  const handleApplicationList = async (application) => {
    setApplicationList(application);
  };

  let jobAdd = "";
  React.useEffect(() => {
    setJobAdded(jobAdd);
  }, [jobAdded]);

  const handleJobList = async (job) => {
    jobAdd = job;
    setJobAdded(job);
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
          <MainCard title="Jobs">
            <Box my={3}>
              <JobsList
                user={props.user}
                jobAdded={jobAdded}
                handleApplicationList={handleApplicationList}
              />
            </Box>
            <CreateJob user={props.user} handleJobList={handleJobList} />
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} p={2}>
          <MainCard title="Application list">
            <ApplicationsList applicationList={applicationList} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}; 

export default HR;
