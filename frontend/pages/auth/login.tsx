import { useRouter } from "next/dist/client/router";
import { useFormStyle } from "./signup";
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
import toast from "react-hot-toast";
import { runAsync } from "../../lib/utils";
import {
  login,
  LoginData,
  saveUserDataInLocalStorage,
} from "../../lib/api/auth";
import { useState } from "react";

function Login() {
  const classes = useFormStyle();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginData, resetForm: Function) => {
    setLoading(true);
    const [res, err] = await login(values);
    setLoading(false);

    if (err) {
      const msg = err.response.data.message;
      if (msg) toast.error(msg);
      else toast.error("Something went wrong, Please try again");
    } else {
      if (res.data.error) toast.error("Something went wrong, Please try again");
      else {
        saveUserDataInLocalStorage(
          {
            token: res.data.data.token,
            user: res.data.data.user,
          },
          () => {
            toast.success(`Welcome back ${res.data.data.user.username}`);
            router.push("/");
          }
        );
      }
    }

    resetForm();
  };

  return (
    <Box className={classes.root} boxShadow={2}>
      <Typography variant="h4" align="center">
        Login
      </Typography>

      <Divider className={classes.divider} />

      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, handleChange, resetForm }) => (
          <form className={classes.form}>
            <TextField
              id="standard-basic"
              variant="filled"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              autoComplete="off"
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
              disabled={loading}
              onClick={() => handleSubmit(values, resetForm)}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
