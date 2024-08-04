import Loader from "../../components/Loaders/Loader";
import { employee } from "../../APIRoutes/ApiRoutes";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteButton from "../DeleteButton/DeleteButton";
import { MdEdit } from "react-icons/md";
import EditEmployeeForm from "../EditEmployee/EditEmployeeForm";

function EmployeeList() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(employee, {
          params: { limit: 9, offset: (page - 1) * 9 },
          headers: {
            environmentId: "66ad2d391042893da0a0829e",
            projectId: "66ad2d391042893da0a0829d",
          },
        });
        if (response.data.data.length < 9) {
          setHasMore(false);
        }
        setEmployees((prevEmployees) => {
          const existingIds = new Set(prevEmployees.map((p) => p._id));
          const newEmployees = response.data.data.filter(
            (e) => !existingIds.has(e._id)
          );
          return [...prevEmployees, ...newEmployees];
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleDelete = (empId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee._id !== empId)
    );
  };

  const handleClose = () => {
    setIsEditing(null);
  };

  if (loading) {
    return <Loader />;
  }

  if (employees.length == 0) {
    return <p className="text-white/80 mt-5">No employees found.</p>;
  }

  return (
    <>
      <div className="text-white/90 w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center gap-5 w-full my-8">
          {employees?.map((emp, index) => (
            <div
              key={index}
              className="w-[40%] md:w-[20%] px-2 md:px-8 py-4 flex flex-col items-center justify-center isolate aspect-video  rounded-xl card gap-3"
            >
              <h2 className="text-white/90 font-extrabold text-2xl">
                #{index + 1}
              </h2>
              <p className="text-white/80 text-lg">
                {emp.emp_name.toUpperCase()}
              </p>
              <Link
                to={`employees/${emp._id}`}
                className="md:px-3 px-2 py-1 text-center text-white/90 btn"
              >
                More Details
              </Link>
              <div className="flex gap-3">
                <DeleteButton id={emp._id} onDelete={handleDelete} />
                <button
                  onClick={() => setIsEditing(emp)}
                  className=" bg-blue-600 rounded-lg p-2 flex justify-center items-center"
                >
                  <MdEdit className="w-7 h-7 text-white/90" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-white/80">Loading more employees...</p>}
        {!loading && hasMore && (
          <button className="px-4 py-2 w-1/2" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {!hasMore && <p className="text-white/80">No more employees to load</p>}
      </div>
      <div
        className={`edit-project-form-container z-20 ${
          isEditing ? "flex" : "hidden"
        }`}
      >
        {!!isEditing && (
          <EditEmployeeForm employeeData={isEditing} onClose={handleClose} />
        )}
      </div>
    </>
  );
}

export default EmployeeList;
