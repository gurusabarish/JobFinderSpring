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

const columns = [
  { id: "title", label: "Job Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 130 },
  { id: "userEmail", label: "User Email", minWidth: 130 },
  { id: "resumeLink", label: "Resume Link", minWidth: 150 },
  { id: "status", label: "Application Status", minWidth: 150 },
];

const ApplicationsList = (props) => {
  useEffect(() => {
    setRows(props.applicationList);
    setLoading(false);
  }, [props.applicationList]);

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
                            if (column.id === "title") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.job.title}
                                </TableCell>
                              );
                            } else if (column.id === "description") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.job.description}
                                </TableCell>
                              );
                            } else if (column.id === "userEmail") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.user.email}
                                </TableCell>
                              );
                            } else if (column.id === "status") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.job.status}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
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
              You don't have any applications
            </Typography>
          )}
        </SubCard>
      )}
    </>
  );
};

export default ApplicationsList;
