import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Components
import LabeledInput from "../ui/labeled-input";
import MultiSelectDropdown from "../ui/multi-select-dropdown";

// Services
import ArticleConstantService from "../../Services/article/ArticleConstantService";

const NewsfeedModal = ({
  isOpen,
  onClose,
  labels = {
    categories: "Preferred Categories",
    sources: "Preferred Sources",
    authors: "Favorite Authors",
  },
}) => {
  const { categories, sources, authors } = ArticleConstantService;

  const [preferences, setPreferences] = useState({
    selectedCategories: [],
    selectedSources: [],
    selectedAuthors: [],
  });

  useEffect(() => {
    const storedPreferences = Cookies.get("userPreferences");
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  const handleSave = () => {
    Cookies.set("userPreferences", JSON.stringify(preferences), { expires: 7 });
    toast.success("Preferences saved successfully!");
    onClose();
  };

  const handleChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-secondary">
          Customize Your Newsfeed
        </h2>
        <div className="space-y-4">
          <LabeledInput label={labels.categories}>
            <MultiSelectDropdown
              options={categories}
              selectedOptions={preferences.selectedCategories}
              onChange={(value) => handleChange("selectedCategories", value)}
            />
          </LabeledInput>

          <LabeledInput label={labels.sources}>
            <MultiSelectDropdown
              options={sources}
              selectedOptions={preferences.selectedSources}
              onChange={(value) => handleChange("selectedSources", value)}
            />
          </LabeledInput>

          <LabeledInput label={labels.authors}>
            <MultiSelectDropdown
              options={authors}
              selectedOptions={preferences.selectedAuthors}
              onChange={(value) => handleChange("selectedAuthors", value)}
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
            onClick={handleSave}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsfeedModal;
