import { useState } from "react";
import BaseLayout from "../components/base_layout";
import { authenticate, isAuthenticated, signin } from "../lib/auth";
import Link from "next/link";
import { runAsync } from "../lib/utils";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) return <p>Redirect to admin</p>;
      return <p>Redirect to user dashboard</p>;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    const [response, err] = await runAsync(signin({ email, password }));

    if (err) console.error(err);
    if (response) {
      if (response.error)
        setValues({ ...values, error: response.error, loading: false });
      else {
        authenticate(response, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            didRedirect: true,
          });
        });
      }
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

  const loadingMsg = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: loading ? "" : "none" }}
        >
          Loading...
        </div>
      </div>
    </div>
  );

  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
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
        {loadingMsg()}
        {signinForm()}
        {performRedirect()}

        <div className="text-muted text-white">{JSON.stringify(values)}</div>
      </main>
    </BaseLayout>
  );
}

export default Signin;
