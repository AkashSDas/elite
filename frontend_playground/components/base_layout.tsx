import Navbar from "./navbar";

interface Props {
  title?: string;
  description?: string;
  children: JSX.Element;
  className?: string;
}

function BaseLayout(props: Props) {
  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h4 className="display-4">{props.title}</h4>
          <p className="lead">{props.description}</p>
        </div>

        <div className={props.className}>{props.children}</div>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center">
        <h4>If you got any questions then feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact us</button>
      </div>

      <div className="container">
        <span className="text-muted">An amazing e-commerce app</span>
      </div>
    </footer>
  );
}

export default BaseLayout;
