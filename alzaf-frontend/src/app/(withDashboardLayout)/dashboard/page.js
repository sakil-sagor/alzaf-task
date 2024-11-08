import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const dashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="w-full mx-auto">
      <div className="py-12">
        <div>
          <h2 className="text-3xl text-center">
            Welcome{" "}
            <span className="text-orange-600">{session?.user?.name}</span> to
            Alzaf Dashboard
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default dashboardPage;
