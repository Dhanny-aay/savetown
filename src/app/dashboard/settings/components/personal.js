"use client";
import countryCodes from "country-codes-list";
import { useEffect, useState } from "react";
import { useUserContext } from "../../UserContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import load from "./assets/load.gif";
import { useSnackbar } from "notistack";
import { handleUpdateProfile } from "@/app/userControllers/profileController";

export default function Personal() {
  // Extract a list of countries from the package
  const countryCodeList = countryCodes.all().map((country) => ({
    name: country.countryNameEn,
  }));

  const { userProfile, loadingProfile, triggerFetchProfile } = useUserContext();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [nationality, setNationality] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Populate form fields when userProfile is available
  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.first_name || "");
      setLastName(userProfile.last_name || "");
      setMiddleName(userProfile.middle_name || "");
      setEmail(userProfile.email || "");
      setPhone(userProfile.phone || "");
      setGender(userProfile.gender || "");
      setAddress(userProfile.address || "");
      setProfession(userProfile.profession || "");
      setNationality(userProfile.nationality || "");

      // Handle DOB split (assuming format 'YYYY-MM-DD')
      if (userProfile.dob) {
        const [dobYear, dobMonth, dobDay] = userProfile.dob.split("-");
        setDay(dobDay);
        setMonth(dobMonth);
        setYear(dobYear);
      }
    }
  }, [userProfile]);

  const onSuccess = (response) => {
    setLoading(false);
    enqueueSnackbar("Profile edited Successfully", { variant: "success" });
    setIsEditing(false);
    triggerFetchProfile();
    // Show success notification
  };

  const onError = () => {
    setLoading(false);
    enqueueSnackbar("Profile edit Failed", { variant: "error" });
  };

  // Save changes and send only modified fields
  const handleSave = (e) => {
    e.preventDefault();

    const updatedFields = {};

    if (firstName !== userProfile.first_name)
      updatedFields.first_name = firstName;
    if (lastName !== userProfile.last_name) updatedFields.last_name = lastName;
    if (middleName !== userProfile.middle_name)
      updatedFields.middle_name = middleName;
    if (email !== userProfile.email) updatedFields.email = email;
    if (phone !== userProfile.phone) updatedFields.phone = phone;
    if (gender !== userProfile.gender) updatedFields.gender = gender;
    if (address !== userProfile.address) updatedFields.address = address;
    if (profession !== userProfile.profession)
      updatedFields.profession = profession;
    if (nationality !== userProfile.nationality)
      updatedFields.nationality = nationality;

    // Combine DOB fields if any of them changed
    const newDob = `${year}-${month}-${day}`;
    if (newDob !== userProfile.dob) updatedFields.dob = newDob;

    // console.log("Updated Fields:", updatedFields);
    setLoading(true);
    const userData = updatedFields;
    handleUpdateProfile(userData, onSuccess, onError);
  };

  return (
    <>
      <div className=" w-full flex items-center justify-between pb-5 border-b border-[#E4E7EC]">
        <div>
          <h3 className="text-body16Bold font-Manrope text-[#595A5C]">
            Personal info
          </h3>
          <p className=" text-body12Regular font-Manrope text-[#475467] mt-1">
            Update your photo and personal details here.
          </p>
        </div>

        {isEditing ? (
          <div className=" flex flex-row space-x-3 items-center">
            <button
              className=" rounded-[40px] border border-[#595A5C] py-3 px-6 flex items-center"
              onClick={handleEditToggle}
            >
              <p className="text-body14SemiBold font-Manrope text-[#595A5C]">
                Cancel
              </p>
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className=" bg-btnPrimary text-body14SemiBold font-Manrope text-white rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center"
            >
              {loading ? (
                <img src={load.src} className=" w-4" alt="" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        ) : (
          <button
            className=" bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center"
            onClick={handleEditToggle}
          >
            <p className="text-body14SemiBold font-Manrope text-white">Edit</p>
          </button>
        )}
      </div>

      {isEditing ? (
        // Editable Form
        <>
          <div className=" mt-6 grid grid-cols-1 md:grid-cols-3 w-full gap-4 md:gap-5">
            <div className=" w-full">
              <label>First Name</label>
              <div className="mt-2 flex items-center ">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name=""
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
                  id=""
                />
              </div>
            </div>
            <div className=" w-full">
              <label>Last Name</label>
              <div className="mt-2 flex items-center ">
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
                  id=""
                />
              </div>
            </div>
            <div className=" w-full">
              <label>Middle Name</label>
              <div className="mt-2 flex items-center ">
                <input
                  type="text"
                  placeholder="Enter Middle Name"
                  name=""
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
                  id=""
                />
              </div>
            </div>
          </div>
          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-5">
            <div className=" w-full">
              <label>Email Address</label>
              <div className="mt-2 flex items-center ">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  name=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
                  id=""
                />
              </div>
            </div>
            <div className=" w-full">
              <label>Phone Number</label>
              <div className="mt-2 flex items-center ">
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  name=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
                  id=""
                />
              </div>
            </div>
          </div>
          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-5">
            <div className=" flex flex-col w-full">
              <label htmlFor="dob">Date of birth</label>
              <div className="flex space-x-4 mt-2">
                <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-full p-2.5">
                  <select
                    id="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full"
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) =>
                      (i + 1).toString().padStart(2, "0")
                    ).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </span>

                <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-full p-2.5">
                  <select
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className=" w-full"
                  >
                    <option value="">Month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </span>

                <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-full p-2.5">
                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className=" w-full"
                  >
                    <option value="">Year</option>
                    {Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            </div>
            <div className=" flex flex-col w-full">
              <label htmlFor="gender">Gender</label>
              <span className="rounded-[32px] border border-[#D5D7DA] py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] mt-2 w-full">
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="z-10 w-full bg-transparent"
                >
                  <option value="">Choose Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </span>
            </div>
          </div>

          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-5">
            <div>
              <label htmlFor="Nationality">Nationality</label>
              <span className="rounded-[32px] border border-[#D5D7DA] block py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2] w-full mt-2">
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="z-10 w-full bg-transparent"
                >
                  <option value="">Choose Country</option>
                  {countryCodeList.map(({ code, name }, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <div className=" w-full">
              <label>House Address</label>
              <div className="mt-2 flex items-center ">
                <input
                  type="text"
                  placeholder="Enter House Address"
                  name=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
                  id=""
                />
              </div>
            </div>
          </div>
          <div className=" w-full mt-6">
            <label>Occupation</label>
            <div className="mt-2 flex items-center ">
              <input
                type="text"
                placeholder="Enter Occupation"
                name=""
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full border border-[#D5D7DA] rounded-[32px] text-body14Regular font-Manrope px-6 py-3"
                id=""
              />
            </div>
          </div>
          <button className=" mt-6 bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 w-full px-6 flex md:hidden items-center">
            <p className="text-body14SemiBold font-Manrope text-center w-full text-white">
              Save
            </p>
          </button>
        </>
      ) : (
        // Static View Mode
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 w-full gap-4 md:gap-5">
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              First Name:
            </p>

            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.first_name || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              Last Name:
            </p>
            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.last_name || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              Middle Name:
            </p>

            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.middle_name || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              Email Address:
            </p>
            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.email || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              Phone Number:
            </p>
            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.phone || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              Date of birth
            </p>
            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.dob || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              Gender
            </p>
            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.gender || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              House Address
            </p>
            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.address || "N/A"}
              </p>
            )}
          </div>
          <div className=" w-full flex items-start flex-col space-y-2">
            <p className="text-body14Bold font-Manrope text-[#000000]">
              Occupation
            </p>
            {loadingProfile ? (
              <Skeleton width={100} height={24} containerClassName="" />
            ) : (
              <p className="text-body14Regular font-Manrope text-[#595A5C]">
                {userProfile.profession || "N/A"}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
