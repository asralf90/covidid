import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { addCustomer } from "../api/customer-api";
import { submitted } from "../api/auth-api";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import Copyright from "./Copyright";
import AfterSubmission from "./AfterSubmission";
// import AuthApi from "../utils/createContext";

// We can use inline-style
const style = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const getId = () => {
//   const pathArray = window.location.pathname.split("/");
//   return pathArray[2];
// };

export default function CheckIn() {
  const classes = useStyles();
  // const { setAuth } = useContext(AuthApi);
  const [auth, setAuth] = useState(true);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // const adminId = useMemo(() => getId(), []);

  const { adminId } = useParams();

  const checkAccount = async () => {
    const fetchAccount = await axios
      .post(`/auth/form/${adminId}`, {
        validateStatus: () => true,
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 404) {
          window.location.href = "/";
          return;
        }
      });
    // console.log(fetchAccount);
  };

  useEffect(() => {
    checkAccount();
  }, [adminId]);

  console.log(adminId);
  const handleOnChange = (e) => {
    if (e.target.name === "fullname") {
      setFullname(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    }
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();

    const res = await addCustomer({
      fullname,
      phone,
      address,
      adminId,
    });

    console.log(res);

    const submission = await submitted({ adminId });
    if (submission.data.auth) {
      setAuth(false);
    }
    console.log(submission);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {auth ? (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PermContactCalendarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Customer Self Check-In
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="fullname"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="address"
                  label="Home Address"
                  type="text"
                  id="address"
                  autoComplete="address"
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={style}
              className={classes.submit}
              onClick={handleCheckIn}
            >
              Check-In
            </Button>
          </form>
        </div>
      ) : (
        <AfterSubmission />
      )}

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
