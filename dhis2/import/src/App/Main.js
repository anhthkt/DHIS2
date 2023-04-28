import React, { useState } from 'react';
import Menu1 from './Main/Menu1';
import Menu2 from './Main/Menu2';
import Menu3 from './Main/Menu3';

function Main({ activeMenu }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [data, setData] = useState('');
    const [header, setHeader] = useState('');
    const [keyArr, setKeyArr] = useState('');
    
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
    const handleGetData = (data) => {
        setData(data);
    };
    const handleGetKeyArr = (keyArr) => {
        setKeyArr(keyArr);
    };
    const handleGetHeader = (header) => {
        setHeader(header);
    };
   
    let content;
    if (activeMenu === 'menu1') {
        content = <Menu1 setSelectedOption={setSelectedOption} onOptionChange={handleOptionChange}/>;
    } else if (activeMenu === 'menu2') {
        content = <Menu2 onGetData={handleGetData} onGetKeyArr={handleGetKeyArr} onGetHeader={handleGetHeader}/>;
    } else if (activeMenu === 'menu3') {
        content = <Menu3 selectedOption={selectedOption} data={data} header={header} keyArr={keyArr} />;
    } 
    // else if (activeMenu === 'menu4') {
    //     content = <Menu4 />;
    // }

    return (
        <div className="main" key={`main-${activeMenu}`}>
            {content}
        </div>
    );
}

export default Main;
