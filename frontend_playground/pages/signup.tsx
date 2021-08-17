import { useState } from "react";
import BaseLayout from "../components/base_layout";
import { signup } from "../lib/auth";
import { runAsync } from "../lib/utils";
import Link from "next/link";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { username, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    const [response, err] = await runAsync(
      signup({ username, email, password })
    );

    if (err) console.error(err);
    if (response) {
      if (response.error)
        setValues({ ...values, error: response.error, success: false });
      else
        setValues({
          ...values,
          username: "",
          email: "",
          password: "",
          error: false,
          success: true,
        });
    }
  };

  const errorMsg = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  const successMsg = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          New account was created successfully. Please{" "}
          <Link href="/auth/login">
            <a>login here</a>
          </Link>
        </div>
      </div>
    </div>
  );

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="text-light">Username</label>
              <input
                className="form-control"
                type="text"
                onChange={handleChange("username")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                onChange={handleChange("password")}
              />
            </div>
            <button className="btn btn-success btn-block" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <BaseLayout>
      <main>
        {errorMsg()}
        {successMsg()}
        {signupForm()}
        {/* <div className="text-muted text-white">{JSON.stringify(values)}</div> */}
      </main>
    </BaseLayout>
  );
}

export default Signup;
