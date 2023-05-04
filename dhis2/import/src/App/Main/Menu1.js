import React, { useState, useEffect } from 'react';
import { Row, Col, Cascader } from 'antd';

const Menu1 = ({ setSelectedOption, selectedOption }) => {
  const [options, setOptions] = useState([
    { value: 'NAleauPZvIE', label: 'Tăng Huyết Áp' },
    { value: 'a7arqsOKzsr', label: 'Đái Tháo Đường' },
    { value: 'gPWs4FRX9dj', label: 'COPD và Hen PQ' },
    { value: 'WmEGO8Ipykm', label: 'Rối loạn tâm thần' },
    { value: 'XrC0U6IV4W0', label: 'KLN Khác' },
  ]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    console.log(value);
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
    <div className="menu1">
      <Row justify="space-around">
        <Col span={2}>
          <h4>
            {/* <select id="menu1" value={selectedOption} onChange={handleOptionChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value} selected={option.selected}>
                  {option.label}
                </option>
              ))}
            </select> */}
            <Cascader options={options} onChange={handleOptionChange} placeholder="Chọn chương trình" />
          </h4>
        </Col>
        <Col span={2}></Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default Menu1;
