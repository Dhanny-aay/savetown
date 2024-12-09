import XClose from "./assets/XClose.svg";

export default function DinnerModal({ isVisible, onClose, showDinnerDrawer }) {
  const handleSaveSeat = () => {
    onClose(); // Close the modal
    showDinnerDrawer(); // Then call the function to show the dinner drawer
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto flex items-center p-6 justify-center w-full bg-[#D5D7DA4D]`}
          onClick={onClose}
        >
          <div
            className=" w-full md:w-[600px] lg:h-[270px] bg-white plansbg rounded-2xl border border-[#DAE0E6] flex items-start justify-center flex-col p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <img
              src={XClose.src}
              onClick={onClose}
              className=" absolute top-4 right-4"
              alt=""
            />
            <h5 className=" text-h55 md:text-h5 font-semibold font-Manrope text-black">
              Dinner Date Invite
            </h5>
            <div className=" max-w-[380p text-left mt-6 md:mt-8 text-[#595A5C] text-body14Regular font-Manrope">
              Save a seat for our dinner date that holds every 2nd and 4th
              Friday of every month from 6pm - 8pm at 17 Mbadiwe street VI lagos
              state,
            </div>
            <div className=" grid grid-cols-1 mt-6 w-full md:grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className=" border py-4 w-full rounded-[1000000px] border-[#C2C4C6] text-[#595A5C] font-Manrope text-body14SemiBold md:text-body16SemiBold"
              >
                Not Interested
              </button>
              <button
                onClick={handleSaveSeat}
                className=" py-4 w-full rounded-[1000000px] bg-btnPrimary text-body14SemiBold text-[#fff] md:text-body16SemiBold"
              >
                Save a seat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
