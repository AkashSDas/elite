import BaseLayout from "../components/base_layout";
import styles from "../styles/Home.module.css";

function Index() {
  return (
    <BaseLayout title="Home Page">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Index;
