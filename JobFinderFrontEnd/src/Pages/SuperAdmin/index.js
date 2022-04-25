import React from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";

import config from "../../config";
import Company from "./Company";
import CompaniesList from "./Company/list";
import Approval from "./Approval";
import MainCard from "../../Components/MainCard";

const SuperAdmin = (props) => {
  const [companyList, setCompanyList] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `${config.apiURL}/api/v1/company/owner/${localStorage.getItem("token")}`
    );
    setCompanyList(res.data);
  };

  const [companyAdded, setCompanyAdded] = React.useState("");

  let companyAdd = "";
  React.useEffect(() => {
    setCompanyAdded(companyAdd);
  }, [companyAdded]);

  const handleCompanyList = async (company) => {
    companyAdd = company;
    setCompanyAdded(company);
    if (companyList.length === 0) {
      const companies = companyList;
      companies.push(company);
      setCompanyList(companies);
    }
    
    console.log("companyAdded", companyAdded);
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
          <MainCard title="Companies">
            <Company handleCompanyList={handleCompanyList} />
            <Box my={3}>
              {companyList.length > 0 && (
                <CompaniesList
                  companyList={companyList}
                  companyAdded={companyAdded}
                />
              )}
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} p={2}>
          <MainCard title="Approval list">
            <Approval companyList={companyList} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default SuperAdmin;
