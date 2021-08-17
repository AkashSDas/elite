import BaseLayout from "../components/base_layout";

function Signup() {
  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Username</label>
              <input className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
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
      <main>{signupForm()}</main>
    </BaseLayout>
  );
}

export default Signup;
