import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(5),
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
  fixedHeight: {
    height: 1000,
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

export default function AccountPage({ userdata }) {
  const classes = useStyles();

  const [accountName, setAccountName] = useState("");

  const [disabled, setDisabled] = useState(true);
  const textRef = useRef(null);

  const handleFocus = () => {
    textRef.current.focus();
  };

  const handleOnChange = (e) => {
    if (e.target.name === "accountname") {
      setAccountName(e.target.value);
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Paper>
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            src="https://3.bp.blogspot.com/-g0xDCbB8zLQ/Toxm5r7KzBI/AAAAAAAAAF8/C7VdGxUJPdc/s320/daniyui.jpg"
          >
            <PermContactCalendarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account & User Settings
          </Typography>
          <form className={classes.form} noValidate>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography color="primary" display="inline" noWrap>
                  Account Name :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="accountname"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  onChange={handleOnChange}
                  disabled={disabled}
                  value={accountName}
                  inputRef={textRef}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="primary" display="inline" noWrap>
                  E-mail Address :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={userdata.email}
                  type="email"
                  name="email"
                  disabled={true}
                  //   onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="primary" display="inline" noWrap>
                  Account ID :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="id"
                  value={userdata._id}
                  type="text"
                  disabled={true}
                  //   onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              className={(classes.submit, classes.button)}
              onClick={() => {
                setDisabled(false);
                handleFocus();
                // textRef.current.focus();
              }}
            >
              Edit Profile
            </Button>
            <Button
              //   type="submit"
              variant="contained"
              color="primary"
              className={(classes.submit, classes.button)}
              onClick={() => {
                setDisabled(true);
              }}
            >
              Save Changes
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
