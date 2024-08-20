import React from "react";
import { IconFilter } from "@tabler/icons-react";

const Filters = ({ setIsOpenModal }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-4"></div>
      <button
        className="filterButton flex items-center lg:px-5 md:px-5 px-3 lg:py-3 md:py-3 py-2 bg-secondary text-white font-bold rounded-xl hover:bg-white hover:text-secondary transition-all duration-400 hover:border hover:border-secondary mt-2 lg:text-base md:text-base text-sm cursor-pointer"
        onClick={() => setIsOpenModal((prev) => !prev)}
      >
        Filters <IconFilter className="ml-2" />
      </button>
    </div>
  );
};

export default Filters;
