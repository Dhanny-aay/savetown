"use client";
import FileUploader from "@/app/utils/fileUploader";
import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import { useState } from "react";

export default function Voters({ goBack }) {
  const [image, setImage] = useState(null);

  const handleImgFileSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setMedia(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className=" mt-8">
      <img src={ArrowRightBlk.src} onClick={goBack} alt="" />
      <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
        Voter’s Card
      </h3>
      <div className=" mt-6">
        <div>
          <label>Voter’s Card</label>
          <div className="mt-2 flex items-center ">
            <input
              type="text"
              placeholder="Enter ID Number"
              name=""
              className="w-full border border-[#D5D7DA] rounded-[32px] mt-1 text-body14Regular font-Manrope px-6 py-3"
              id=""
            />
          </div>
          <p className=" text-[#535862] font-Manrope text-body12Regular mt-1">
            The number shown on
            <span className=" font-medium text-[#8133F1]"> VIN </span>
            is what should be inputted
          </p>
        </div>
        <FileUploader
          label="Upload ID"
          accept="image/png, image/jpeg"
          maxSize={10000000} // 10MB
          isImage={false}
          onFileSelect={handleImgFileSelect}
        />
        <button className="bg-btnPrimary py-3 w-full rounded-[50px] mt-4 font-semibold font-Manrope text-white text-xs 2xl:text-lg">
          Submit
        </button>
      </div>
    </div>
  );
}
