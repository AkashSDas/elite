import { useState } from "react";
import AdminCheck from "../../../../components/admin_check";
import BaseLayout from "../../../../components/base_layout";
import { isAuthenticated } from "../../../../lib/auth";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { createCategory } from "../../../../lib/category";

function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const router = useRouter();

  const backBtn = () => (
    <div className="mt-3">
      <button
        className="btn btn-info btn-sm text-white"
        onClick={() => router.back()}
      >
        Go back
      </button>
    </div>
  );

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    const [data, error] = await createCategory(user._id, token, { name });
    if (data.error) {
      console.log(data.error, error);
      setError(true);
    } else {
      setError(false);
      setSuccess(true);
      setName("");
    }
  };

  const categoryForm = () => (
    <form className="my-3" onSubmit={onSubmit}>
      <div className="form-group">
        <label className="lead">Enter category</label>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For eg. Summer"
          onChange={handleChange}
          value={name}
        />

        <button type="submit" className="btn btn-outline-info">
          Create category
        </button>
      </div>
    </form>
  );

  return (
    <AdminCheck>
      <BaseLayout
        title="Create category"
        description="Add new categories here"
        className="bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            {backBtn()}
            {categoryForm()}
          </div>
        </div>
      </BaseLayout>
    </AdminCheck>
  );
}

export default CreateCategoryPage;
