import React, { useState, useEffect } from "react";
import { houseDisplay } from "@/app/admin/adminControllers/calculatorController";
import CreateHouseLocationModal from "../components/createHouse";
import DeleteLocationModal from "../components/deleteHouseLocation";

const HouseLocation = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isAddNewAdminVisible, setIsAddNewAdminVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) => {
      const updatedSelection = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];

      setIsAddNewAdminVisible(updatedSelection.length === 0);
      return updatedSelection;
    });
  };

  const handleCancel = () => {
    setSelectedRows([]);
    setIsAddNewAdminVisible(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true)
  };

  const fetchData = async () => {
    setLoading(true);
    let response = await houseDisplay({});
    let calcUser = response.data.houseLocation.map((items) => items);
    setRows(calcUser);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    setSelectedRows([]);
    setIsAddNewAdminVisible(true);
  }, [refresh]);

  return (
    <>
      {showModal && (
        <CreateHouseLocationModal
          onClose={setShowModal}
          onLocationChange={() => setRefresh(!refresh)}
        />
      )}
      {showDeleteModal ? (
        <DeleteLocationModal
          row={selectedRows}
          onClose={setShowDeleteModal}
          onLocationChange={() => setRefresh(!refresh)}
        />
      ) : null}
      {isAddNewAdminVisible && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-[#ED1450] text-white text-sm md:text-base rounded-full font-Manrope"
          >
            {"\u002B"} Add new house location
          </button>
        </div>
      )}

      <div>
        {selectedRows.length > 0 && (
          <div className="flex items-center justify-between">
            <h2 className="font-Manrope text-sm md:text-base text-[#101828]">
              Are you sure you want to delete selected items?
            </h2>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="px-5 py-[8px] rounded-[30px] border text-sm bg-white border-gray-300"
                onClick={()=>handleCancel()}
              >
                Cancel
              </button>
              <button
                className="px-5 py-[8px] rounded-[30px] text-sm bg-[#ED1450] text-white "
                onClick={() => 
                  handleDelete()
                }
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {loading ? (
          <div> loading house locations ...</div>
        ) : (
          <table className="w-full mt-4 bg-white rounded font-Manrope">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4 w-[64px] font-semibold text-sm md:text-base">
                  S/N
                </th>
                <th className="p-4 text-sm font-semibold md:text-base">Name</th>
                <th className="p-4 text-sm font-semibold text-center md:text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows &&
                rows.map &&
                rows.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                      {index + 1}
                    </td>
                    <td className="p-4 text-[#5F6D7E] text-sm font-medium">
                      {row.value}
                    </td>
                    <td className="p-4 text-[#5F6D7E] text-sm font-medium text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                        className="form-checkbox h-4 w-4 text-red-500 accent-[#ED1450]"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default HouseLocation;
