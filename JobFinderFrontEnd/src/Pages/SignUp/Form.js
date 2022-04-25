import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import config from "../../config";

import { Country, State, City } from "country-state-city";

// Yub and FormIK
import * as Yup from "yup";
import { Formik } from "formik";

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
  Divider,
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
  useEffect(() => {
    setCountryList(Country.getAllCountries());
  }, []);

  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // Role
  const [openRole, setOpenRole] = React.useState(false);
  const handleRoleClose = () => {
    setOpenRole(false);
  };
  const handleRoleOpen = () => {
    setOpenRole(true);
  };

  // Country
  const [openCountry, setOpenCountry] = React.useState(false);
  const handleCountryClose = () => {
    setOpenCountry(false);
  };
  const handleCountryOpen = () => {
    setOpenCountry(true);
  };

  // State
  const [openState, setOpenState] = React.useState(false);
  const handleStateClose = () => {
    setOpenState(false);
  };
  const handleStateOpen = () => {
    setOpenState(true);
  };

  // City
  const [openCity, setOpenCity] = React.useState(false);
  const handleCityClose = () => {
    setOpenCity(false);
  };
  const handleCityOpen = () => {
    setOpenCity(true);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        email: "",
        role: "",

        country: "",
        state: "",
        city: "",
        address: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Name is required"),
        role: Yup.string().max(255).required("Role is required"),
        password: Yup.string().max(255).required("Password is required"),
        email: Yup.string()
          .email("Invalid email address")
          .max(255)
          .required("Email is required"),

        phone: Yup.number()
          .test(
            "len",
            "Must be exactly 10 digits and required",
            (contact_number) =>
              contact_number && contact_number.toString().length === 10
          )
          .required("Required"),
        zipcode: Yup.number(),

        country: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        address: Yup.string(),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setSubmitting(true);
          try {
            const response = await axios.post(
              `${config.apiURL}/api/v1/auth/signup`,
              values
            );
            console.log(response);
            console.log(values);

            if (response.status === 200) {
              localStorage.setItem("token", response.data.id);
              setRedirect(true);
            }
            console.log(response);
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
                      onChange={async (e) => {
                        setFieldValue("role", e.target.value);
                        // if(e.target.value === "ROLE_ADMIN") {
                        //   const response = await axios.get(
                        //     `${config.apiURL}/api/v1/company`
                        //   );

                        //   if(response.status === 200) {
                        //     setCompanyList(response.data);
                        //   }
                        // }
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
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    className={classes.formControl}
                  >
                    <InputLabel>Contact Number</InputLabel>
                    <OutlinedInput
                      type="number"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="phone"
                    />
                  </FormControl>
                  {touched.phone && errors.phone && (
                    <FormHelperText error>{errors.phone}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.country && errors.country)}
                    className={classes.formControl}
                  >
                    <InputLabel>Country</InputLabel>
                    <Select
                      value={values.country}
                      onChange={async (e) => {
                        setFieldValue("country", e.target.value);
                        setStateList(State.getStatesOfCountry(e.target.value));
                        // if(e.target.value === "ROLE_ADMIN") {
                        //   const response = await axios.get(
                        //     `${config.apiURL}/api/v1/company`
                        //   );

                        //   if(response.status === 200) {
                        //     setCompanyList(response.data);
                        //   }
                        // }
                      }}
                      onClose={handleCountryClose}
                      open={openCountry}
                      onOpen={handleCountryOpen}
                      name="country"
                      label="country"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {countryList.map((country) => (
                        <MenuItem value={country.isoCode}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.country && errors.country && (
                    <FormHelperText error>{errors.country}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.state && errors.state)}
                    className={classes.formControl}
                  >
                    <InputLabel>State</InputLabel>
                    <Select
                      value={values.state}
                      onChange={async (e) => {
                        setFieldValue("state", e.target.value);
                        setCityList(
                          City.getCitiesOfState(values.country, e.target.value)
                        );
                        // if(e.target.value === "ROLE_ADMIN") {
                        //   const response = await axios.get(
                        //     `${config.apiURL}/api/v1/company`
                        //   );

                        //   if(response.status === 200) {
                        //     setCompanyList(response.data);
                        //   }
                        // }
                      }}
                      onClose={handleStateClose}
                      open={openState}
                      onOpen={handleStateOpen}
                      name="state"
                      label="state"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {stateList.map((state) => (
                        <MenuItem value={state.isoCode}>{state.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.state && errors.state && (
                    <FormHelperText error>{errors.state}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.city && errors.city)}
                    className={classes.formControl}
                  >
                    <InputLabel>City</InputLabel>
                    <Select
                      value={values.city}
                      onChange={async (e) => {
                        setFieldValue("city", e.target.value);
                        // if(e.target.value === "ROLE_ADMIN") {
                        //   const response = await axios.get(
                        //     `${config.apiURL}/api/v1/company`
                        //   );

                        //   if(response.status === 200) {
                        //     setCompanyList(response.data);
                        //   }
                        // }
                      }}
                      onClose={handleCityClose}
                      open={openCity}
                      onOpen={handleCityOpen}
                      name="city"
                      label="city"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {cityList.map((city) => (
                        <MenuItem value={city.name}>{city.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.city && errors.city && (
                    <FormHelperText error>{errors.city}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                    className={classes.formControl}
                  >
                    <InputLabel>Address</InputLabel>
                    <OutlinedInput
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="address"
                    />
                  </FormControl>
                  {touched.address && errors.address && (
                    <FormHelperText error>{errors.address}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.zipcode && errors.zipcode)}
                    className={classes.formControl}
                  >
                    <InputLabel>ZIP code</InputLabel>
                    <OutlinedInput
                      type="number"
                      value={values.zipcode}
                      name="zipcode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="zipcode"
                    />
                  </FormControl>
                  {touched.zipcode && errors.zipcode && (
                    <FormHelperText error>{errors.zipcode}</FormHelperText>
                  )}
                  <Box mb={2} />
                </Grid>
              </Grid>
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
