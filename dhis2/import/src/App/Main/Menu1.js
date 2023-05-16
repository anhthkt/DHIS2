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
    // console.log(value);
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

  const UsedGuild = `<div ><h3 style="color: red;">Chú ý khi sử dụng:</h3>
  <h4>1. Sử dụng đúng file mẫu import <a href="https://drive.google.com/uc?id=1BR_nY4-kW9RacKnxSA25KuKHWQDPUUFv">(Tải tại đây)</a>.</h4>
  <h4>2. Các trường màu đỏ là bắt buộc phải có thông tin.</h4>
  <h4>3. Mỗi lần nên import <300 BN.</h4>
  </div>`;



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
            <Cascader key="menu1-cascader" options={options} onChange={handleOptionChange} placeholder="Chọn chương trình" />
          </h4>
        </Col>
        <Col span={2}></Col>
        <Col span={2}></Col>
      </Row>
      <Row justify="start">
        <div dangerouslySetInnerHTML={{ __html: UsedGuild }} />
      </Row>
    </div>
  );
};

export default Menu1;
