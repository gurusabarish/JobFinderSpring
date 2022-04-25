import React, { useEffect, useState } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";

import {
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import config from "./../../../config";

import * as Yup from "yup";
import { Formik } from "formik";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

function CreateJob(props) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    console.log(props.user);
    setCountryList(Country.getAllCountries());
    setLoading(false);
  }, []);

  const initialData = {
    title: "",
    description: "",
    salary: "",
    experience: "",

    country: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",

    companyId: props.user.hrcompanyId,
    createdBy: localStorage.getItem("token"),
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
    <>
      {loading ? (
        <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
          Loading....
        </Typography>
      ) : (
        <Box sx={{ width: "100%" }} px={{ xs: 0, sm: 5 }} pt={{ xs: 0, sm: 3 }}>
          <Formik
            initialValues={initialData}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              salary: Yup.string().required("Required"),
              experience: Yup.number().required("Required"),

              country: Yup.string().required("Required"),
              state: Yup.string().required(),
              city: Yup.string().required(),
              address: Yup.string().required(),
              zipCode: Yup.number().required(),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                try {
                  console.log(values);
                  const response = await axios.post(
                    `${config.apiURL}/api/v1/job`,
                    values
                  );

                  console.log(response);
                  props.handleJobList(response.data);

                  setStatus({ success: true });
                  setSubmitting(false);
                } catch (error) {
                  console.log("error creating account", error);
                  let errors = [];
                  error.errors.map((err) => {
                    return errors.push(err.message);
                  });
                  setStatus({ success: false });
                  setErrors({ submit: errors });
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
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              /* and other goodies */
            }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.title && errors.title)}
                      className={classes.formControl}
                    >
                      <InputLabel>Title</InputLabel>
                      <OutlinedInput
                        value={values.title}
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="title"
                      />
                    </FormControl>
                    {touched.title && errors.title && (
                      <FormHelperText error> {errors.title} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.description && errors.description)}
                      className={classes.formControl}
                    >
                      <InputLabel>Description</InputLabel>
                      <OutlinedInput
                        value={values.description}
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="description"
                      />
                    </FormControl>
                    {touched.description && errors.description && (
                      <FormHelperText error>
                        {" "}
                        {errors.description}{" "}
                      </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.salary && errors.salary)}
                      className={classes.formControl}
                    >
                      <InputLabel>Salary</InputLabel>
                      <OutlinedInput
                        value={values.salary}
                        name="salary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="salary"
                      />
                    </FormControl>
                    {touched.salary && errors.salary && (
                      <FormHelperText error> {errors.salary} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.experience && errors.experience)}
                      className={classes.formControl}
                    >
                      <InputLabel>Experience</InputLabel>
                      <OutlinedInput
                        type="number"
                        value={values.experience}
                        name="experience"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="experience"
                      />
                    </FormControl>
                    {touched.experience && errors.experience && (
                      <FormHelperText error>{errors.experience}</FormHelperText>
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
                          setStateList(
                            State.getStatesOfCountry(e.target.value)
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
                            City.getCitiesOfState(
                              values.country,
                              e.target.value
                            )
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
                          <MenuItem value={state.isoCode}>
                            {state.name}
                          </MenuItem>
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
                      error={Boolean(touched.zipCode && errors.zipCode)}
                      className={classes.formControl}
                    >
                      <InputLabel>ZIP code</InputLabel>
                      <OutlinedInput
                        type="number"
                        value={values.zipCode}
                        name="zipCode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="zipCode"
                      />
                    </FormControl>
                    {touched.zipCode && errors.zipCode && (
                      <FormHelperText error>{errors.zipCode}</FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>
                </Grid>
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
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pt={{ xs: 0, sm: 2 }}
                >
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
    </>
  );
}

export default CreateJob;
