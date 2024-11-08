import { useEffect, useState } from "react";

const useAllUsers = (page, limit, searchValue) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const result = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://alzaf-server.vercel.app/api/v1/users/dashboard_all_user?page=${page}&limit=${limit}&search=${searchValue}`
        );
        const data = await response.json();

        setUsers(data?.data?.result);
        setUsersCount(data?.data?.total);
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLoading(false);
      }
    };
    result();
  }, [page, limit, reload, searchValue]);

  return {
    users,
    reload,
    setReload,
    userCount,
    loading,
    setLoading,
  };
};

export default useAllUsers;
