import PaymentDetail from "./paymentDetail";

export default function Payment() {
  return (
    <>
      <div className=" w-full flex items-center justify-between pb-5 border-b border-[#E4E7EC]">
        <div>
          <h3 className="text-body16Bold font-Manrope text-[#595A5C]">
            Payment Method
          </h3>
          <p className=" text-body12Regular font-Manrope text-[#475467] mt-1">
            Update your account number here.
          </p>
        </div>
        {/* <button className=" bg-btnPrimary rounded-[40px] border border-[#EAEBF0] py-3 px-6 flex items-center">
          <p className="text-body14SemiBold font-Manrope text-white">Save</p>
        </button> */}
      </div>

      <PaymentDetail isWithdrawal={false} />
    </>
  );
}
