import React, { useState, useEffect } from 'react';

const Menu1 = ({ setSelectedOption, selectedOption }) => {
  const [options, setOptions] = useState([
    { key: 'option0', value: '-- None' },
    { key: 'option1', value: 'Lựa chọn 1' },
    { key: 'option2', value: 'Lựa chọn 2' },
  ]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption) {
      setOptions((prevState) =>
        prevState.map((option) =>
          option.value === selectedOption
            ? { ...option, selected: true }
            : { ...option, selected: false }
        )
      );
    }
  }, [selectedOption]);

  return (
    <div>
      <label htmlFor="menu1">Chọn chương trình: </label>
      <select id="menu1" value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.key} value={option.key} selected={option.selected}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Menu1;
