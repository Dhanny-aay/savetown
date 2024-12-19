import { handleKYCVerify } from "@/app/userControllers/kycController";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import { useState } from "react";
import load from "./assets/load.gif";

export default function Bvn({ goBack }) {
  const [loading, setLoading] = useState(false);
  // const [step, setStep] = useState(1);
  const id_type = "id_bvn";
  // const [id_image, setid_image] = useState("");
  // const [id_front, setId_front] = useState("");
  // const [id_back, setId_back] = useState("");
  const [id_number, setId_number] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    //  if (!id_front) newErrors.id_front = "ID front image is required";
    //  if (!id_back) newErrors.id_back = "ID back image is required";
    //  if (!id_image) newErrors.id_image = "A picture of you is required";
    if (!id_number) newErrors.id_number = "ID number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  const handleImgFileSelect = (file, type) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "image") {
        setid_image(reader.result);
      }
      if (type === "front") {
        setId_front(reader.result);
      } else if (type === "back") {
        setId_back(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // const handleProceed = () => {
  //   setStep(2); // Move to the next step
  // };

  const onSuccess = (response) => {
    setLoading(false);
    // Show success notification
    // enqueueSnackbar("Dinner Booked Successfully", { variant: "success" });
  };

  const onError = () => {
    setLoading(false);
    //  enqueueSnackbar("Dinner Booking Failed", { variant: "error" });
  };

  const handleSend = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = { id_number, id_type };
      handleKYCVerify(userData, onSuccess, onError);
    }
  };

  return (
    <div className="">
      <img
        src={ArrowRightBlk.src}
        onClick={goBack}
        className=" cursor-pointer"
        alt=""
      />
      <h3 className="text-h55 md:text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
        Bank verification number(BVN)
      </h3>
      <div className=" mt-6">
        <div>
          <label>Bank verification number(BVN)</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter ID Number"
              name=""
              value={id_number}
              onChange={(e) => setId_number(e.target.value)}
              className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
          <p className=" text-[#535862] font-Manrope text-body12Regular mt-1">
            Dial <span className=" font-medium text-[#8133F1]">*565*0#</span> on
            your registered number to get your BVN
          </p>
        </div>
        <div className=" mt-4">
          <label>House Address</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter House Address"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-btnPrimary py-3 w-full rounded-[50px] font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center mt-4 justify-center"
        >
          {loading ? <img src={load.src} className="w-5" alt="" /> : "Submit"}
        </button>
      </div>
    </div>
  );
}
