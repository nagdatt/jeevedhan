import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useJwt } from "react-jwt";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const roles=['Raw Materials Mng.',"Production Warehouse Mng.","Warehouse Mng.","Distributor Mng."]
  const [Role, setRole] = React.useState(roles[0]);
  const [open, setOpen] = React.useState(false);


  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   const obj= {
      email: data.get("email"),
      password: data.get("password"),
      role:Role
    };
    console.log(obj)
    axios.post("http://localhost:2000/users/login",obj).then((res)=>{
      


      console.log("loggedIn",res.data)
      var roleId=0
      if(Role==roles[0])
      roleId=1;
      else if (Role == roles[1])
      roleId=2;
      else if (Role == roles[2])
      roleId=3;
      else if (Role == roles[4])
      roleId=4;
      console.log(res.data.user)
       sessionStorage.setItem('user',res.data.user.name);
        sessionStorage.setItem('email',res.data.user.emails);
        sessionStorage.setItem('phoneNo',res.data.user.phoneNo);
        sessionStorage.setItem('id',res.data.user._id);

      // sessionStorage.setItem("userToken",res.data.token)
       sessionStorage.setItem('roleId',roleId);
      props.setIsLoggedIn([true,roleId])

  }).catch((err)=>{
      setOpen(true)
  })


  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

              <Autocomplete
                required
                  disablePortal
                  id="role"
                  onChange={(event,value)=>{
                      setRole(value)
                  }}  
                  options={roles}
                  value={Role}
                  style={{marginTop:"15px"}}
                  renderInput={(params) => (
                    <TextField {...params} label="Role" />
                  )}
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}

        message="Invalid Credentials"
      />
    </ThemeProvider>
  );
}
