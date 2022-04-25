import * as React from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Box,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import * as Yup from "yup";
import { Formik } from "formik";

import config from "../../../config";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

export default function ApplyDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const handleClickOpen = () => {
    console.log(props.data.title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={async () => {
          handleClickOpen();
        }}
        disabled={props.data.closed || btnDisabled}
      >
        Apply
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
      >
        <DialogTitle id="dialog-title">
          Apply for {props.data.title} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-content">
            <Box sx={{ width: "100%" }} p={2}>
              <Formik
                initialValues={{
                  name: props.user.name,
                  email: props.user.email,
                  phone: props.user.phone,

                  resumeLink: "",
                  job: props.data,
                  user: props.user,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Required"),
                  email: Yup.string().email().required("Required"),
                  phone: Yup.number().required("Required"),

                  resumeLink: Yup.string().url().required("Required"),
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting }
                ) => {
                  try {
                    try {
                      console.log(values);
                      const response = await axios.post(
                        `${config.apiURL}/api/v1/application/apply`,
                        values
                      );
                      console.log("Job Applied", response.data);

                      setBtnDisabled(true);
                      handleClose();
                      // console.log(response);
                      // props.handleCreateHR(response.data);
                      console.log(values);

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
                      <Grid item xs={12} sm={4}>
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
                            label="name"
                          />
                        </FormControl>
                        {touched.name && errors.name && (
                          <FormHelperText error> {errors.name} </FormHelperText>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          className={classes.formControl}
                        >
                          <InputLabel>Contact Email address</InputLabel>
                          <OutlinedInput
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="email"
                          />
                        </FormControl>
                        {touched.email && errors.email && (
                          <FormHelperText error>
                            {" "}
                            {errors.email}{" "}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.phone && errors.phone)}
                          className={classes.formControl}
                        >
                          <InputLabel>Contact number</InputLabel>
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
                          <FormHelperText error>
                            {" "}
                            {errors.phone}{" "}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(
                            touched.resumeLink && errors.resumeLink
                          )}
                          className={classes.formControl}
                        >
                          <InputLabel>Resume Link</InputLabel>
                          <OutlinedInput
                            value={values.resumeLink}
                            name="resumeLink"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="resumeLink"
                          />
                        </FormControl>
                        {touched.resumeLink && errors.resumeLink && (
                          <FormHelperText error>
                            {errors.resumeLink}
                          </FormHelperText>
                        )}
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
                              return (
                                <FormHelperText error>{err}</FormHelperText>
                              );
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
                      <Box sx={{ px: 2 }}>
                        <Button variant="outlined" onClick={handleClose}>
                          Close
                        </Button>
                      </Box>

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
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
