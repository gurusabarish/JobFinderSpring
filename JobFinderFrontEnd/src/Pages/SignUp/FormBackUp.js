import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import config from "../../config";

// Yub and FormIK
import * as Yup from "yup";
import { Formik, getIn } from "formik";

// axios
import axios from "axios";

import {
  FormControl,
  // FormControlLabel,
  FormHelperText,
  // Grid,
  // IconButton,
  // InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  // Stack,
  Box,
  Button,
  Typography,
  Grid,
  Divider
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { User } from "tabler-icons-react";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

const SignUpForm = (props, { ...others }) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [companyList, setCompanyList] = useState([]);

  // Role
  const [openRole, setOpenRole] = React.useState(false);
  const handleRoleClose = () => {
    setOpenRole(false);
  };
  const handleRoleOpen = () => {
    setOpenRole(true);
  };

  // Admin company
  const [openAdminCompany, setOpenAdminCompany] = React.useState(false);
  const handleAdminCompanyClose = () => {
    setOpenAdminCompany(false);
  };
  const handleAdminCompanyOpen = () => {
    setOpenAdminCompany(true);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        email: "",
        role: "",
        company: {
          name: "",
          description: "",
          website: "",
          email: "",
          phone: ""
        },
        admin: {
          company: ""
        }
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Name is required"),
        role: Yup.string().max(255).required("Role is required"),
        password: Yup.string().max(255).required("Password is required"),
        email: Yup.string()
          .email("Invalid email address")
          .max(255)
          .required("Email is required"),
        company: Yup.object().shape({
          name: Yup.string().max(255),
          description: Yup.string().max(255),
          email: Yup.string().email().max(255),
          website: Yup.string().url().max(255),
          phone: Yup.number()
        }),
        admin: Yup.object().shape({
          company: Yup.object()
        })
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setSubmitting(true);
          try {
            const response = await axios.post(
              `${config.apiURL}/api/v1/auth/signup`,
              values
            );
            delete values.admin;

            console.log(response);
            console.log(values);

            if (response.status === 200) {
              localStorage.setItem("token", response.data.id);
              setRedirect(true);
            }
            // console.log(response);
            console.log(values);
            setStatus({ success: true });
            setSubmitting(false);
          } catch (error) {
            console.log("error signing up", error);
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          {redirect && <Navigate to="/" />}
          <Typography variant="body5" align="center" py={2}>
            <Typography variant="body2" align="center" my={3}>
              <User size={48} strokeWidth={2} color={"black"} />
            </Typography>
            <Divider>Sign Up</Divider>
          </Typography>

          <Grid container spacing={2} py={2}>
            <Grid item xs={12} p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    className={classes.formControl}
                  >
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Name"
                    />
                  </FormControl>
                  {touched.name && errors.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.role && errors.role)}
                    className={classes.formControl}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={values.role}
                      onChange={ async (e) => {
                        setFieldValue("role", e.target.value);
                        if(e.target.value === "ROLE_ADMIN") {
                          const response = await axios.get(
                            `${config.apiURL}/api/v1/company`
                          );

                          if(response.status === 200) {
                            setCompanyList(response.data);
                          }
                        }
                      }}
                      onClose={handleRoleClose}
                      open={openRole}
                      onOpen={handleRoleOpen}
                      name="role"
                      label="role"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="ROLE_SUPER_ADMIN">CEO</MenuItem>
                      <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                      {/* <MenuItem value="ROLE_HR">HR</MenuItem> */}
                      <MenuItem value="ROLE_USER">User</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.role && errors.role && (
                    <FormHelperText error>{errors.role}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    className={classes.formControl}
                  >
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Email"
                    />
                  </FormControl>
                  {touched.email && errors.email && (
                    <FormHelperText error>{errors.email}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    className={classes.formControl}
                  >
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      type="password"
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Password"
                    />
                  </FormControl>
                  {touched.password && errors.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
              </Grid>

              { values.role === "ROLE_SUPER_ADMIN" && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          getIn(touched, 'company.name') && getIn(errors, 'company.name')
                        )}
                        className={classes.formControl}
                      >
                        <InputLabel>Company Name</InputLabel>
                        <OutlinedInput
                          value={values.company.name}
                          name="company.name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Name"
                        />
                      </FormControl>
                      {getIn(touched, 'company.name') && getIn(errors, 'company.name') && (
                        <FormHelperText error>{errors.company.name}</FormHelperText>
                      )}
                      <Box mb={2} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          getIn(touched, 'company.description') && getIn(errors, 'company.description')
                        )}
                        className={classes.formControl}
                      >
                        <InputLabel>Company Description</InputLabel>
                        <OutlinedInput
                          value={values.company.description}
                          name="company.description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="description"
                        />
                      </FormControl>
                      {getIn(touched, 'company.description') && getIn(errors, 'company.description') && (
                        <FormHelperText error>{errors.company.description}</FormHelperText>
                      )}
                      <Box mb={2} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          getIn(touched, 'company.email') && getIn(errors, 'company.email')
                        )}
                        className={classes.formControl}
                      >
                        <InputLabel>Company Email</InputLabel>
                        <OutlinedInput
                          type="email"
                          value={values.company.email}
                          name="company.email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Email"
                        />
                      </FormControl>
                      {getIn(touched, 'company.email') && getIn(errors, 'company.email') && (
                        <FormHelperText error>{errors.company.email}</FormHelperText>
                      )}
                      <Box mb={2} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          getIn(touched, 'company.website') && getIn(errors, 'company.website')
                        )}
                        className={classes.formControl}
                      >
                        <InputLabel>Company website</InputLabel>
                        <OutlinedInput
                          value={values.company.website}
                          name="company.website"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="website"
                        />
                      </FormControl>
                      {getIn(touched, 'company.website') && getIn(errors, 'company.website') && (
                        <FormHelperText error>{errors.company.website}</FormHelperText>
                      )}
                      <Box mb={2} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          getIn(touched, 'company.phone') && getIn(errors, 'company.phone')
                        )}
                        className={classes.formControl}
                      >
                        <InputLabel>Company contact number</InputLabel>
                        <OutlinedInput
                          type="number"
                          value={values.company.phone}
                          name="company.phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="phone"
                        />
                      </FormControl>
                      {getIn(touched, 'company.phone') && getIn(errors, 'company.phone') && (
                        <FormHelperText error>{errors.company.phone}</FormHelperText>
                      )}
                      <Box mb={2} />
                    </Grid>
                  </Grid>
                </>
              )}

              { values.role === "ROLE_ADMIN" && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          getIn(touched, 'admin.company') && getIn(errors, 'admin.company')
                        )}
                        className={classes.formControl}
                      >
                        <InputLabel>Company</InputLabel>
                        <Select
                          value={values.admin.company}
                          onChange={handleChange}
                          onClose={handleAdminCompanyClose}
                          open={openAdminCompany}
                          onOpen={handleAdminCompanyOpen}
                          name="admin.company"
                          label="Company"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {companyList.map((company) => {
                            return (
                              <MenuItem key={company.id} value={company}>
                                {company.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      { getIn(touched, 'admin.company') && getIn(errors, 'admin.company') && (
                        <FormHelperText error>{errors.admin.company}</FormHelperText>
                      )}
                      <Box mb={2} />
                    </Grid>
                  </Grid>
                </>
              )}

              { values.role === "ROLE_USER" && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          getIn(touched, 'admin.company') && getIn(errors, 'admin.company')
                        )}
                        className={classes.formControl}
                      >
                        <InputLabel>Company</InputLabel>
                        <Select
                          value={values.admin.company}
                          onChange={handleChange}
                          onClose={handleAdminCompanyClose}
                          open={openAdminCompany}
                          onOpen={handleAdminCompanyOpen}
                          name="admin.company"
                          label="Company"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {companyList.map((company) => {
                            return (
                              <MenuItem key={company.id} value={company}>
                                {company.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      { getIn(touched, 'admin.company') && getIn(errors, 'admin.company') && (
                        <FormHelperText error>{errors.admin.company}</FormHelperText>
                      )}
                      <Box mb={2} />
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          
          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>

          {errors.submit && (
            <Box
              sx={{
                mt: 3,
              }}
            >
              {Array.isArray(errors.submit) ? (
                <>
                  {errors.submit.map((err) => {
                    return <FormHelperText error>{err}</FormHelperText>;
                  })}
                </>
              ) : (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
            </Box>
          )}

          <Box
            sx={{
              mt: 2,
            }}
          >
            <Typography variant="body2" align="center">
              <Button
                disableElevation
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
