import * as React from "react";
import { useEffect } from "react";
import axios from "axios";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

// Subcard
import SubCard from "./../../../Components/SubCard";

import config from "./../../../config";
import Action from "./action";

const columns = [
  { id: "title", label: "Job Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 130 },
  { id: "experience", label: "Experience", minWidth: 150 },
  { id: "salary", label: "Salary range", minWidth: 150 },
  { id: "zipCode", label: "ZIP code", minWidth: 150 },
  { id: "closed", label: "Job status", minWidth: 150 },
  { id: "action", label: "Action", minWidth: 150 },
];

const JobsList = (props) => {
  useEffect(() => {
    console.log(props.jobAdded);
    if (props.jobAdded === "") {
      fetchData();
    } else {
      console.log("props.jobAdded", props.jobAdded);

      const data = rows;
      data.push(props.jobAdded);
      setRows(data);
      setLoading(false);
    }
  }, [props.jobAdded]);

  const fetchData = async () => {
    const response = await axios.get(
      `${config.apiURL}/api/v1/job/hr/${localStorage.getItem("token")}`
    );
    setRows(response.data);
    setLoading(false);
  };

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
                            } else if (column.id === "action") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Action
                                    data={row}
                                    handleApplicationList={
                                      props.handleApplicationList
                                    }
                                  />
                                </TableCell>
                              );
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
              You don't have any jobs
            </Typography>
          )}
        </SubCard>
      )}
    </>
  );
};

export default JobsList;
