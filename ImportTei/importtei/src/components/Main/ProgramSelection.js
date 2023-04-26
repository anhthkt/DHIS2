import React, { useState } from 'react';

function ProgramSelection(props) {
  const [selectedProgram, setSelectedProgram] = useState('');

  const handleSelectProgram = (event) => {
    setSelectedProgram(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div>
      <label>
        <select value={selectedProgram} onChange={handleSelectProgram}>
          <option value="">-- Chọn chương trình --</option>
          <option value="NAleauPZvIE" name="Tăng Huyết Áp">Tăng Huyết Áp</option>
          <option value="a7arqsOKzsr" name="Đái Tháo Đường">Đái Tháo Đường</option>
        </select>
      </label>
    </div>
  );
}

export default ProgramSelection;
