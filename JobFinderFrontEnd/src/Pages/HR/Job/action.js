import React from "react";
import { Menu, IconButton, Button } from "@mui/material";
import { DotsVertical } from "tabler-icons-react";
import axios from "axios";

import config from "../../../config";

export default function Action({ data, handleApplicationList }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewApplications = async () => {
    console.log("view applications", data);
    const applicationList = await axios.get(
      `${config.apiURL}/api/v1/application/job/${data.id}`
    );
    handleApplicationList(applicationList.data);
    setAnchorEl(null);
  };

  const handleCloseJob = () => {
    console.log("close job", data);
    data.closed = true;
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DotsVertical />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ py: "10px" }}>
          <Button fullWidth onClick={handleViewApplications} color="success">
            View Applications
          </Button>
        </div>
        <div style={{ py: "10px" }}>
          <Button
            onClick={handleCloseJob}
            fullWidth
            color="error"
            disabled={data.closed}
          >
            Close
          </Button>
        </div>
      </Menu>
    </div>
  );
}
