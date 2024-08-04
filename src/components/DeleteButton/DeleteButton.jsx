import { MdDelete } from "react-icons/md";
import { employee } from "../../APIRoutes/ApiRoutes";
import axios from "axios";
import { useState } from "react";

function DeleteButton({ id, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleEmployeeDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${employee}/${id}`, {
        headers: {
          environmentId: "66afae4d3e50e013f0d277ad",
          projectId: "66afae4d3e50e013f0d277ac",
          "Content-Type": "application/json",
        },
        data: {},
      });

      if (response.data.message === "Record deleted.") {
        onDelete(id);
        alert("Deleted");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to Delete "))
          handleEmployeeDelete(id);
      }}
      className=" bg-red-600 rounded-lg p-2 flex justify-center items-center"
    >
      <MdDelete className="w-5 h-5 md:w-7 md:h-7 text-white/90" />
      {loading && <span className="text-white/90">Deleting...</span>}
    </button>
  );
}

export default DeleteButton;
