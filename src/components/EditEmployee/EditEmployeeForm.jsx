import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { employee } from "../../APIRoutes/ApiRoutes";

function EditEmployeeForm({ employeeData = {}, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emp_name: employeeData.emp_name || "N/A",
    emp_DOB: employeeData.emp_DOB || "N/A",
    emp_address: {
      line1: employeeData.emp_address?.line1 || "N/A",
      city: employeeData.emp_address?.city || "N/A",
      country: employeeData.emp_address?.country || "N/A",
      zip_code: employeeData.emp_address?.zip_code || "N/A",
    },
    emp_contact: {
      phone_number: employeeData.emp_contact?.phone_number || "N/A",
      email: employeeData.emp_contact?.email || "N/A",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      emp_address: {
        ...prevFormData.emp_address,
        [name]: value,
      },
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      emp_contact: {
        ...prevFormData.emp_contact,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${employee}/${employeeData._id}`,
        formData,
        {
          headers: {
            environmentId: "66ad2d391042893da0a0829e",
            projectId: "66ad2d391042893da0a0829d",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Record updated.") {
        alert("Employee Updated");
        onClose();
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0e0e0e] shadow-2xl rounded-md p-6 scroll  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[70%] flex flex-col card h-[70%] md:h-fit overflow-y-scroll md:overflow-auto fixed"
    >
      <div className="w-full flex flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white/90 mb-4">Edit Employee</h2>
        <IoMdClose
          onClick={onClose}
          className="text-3xl cursor-pointer z-10 text-white/90"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:w-[48%]">
          <label className="block text-white/90 mb-2">Name</label>
          <input
            type="text"
            name="emp_name"
            value={formData.emp_name}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
            placeholder="Employee name"
            required
          />
        </div>

        <div className="mb-4 md:w-[48%]">
          <label className="block text-white/90 mb-2">Date of Birth</label>
          <input
            type="date"
            name="emp_DOB"
            value={formData.emp_DOB}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
            placeholder="Employee DOB"
            required
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:w-[48%]">
            <label className="block text-white/90 mb-2">Address Line 1</label>
            <input
              type="text"
              name="line1"
              value={formData.emp_address.line1}
              onChange={handleAddressChange}
              className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
              placeholder="Line 1"
              required
            />
          </div>

          <div className="mb-4 md:w-[48%]">
            <label className="block text-white/90 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.emp_address.city}
              onChange={handleAddressChange}
              className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
              placeholder="City"
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:w-[48%]">
            <label className="block text-white/90 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.emp_address.country}
              onChange={handleAddressChange}
              className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
              placeholder="Country"
              required
            />
          </div>

          <div className="mb-4 md:w-[48%]">
            <label className="block text-white/90 mb-2">Zip Code</label>
            <input
              type="number"
              name="zip_code"
              value={formData.emp_address.zip_code}
              onChange={handleAddressChange}
              className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
              placeholder="Zip Code"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:w-[48%]">
          <label className="block text-white/90 mb-2">Phone Number</label>
          <input
            type="number"
            name="phone_number"
            value={formData.emp_contact.phone_number}
            onChange={handleContactChange}
            className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
            placeholder="Phone Number"
            required
          />
        </div>

        <div className="mb-4 md:w-[48%]">
          <label className="block text-white/90 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.emp_contact.email}
            onChange={handleContactChange}
            className="w-full p-3 rounded-md bg-[#121212] placeholder:text-white/60 text-white/80"
            placeholder="Email"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className={`bg-blue-600 text-white p-2 rounded-md self-center px-10 mt-5 disabled:bg-blue-400 disabled:cursor-not-allowed`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default EditEmployeeForm;
