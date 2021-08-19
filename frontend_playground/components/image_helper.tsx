import { API } from "../lib/utils";

function ImageHelper({ product }) {
  return (
    <div className="rounded border border-success p-2">
      <img
        src={`${API}/product/photo/${product._id}`}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
}

export default ImageHelper;
