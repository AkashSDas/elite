import {
  Box,
  Container,
  Divider,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import SimpleBtn from "../../components/btn/simple_btn";
import materialUITheme from "../../lib/theme";

const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: "4px",
    padding: "1rem",
    width: "50%",
    margin: "1rem auto",

    "& MuiFormControl-root": {
      width: "100%",
    },
    "& label.MuiFormLabel-root": {
      color: materialUITheme.palette.text.secondary,
      fontWeight: 500,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: materialUITheme.palette.secondary.main,
    },
    "& .MuiFilledInput-underline": {
      backgroundColor: "#ededed",
    },
  },
  divider: { margin: "1rem auto" },
  form: {
    display: "flex",
    flexDirection: "column",

    "& > *": { marginBottom: "1rem" },
  },

  [theme.breakpoints.down(1000)]: {
    root: {
      width: "75%",
    },
  },
  [theme.breakpoints.down(700)]: {
    root: {
      width: "100%",
    },
  },
}));

function SignUp() {
  const classes = useStyle();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  return (
    <Box className={classes.root} boxShadow={2}>
      <Typography variant="h4" align="center">
        Sign up
      </Typography>

      <Divider className={classes.divider} />

      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, handleChange, handleSubmit }) => (
          <form className={classes.form}>
            <TextField
              id="standard-basic"
              variant="filled"
              label="Username"
              type="text"
              name="username"
              onChange={handleChange}
            />

            <TextField
              id="standard-basic"
              variant="filled"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />

            <TextField
              id="standard-basic"
              variant="filled"
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />

            <SimpleBtn
              width="100%"
              text="Submit"
              onClick={handleSubmit as any}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default SignUp;
