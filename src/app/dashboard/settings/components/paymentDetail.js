"use client";
import { useEffect, useState } from "react";
import AddPayment from "./addPayment";
import PlusCircle from "./assets/PlusCircle.svg";
import Bank from "./assets/Bank.svg";
import blckload from "./assets/blckload.gif";
import Trash from "./assets/Trash.svg";
import RemoveModal from "./removeModal";
import ChangeMeth from "./changeMeth";
import { handleGetUserBanks } from "@/app/userControllers/bankController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PaymentDetail({ isWithdrawal }) {
  const [isPaymentDrawerVisible, setPaymentDrawerVisible] = useState(false);
  const [isChangeDrawerVisible, setChangeDrawerVisible] = useState(false);
  const [isMethodAdded, setMethodAdded] = useState(false);
  const [isRemoveVisible, setRemoveVisible] = useState(false);
  const [userBanks, setUserBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [selectedID, setSelectedID] = useState("");

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  // Remove modal
  const showRemoveModal = () => setRemoveVisible(true);
  const closeRemoveModal = () => setRemoveVisible(false);

  // payment meth drawer
  const showPaymentDrawer = () => setPaymentDrawerVisible(true);
  const closePaymentDrawer = () => setPaymentDrawerVisible(false);

  // change drawer
  const showChangeDrawer = () => setChangeDrawerVisible(true);
  const closeChangeDrawer = () => setChangeDrawerVisible(false);

  const fetchUserBanks = async () => {
    setLoading(true);
    try {
      const data = await handleGetUserBanks();
      if (data) {
        setUserBanks(data.data);
        setMethodAdded(data.data.length > 0);
      }
    } catch (error) {
      console.log("Error fetching bank details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBanks();
  }, [trigger]);

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "";
    return accountNumber.replace(/\d(?=\d{4})/g, "*");
  };

  const showRemove = (id) => {
    setSelectedID(id); // Set the selectedID to the passed item.id
    showRemoveModal(); // Show the remove modal
  };
  const showChange = (id) => {
    setSelectedID(id); // Set the selectedID to the passed item.id
    showChangeDrawer();
  };

  return (
    <>
      {loading ? (
        // Skeleton loader while loading is true
        <div className="w-full border border-[#EAEBF0] p-6 rounded-[15px] mt-6">
          <div className="flex items-center space-x-3">
            <Skeleton circle width={48} height={48} />
            <div className="w-full">
              <Skeleton width="60%" height={20} />
              <Skeleton width="40%" height={20} className="mt-2" />
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-6">
          {isMethodAdded ? (
            <>
              {isWithdrawal && (
                <label className=" mb-3 block">
                  Your funds will be paid to the following account
                </label>
              )}
              <div className=" w-full flex flex-col space-y-3">
                {userBanks.map((item, index) => (
                  <div className=" w-full" key={index}>
                    <div className=" w-full border border-[#EAEBF0] p-6 rounded-[15px] flex items-center justify-between">
                      <div className=" flex items-center space-x-3">
                        <span className=" w-12 md:w-16 h-12 md:h-16 bg-[#E6F2FF] rounded-full flex items-center justify-center">
                          <img
                            src={Bank.src}
                            className=" w-5 md:w-auto"
                            alt=""
                          />
                        </span>
                        <div className="">
                          <div className=" flex items-center space-x-2">
                            <p className=" text-body14SemiBold md:text-body16SemiBold font-Manrope text-[#000]">
                              {item.bank_account_name}
                            </p>

                            <p className=" text-body14SemiBold md:text-body16SemiBold font-Manrope text-[#000]">
                              {item.bank_name}
                            </p>
                          </div>
                          <p className="text-body12Regular mt-3 font-Manrope text-[#666666]">
                            {maskAccountNumber(item.bank_account_number)}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => showRemove(item.id)} className="">
                        <img src={Trash.src} className=" md:hidden" alt="" />
                        <p className=" text-[#F14373] text-body14SemiBold hidden md:block font-Manrope">
                          Remove
                        </p>
                      </button>
                    </div>
                    <button
                      onClick={() => showChange(item.id)}
                      className=" flex items-center space-x-2 mt-4"
                    >
                      <img src={PlusCircle.src} alt="" />
                      <p className=" text-[#F14373] text-body14SemiBold font-Manrope">
                        Change account number
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <button
              onClick={showPaymentDrawer}
              className=" flex items-center space-x-2"
            >
              <img src={PlusCircle.src} alt="" />
              <p className=" text-[#F14373] text-body14SemiBold font-Manrope">
                Add account number for Withdrawal
              </p>
            </button>
          )}
        </div>
      )}

      <AddPayment
        isVisible={isPaymentDrawerVisible}
        onClose={closePaymentDrawer}
        triggerFetch={triggerFetch}
      />
      <ChangeMeth
        isVisible={isChangeDrawerVisible}
        onClose={closeChangeDrawer}
        triggerFetch={triggerFetch}
        selectedID={selectedID}
      />
      <RemoveModal
        selectedID={selectedID}
        isVisible={isRemoveVisible}
        onClose={closeRemoveModal}
        triggerFetch={triggerFetch}
      />
    </>
  );
}
