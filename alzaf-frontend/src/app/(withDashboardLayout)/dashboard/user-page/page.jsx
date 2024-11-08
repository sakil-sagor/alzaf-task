import UserTable from "@/components/DashboardComponent/UserDeshboard/UserTable";
import { Suspense } from "react";

const userPage = () => {
  return (
    <div className="w-full p-5 md:p-10">
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable />
      </Suspense>
    </div>
  );
};

export default userPage;
