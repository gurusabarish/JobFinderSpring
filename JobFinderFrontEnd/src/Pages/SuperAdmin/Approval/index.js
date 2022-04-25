import React from "react";
import axios from "axios";
import config from "../../../config";

import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import RequestList from "./userDetails";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

const Approval = (props) => {
  const classes = useStyles();
  const [companyVal, setCompanyVal] = React.useState("");
  const [requestList, setRequestList] = React.useState([]);

  // Open company list
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Country</InputLabel>
            <Select
              value={companyVal}
              onChange={async (e) => {
                setCompanyVal(e.target.value);
                const res = await axios.get(
                  `${config.apiURL}/api/v1/auth/admin?companyId=${e.target.value}`
                );
                setRequestList(res.data);
              }}
              onClose={handleClose}
              open={open}
              onOpen={handleOpen}
              name="company"
              label="company"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.companyList.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mb={2} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box my={3}>
            <RequestList requestList={requestList} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Approval;
