"use client";
import FileUploader from "@/app/utils/fileUploader";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import load from "./assets/load.gif";
import { useState } from "react";
import { handleKYCVerify } from "@/app/userControllers/kycController";
import { useSnackbar } from "notistack";
import { useUserContext } from "../../UserContext";

export default function Voters({ goBack, onClose }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const id_type = "id_voters_card";
  const [id_selfie_image, setid_selfie_image] = useState("");
  const [id_front, setId_front] = useState("");
  const [id_back, setId_back] = useState("");
  const [id_number, setId_number] = useState("");
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { triggerFetchProfile } = useUserContext();

  const validateFields = () => {
    const newErrors = {};
    if (!id_front) newErrors.id_front = "ID front image is required";
    if (!id_back) newErrors.id_back = "ID back image is required";
    if (!id_selfie_image)
      newErrors.id_selfie_image = "A picture of you is required";
    if (!id_number) newErrors.id_number = "ID number is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      enqueueSnackbar("Please fill all required fields", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return false;
    }

    return true;
  };

  const handleImgFileSelect = (file, type) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "image") {
        setid_selfie_image(reader.result);
      }
      if (type === "front") {
        setId_front(reader.result);
      } else if (type === "back") {
        setId_back(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProceed = () => {
    setStep(2); // Move to the next step
  };

  const onSuccess = (response) => {
    setLoading(false);
    triggerFetchProfile();
    onClose();
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
      const userData = {
        id_selfie_image,
        id_front,
        id_back,
        id_number,
        id_type,
      };
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
        Voter’s Card
      </h3>
      {step === 1 ? (
        // Step 1
        <div className="mt-6 w-full pb-8">
          <div>
            <label>Voter’s Card</label>
            <div className="mt-2 flex flex-col items-start ">
              <input
                type="text"
                placeholder="Enter ID Number"
                name=""
                value={id_number}
                onChange={(e) => setId_number(e.target.value)}
                className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
              {errors.id_number && (
                <span className="text-red-500 text-xs font-Manrope mt-2">
                  {errors.id_number}
                </span>
              )}
            </div>
            <p className=" text-[#535862] font-Manrope text-body12Regular mt-1">
              The number shown on
              <span className=" font-medium text-[#8133F1]"> VIN </span>
              is what should be inputted
            </p>
          </div>
          <FileUploader
            label="Upload front of your Voter's card"
            accept="image/png, image/jpeg"
            maxSize={10000000} // 10MB
            isImage={true}
            onFileSelect={(file) => handleImgFileSelect(file, "front")}
            initialPreview={id_front}
          />
          {errors.id_front && (
            <span className="text-red-500 text-xs font-Manrope mt-2">
              {errors.id_front}
            </span>
          )}
          <FileUploader
            label="Upload back of your Voter's card"
            accept="image/png, image/jpeg"
            maxSize={10000000} // 10MB
            isImage={true}
            onFileSelect={(file) => handleImgFileSelect(file, "back")}
            initialPreview={id_back}
          />
          {errors.id_back && (
            <span className="text-red-500 text-xs font-Manrope mt-2">
              {errors.id_back}
            </span>
          )}
        </div>
      ) : (
        // Step 2: Photo Upload
        <div className="mt-6 w-full pb-8">
          <FileUploader
            label="Upload a picture of yourself"
            accept="image/png, image/jpeg"
            maxSize={10000000} // 10MB
            isImage={true}
            onFileSelect={(file) => handleImgFileSelect(file, "image")}
            initialPreview={id_selfie_image}
          />
          {errors.id_selfie_image && (
            <span className="text-red-500 text-xs font-Manrope mt-2">
              {errors.id_selfie_image}
            </span>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="absolute bottom-0 left-0 w-full bg-white py-4 px-6 border-t border-gray-200">
        {step === 1 ? (
          <button
            onClick={handleProceed}
            className="bg-btnPrimary py-3 w-full rounded-[50px] mt-4 font-semibold font-Manrope text-white text-xs 2xl:text-lg"
          >
            Proceed
          </button>
        ) : (
          <div className=" grid grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => setStep(1)} // Go back to Step 1
              className=" border border-[#D5D7DA] py-3 w-full rounded-[50px] font-semibold font-Manrope text-[ text-xs 2xl:text-lg"
            >
              Back
            </button>
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-btnPrimary py-3 w-full rounded-[50px] font-semibold font-Manrope text-white text-xs 2xl:text-lg flex items-center justify-center"
            >
              {loading ? (
                <img src={load.src} className="w-5" alt="" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
