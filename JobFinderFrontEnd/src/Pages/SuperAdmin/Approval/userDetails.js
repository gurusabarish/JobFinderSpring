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
  Button,
} from "@mui/material";

// Subcard
import SubCard from "./../../../Components/SubCard";

import config from "./../../../config";

const columns = [
  { id: "name", label: "Company Name", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 130,
  },
  { id: "action", label: "Status", minWidth: 150 },
];

const RequestList = (props) => {
  useEffect(() => {
    setRows(props.requestList);
    setLoading(false);
  }, [props.requestList]);

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
                            console.log(row);
                            if (column.id === "action") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Button
                                    disableElevation
                                    onClick={async () => {
                                      const res = await axios.post(
                                        `${config.apiURL}/api/v1/auth/admin/approve/${row["id"]}`
                                      );
                                      console.log(res);
                                    }}
                                    size="medium"
                                    variant="contained"
                                    style={{
                                      borderRadius: config.borderRadius,
                                    }}
                                    disabled={row["enabled"]}
                                  >
                                    Approve
                                  </Button>
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
              You don't have any requests yet.
            </Typography>
          )}
        </SubCard>
      )}
    </>
  );
};

export default RequestList;
