import AdminLayout from "./layout/adminLayout";

export const metadata = {
  title: "Admin Dashboard",
  description: "Generated by A K M Sakil Sagor",
};

export default function adminDashboardLayout({ children }) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}