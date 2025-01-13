import edit from "../assets/edit.svg";
import Image from "next/image";
import eye from "../assets/eye.svg";
import { useEffect, useState } from "react";
import { houseDisplay } from "@/app/admin/adminControllers/calculatorController";
import CreateEntry from "../components/createEntry";
import EditEntry from "../components/editEntry";
import ViewEntry from "../components/viewEntry";
import Pagination from "../../components/pagination";

export default function Duration() {
  const [duration, setDuration] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selection, setSelection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = duration.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(duration.length / recordsPerPage);

  const fetchData = async () => {
    setLoading(true);
    let response = await houseDisplay({});
    let value = response.data.duration.map((items) => items);
    setDuration(value);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // 24-hour clock
    });
  };

  const handleEdit = (value) => {
    setSelection(value);
    setShowEditModal(true);
  };

  const handleView = (value) => {
    setSelection(value);
    setShowViewModal(true);
  };

  return (
    <div>
      {showModal ? (
        <CreateEntry
          onClose={setShowModal}
          onDurationChange={() => setRefresh(!refresh)}
        />
      ) : null}
      {showEditModal ? (
        <EditEntry
          onClose={setShowEditModal}
          user={selection}
          onDurationChange={() => setRefresh(!refresh)}
        />
      ) : null}
      {showViewModal ? (
        <ViewEntry
          onClose={setShowViewModal}
          user={selection}
        />
      ) : null}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex justify-end w-full">
            {/* Add new slide Button */}
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-[#ED1450] text-white rounded-full font-Manrope"
            >
              {"\u002B"} Add new duration
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading duration....</div>
      ) : (
        <table className="w-full text-left border rounded-lg font-Manrope">
          <thead className="bg-white text-[13px]">
            <tr>
              <th className="p-4 text-gray-500">S/N</th>
              <th className="p-4 w-[200px]">Title</th>
              <th className="p-4">Minimum Value</th>
              <th className="hidden p-4 lg:block">Maximun Value</th>
              <th className="p-4">Created On</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {records &&
              records.map &&
              records.map((value, index) => (
                <tr key={index} className="text-sm border-t">
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  <td className="p-4 w-[200px] text-gray-500">{value.value}</td>
                  <td className="p-4">
                    <div className="flex flex-col justify-center">
                      <span className="lg:hidden">Min: </span>{" "}
                      {value.min_saving_period}
                      <span className="font-black lg:hidden text-semibold">
                        {" "}
                        Max:{value.max_saving_period}{" "}
                      </span>
                    </div>
                  </td>
                  <td className="hidden p-4 lg:block">
                    {value.max_saving_period}
                  </td>
                  <td className="p-4">{formatDateTime(value.created_at)}</td>
                  <td className="flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={() => {
                        handleEdit(value);
                      }}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <Image
                        src={edit.src}
                        alt="edit icon"
                        width={20}
                        height={20}
                        priority
                      />
                    </button>
                    <button
                      onClick={() => {
                        handleView(value);
                      }}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <Image
                        src={eye.src}
                        alt="view icon"
                        width={20}
                        height={20}
                        priority
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
    </div>
  );
}
