import { useRouter } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PaginationRaw = ({ data }) => {
  const router = useRouter();
  const {
    setCurrentPage,
    dataCount,
    currentPage,
    pageLimit,
    setPageLimit,
    defaultPageLimit,
  } = data;

  const handlePagination = (e) => {
    e.preventDefault();
    setCurrentPage(Number(e.target.value));

    router.push(`?page=${e.target.value}&limit=${pageLimit}`);
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      router.push(`?page=${currentPage - 1}&limit=${pageLimit}`);
    }
  };

  const totalPage = Math.ceil(dataCount / pageLimit);
  const pages = new Array(totalPage || 0).fill().map((_, index) => index + 1);

  const handleNextPage = (e) => {
    e.preventDefault();
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);

      router.push(`?page=${currentPage + 1}&limit=${pageLimit}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between  items-center gap-y-8 my-3">
      <div className="flex gap-5">
        <div className="font-semibold bg-orange-500 text-white btn hover:bg-orange-500 p-1 rounded-md">
          Current Page
          <select
            onChange={handlePagination}
            value={currentPage}
            className=" ml-2 bg-transparent border-none outline-none px-4"
            name="limit"
            id=""
          >
            {pages?.map((page) => (
              <option
                key={page}
                value={page}
                className="border-none bg-orange-500"
              >
                {page}
              </option>
            ))}
          </select>
        </div>
        <div className="font-semibold bg-orange-500 text-white btn hover:bg-orange-500 p-1 rounded-md">
          Content Per Page
          <select
            onChange={(e) => {
              setCurrentPage(1);
              setPageLimit(Number(e.target.value));

              router.push(`?limit=${e.target.value}&page=${1}`);
            }}
            value={pageLimit}
            className=" ml-2 bg-transparent border-none outline-none px-4 "
            name="limit"
            id=""
          >
            <option
              value={defaultPageLimit}
              className="border-none bg-orange-500 inline-block"
            >
              {defaultPageLimit}
            </option>
            <option
              value={50}
              className={`border-none bg-orange-500  ${
                dataCount < 50 && "hidden"
              }`}
            >
              50
            </option>
            <option
              value={100}
              className={`border-none bg-orange-500 ${
                dataCount < 100 && "hidden"
              }`}
            >
              100
            </option>
            <option
              value={200}
              className={`border-none bg-orange-500 ${
                dataCount < 200 && "hidden"
              }`}
            >
              200
            </option>
            <option
              value={500}
              className={`border-none bg-orange-500 ${
                dataCount < 500 && "hidden"
              }`}
            >
              500
            </option>
            <option
              value={dataCount}
              className={`border-none bg-orange-500 ${
                dataCount <= defaultPageLimit && "hidden"
              }`}
            >
              All
            </option>
          </select>
        </div>
      </div>

      {/* <Pagination /> */}
      <div className="flex flex-wrap gap-4 justify-between items-center text-black font-semibold text-base rounded-lg">
        {currentPage == 1 ? (
          <button
            disabled
            className="btn border-none p-1 rounded-md flex items-center  gap-2 bg-white text-gray-500 hover:bg-white hover:text-gray-500 font-bold"
            onClick={handlePreviousPage}
          >
            <FaAngleLeft className="text-gray-500 font-bold " /> Prev
          </button>
        ) : (
          <button
            className="btn border-none p-1 rounded-md flex items-center gap-2 hover:bg-[#91aadf] bg-orange-500 text-base font-bold"
            onClick={handlePreviousPage}
          >
            <FaAngleLeft className="text-white font-bold" /> Prev
          </button>
        )}

        {currentPage == totalPage ? (
          <button
            disabled
            className="btn border-none p-1 rounded-md flex items-center gap-2 bg-white text-gray-500 hover:bg-white hover:text-gray-500 text-base font-bold"
            onClick={handleNextPage}
          >
            Next <FaAngleRight className=" text-gray-500 font-bold" />
          </button>
        ) : (
          <button
            className="btn border-none p-1 rounded-md flex items-center gap-2 hover:bg-[#91aadf] bg-orange-500 text-base font-bold"
            onClick={handleNextPage}
          >
            Next <FaAngleRight className=" text-white font-bold" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginationRaw;
