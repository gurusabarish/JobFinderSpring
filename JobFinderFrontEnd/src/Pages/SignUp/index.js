import * as React from "react";
import config from "../../config";

import SignUpForm from "./Form";

import { Card, Grid } from "@mui/material";

const SignUp = () => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: config.backgroundColor }}
    >
      <Grid item sx={{ mb: 3 }} xs={11} sm={6}>
        <Card
          sx={{
            borderRadius: config.borderRadius,
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: config.secondaryColor,
            p: 2,
          }}
        >
          <SignUpForm />
        </Card>
      </Grid>
    </Grid>
    //   {/* <CardContent>
    //     <Typography variant="h5" align="center" sx={{ my: 2 }}>
    //       <UserCircle size={48} strokeWidth={2} color={"black"} />
    //     </Typography>
    //     <Divider>SignUp</Divider>
    //     <Box sx={{ my: 2, px: 2 }}>
    //       <SignUpForm />
    //     </Box>
    //   </CardContent> */}
    // // </Card>
  );
};

export default SignUp;
