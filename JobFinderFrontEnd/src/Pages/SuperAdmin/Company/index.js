import React from "react";

import config from "../../../config";

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
  // Select,
  // MenuItem,
  // Stack,
  Box,
  Button,
  Typography,
  Grid,
  // Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

const Company = (props, { ...others }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        website: "",
        email: "",
        phone: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Required"),
        description: Yup.string().max(255).required("Required"),
        email: Yup.string().email().max(255),
        website: Yup.string().url().max(255),
        phone: Yup.number().test(
          "len",
          "Must be exactly 10 digits and required",
          (contact_number) =>
            contact_number && contact_number.toString().length === 10
        ),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setSubmitting(true);
          try {
            const response = await axios.post(
              `${config.apiURL}/api/v1/company`,
              {
                ownerId: localStorage.getItem("token"),
                ...values,
              }
            );

            console.log(response);
            console.log(values);
            // console.log(response);
            setStatus({ success: true });
            setSubmitting(false);

            props.handleCompanyList(response.data);
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                error={Boolean(getIn(touched, "name") && getIn(errors, "name"))}
                className={classes.formControl}
              >
                <InputLabel>Company Name</InputLabel>
                <OutlinedInput
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Name"
                />
              </FormControl>
              {getIn(touched, "name") && getIn(errors, "name") && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
              <Box mb={2} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(touched, "description") && getIn(errors, "description")
                )}
                className={classes.formControl}
              >
                <InputLabel>Company Description</InputLabel>
                <OutlinedInput
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="description"
                />
              </FormControl>
              {getIn(touched, "description") &&
                getIn(errors, "description") && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              <Box mb={2} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(touched, "email") && getIn(errors, "email")
                )}
                className={classes.formControl}
              >
                <InputLabel>Company Email</InputLabel>
                <OutlinedInput
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email"
                />
              </FormControl>
              {getIn(touched, "email") && getIn(errors, "email") && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
              <Box mb={2} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(touched, "website") && getIn(errors, "website")
                )}
                className={classes.formControl}
              >
                <InputLabel>Company website</InputLabel>
                <OutlinedInput
                  value={values.website}
                  name="website"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="website"
                />
              </FormControl>
              {getIn(touched, "website") && getIn(errors, "website") && (
                <FormHelperText error>{errors.website}</FormHelperText>
              )}
              <Box mb={2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(touched, "phone") && getIn(errors, "phone")
                )}
                className={classes.formControl}
              >
                <InputLabel>Company contact number</InputLabel>
                <OutlinedInput
                  type="number"
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="phone"
                />
              </FormControl>
              {getIn(touched, "phone") && getIn(errors, "phone") && (
                <FormHelperText error>{errors.phone}</FormHelperText>
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
                submit
              </Button>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Company;
