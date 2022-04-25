import * as React from "react";
import { useEffect } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// Subcard
import SubCard from "./../../../Components/SubCard";
import ApplyDialog from "./apply";
import config from "./../../../config";

const columns = [
  { id: "title", label: "Job Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 130 },
  { id: "experience", label: "Experience", minWidth: 150 },
  { id: "salary", label: "Salary range", minWidth: 150 },
  { id: "zipCode", label: "ZIP code", minWidth: 150 },
  { id: "closed", label: "Job status", minWidth: 150 },
  { id: "apply", label: "Apply", minWidth: 150 },
];

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

const JobsList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `${config.apiURL}/api/v1/job/suggest?city=${props.user.city}&state=${props.user.state}`
    );
    setRows(response.data);
    setLoading(false);
  };

  const [companyName, setCompanyName] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel>Company Name</InputLabel>
              <OutlinedInput
                value={companyName}
                name="name"
                onChange={async (e) => {
                  setCompanyName(e.target.value);
                  const response = await axios.get(
                    `${config.apiURL}/api/v1/job/title?name=${e.target.value}`
                  );
                  console.log(response);
                  setRows(response.data);
                }}
                label="Name"
              />
            </FormControl>
            <Box mb={2} />
          </Grid>
        </Grid>
      </Box>
      {rows.length !== 0 && (
        <SubCard>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: config.borderRadius,
            }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === "closed") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value ? "Closed" : "Open"}
                                </TableCell>
                              );
                            } else if (column.id === "apply") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <ApplyDialog data={row} user={props.user} />

                                  {/* <Button
                                    disableElevation
                                    onClick={async () => {
                                      // const res = await axios.post(
                                      //   `${config.apiURL}/api/v1/auth/admin/approve/${row["id"]}`
                                      // );
                                      // console.log(res);
                                    }}
                                    size="medium"
                                    variant="contained"
                                    style={{
                                      borderRadius: config.borderRadius,
                                    }}
                                    disabled={row["closed"]}
                                  >
                                    Apply
                                  </Button> */}
                                </TableCell>
                              );
                              // } else if (column.id === "action") {
                              //   return (
                              //     <TableCell key={column.id} align={column.align}>
                              //       <Action
                              //         data={row}
                              //         handleApplicationList={
                              //           props.handleApplicationList
                              //         }
                              //       />
                              //     </TableCell>
                              //   );
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </SubCard>
      )}

      {rows.length === 0 && (
        <SubCard>
          {loading ? (
            <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
              Loading....
            </Typography>
          ) : (
            <Typography align="center" variant="h6" sx={{ mt: 5, mb: 1 }}>
              Nothing to show
            </Typography>
          )}
        </SubCard>
      )}
    </>
  );
};

export default JobsList;
