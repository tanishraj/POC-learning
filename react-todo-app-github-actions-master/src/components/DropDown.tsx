import React, { useRef } from "react";
import { Select } from "@chakra-ui/react";

type optionsShape = {
  optionName: string;
  optionValue: string;
};

interface DropDownProps {
  options: optionsShape[];
  selectedOption?: string;
  onOptionChange: (option: React.RefObject<HTMLSelectElement>) => void;
}

const DropDown = ({
  options,
  selectedOption,
  onOptionChange,
}: DropDownProps) => {
  const dropDownRef = useRef<HTMLSelectElement>(null);

  function onChangeHandler() {
    onOptionChange(dropDownRef);
  }

  return (
    <Select
      ref={dropDownRef}
      value={selectedOption}
      onChange={onChangeHandler}
      maxWidth="150px"
    >
      {options.map((option) => (
        <option key={option.optionName} value={option.optionValue}>
          {option.optionName}
        </option>
      ))}
    </Select>
  );
};

export default DropDown;
