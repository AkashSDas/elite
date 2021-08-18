import AdminCheck from "../../../../components/admin_check";
import BaseLayout from "../../../../components/base_layout";
import ManageProducts from "../../../../components/manage_products";

function ProductPage() {
  return (
    <AdminCheck>
      <BaseLayout>
        <ManageProducts />
      </BaseLayout>
    </AdminCheck>
  );
}

export default ProductPage;
