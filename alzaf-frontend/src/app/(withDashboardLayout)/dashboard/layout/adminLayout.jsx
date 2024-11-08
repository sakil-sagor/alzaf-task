import SideNavbar from "@/components/shared/Navbar/SideNavbar";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-2">
        <SideNavbar session={session}></SideNavbar>
      </div>
      <div className="col-span-12 md:col-span-10">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="mx-auto">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
