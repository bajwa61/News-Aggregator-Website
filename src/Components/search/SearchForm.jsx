import React from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholder";

const SearchForm = ({
  searchParams,
  onChange,
  labels = {
    search: "Search Articles",
  },
}) => {
  return (
    <div className="w-[500px]">
      <PlaceholdersAndVanishInput
        placeholders={[labels.search]}
        onChange={onChange}
        value={searchParams.search || ""}
      />
    </div>
  );
};

export default SearchForm;
