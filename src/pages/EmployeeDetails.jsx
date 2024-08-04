import axios from "axios";
import { useEffect, useState } from "react";
import { employee } from "../APIRoutes/ApiRoutes.js";
import Loader from "../components/Loaders/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import DeleteButton from "../components/DeleteButton/DeleteButton.jsx";
import { MdEdit } from "react-icons/md";
import EditEmployeeForm from "../components/EditEmployee/EditEmployeeForm.jsx";
function EmployeeDetails() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(null);

  const handleClose = () => {
    setIsEditing(null);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${employee}/${id}`, {
          headers: {
            environmentId: "66ad2d391042893da0a0829e",
            projectId: "66ad2d391042893da0a0829d",
          },
        });
        setEmployeeDetail(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, [id]);

  const handleDelete = (id) => {
    history("/");
  };

  if (loading) {
    return <Loader />;
  }

  if (!employeeDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 md:px-14 lg:px-20 pt-24 flex  justify-center flex-col items-center ">
      <div className="flex gap-5 self-start items-center">
        <Link to={"/"}>
          <IoIosArrowBack className="text-white/90 h-8 w-8" />
        </Link>
        <h2 className="text-white/90 text-2xl font-semibold ">
          Employee Detail
        </h2>
      </div>
      <div className="px-10 py-8 mt-8 text-xl gap-3 flex flex-col card  md:w-1/2 rounded-xl">
        <h2 className="text-white/80 font-bold">
          Name :{" "}
          <span className="font-normal">
            {employeeDetail.emp_name.toUpperCase()}
          </span>
        </h2>
        <p className="text-white/80 font-bold">
          DOB : <span className="font-normal">{employeeDetail.emp_DOB}</span>
        </p>
        <p className="text-white/80 font-bold">
          Address :{" "}
          <span className="font-normal">
            {employeeDetail.emp_address?.line1 || "N/A"},
            {employeeDetail.emp_address?.city || "N/A"},
            {employeeDetail.emp_address?.country || "N/A"},
            {employeeDetail.emp_address?.zip_code || "N/A"}
          </span>
        </p>
        <div className="text-white/80 font-bold">
          Contact Info :
          <div>
            <p className="font-normal flex items-center gap-2 my-2">
              <FaPhone />
              {employeeDetail.emp_contact?.phone_number || "N/A"}
            </p>
            <p
              className="font-normal flex items-center gap-2 cursor-pointer w-fit"
              onClick={() => (window.location = "mailto:yourmail@domain.com")}
            >
              <IoMdMail /> {employeeDetail.emp_contact?.email || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex gap-3 self-center">
          <DeleteButton id={employeeDetail._id} onDelete={handleDelete} />{" "}
          <button
            onClick={() => setIsEditing(employeeDetail)}
            className=" bg-blue-600 rounded-lg p-2 flex justify-center items-center"
          >
            <MdEdit className="w-7 h-7 text-white/90" />
          </button>
        </div>
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
    </div>
  );
}

export default EmployeeDetails;
