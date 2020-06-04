import React, { useState, useMemo } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import QRGenerator from "./QRcode";
import Copyright from "./Copyright";
import { CSSTransition } from "react-transition-group";
import "../styles.css";
import { signup } from "../api/auth-api";
import generator from "generate-password";
import { v4 as uuid } from "uuid";
import { NavLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateAccount() {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(true);
  const [open, setOpen] = useState(false);
  const [qrgenerator, setQrGenerator] = useState(false);
  const [email, setEmail] = useState("");
  const joindate = new Date();
  //const [adminId] = useState(uuid());
  const adminId = useMemo(() => uuid(), []);
  const password = useMemo(
    () =>
      generator.generate({
        length: 8,
        numbers: true,
      }),
    []
  );

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleCreateUserAccount = async (e) => {
    e.preventDefault();
    setShowForm(false);
    setQrGenerator(true);
    setOpen(true);

    const res = await signup({
      joindate,
      email,
      password,
      adminId,
    });
    //console.log(res);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Account Registration
        </Typography>
        <form className={classes.form} noValidate>
          {showForm ? (
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={style}
                className={classes.submit}
                onClick={handleCreateUserAccount}
              >
                Create Account
              </Button>
            </div>
          ) : (
            <div>
              <CSSTransition
                in={qrgenerator}
                timeout={10000}
                classNames="alert"
                unmountOnExit
              >
                <QRGenerator password={password} adminId={adminId} />
              </CSSTransition>
              <CSSTransition
                in={qrgenerator}
                timeout={1100}
                classNames="alert"
                unmountOnExit
              >
                <NavLink
                  to={`/dashboard/${adminId}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={style}
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </NavLink>
              </CSSTransition>
              <CSSTransition
                in={qrgenerator}
                timeout={1200}
                classNames="alert"
                unmountOnExit
              >
                <NavLink
                  to={`/checkin/${adminId}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={style}
                    className={classes.submit}
                  >
                    Check-In Form
                  </Button>
                </NavLink>
              </CSSTransition>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Account Successfully Created!
                </Alert>
              </Snackbar>
            </div>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
