import ArrowRightBlk from "./assets/ArrowRightBlk.svg";
import memb from "./assets/memb.svg";

export default function GroupMembers({ onClose, isVisible, members, loading }) {
  // console.log(members);

  return (
    <div
      className={`fixed top-0 right-0 z-[999] h-screen overflow-y-auto transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } w-full bg-[#D5D7DA4D]`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[70%] lg:w-[600px] h-full py-8 px-6 plansbg border overflow-auto border-[#D5D7DA] relative ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={ArrowRightBlk.src}
          className="cursor-pointer"
          alt="Close"
          onClick={onClose}
        />
        <h3 className="text-h5 font-Manrope font-bold text-[#595A5C] mt-9">
          Group members
        </h3>

        {loading ? (
          // Display a loading indicator when data is being fetched
          <div className="w-full mt-16 flex items-center flex-col justify-center">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin"></div>
            <p className="mt-4 text-body14Regular font-Manrope text-[#666666]">
              Loading group members...
            </p>
          </div>
        ) : !members || members.length === 0 ? (
          // Render this when there are no group members and loading is complete
          <div className="w-full mt-16 flex items-center flex-col justify-center">
            <img src={memb.src} alt="No members" />
            <h6 className="text-center text-body16Regular font-Manrope text-[#666666] mt-6">
              Group Members
            </h6>
            <p className="text-body12Regular font-Manrope text-[#666666] mt-2 text-center">
              Group members will appear here.
            </p>
          </div>
        ) : (
          // Render the list of group members when there are members
          members.map((item, index) => (
            <div
              key={index}
              className="w-full border-b border-[#C2C4C6] py-6 font-Manrope text-[#666666] text-body14SemiBold md:text-body16SemiBold"
            >
              <span>{item.email}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
