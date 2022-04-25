import React, { useEffect } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
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

function CreateHR(props) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const initialData = {
    name: "",
    email: "",
    password: "",
    createdBy: localStorage.getItem("token"),
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
              name: Yup.string().required("Required"),
              email: Yup.string().email().required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                try {
                  console.log(values);
                  const response = await axios.post(
                    `${config.apiURL}/api/v1/auth/hr`,
                    values
                  );

                  console.log(response);
                  props.handleCreateHR(response.data);

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
              /* and other goodies */
            }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                      className={classes.formControl}
                    >
                      <InputLabel>HR Name</InputLabel>
                      <OutlinedInput
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="name"
                      />
                    </FormControl>
                    {touched.name && errors.name && (
                      <FormHelperText error> {errors.name} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      className={classes.formControl}
                    >
                      <InputLabel>HR Email (login ID)</InputLabel>
                      <OutlinedInput
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="email"
                      />
                    </FormControl>
                    {touched.email && errors.email && (
                      <FormHelperText error> {errors.email} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={12}>
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
                        label="password"
                      />
                    </FormControl>
                    {touched.password && errors.password && (
                      <FormHelperText error> {errors.password} </FormHelperText>
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

export default CreateHR;
