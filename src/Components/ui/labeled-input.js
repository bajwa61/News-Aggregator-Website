import React from "react";

const LabeledInput = ({ label, children }) => (
  <div className="flex flex-col w-full">
    <label className="block text-sm font-medium text-secondary mb-1">
      {label}
    </label>
    {children}
  </div>
);

export default LabeledInput;
