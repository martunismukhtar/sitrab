import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Label from "./Label";

const SearchableSelect =  ({ options, placeholder, onSelect, label, name, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) inputRef.current.focus();
  }, [isOpen]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="mb-6">
      <Label htmlfor={name}>
        {label} 
        {required ? <span className='text-red-500 pl-2'>*</span> : ""}
      </Label>
      <div className="relative w-full">
        <div
          className="p-[8px] cursor-pointer border border-gray-300 rounded-[4px] flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.text : placeholder}
          <i
            className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}
          ></i>
        </div>
        {isOpen && (
          <div>
            <div className="absolute top-[100%] left-0 right-0 border border-[#ccc] rounded-[4px] bg-[#fff] ">
              <input
                type="text"
                value={searchTerm}
                name={name}
                ref={inputRef}
                required={required?true:false}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full p-[8px] border-b-[1px] border-[#ccc] box-border"
              />              
            </div>
            <div className="absolute top-[100%] left-0 right-0 z-[1000] max-h-[150px] overflow-y-auto mt-[40px] border border-[#ccc] rounded-[4px] bg-[#fff]">
              {filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="p-[8px] cursor-pointer hover:bg-[#ecf1f7]"
                  style={{
                    backgroundColor:
                      selectedOption?.id === option.id ? "#e6f7ff" : "",
                  }}
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
