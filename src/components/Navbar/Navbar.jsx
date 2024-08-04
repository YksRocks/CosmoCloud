import { useState } from "react";
import { Link } from "react-router-dom";
import AddEmployeeForm from "../AddEmployeeForm/AddEmployeeForm";

function Navbar() {
  const [isAdd, setIsAdd] = useState(false);

  const handleClose = () => {
    setIsAdd(false);
  };

  return (
    <>
      <div className="w-full fixed top-0  py-3 px-8 md:px-14 lg:px-20 bg-[#0b0b0c] text-white/90 flex justify-between items-center z-50">
        <Link to={"/"}>
          <h1 className="font-semibold text-lg md:text-2xl">
            Employee Management System
          </h1>
        </Link>
        <button
          onClick={() => setIsAdd(true)}
          className="px-2  md:px-5 py-2 w-[50%]"
        >
          Add Employee
        </button>
      </div>
      <div
        className={`edit-project-form-container z-20 ${
          isAdd ? "flex" : "hidden"
        }`}
      >
        {!!isAdd && <AddEmployeeForm onClose={handleClose} />}
      </div>
    </>
  );
}

export default Navbar;
