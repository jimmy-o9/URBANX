import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  const ADMIN_EMAIL = "om07674@gmail.com";

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <Layout>
        <div className="container-editorial py-16">
          <h1>Access Denied</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-editorial py-16">
        <h1 className="font-serif text-4xl">Admin Dashboard</h1>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <Link
            to="/admin/orders"
            className="rounded-2xl border p-6 hover:bg-muted"
          >
            Manage Orders
          </Link>

          <Link
            to="/admin/products"
            className="rounded-2xl border p-6 hover:bg-muted"
          >
            Manage Products
          </Link>

        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;