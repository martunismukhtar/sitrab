import React from "react";

const RadioButton = ({ label, name, value, selectedValue, onChange }) => {
  return (
    <div>
    <label>
      <input
        type="radio"
        name={name} // Grup radio berdasarkan "name"
        value={value} // Nilai yang diberikan ke radio button
        checked={selectedValue === value} // Tertandai jika nilainya sama dengan pilihan saat ini
        onChange={onChange} // Fungsi untuk menangani perubahan
      />
      <span className="ml-2">{label}</span>
    </label>
    </div>
  );
};

export default RadioButton;
