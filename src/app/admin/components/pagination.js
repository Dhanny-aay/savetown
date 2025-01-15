import { useEffect, useState } from "react";

export default function Pagination ({ currentPage, totalPages, onPageChange}) {
    const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
    return (
    //   <div> hello</div>
      <div className="flex justify-between items-center mt-4 px-4">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          className={`flex items-center text-sm ${
            currentPage === 1 ? "text-gray-500" : "text-[#5F6D7E] hover:text-[#ED1450]"
          }`}
        >
          <span className="mr-2">&larr;</span>Prev
        </button>
  
        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {numbers.map((page, index) =>
            typeof page === "number" ? (
              <span
                key={index}
                onClick={()=>changeCurrentPage(page)}
                className={`text-sm cursor-pointer ${
                  currentPage === page
                    ? "text-[#ED1450] font-bold"
                    : "text-[#5F6D7E] hover:text-[#ED1450]"
                }`}
              >
                {page}
              </span>
            ) : (
              <span key={index} className="text-sm text-[#5F6D7E]">
                {page}
              </span>
            )
          )}
        </div>
  
        {/* Next Button */}
        <button
          onClick={nextPage}
          className={`flex items-center text-sm ${
            currentPage === 6 ? "text-gray-500" : "text-[#5F6D7E] hover:text-[#ED1450]"
          }`}
        >
          Next<span className="ml-2">&rarr;</span>
        </button>
      </div>
    );
  };
  