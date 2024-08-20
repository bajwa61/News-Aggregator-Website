import React, { useState } from "react";

// Components
import LabeledInput from "../ui/labeled-input";
import MultiSelectDropdown from "../ui/multi-select-dropdown";

// Services
import ArticleConstantService from "../../Services/article/ArticleConstantService";

const FilterModal = ({
  isOpen,
  onClose,
  onChange,
  initialFilters = {
    selectedCategories: [],
    selectedSources: [],
    date: "",
  },
  labels = {
    categories: "Categories",
    sources: "Sources",
    date: "Published Date",
  },
}) => {
  const { categories, sources } = ArticleConstantService;
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-secondary">
          Filter Articles
        </h2>
        <div className="space-y-4">
          <LabeledInput label={labels.categories}>
            <MultiSelectDropdown
              options={categories}
              name="selectedCategories"
              selectedOptions={filters.selectedCategories}
              onChange={(value) => handleChange("selectedCategories", value)}
            />
          </LabeledInput>

          <LabeledInput label={labels.sources}>
            <MultiSelectDropdown
              options={sources}
              name="selectedSources"
              selectedOptions={filters.selectedSources}
              onChange={(value) => handleChange("selectedSources", value)}
              className="w-full"
            />
          </LabeledInput>

          <LabeledInput label={labels.date}>
            <input
              type="date"
              name="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              value={filters.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </LabeledInput>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-white hover:text-secondary hover:border border-secondary transition-all duration-250"
            onClick={() => {
              onChange(filters);
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
