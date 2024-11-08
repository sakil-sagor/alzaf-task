"use client";
import PaginationRaw from "@/components/shared/pagination/PaginationRaw";
import useAllUsers from "@/hooks/useAllUsers";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import SingleUser from "./SingleUser";

const UserTable = () => {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [pageLimit, setPageLimit] = useState(searchParams.get("limit") || 20);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 1000);
  const { users, reload, setReload, userCount, loading, setLoading } =
    useAllUsers(currentPage, pageLimit, debouncedSearchTerm);

  const totalPage = Math.ceil(userCount / pageLimit);

  return (
    <div>
      <div className="">
        <div className="container mx-auto px-0 md:px-10">
          <br />
          <div className="mx-auto w-full max-w-screen-lg bg-white pb-10 ">
            <div className="overflow-x-auto sm:px-1 min-h-[60vh]">
              <div className="flex items-center justify-between pb-6">
                <h2 className="text-2xl font-semibold text-si-primary">
                  <AiFillDatabase className="mb-1 inline"></AiFillDatabase>
                  User List
                </h2>
                <div>
                  <div className="mt-2">
                    <input
                      className="border border-gray-700 px-3 py-1.5 rounded-md"
                      type="text"
                      placeholder="Search by name, id, email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <hr />

              {
                <table className="w-full table-auto">
                  <thead className=" bg-orange-500 text-white ">
                    <tr className="">
                      <th className="px-4 py-2">No</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="border text-center">
                    {users?.length > 0
                      ? users?.map((user, index) => (
                          <SingleUser
                            key={index}
                            index={index}
                            data={user}
                            setReload={setReload}
                          ></SingleUser>
                        ))
                      : Array.from({ length: 10 }).map((_, idx) => (
                          <tr
                            key={idx}
                            className={`h-10 w-full ${
                              idx % 2 == 0 ? "bg-secondary" : ""
                            } `}
                          >
                            <td className="col" colSpan={10}></td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              }
            </div>
            {!loading && (
              <div className="mt-5">
                <PaginationRaw
                  data={{
                    setCurrentPage,
                    dataCount: userCount,
                    currentPage,
                    pageLimit,
                    setPageLimit,
                    defaultPageLimit: 10,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
