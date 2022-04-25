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
  { id: "name", label: "Company Name", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 130,
    align: "right",
  },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "phone", label: "Contact Number", minWidth: 150 },
  { id: "website", label: "Website", minWidth: 150 },
];

const CompaniesList = (props) => {
  useEffect(() => {
    console.log(props.companyAdded);
    if (props.companyAdded === "") {
      console.log("no company added");
      setRows(props.companyList);
      setLoading(false);
    } else {
      console.log("props.companyAdded", props.companyAdded);

      const data = rows;
      data.push(props.companyAdded);
      setRows(data);
      setLoading(false);
    }
  }, [props.companyAdded]);

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

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
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
              You don't have any Companies
            </Typography>
          )}
        </SubCard>
      )}
    </>
  );
};

export default CompaniesList;
